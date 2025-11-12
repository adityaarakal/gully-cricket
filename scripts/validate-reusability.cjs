#!/usr/bin/env node

/**
 * Code Reusability Validation Script
 * Ensures maximum code reuse and no duplicate implementations
 * 
 * 🔒 LOCKED SCRIPT - AI AGENT PROTECTION 🔒
 * ⚠️ CRITICAL: This script is LOCKED and protected from AI agent modifications ⚠️
 * 
 * - Document Status: LOCKED - Requires explicit human permission to modify
 * - AI Agent Policy: NO UNAUTHORIZED UPDATES ALLOWED
 * - Modification Process: Must request explicit permission from script owner
 * - Enforcement: All validation workflows depend on this script
 * - Version Control: All changes must be tracked and approved
 * 
 * DO NOT MODIFY WITHOUT EXPLICIT PERMISSION
 */

const { readdirSync, statSync } = require('fs')
const { join, extname } = require('path')

const SRC_DIR = 'src'
const EXCLUDED_FILES = [
  // No files excluded - all services now use generic BaseService pattern
] // Files that are allowed to have duplicate patterns

function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir)
  
  for (const file of files) {
    const filePath = join(dir, file)
    const stat = statSync(filePath)
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList)
    } else {
      fileList.push(filePath)
    }
  }
  
  return fileList
}

function validateCodeReusability() {
  const files = getAllFiles(SRC_DIR)
  const errors = []
  const functionSignatures = new Map()
  
  for (const file of files) {
    const ext = extname(file)
    
    if (ext === '.ts' && !file.includes('test') && !EXCLUDED_FILES.includes(file)) {
      const content = require('fs').readFileSync(file, 'utf8')
      
      // Extract function signatures
      const functionRegex = /(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?(?:\([^)]*\)\s*=>|function))/g
      let match
      
      while ((match = functionRegex.exec(content)) !== null) {
        const functionName = match[1] || match[2]
        if (functionName) {
          if (!functionSignatures.has(functionName)) {
            functionSignatures.set(functionName, [])
          }
          functionSignatures.get(functionName).push(file)
        }
      }
      
      // Check for duplicate utility functions
      const utilityPatterns = [
        /formatDate/g,
        /formatCurrency/g,
        /validateEmail/g,
        /debounce/g,
        /throttle/g,
        /capitalize/g,
        /isEmpty/g
      ]
      
      for (const pattern of utilityPatterns) {
        if (pattern.test(content)) {
          const matches = content.match(pattern)
          if (matches) {
            const functionName = matches[0]
            if (!functionSignatures.has(functionName)) {
              functionSignatures.set(functionName, [])
            }
            functionSignatures.get(functionName).push(file)
          }
        }
      }
    }
  }
  
  // Check for duplicate function implementations
  for (const [functionName, fileList] of functionSignatures) {
    if (fileList.length > 1) {
      // Check if this is a shared utility function (should be allowed to exist in multiple files)
      const isSharedUtility = fileList.some(file => file.includes('src/shared'))
      
      if (!isSharedUtility) {
        errors.push(`❌ Function '${functionName}' is duplicated in: ${fileList.join(', ')}. Extract to shared utility.`)
      }
    }
  }
  
  // Check for common patterns that should be reusable
  const commonPatterns = [
    { pattern: /const\s+\w+\s*=\s*useState/g, message: 'State management should be in reusable hooks' },
    { pattern: /const\s+\w+\s*=\s*useEffect/g, message: 'Side effects should be in reusable hooks' },
    { pattern: /fetch\(/g, message: 'Data fetching should be in reusable hooks' }
  ]
  
  for (const file of files) {
    const ext = extname(file)
    if (ext === '.tsx' && !file.includes('test')) {
      const content = require('fs').readFileSync(file, 'utf8')
      
      for (const { pattern, message } of commonPatterns) {
        if (pattern.test(content)) {
          errors.push(`❌ ${file}: ${message}`)
        }
      }
    }
  }
  
  if (errors.length > 0) {
    console.error('🚨 CODE REUSABILITY VALIDATION FAILED:')
    errors.forEach(error => console.error(error))
    console.error('\n📋 REUSABILITY RULES:')
    console.error('- Extract common functionality to utilities')
    console.error('- Create reusable hooks for common logic')
    console.error('- Build shared components for repeated patterns')
    console.error('- No duplicate implementations allowed')
    process.exit(1)
  }
  
  console.log('✅ Code reusability validation passed')
}

validateCodeReusability()
