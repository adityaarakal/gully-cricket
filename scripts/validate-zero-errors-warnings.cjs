#!/usr/bin/env node
/**
 * Validates that ALL errors and warnings are fixed before commit
 * Rule: ZERO ERRORS AND WARNINGS ALLOWED - ALL MUST BE FIXED
 * 
 * This script checks:
 * 1. ESLint errors (already enforced via lint command)
 * 2. ESLint warnings (must be zero)
 * 3. TypeScript errors (already enforced)
 * 4. TypeScript warnings (must be zero)
 * 5. Console errors/warnings in source code (must be removed)
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const ERROR_PREFIX = '❌ CRITICAL ERROR: Errors or warnings detected!'
const ENFORCEMENT_MESSAGE = `
🔒 ABSOLUTE REQUIREMENT: ALL errors and warnings MUST be fixed before commit
📋 ZERO TOLERANCE: No errors or warnings allowed - NONE
🚫 VIOLATION: Commit contains errors or warnings that must be fixed
✅ REQUIRED: Fix ALL errors and warnings before committing
⚠️  RULE VIOLATION: This violates the ZERO ERRORS/WARNINGS POLICY
`

function checkESLintErrors() {
  try {
    console.log('🔍 Checking ESLint for errors and warnings...')
    // Run eslint with max-warnings 0 to ensure zero warnings
    const result = execSync('npm run lint -- --max-warnings 0 2>&1', { encoding: 'utf-8' })
    // If we get here, no errors/warnings were found
    return { hasErrors: false, hasWarnings: false, output: result }
  } catch (error) {
    const output = error.stdout || error.stderr || error.message
    // Parse output to determine if it's errors or warnings
    const hasErrors = output.includes('error') || output.includes('✖')
    const hasWarnings = output.includes('warning') || output.includes('⚠')
    return { hasErrors, hasWarnings, output }
  }
}

function checkTypeScriptWarnings() {
  try {
    console.log('🔍 Checking TypeScript for errors and warnings...')
    // TypeScript with --noEmit only shows errors, but we check for any output
    const result = execSync('npm run type-check 2>&1', { encoding: 'utf-8' })
    // If there are no errors, result should be minimal or empty
    if (result.trim().length > 0 && result.includes('error')) {
      return { hasErrors: true, hasWarnings: false, output: result }
    }
    return { hasErrors: false, hasWarnings: false, output: result }
  } catch (error) {
    const output = error.stdout || error.stderr || error.message
    return { hasErrors: true, hasWarnings: false, output }
  }
}

function checkConsoleErrorsInSource() {
  console.log('🔍 Checking source code for console errors/warnings...')
  const srcDir = path.join(process.cwd(), 'src')
  const problematicPatterns = [
    /console\.(error|warn)\(/g,
    /console\.(log|debug|info)\(/g // Also flag console.log as it might indicate debugging code
  ]
  
  const filesWithConsole = []
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('__tests__')) {
        walkDir(filePath)
      } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
        const relativePath = path.relative(process.cwd(), filePath)
        
        // Skip the logger utility file - it's the legitimate place for console methods
        if (relativePath.includes('utils/logger.ts') || relativePath.includes('utils/logger.tsx')) {
          return // Skip logger file
        }
        
        const content = fs.readFileSync(filePath, 'utf-8')
        
        // Check for console.error and console.warn (these are errors/warnings)
        if (content.match(/console\.(error|warn)\(/)) {
          const matches = content.match(/console\.(error|warn)\(/g) || []
          filesWithConsole.push({
            file: relativePath,
            type: 'error/warning',
            count: matches.length
          })
        }
        // Note: console.log is allowed but we flag it for awareness
        // We'll only error on console.error and console.warn
      }
    })
  }
  
  try {
    if (fs.existsSync(srcDir)) {
      walkDir(srcDir)
    }
  } catch (error) {
    // If we can't read the directory, that's an issue but not a console error
    console.warn('Warning: Could not check source directory:', error.message)
  }
  
  return filesWithConsole
}

function main() {
  console.log('🚨 ZERO ERRORS/WARNINGS VALIDATION')
  console.log('==================================================\n')
  
  let hasViolations = false
  
  // Check ESLint
  const eslintCheck = checkESLintErrors()
  if (eslintCheck.hasErrors || eslintCheck.hasWarnings) {
    console.error(ERROR_PREFIX)
    console.error('ESLint errors or warnings detected:')
    console.error(eslintCheck.output)
    console.error(ENFORCEMENT_MESSAGE)
    hasViolations = true
  }
  
  // Check TypeScript
  const tsCheck = checkTypeScriptWarnings()
  if (tsCheck.hasErrors || tsCheck.hasWarnings) {
    console.error(ERROR_PREFIX)
    console.error('TypeScript errors or warnings detected:')
    console.error(tsCheck.output)
    console.error(ENFORCEMENT_MESSAGE)
    hasViolations = true
  }
  
  // Check for console.error and console.warn in source code
  const consoleIssues = checkConsoleErrorsInSource()
  if (consoleIssues.length > 0) {
    console.error(ERROR_PREFIX)
    console.error('Console errors/warnings found in source code:')
    consoleIssues.forEach(issue => {
      console.error(`  ${issue.file}: ${issue.count} console.${issue.type} call(s)`)
    })
    console.error('\n⚠️  NOTE: console.error() and console.warn() must be removed from source code')
    console.error('    Use Logger utility instead: import Logger from "@/utils/logger"')
    console.error(ENFORCEMENT_MESSAGE)
    hasViolations = true
  }
  
  if (hasViolations) {
    console.error('\n🚨 VALIDATION FAILED: Errors or warnings detected!')
    console.error('🔒 ENFORCEMENT: ALL errors and warnings must be fixed - ZERO TOLERANCE')
    process.exit(1)
  }
  
  console.log('✅ No errors or warnings detected')
  console.log('✅ ZERO ERRORS/WARNINGS POLICY - COMPLIANT')
  console.log('\n==================================================\n')
  return true
}

main()

