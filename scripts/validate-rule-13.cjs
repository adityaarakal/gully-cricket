#!/usr/bin/env node

/**
 * Rule 13 Validation: ALL VALIDATIONS MUST PASS - NO EXCEPTIONS - NOT EVEN WITH USER PERMISSION
 * 
 * This script validates that:
 * 1. ALL validation checks remain active - no exceptions
 * 2. User permission does NOT allow skipping validations
 * 3. No validations are skipped, even with permission markers
 * 4. All pre-commit validations must pass
 * 5. All PR workflow validations must pass
 * 
 * Rule 13: ALL VALIDATIONS MUST PASS - NO EXCEPTIONS - NOT EVEN WITH USER PERMISSION
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('\n🚀 Rule 13: All Validations Must Pass - No Exceptions - Not Even With User Permission');
console.log('==================================================\n');

let hasViolations = false;

/**
 * Check pre-commit hook for any validation skips or bypasses
 */
function checkPreCommitHook() {
  const hookPath = '.husky/pre-commit';
  if (!fs.existsSync(hookPath)) {
    console.log('⚠️  Pre-commit hook not found');
    hasViolations = true;
    return;
  }

  const content = fs.readFileSync(hookPath, 'utf-8');
  const lines = content.split('\n');
  
  // Check for any patterns that might allow skipping validations
  const skipPatterns = [
    /skip.*validation/i,
    /bypass.*validation/i,
    /temporarily.*disabled/i,
    /#.*skip/i,
    /\/\/.*skip/i,
    /skip.*step/i,
    /if.*permission.*skip/i,
    /if.*user.*skip/i,
    /permission.*allow.*skip/i,
    /user.*can.*skip/i
  ];

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Exclude comments and legitimate messages about NOT allowing skips
    const isLegitimateMessage = 
      trimmedLine.includes('❌') ||
      trimmedLine.includes('⚠️') ||
      trimmedLine.includes('ERROR') ||
      trimmedLine.includes('FORBIDDEN') ||
      trimmedLine.includes('PROHIBITED') ||
      trimmedLine.includes('CANNOT SKIP') ||
      trimmedLine.includes('DOES NOT ALLOW') ||
      trimmedLine.includes('NOT ALLOW') ||
      trimmedLine.includes('validate-no-skip') ||
      trimmedLine.includes('validate-no-bypass') ||
      trimmedLine.startsWith('echo') && (
        trimmedLine.includes('Running no ') ||
        trimmedLine.includes('REQUIRED:') ||
        trimmedLine.includes('PROHIBITED') ||
        trimmedLine.includes('FORBIDDEN')
      );
    
    if (isLegitimateMessage) {
      return; // Skip legitimate messages
    }
    
    // Check if this line suggests skipping validations
    for (const pattern of skipPatterns) {
      if (pattern.test(trimmedLine)) {
        // Only flag if it looks like actual skip logic (not error messages)
        if (trimmedLine.includes('skip') && 
            !trimmedLine.includes('DOES NOT') &&
            !trimmedLine.includes('CANNOT') &&
            !trimmedLine.includes('PROHIBITED') &&
            (trimmedLine.includes('#') || trimmedLine.includes('if ') || trimmedLine.includes('npm run'))) {
          console.log(`⚠️  ${hookPath}:${index + 1}: Validation skip pattern detected`);
          console.log(`   Line: ${trimmedLine}`);
          console.log(`   Recommendation: Remove skip/disable patterns - Rule 13 requires ALL validations to pass`);
          hasViolations = true;
          return;
        }
      }
    }
    
    // Specifically check for permission-based skip patterns (but exclude messages saying permission doesn't allow it)
    if ((trimmedLine.includes('permission') || trimmedLine.includes('PERMISSION')) &&
        (trimmedLine.includes('skip') || trimmedLine.includes('bypass') || trimmedLine.includes('allow')) &&
        !trimmedLine.includes('DOES NOT ALLOW') &&
        !trimmedLine.includes('NOT ALLOW') &&
        !trimmedLine.includes('PROHIBITED') &&
        !trimmedLine.includes('FORBIDDEN')) {
      // Only flag if it's actual code/logic (not echo messages explaining the rule)
      if (trimmedLine.includes('#') || trimmedLine.includes('if ') || trimmedLine.includes('npm run')) {
        console.log(`⚠️  ${hookPath}:${index + 1}: Permission-based skip pattern detected`);
        console.log(`   Line: ${trimmedLine}`);
        console.log(`   Recommendation: Rule 13 prohibits skipping validations even with user permission`);
        hasViolations = true;
      }
    }
  });
}

