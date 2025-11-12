#!/usr/bin/env node

/**
 * Rule 12 Validation: AI AGENTS CANNOT SKIP OR BYPASS ANY VALIDATION CHECKS
 * 
 * This script validates that no validation checks have been skipped, commented out,
 * or disabled in pre-commit hooks or validation scripts.
 * 
 * Rule 12: AI AGENTS CANNOT SKIP OR BYPASS ANY VALIDATION CHECKS - ABSOLUTE PROHIBITION
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('\n🚀 Rule 12: AI Agents Cannot Skip or Bypass Any Validation Checks');
console.log('==================================================\n');

let hasViolations = false;

const SKIP_PATTERNS = [
  /skip.*validation/i,
  /temporarily.*disabled/i,
  /temporarily.*skip/i,
  /#.*skip/i,
  /\/\/.*skip.*check/i,
  /\/\*.*skip.*check.*\*\//i,
  /bypass.*validation/i,
  /disable.*validation/i,
  /comment.*out.*validation/i,
  /skip.*step/i,
  /skip.*check/i
];

/**
 * Check for skipped validation in a file
 */
function checkFileForSkips(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Skip comment-only lines or empty lines
      if (!trimmedLine || trimmedLine.startsWith('//') || trimmedLine.startsWith('#')) {
        // Check for commented-out validation commands (actual skipping)
        if ((trimmedLine.includes('# echo') || trimmedLine.includes('// echo')) &&
            (trimmedLine.includes('Step') || trimmedLine.includes('validation') || trimmedLine.includes('npm run'))) {
          console.log(`⚠️  ${filePath}:${index + 1}: Validation check commented out`);
          console.log(`   Line: ${trimmedLine}`);
          console.log(`   Recommendation: Remove commented-out validation, keep all checks active`);
          hasViolations = true;
          return true;
        }
        
        // Check for "temporarily disabled" comments
        if (trimmedLine.toLowerCase().includes('temporarily') && 
            (trimmedLine.toLowerCase().includes('disabled') || trimmedLine.toLowerCase().includes('skip'))) {
          console.log(`⚠️  ${filePath}:${index + 1}: Temporary skip/disable detected`);
          console.log(`   Line: ${trimmedLine}`);
          console.log(`   Recommendation: Remove temporary skip, fix issues instead`);
          hasViolations = true;
          return true;
        }
        
        // Skip other comments
        return;
      }
      
      // Check for actual skipped validation commands (not in comments)
      // Only flag if line contains "skip" AND looks like it's actually skipping a validation
      // (not just a validation name or description)
      const hasSkipPattern = /skip|bypass|disable/i.test(trimmedLine);
      
      if (hasSkipPattern) {
        // Exclude legitimate use cases:
        // - Error messages about skipping
        // - Validation names (validate-no-skip-checks, validate-no-bypass)
        // - Environment variable checks for bypass detection
        // - Descriptive text about validations (like "Running no eslint-disable validation")
        const isLegitimate = 
          trimmedLine.includes('❌') || 
          trimmedLine.includes('⚠️') || 
          trimmedLine.includes('ERROR') ||
          trimmedLine.includes('FORBIDDEN') ||
          trimmedLine.includes('PROHIBITED') ||
          trimmedLine.includes('CANNOT SKIP') ||
          trimmedLine.includes('must not skip') ||
          trimmedLine.includes('should not skip') ||
          trimmedLine.includes('validate-no-skip') ||
          trimmedLine.includes('validate-no-bypass') ||
          trimmedLine.includes('$SKIP_') ||
          trimmedLine.includes('HUSKY_SKIP_HOOKS') ||
          trimmedLine.includes('Running no ') || // "Running no X validation" is descriptive, not skipping
          trimmedLine.includes('REQUIRED:') || // Instructions are legitimate
          (trimmedLine.startsWith('echo') && !trimmedLine.includes('skip validation') && !trimmedLine.includes('bypass validation'));
        
        // Only flag if it looks like actual validation skipping:
        // - Commented out validation commands (# npm run validate or # echo "Step X")
        // - Commands that explicitly skip steps (skip step X, skip check)
        // Exclude documentation comments (lines starting with * in multi-line comments)
        const isDocComment = trimmedLine.startsWith('*') && 
                             (trimmedLine.includes('have not been') || 
                              trimmedLine.includes('This script') ||
                              trimmedLine.includes('validates that'));
        
        if (!isLegitimate && !isDocComment &&
            (trimmedLine.includes('skip step') || 
             trimmedLine.includes('skip check') ||
             trimmedLine.includes('skip validation') ||
             trimmedLine.includes('bypass validation') ||
             (trimmedLine.includes('#') && trimmedLine.includes('npm run') && trimmedLine.includes('validate')))) {
          console.log(`⚠️  ${filePath}:${index + 1}: Validation skip detected`);
          console.log(`   Line: ${trimmedLine}`);
          console.log(`   Recommendation: Remove skip/disable patterns, fix issues instead`);
          hasViolations = true;
          return true;
        }
      }
    });
  } catch (error) {
    // File read error - continue checking other files
    return false;
  }
  
  return false;
}

