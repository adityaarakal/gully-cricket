#!/usr/bin/env node

/**
 * Validate Rule 15: Continuous Execution
 * This script ensures AI agents are aware of Rule 15 requirements
 * It should be included in pre-commit hooks and CI/CD pipelines
 */

const fs = require('fs')
const path = require('path')

const DEVELOPMENT_STANDARDS_PATH = path.join(__dirname, '../docs/development/DEVELOPMENT_STANDARDS.md')

function validateRule15() {
  try {
    const content = fs.readFileSync(DEVELOPMENT_STANDARDS_PATH, 'utf8')
    
    // Check if Rule 15 is prominently displayed
    const hasRule15AtTop = content.includes('RULE 15: CONTINUOUS EXECUTION') && 
                           content.indexOf('RULE 15') < content.indexOf('RULE 1: ZERO ERRORS')
    
    const hasPriorityWarnings = content.includes('⚠️⚠️⚠️ RULE 15 PRIORITY')
    
    const hasContinuousExecutionChecklist = content.includes('Continuous Execution Checklist')
    
    const issues = []
    
    if (!hasRule15AtTop) {
      issues.push('ERROR: Rule 15 should be mentioned at the TOP of the document (before Rule 1)')
    }
    
    if (!hasPriorityWarnings) {
      issues.push('WARNING: Rule 15 priority warnings should be prominently displayed')
    }
    
    if (!hasContinuousExecutionChecklist) {
      issues.push('WARNING: Continuous Execution Checklist should exist')
    }
    
    if (issues.length > 0) {
      console.error('\n❌ Rule 15 Validation Failed:')
      issues.forEach(issue => console.error(`  - ${issue}`))
      console.error('\n⚠️  AI AGENTS: Rule 15 must be prominently displayed and enforced!\n')
      process.exit(1)
    }
    
    console.log('✅ Rule 15 validation passed - AI agents should be aware of continuous execution requirements')
    return true
  } catch (error) {
    console.error('❌ Error validating Rule 15:', error.message)
    process.exit(1)
  }
}

// Main execution
if (require.main === module) {
  validateRule15()
}

module.exports = { validateRule15 }

