#!/usr/bin/env node

/**
 * Rule 10 Validation: NO CONFIG FILE MODIFICATIONS WITHOUT PERMISSION
 * 
 * This script validates that config files have not been modified without proper authorization.
 * It checks for changes in critical config files and validates they were approved.
 */

const fs = require('fs');
const { execSync } = require('child_process');

const CONFIG_FILES = [
  'eslint.config.js',
  'tsconfig.json',
  'vite.config.ts',
  'package.json'
];

const VERIFICATION_MARKER = 'PERMISSION_GRANTED_BY_USER';

console.log('\n🚀 Rule 10: No Config File Modifications Without Permission');
console.log('==================================================\n');

let hasViolations = false;

function checkFileContent(file) {
  const content = fs.readFileSync(file, 'utf-8');
  
  // Check if file contains the verification marker
  if (!content.includes(VERIFICATION_MARKER)) {
    // Allow if file is not tracked or is in git
    try {
      const gitStatus = execSync(`git ls-files ${file}`, { encoding: 'utf-8' }).trim();
      if (!gitStatus) {
        // File not in git, skipping
        return false;
      }
    } catch (error) {
      // File not in git
      return false;
    }
    
    // Check if file has recent modifications
    try {
      const gitLog = execSync(`git log -1 --pretty=format:"%s" -- ${file}`, { encoding: 'utf-8' }).trim();
      const gitStatus = execSync(`git status --porcelain ${file}`, { encoding: 'utf-8' }).trim();
      
      if (gitStatus && !gitLog.includes(VERIFICATION_MARKER) && !gitLog.includes('permission') && !gitLog.includes('explicit')) {
        console.log(`⚠️  ${file}: Modified without explicit permission marker`);
        console.log(`   Commit message: ${gitLog}`);
        console.log(`   Recommendation: Add "${VERIFICATION_MARKER}" comment to commit message`);
        hasViolations = true;
        return true;
      }
    } catch (error) {
      // File not in git or other error
      return false;
    }
  }
  
  return false;
}

CONFIG_FILES.forEach((file) => {
  if (fs.existsSync(file)) {
    checkFileContent(file);
  }
});

// Additional check: look for common bypass patterns in commit messages
try {
  const recentCommits = execSync('git log -5 --pretty=format:"%s"', { encoding: 'utf-8' }).trim();
  const bypassPatterns = [
    /eslint-disable/i,
    /bypass/i,
    /relax.*rule/i,
    /increase.*max/i,
    /decrease.*limit/i,
    /workaround/i,
    /temporary.*fix/i,
    /adjust.*config/i
  ];
  
  bypassPatterns.forEach((pattern) => {
    if (pattern.test(recentCommits) && !recentCommits.includes(VERIFICATION_MARKER)) {
      const matches = recentCommits.match(new RegExp(`.*${pattern.source}.*`, 'gi'));
      if (matches) {
        matches.forEach((match) => {
          if (!match.includes('permission') && !match.includes('explicit') && !match.includes('user requested')) {
            console.log(`⚠️  Potential unauthorized config modification detected in commit message:`);
            console.log(`   "${match.trim()}"`);
            console.log(`   Add "${VERIFICATION_MARKER}" to commit message if this was approved`);
            hasViolations = true;
          }
        });
      }
    }
  });
} catch (error) {
  // Git not available or other error
}

if (hasViolations) {
  console.log('\n❌ Rule 10 violations found!');
  console.log('   Config files must not be modified without explicit user permission.');
  console.log(`   Include "${VERIFICATION_MARKER}" in commit message when modifying configs.`);
  console.log('\n==================================================\n');
  process.exit(1);
}

console.log('✅ All config files comply with Rule 10');
console.log('✅ No unauthorized config modifications detected');
console.log('\n==================================================\n');
process.exit(0);