/**
 * Check validation scripts for any skip patterns
 */
function checkValidationScripts() {
  const scriptsDir = 'scripts';
  if (!fs.existsSync(scriptsDir)) {
    return;
  }

  const scripts = fs.readdirSync(scriptsDir).filter(file => 
    file.endsWith('.cjs') && file.startsWith('validate-')
  );

  scripts.forEach(scriptFile => {
    const scriptPath = `${scriptsDir}/${scriptFile}`;
    const content = fs.readFileSync(scriptPath, 'utf-8');
    
    // Check for permission-based skip patterns, but exclude:
    // - Rule 10 validation script (it's about config modifications, not validation skipping)
    // - Documentation comments explaining rules
    // - Messages saying permission doesn't allow skipping
    if (scriptFile === 'validate-no-config-mods.cjs') {
      // This is about config file modifications requiring permission, not about skipping validations
      return;
    }
    
    // Only flag if it's actual skip logic, not documentation
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('permission') && 
          (line.includes('skip') || line.includes('bypass')) &&
          !line.includes('DOES NOT ALLOW') &&
          !line.includes('PROHIBITED') &&
          !line.includes('FORBIDDEN') &&
          !line.includes('CANNOT') &&
          !line.trim().startsWith('//') &&
          !line.trim().startsWith('*') &&
          (line.includes('if ') || line.includes('if(') || line.includes('return') || line.includes('exit'))) {
        console.log(`⚠️  ${scriptPath}:${index + 1}: Contains permission-based skip logic`);
        console.log(`   Line: ${line.trim()}`);
        console.log(`   Recommendation: Rule 13 prohibits skipping validations even with permission`);
        hasViolations = true;
      }
    });
  });
}

/**
 * Verify all required validations are present and active
 */
function verifyRequiredValidations() {
  const hookPath = '.husky/pre-commit';
  if (!fs.existsSync(hookPath)) {
    return;
  }

  const content = fs.readFileSync(hookPath, 'utf-8');
  
  const requiredValidations = [
    'npm run lint',
    'npm run type-check',
    'npm run validate:',
    'npm run test',
    'npm run build'
  ];

  const missingValidations = [];

  requiredValidations.forEach(validation => {
    if (!content.includes(validation)) {
      missingValidations.push(validation);
    }
  });

  if (missingValidations.length > 0) {
    console.log('⚠️  Missing required validations in pre-commit hook:');
    missingValidations.forEach(validation => {
      console.log(`   - ${validation}`);
    });
    hasViolations = true;
  }
}

// Run all checks
console.log('📋 Checking pre-commit hook for Rule 13 compliance...');
checkPreCommitHook();

console.log('\n📋 Checking validation scripts for Rule 13 compliance...');
checkValidationScripts();

console.log('\n📋 Verifying all required validations are present and active...');
verifyRequiredValidations();

if (hasViolations) {
  console.log('\n❌ Rule 13 violations found!');
  console.log('   ALL validations MUST pass - NO EXCEPTIONS');
  console.log('   User permission DOES NOT allow skipping validations');
  console.log('   All checks must be active and must pass before commit');
  console.log('   Fix issues instead of skipping validations');
  console.log('\n==================================================\n');
  process.exit(1);
}

console.log('\n✅ All validations are active and required');
console.log('✅ No permission-based skip patterns detected');
console.log('✅ Rule 13 compliance verified - ALL validations must pass');
console.log('\n==================================================\n');
process.exit(0);