// Check pre-commit hook
console.log('📋 Checking pre-commit hook for skipped validations...');
checkFileForSkips('.husky/pre-commit');

// Check all validation scripts
console.log('📋 Checking validation scripts for skipped validations...');
const validationScripts = [
  'scripts/validate-file-extensions.cjs',
  'scripts/validate-presentational-components.cjs',
  'scripts/validate-reusability.cjs',
  'scripts/validate-no-eslint-disable.cjs',
  'scripts/validate-no-bypass.cjs',
  'scripts/validate-no-config-mods.cjs',
  'scripts/validate-src-coverage.cjs',
  'scripts/validate-port.cjs'
];

validationScripts.forEach(script => {
  checkFileForSkips(script);
});

// Check package.json scripts for any skip patterns
console.log('📋 Checking package.json scripts for skipped validations...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const scripts = packageJson.scripts || {};
  
  Object.entries(scripts).forEach(([scriptName, scriptCommand]) => {
    if (typeof scriptCommand === 'string') {
      // Only flag scripts that actually skip validation (not script names with "skip")
      // Skip script names like "validate-no-skip-checks" as they're legitimate
      if (!scriptName.includes('no-skip') && !scriptName.includes('no-bypass')) {
        for (const pattern of SKIP_PATTERNS) {
          if (pattern.test(scriptCommand) && 
              !scriptCommand.includes('FORBIDDEN') &&
              !scriptCommand.includes('PROHIBITED') &&
              !scriptCommand.includes('validate-no-skip') &&
              !scriptCommand.includes('validate-no-bypass')) {
            // Only flag if command explicitly skips validation (not just contains the word "skip")
            // Look for patterns like "skip step", "skip check", "skip validation", or commented-out commands
            if (scriptCommand.includes('# npm run') || 
                scriptCommand.includes('# node scripts') ||
                scriptCommand.match(/\bskip\s+(step|check|validation)/i)) {
              console.log(`⚠️  package.json: Script "${scriptName}" appears to skip validation`);
              console.log(`   Command: ${scriptCommand}`);
              console.log(`   Recommendation: Remove skip patterns from script`);
              hasViolations = true;
            }
          }
        }
      }
    }
  });
} catch (error) {
  // Error reading package.json - continue
}

if (hasViolations) {
  console.log('\n❌ Rule 12 violations found!');
  console.log('   AI agents CANNOT skip or bypass any validation checks.');
  console.log('   ALL validation checks must remain active at all times.');
  console.log('   Fix issues instead of skipping validations.');
  console.log('\n==================================================\n');
  process.exit(1);
}

console.log('✅ No validation skip/bypass patterns detected');
console.log('✅ All validation checks remain active');
console.log('✅ Rule 12 compliance verified');
console.log('\n==================================================\n');
process.exit(0);

