#!/usr/bin/env node
/**
 * Validates that --no-verify flag is never used in git commits
 * This is an ABSOLUTE PROHIBITION - NO EXCEPTIONS
 * Rule: --no-verify is FORBIDDEN at all costs
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ERROR_PREFIX = '❌ CRITICAL ERROR: --no-verify flag detected!'
const ENFORCEMENT_MESSAGE = `
🔒 ABSOLUTE PROHIBITION: --no-verify is FORBIDDEN
📋 ZERO TOLERANCE: No exceptions allowed
🚫 VIOLATION: Using --no-verify bypasses all validation checks
✅ REQUIRED: Fix all issues and commit without --no-verify
⚠️  RULE VIOLATION: This violates the ZERO TOLERANCE POLICY
`

function checkGitHistory() {
  try {
    // Check recent commit messages for --no-verify mentions
    const recentCommits = execSync('git log --oneline -10', { encoding: 'utf-8' })
    if (recentCommits.includes('--no-verify') || recentCommits.includes('no-verify')) {
      console.error(ERROR_PREFIX)
      console.error('Found --no-verify in recent commit history')
      console.error(ENFORCEMENT_MESSAGE)
      return false
    }
  } catch (error) {
    // Git might not be initialized or no commits yet
    // This is okay, we'll continue with other checks
  }
  return true
}

function checkPreCommitHook() {
  const hookPath = path.join(process.cwd(), '.husky', 'pre-commit')
  if (fs.existsSync(hookPath)) {
    const hookContent = fs.readFileSync(hookPath, 'utf-8')
    
    // Check if hook has --no-verify bypass logic (should not exist)
    if (hookContent.includes('--no-verify') && !hookContent.includes('prevent') && !hookContent.includes('block')) {
      console.error(ERROR_PREFIX)
      console.error('Pre-commit hook contains --no-verify bypass logic')
      console.error(ENFORCEMENT_MESSAGE)
      return false
    }
  }
  return true
}

function checkScripts() {
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    const scripts = packageJson.scripts || {}
    
    // Check all scripts for --no-verify usage
    for (const [scriptName, scriptContent] of Object.entries(scripts)) {
      if (typeof scriptContent === 'string' && scriptContent.includes('--no-verify')) {
        console.error(ERROR_PREFIX)
        console.error(`Found --no-verify in npm script: ${scriptName}`)
        console.error(ENFORCEMENT_MESSAGE)
        return false
      }
    }
  }
  return true
}

function checkEnvironmentVariables() {
  // Check for any environment variables that might bypass hooks
  const bypassVars = ['GIT_COMMIT_NO_VERIFY', 'SKIP_GIT_HOOKS', 'BYPASS_PRE_COMMIT']
  for (const varName of bypassVars) {
    if (process.env[varName]) {
      console.error(ERROR_PREFIX)
      console.error(`Bypass environment variable detected: ${varName}`)
      console.error(ENFORCEMENT_MESSAGE)
      return false
    }
  }
  return true
}

function main() {
  console.log('🔍 Checking for --no-verify usage...')
  
  let allChecksPassed = true
  
  if (!checkGitHistory()) allChecksPassed = false
  if (!checkPreCommitHook()) allChecksPassed = false
  if (!checkScripts()) allChecksPassed = false
  if (!checkEnvironmentVariables()) allChecksPassed = false
  
  if (!allChecksPassed) {
    console.error('\n🚨 VALIDATION FAILED: --no-verify usage detected!')
    console.error('🔒 ENFORCEMENT: All checks must pass - --no-verify is FORBIDDEN')
    process.exit(1)
  }
  
  console.log('✅ No --no-verify usage detected')
  return true
}

main()

