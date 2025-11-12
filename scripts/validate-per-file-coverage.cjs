#!/usr/bin/env node

/**
 * Per-File Coverage Validation Script
 * Ensures EACH file has 80% test coverage across all 4 metrics (statements, functions, branches, lines)
 * 
 * Rule 3: 80% PER-FILE UNIT TEST COVERAGE - MANDATORY FOR EACH FILE
 * - EVERY file in `src` must have unit tests with 80% minimum coverage
 * - Coverage checked for: statements, functions, branches, lines
 * - Zero tolerance for any file below 80% on any metric
 * 
 * 🔒 LOCKED SCRIPT - AI AGENT PROTECTION 🔒
 * ⚠️ CRITICAL: This script is LOCKED and protected from AI agent modifications ⚠️
 */

const { execSync } = require('child_process');
const { readdirSync, statSync, readFileSync } = require('fs');
const { join, extname, relative } = require('path');

const SRC_DIR = 'src';
const REQUIRED_COVERAGE = 80; // 80% minimum for each metric
const METRICS = ['statements', 'functions', 'branches', 'lines'];

/**
 * Check if file should be excluded from coverage validation
 */
function shouldExcludeFile(filePath, fileName) {
  // Exclude test files
  if (fileName.includes('.test.') || fileName.includes('.spec.')) {
    return true;
  }
  
  // Exclude setup and entry files
  if (fileName.includes('setupTests') || fileName === 'main.tsx') {
    return true;
  }
  
  // Exclude files in __tests__ directories (test helpers, mocks)
  if (filePath.includes('/__tests__/') || filePath.includes('\\__tests__\\')) {
    return true;
  }
  
  // Exclude mock and helper files
  if (fileName.toLowerCase().includes('mock') || 
      fileName.toLowerCase().includes('helper') ||
      fileName.startsWith('mock') ||
      fileName.startsWith('helper')) {
    return true;
  }
  
  // NOTE: We do NOT exclude placeholder/ComingSoon pages
  // ALL files must have 80% coverage as per Rule 3
  // Even simple wrapper components need tests
  
  return false;
}

/**
 * Get all source files in src directory
 */
function getAllSourceFiles(dir, fileList = [], baseDir = dir) {
  const files = readdirSync(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllSourceFiles(filePath, fileList, baseDir);
    } else {
      const ext = extname(file);
      // Include TypeScript/TSX files, exclude test files and config files
      if ((ext === '.ts' || ext === '.tsx') && !shouldExcludeFile(filePath, file)) {
        const relativePath = relative(baseDir, filePath);
        fileList.push({
          fullPath: filePath,
          relativePath: relativePath.replace(/\\/g, '/'),
          name: file
        });
      }
    }
  }
  
  return fileList;
}

/**
 * Parse Jest coverage from JSON report
 */
function parseCoverageFromJson() {
  const { readFileSync, existsSync } = require('fs');
  const { join } = require('path');
  
  // Try coverage-summary.json first, then coverage-final.json
  const coveragePaths = [
    join(process.cwd(), 'coverage', 'coverage-summary.json'),
    join(process.cwd(), 'coverage', 'coverage-final.json')
  ];
  
  let coverageData = null;
  let coveragePath = null;
  
  for (const path of coveragePaths) {
    if (existsSync(path)) {
      coveragePath = path;
      coverageData = JSON.parse(readFileSync(path, 'utf8'));
      break;
    }
  }
  
  if (!coverageData) {
    throw new Error(`Coverage JSON file not found. Tried: ${coveragePaths.join(', ')}`);
  }
  
  const fileCoverage = {};
  
  // coverage-final.json format is different - it has file paths as keys with nested structure
  // coverage-summary.json format:
  // {
  //   "total": { ... },
  //   "src/file.ts": { statements: {pct: 100}, branches: {pct: 100}, ... }
  // }
  
  for (const [filePath, coverage] of Object.entries(coverageData)) {
    // Skip total entry
    if (filePath === 'total') {
      continue;
    }
    
    // Only process files in src directory
    if (!filePath.includes('/src/') && !filePath.includes('\\src\\')) {
      continue;
    }
    
    // Normalize path - extract relative path from src/
    let normalizedPath = filePath;
    
    // Handle absolute paths (e.g., /Users/.../src/file.ts)
    const srcMatch = filePath.match(/[/\\]src[/\\](.+)$/);
    if (srcMatch) {
      normalizedPath = srcMatch[1];
    } else {
      // Handle relative paths (e.g., src/file.ts)
      normalizedPath = filePath.replace(/^src[/\\]/, '').replace(/^\.\.\/\.\.\/src[/\\]/, '');
    }
    
    // Normalize separators
    normalizedPath = normalizedPath.replace(/\\/g, '/');
    
    if (coverage && typeof coverage === 'object') {
      // Handle both formats: {statements: {pct: 100}} and {statements: 100}
      const getPct = (metric) => {
        if (typeof metric === 'number') return metric;
        if (metric && typeof metric === 'object' && 'pct' in metric) return metric.pct;
        return 0;
      };
      
      fileCoverage[normalizedPath] = {
        statements: getPct(coverage.statements),
        branches: getPct(coverage.branches),
        functions: getPct(coverage.functions),
        lines: getPct(coverage.lines),
        fullPath: filePath
      };
    }
  }
  
  return fileCoverage;
}

