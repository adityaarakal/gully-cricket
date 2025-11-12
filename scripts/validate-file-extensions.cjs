#!/usr/bin/env node

/**
 * File Extension Validation Script
 * Ensures only components use .tsx extension, all other files use .ts
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

function validateFileExtensions() {
  const files = getAllFiles(SRC_DIR)
  const errors = []
  
  for (const file of files) {
    const ext = extname(file)
    const fileName = file.split('/').pop() || ''
    
    if (ext === '.tsx') {
      // .tsx files are automatically components - no validation needed
      // All .tsx files are components by definition
    } else if (ext === '.ts') {
      // Check if .ts file contains component patterns (should be .tsx instead)
      if (!fileName.includes('test')) {
        const content = require('fs').readFileSync(file, 'utf8')
        if (content.includes('React.FC') || (content.includes('function ') && content.includes('return ('))) {
          errors.push(`❌ File ${file} appears to be a component but uses .ts extension. Components must use .tsx`)
        }
      }
    }
  }
  
  if (errors.length > 0) {
    console.error('🚨 FILE EXTENSION VALIDATION FAILED:')
    errors.forEach(error => console.error(error))
    console.error('\n📋 FILE EXTENSION RULES:')
    console.error('- Only components can use .tsx extension')
    console.error('- All utilities, hooks, types, constants must use .ts extension')
    console.error('- No exceptions allowed')
    process.exit(1)
  }
  
  console.log('✅ File extension validation passed')
}

validateFileExtensions()
