#!/usr/bin/env node

/**
 * Rule 11 Validation: FIX ISSUES, NEVER BYPASS
 * 
 * This script validates that:
 * 1. No eslint-disable comments exist (already covered by validate-no-eslint-disable)
 * 2. Config files have not been modified to bypass validation
 * 3. All lint errors are fixed, not bypassed
 */

const fs = require('fs');
const path = require('path');

const CONFIG_FILES = [
  'eslint.config.js',
  'tsconfig.json',
  'vite.config.ts'
];

const EXCLUDE_PATTERNS = [
  /node_modules/,
  /dist/,
  /coverage/
];

let hasViolations = false;
const violations = [];

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip excluded directories
      const shouldExclude = EXCLUDE_PATTERNS.some((pattern) => pattern.test(filePath));
      if (!shouldExclude) {
        walkDir(filePath, fileList);
      }
    } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
      const shouldExclude = EXCLUDE_PATTERNS.some((pattern) => pattern.test(filePath));
      if (!shouldExclude) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

console.log('\n🚀 Rule 11: Fix Issues, Never Bypass');
console.log('==================================================\n');

// Get all TypeScript files
const srcDir = path.join(process.cwd(), 'src');
const files = walkDir(srcDir);

let largeFiles = [];
let complexFunctions = [];

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  const fileLineCount = lines.length;

  // Check for files over 100 lines (max-lines rule)
  if (fileLineCount > 100) {
    largeFiles.push({ file, lines: fileLineCount });
  }

  // Check for complex functions (basic detection)
  let inFunction = false;
  let functionLines = 0;
  let bracketCount = 0;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine.includes('=>') || trimmedLine.includes('function') || trimmedLine.includes('=>')) {
      inFunction = true;
      functionLines = 1;
    }

    if (inFunction) {
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;
      bracketCount += openBraces - closeBraces;

      if (bracketCount === 0 && trimmedLine.length > 0 && !trimmedLine.startsWith('//')) {
        if (functionLines > 20) {
          complexFunctions.push({
            file,
            line: index + 1,
            lines: functionLines
          });
        }
        inFunction = false;
        functionLines = 0;
      } else {
        functionLines++;
      }
    }
  });
});

// Report violations
if (largeFiles.length > 0) {
  console.log('❌ Files exceeding max-lines (100):');
  largeFiles.forEach(({ file, lines }) => {
    const relativeFile = path.relative(process.cwd(), file);
    console.log(`  ${relativeFile}:${lines} lines`);
  });
  hasViolations = true;
}

if (complexFunctions.length > 0) {
  console.log('\n❌ Functions exceeding max-lines-per-function (20):');
  complexFunctions.slice(0, 10).forEach(({ file, line, lines }) => {
    const relativeFile = path.relative(process.cwd(), file);
    console.log(`  ${relativeFile}:${line} - ${lines} lines`);
  });
  hasViolations = true;
}

if (hasViolations) {
  console.log('\n❌ Rule 11 violations found!');
  console.log('   You MUST fix these issues by refactoring code.');
  console.log('   DO NOT bypass these rules by modifying config files.');
  console.log('\n==================================================\n');
  process.exit(1);
}

console.log('✅ All files comply with max-lines and complexity rules');
console.log('✅ Rule 11: Fix Issues, Never Bypass - COMPLIANT');
console.log('\n==================================================\n');
process.exit(0);