/**
 * Validate per-file coverage
 */
function validatePerFileCoverage() {
  console.log('');
  console.log('🚀 Rule 3: 80% PER-FILE Unit Test Coverage - Mandatory for EACH File');
  console.log('==================================================');
  console.log('');
  console.log('📋 Checking 80% test coverage for EACH file individually...');
  console.log('📋 Metrics: statements, functions, branches, lines');
  console.log('📋 Minimum required: 80% for EACH metric in EACH file');
  console.log('');

  try {
    // Get all source files
    const sourceFiles = getAllSourceFiles(SRC_DIR);
    
    // Run jest with coverage (generates JSON report)
    execSync('npm run test:coverage', { 
      encoding: 'utf8',
      stdio: 'inherit'
    });

    // Parse coverage from JSON report (more reliable than text parsing)
    const coverage = parseCoverageFromJson();
    
    // Create a lookup map for coverage data (normalize all paths for matching)
    const coverageLookup = {};
    for (const [coveragePath, coverageData] of Object.entries(coverage)) {
      // Normalize coverage path to match source file relative paths
      const normalized = coveragePath
        .replace(/^.*[/\\]src[/\\]/, '')
        .replace(/\\/g, '/')
        .replace(/^\//, '');
      coverageLookup[normalized] = coverageData;
      
      // Also store with absolute path and other variations for lookup
      coverageLookup[coveragePath] = coverageData;
    }
    
    // Check each source file
    const violations = [];
    
    for (const file of sourceFiles) {
      // Try multiple path variations to find coverage data
      let fileCoverage = coverageLookup[file.relativePath];
      
      // Try with different path formats
      if (!fileCoverage) {
        fileCoverage = coverageLookup[`/${file.relativePath}`];
      }
      if (!fileCoverage) {
        fileCoverage = coverageLookup[`src/${file.relativePath}`];
      }
      if (!fileCoverage) {
        // Try matching by filename at end of path
        for (const [path, data] of Object.entries(coverageLookup)) {
          if (path.endsWith(`/${file.name}`) || path.endsWith(`\\${file.name}`)) {
            fileCoverage = data;
            break;
          }
        }
      }
      
      if (!fileCoverage) {
        violations.push({
          file: file.relativePath,
          error: 'No coverage data found - file may be untested'
        });
        continue;
      }
      
      // Check each metric
      for (const metric of METRICS) {
        const value = fileCoverage[metric];
        if (value < REQUIRED_COVERAGE) {
          violations.push({
            file: file.relativePath,
            metric,
            actual: value,
            required: REQUIRED_COVERAGE
          });
        }
      }
    }
    
    if (violations.length > 0) {
      console.error('');
      console.error('❌ CRITICAL: Per-file coverage validation FAILED');
      console.error('❌ ZERO TOLERANCE POLICY ENFORCED');
      console.error('');
      console.error(`📋 Found ${violations.length} violation(s):`);
      console.error('');
      
      // Group by file for better readability
      const violationsByFile = {};
      for (const violation of violations) {
        if (!violationsByFile[violation.file]) {
          violationsByFile[violation.file] = [];
        }
        violationsByFile[violation.file].push(violation);
      }
      
      for (const [file, fileViolations] of Object.entries(violationsByFile)) {
        console.error(`  ❌ ${file}:`);
        for (const violation of fileViolations) {
          if (violation.error) {
            console.error(`     - ${violation.error}`);
          } else {
            console.error(`     - ${violation.metric}: ${violation.actual.toFixed(2)}% (required: ${violation.required}%)`);
          }
        }
        console.error('');
      }
      
      console.error('📋 REQUIREMENTS:');
      console.error('  - EVERY file must have 80% coverage for ALL metrics: statements, functions, branches, lines');
      console.error('  - Each metric is checked independently');
      console.error('  - Zero tolerance - no file can be below 80% on any metric');
      console.error('');
      console.error('🔒 ENFORCEMENT: Validation blocked');
      console.error('📋 REQUIRED: Write unit tests for files with insufficient coverage');
      console.error('📋 REQUIRED: Achieve 80% coverage for ALL metrics in ALL files before proceeding');
      console.error('');
      console.error('==================================================');
      console.error('');
      process.exit(1);
    }
    
    console.log('');
    console.log(`✅ All ${sourceFiles.length} files meet 80% coverage requirement`);
    console.log('✅ Per-file coverage validation passed');
    console.log('✅ Rule 3: 80% Per-File Unit Test Coverage - COMPLIANT');
    console.log('==================================================');
    console.log('');
    
  } catch (error) {
    // If jest failed, the error will be caught here
    console.error('');
    console.error('❌ CRITICAL: Test coverage execution failed');
    console.error('❌ Error:', error.message);
    console.error('');
    console.error('📋 REQUIREMENTS:');
    console.error('  - Tests must pass');
    console.error('  - Coverage data must be generated');
    console.error('  - Each file must have 80% coverage for all metrics');
    console.error('');
    console.error('🔒 ENFORCEMENT: Validation blocked');
    console.error('==================================================');
    console.error('');
    process.exit(1);
  }
}

validatePerFileCoverage()

