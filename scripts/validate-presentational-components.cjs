#!/usr/bin/env node

/**
 * Presentational Components Validation Script
 * Ensures components are presentational only and business logic is in hooks
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
const EXCLUDED_COMPONENTS = [
  // No components excluded - all components are now presentational
] // Components that are allowed to have business logic

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

function validatePresentationalComponents() {
  const files = getAllFiles(SRC_DIR)
  const errors = []
  
  for (const file of files) {
    const ext = extname(file)
    
    if (ext === '.tsx' && !file.includes('test') && !EXCLUDED_COMPONENTS.includes(file)) {
      const content = require('fs').readFileSync(file, 'utf8')
      
      // Check for business logic in components
      const businessLogicPatterns = [
        /fetch\(/g,
        /axios\./g,
        /localStorage\./g,
        /sessionStorage\./g,
        /JSON\.parse/g,
        /JSON\.stringify/g,
        /Date\./g,
        /Math\./g,
        /console\.(log|error|warn|info)/g
      ]
      
      for (const pattern of businessLogicPatterns) {
        if (pattern.test(content)) {
          errors.push(`❌ Component ${file} contains business logic. Move to custom hook.`)
          break
        }
      }
      
      // Check for direct state management (should be in hooks)
      // Allow useState in modal components (they are internal to presentational components)
      if (content.includes('useState') && !content.includes('// Custom hook') && !content.includes('Modal')) {
        errors.push(`❌ Component ${file} uses useState directly. Move to custom hook.`)
      }
      
      if (content.includes('useEffect') && !content.includes('// Custom hook')) {
        errors.push(`❌ Component ${file} uses useEffect directly. Move to custom hook.`)
      }
    }
  }
  
  if (errors.length > 0) {
    console.error('🚨 PRESENTATIONAL COMPONENTS VALIDATION FAILED:')
    errors.forEach(error => console.error(error))
    console.error('\n📋 PRESENTATIONAL COMPONENTS RULES:')
    console.error('- Components must be presentational only')
    console.error('- All business logic must be in custom hooks')
    console.error('- No direct state management in components')
    console.error('- No data fetching in components')
    process.exit(1)
  }
  
  console.log('✅ Presentational components validation passed')
}

validatePresentationalComponents()
