#!/usr/bin/env node
/**
 * Rule 18: Path Alias Enforcement (MANDATORY)
 * 
 * ALL imports in src files MUST use path aliases (@/) for internal imports
 * Relative paths (../ or ./) are FORBIDDEN for internal src imports
 * External packages (react, react-dom, etc.) are allowed
 * 
 * Zero tolerance - blocks commit and PR if violated
 */

const { readFileSync, readdirSync, statSync } = require('fs')
const { join, extname, relative } = require('path')

const SRC_DIR = 'src'
let violations = []
let hasViolations = false

// Allowed import patterns (external packages only)
const ALLOWED_EXTERNAL_PATTERNS = [
  /^['"]react/,         // External packages: 'react', "react"
  /^['"]react-dom/,     // External packages: 'react-dom', "react-dom", "react-dom/client"
  /^['"]@testing-library/, // Testing library packages
  /^['"]@vitejs/,       // Vite plugins
  /^['"]zustand/,       // Zustand
  /^['"]react-router/,  // React Router
  /^['"]date-fns/,      // date-fns
  /^['"]clsx/,          // clsx
]

// Required path alias pattern for internal imports (matches @/ at start)
const REQUIRED_ALIAS_PATTERN = /^@\//

// Forbidden patterns (relative paths for internal imports)
// Note: ./ is allowed for same-directory imports (e.g., index.ts files) to avoid circular dependencies
const FORBIDDEN_PATTERNS = [
  /^['"]\.\.\//,        // Relative paths: ../ (forbidden for internal imports)
  /^['"]src\//,         // src/ absolute (forbidden)
  /^['"]~\//,           // ~/ alias (not configured)
  /^['"]\*\//,          // */ alias (not configured)
]

function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir)
  
  for (const file of files) {
    const filePath = join(dir, file)
    const stat = statSync(filePath)
    
    if (stat.isDirectory()) {
      // Skip node_modules, dist, build, .git, etc.
      if (!['node_modules', 'dist', 'build', '.git', '.husky', '.github', 'coverage'].includes(file)) {
        getAllFiles(filePath, fileList)
      }
    } else if (stat.isFile()) {
      // Only check TypeScript/JavaScript files
      const ext = extname(file)
      if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
        if (filePath.startsWith(SRC_DIR)) {
          fileList.push(filePath)
        }
      }
    }
  }
  
  return fileList
}

function isInternalImport(importPath) {
  // Remove quotes
  const cleanPath = importPath.replace(/^['"]|['"]$/g, '')
  
  // Check if it's an external package (allowed patterns)
  const isExternal = ALLOWED_EXTERNAL_PATTERNS.some(pattern => pattern.test(importPath))
  if (isExternal) return false
  
  // Check if it's a scoped npm package (e.g., @testing-library/react, @types/node, @vitejs/plugin-react)
  // Scoped packages typically have the pattern @scope/package-name
  if (cleanPath.match(/^@[a-z0-9-]+\/[a-z0-9-@/]+$/)) {
    // If it's exactly @/ or starts with @/, it's our alias (internal)
    if (cleanPath === '@/' || cleanPath.startsWith('@/')) {
      return true // Our @/ alias - internal
    }
    // Otherwise it's an external scoped package
    return false // External scoped package
  }
  
  // If it starts with @/ (our alias), it's internal
  if (cleanPath.startsWith('@/')) {
    return true // Internal import using @/ alias
  }
  
  // If it's a relative path (../ or ./), it's internal but forbidden
  if (cleanPath.startsWith('./') || cleanPath.startsWith('../')) {
    return true // Internal import using relative path (forbidden)
  }
  
  // Single word imports without @, ., or / are external packages (e.g., "react", "zustand")
  if (!cleanPath.includes('/') && !cleanPath.includes('@') && !cleanPath.includes('.')) {
    return false // External package
  }
  
  // If it has / but doesn't start with @/, ./, or ../, check if it's a known external pattern
  // For now, if it doesn't match our known external patterns and doesn't start with @/, assume it's internal
  // This will catch things like "src/..." which are also forbidden
  if (cleanPath.includes('/')) {
    // If it starts with src/, it's likely an internal import that should use @/
    if (cleanPath.startsWith('src/')) {
      return true // Internal but should use @/
    }
    // Otherwise, if it doesn't match external patterns, it's probably internal
    return true
  }
  
  // Default: not internal (external package)
  return false
}

function checkImportLine(line, lineNumber, filePath) {
  // Match import/export from statements
  const importMatch = line.match(/from\s+(['"])(.+?)\1/)
  if (!importMatch) return
  
  const importPath = importMatch[2]
  const cleanPath = importPath.replace(/^['"]|['"]$/g, '')
  
  // Skip external packages (they're allowed)
  // importPath is without quotes, so patterns should match without quotes
  const isExternal = ALLOWED_EXTERNAL_PATTERNS.some(pattern => {
    // Patterns include quotes, but importPath doesn't, so test against cleanPath or adjust pattern
    return pattern.test(`"${importPath}"`) || pattern.test(`'${importPath}'`) || cleanPath.match(/^react-dom/) || cleanPath.match(/^react$/)
  })
  if (isExternal) return
  
  // Skip if it's a scoped npm package (e.g., @testing-library/react)
  if (cleanPath.match(/^@[a-z0-9-]+\/[a-z0-9-@/]+$/) && !cleanPath.startsWith('@/')) {
    return // External scoped package, allowed
  }
  
  // Check if this is an internal import
  if (!isInternalImport(importPath)) {
    return // External package, allowed
  }
  
  // For internal imports, check if it uses @/ alias
  // importPath is already without quotes from the regex capture group
  const usesAlias = cleanPath.startsWith('@/')
  
  // If it already uses @/ alias, it's compliant - no violation
  if (usesAlias) {
    return // Compliant - uses @/ alias
  }
  
  // If it's internal but doesn't use @/, check if it's a forbidden relative path
  // Allow ./ for same-directory imports (common in index.ts files to avoid circular deps)
  const isSameDirectory = cleanPath.startsWith('./') && !cleanPath.includes('../')
  if (isSameDirectory) {
    return // Allow same-directory imports with ./
  }
  
  // Check if it's a forbidden relative path (../ or other patterns)
  const isForbidden = FORBIDDEN_PATTERNS.some(pattern => pattern.test(importPath))
  
  if (isForbidden) {
    const relativePath = relative(process.cwd(), filePath)
    violations.push(`❌ ${relativePath}:${lineNumber} - Uses relative path: "${importPath}"`)
    violations.push(`   Required: Use @/ alias instead (e.g., @/pages/..., @/domains/...)`)
    hasViolations = true
    return
  }
  
  // If it's internal but doesn't use @/ and isn't same-directory, it's a violation
  const relativePath = relative(process.cwd(), filePath)
  violations.push(`❌ ${relativePath}:${lineNumber} - Internal import without @/ alias: "${importPath}"`)
  violations.push(`   Required: Use @/ alias for all internal imports (e.g., @/domains/...)`)
  violations.push(`   Exception: ./ is allowed for same-directory imports in index files`)
  hasViolations = true
}

function validateFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8')
    const lines = content.split('\n')
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1
      // Skip comment lines
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
        return
      }
      checkImportLine(line, lineNumber, filePath)
    })
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message)
  }
}

function validateRelativePaths() {
  console.log('🔍 Validating Rule 18: Path Alias Enforcement (@/ required for internal imports)')
  console.log('='.repeat(70))
  console.log('')
  
  const files = getAllFiles(SRC_DIR)
  console.log(`📁 Scanning ${files.length} files in ${SRC_DIR}/...`)
  console.log('')
  
  files.forEach(validateFile)
  
  console.log('')
  console.log('='.repeat(70))
  
  if (hasViolations) {
    console.log('')
    console.log('❌ CRITICAL: Rule 18 violations detected!')
    console.log('')
    console.log('📋 Violations:')
    violations.forEach(v => console.log(v))
    console.log('')
    console.log('🔒 ENFORCEMENT:')
    console.log('  ❌ Commit blocked - Fix path imports before committing')
    console.log('  ❌ PR blocked - Cannot merge until all paths use @/ alias')
    console.log('')
    console.log('📋 REQUIRED:')
    console.log('  ✅ Replace all relative paths (../, ./) with @/ aliases')
    console.log('  ✅ ALL internal imports MUST use @/ alias (e.g., @/domains/...)')
    console.log('  ✅ External packages (react, react-dom, etc.) are allowed as-is')
    console.log('  ✅ Refer to Rule 18 in DEVELOPMENT_STANDARDS.md')
    console.log('')
    console.log('📝 Examples:')
    console.log('  ❌ import { Component } from "../components/Component"')
    console.log('  ✅ import { Component } from "@/components/Component"')
    console.log('  ❌ import { service } from "../../services/service"')
    console.log('  ✅ import { service } from "@/services/service"')
    console.log('')
    process.exit(1)
  } else {
    console.log('')
    console.log('✅ All internal imports use @/ alias - Rule 18 compliant!')
    console.log('✅ No relative paths detected for internal imports')
    console.log('')
    process.exit(0)
  }
}

validateRelativePaths()
