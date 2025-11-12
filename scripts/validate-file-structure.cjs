#!/usr/bin/env node

/**
 * File and Folder Structure Validation Script (Rule 17)
 * Enforces hybrid component-based structure:
 * - Component-specific code co-located with components
 * - Shared code in type-based folders (hooks/, services/, types/)
 * - Tests co-located with source files
 * - Index.ts files where required
 * - Proper file naming conventions
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

const { readdirSync, statSync, existsSync, readFileSync } = require('fs')
const { join, extname, basename, dirname } = require('path')

const SRC_DIR = 'src'
const EXCLUDED_DIRS = ['node_modules', '.git', 'dist', 'coverage']

let hasViolations = false
const violations = []

/**
 * Check if a directory should be excluded from validation
 */
function isExcludedDir(dirPath) {
  const dirName = basename(dirPath)
  // Exclude root-level __tests__ but allow __tests__ subfolders within components
  if (dirName === '__tests__') {
    // Only exclude if it's at root level (src/__tests__)
    const parentDir = dirname(dirPath)
    return basename(parentDir) === 'src' || EXCLUDED_DIRS.includes(basename(parentDir))
  }
  return EXCLUDED_DIRS.includes(dirName) || dirName.startsWith('.')
}

/**
 * Get all directories recursively
 */
function getAllDirectories(dir, dirList = []) {
  if (isExcludedDir(dir)) {
    return dirList
  }
  
  try {
    const files = readdirSync(dir)
    
    for (const file of files) {
      const filePath = join(dir, file)
      const stat = statSync(filePath)
      
      if (stat.isDirectory() && !isExcludedDir(filePath)) {
        dirList.push(filePath)
        getAllDirectories(filePath, dirList)
      }
    }
  } catch (error) {
    // Skip directories that can't be read
  }
  
  return dirList
}

/**
 * Get all files recursively
 */
function getAllFiles(dir, fileList = []) {
  if (isExcludedDir(dir)) {
    return fileList
  }
  
  try {
    const files = readdirSync(dir)
    
    for (const file of files) {
      const filePath = join(dir, file)
      const stat = statSync(filePath)
      
      if (stat.isDirectory() && !isExcludedDir(filePath)) {
        getAllFiles(filePath, fileList)
      } else if (stat.isFile()) {
        fileList.push(filePath)
      }
    }
  } catch (error) {
    // Skip directories that can't be read
  }
  
  return fileList
}

/**
 * Check if file is a test file
 */
function isTestFile(filePath) {
  const fileName = basename(filePath)
  return fileName.includes('.test.') || fileName.includes('.spec.')
}

/**
 * Check if file is a component (tsx file)
 */
function isComponentFile(filePath) {
  return extname(filePath) === '.tsx' && !isTestFile(filePath)
}

/**
 * Check if directory is PascalCase (component naming)
 */
function isPascalCase(str) {
  return /^[A-Z][a-zA-Z0-9]*$/.test(str)
}

/**
 * Check if string is camelCase
 */
function isCamelCase(str) {
  return /^[a-z][a-zA-Z0-9]*$/.test(str)
}

/**
 * Check if index.ts exists in directory
 */
function hasIndexFile(dirPath) {
  return existsSync(join(dirPath, 'index.ts'))
}

/**
 * Validate domain structure
 */
function validateDomainStructure() {
  console.log('\n📋 Validating domain structure...')
  
  const domainsDir = join(SRC_DIR, 'domains')
  if (!existsSync(domainsDir)) {
    return
  }
  
  const domains = readdirSync(domainsDir).filter(item => {
    const itemPath = join(domainsDir, item)
    return statSync(itemPath).isDirectory() && !isExcludedDir(itemPath)
  })
  
  for (const domain of domains) {
    const domainPath = join(domainsDir, domain)
    
    // Check domain index.ts
    if (!hasIndexFile(domainPath)) {
      violations.push(`❌ Missing index.ts in domain: ${domainPath}`)
      hasViolations = true
    }
    
    // Validate components directory (only if it exists and has files)
    const componentsDir = join(domainPath, 'components')
    if (existsSync(componentsDir)) {
      try {
        const items = readdirSync(componentsDir)
        if (items.length > 0) {
          validateComponentsDirectory(componentsDir, domain)
        }
      } catch (error) {
        // Skip if directory can't be read
      }
    }
    
    // Validate shared hooks directory (only if it exists and has files)
    const hooksDir = join(domainPath, 'hooks')
    if (existsSync(hooksDir)) {
      try {
        const items = readdirSync(hooksDir)
        if (items.length > 0) {
          validateSharedHooksDirectory(hooksDir)
        }
      } catch (error) {
        // Skip if directory can't be read
      }
    }
    
    // Validate services directory (only if it exists and has files)
    const servicesDir = join(domainPath, 'services')
    if (existsSync(servicesDir)) {
      try {
        const items = readdirSync(servicesDir)
        if (items.length > 0) {
          validateServicesDirectory(servicesDir)
        }
      } catch (error) {
        // Skip if directory can't be read
      }
    }
    
    // Validate types directory (only if it exists and has files)
    const typesDir = join(domainPath, 'types')
    if (existsSync(typesDir)) {
      try {
        const items = readdirSync(typesDir)
        if (items.length > 0) {
          validateTypesDirectory(typesDir)
        }
      } catch (error) {
        // Skip if directory can't be read
      }
    }
  }
}

/**
 * Validate components directory structure
 */
function validateComponentsDirectory(componentsDir, domain) {
  // Check components index.ts
  if (!hasIndexFile(componentsDir)) {
    violations.push(`❌ Missing index.ts in components: ${componentsDir}`)
    hasViolations = true
  }
  
  const items = readdirSync(componentsDir)
  
  for (const item of items) {
    const itemPath = join(componentsDir, item)
    const stat = statSync(itemPath)
    
    if (stat.isDirectory() && item !== 'modals' && item !== 'shared') {
      // This should be a component directory (PascalCase)
      if (!isPascalCase(item)) {
        violations.push(`❌ Component directory must be PascalCase: ${itemPath}`)
        hasViolations = true
      }
      
      // Check for component file
      const componentFile = join(itemPath, `${item}.tsx`)
      if (!existsSync(componentFile)) {
        violations.push(`❌ Missing component file ${item}.tsx in: ${itemPath}`)
        hasViolations = true
      }
      
      // Check for index.ts
      if (!hasIndexFile(itemPath)) {
        violations.push(`❌ Missing index.ts in component directory: ${itemPath}`)
        hasViolations = true
      }
      
      // Check for co-located test files (either directly or in __tests__ subfolder)
      const testFile = join(itemPath, `${item}.test.tsx`)
      const testsDir = join(itemPath, '__tests__')
      const testFiles = getAllFiles(itemPath).filter(f => isTestFile(f))
      if (testFiles.length === 0) {
        // Note: This is a warning, not an error - tests might be added later
        console.log(`⚠️  No test file found for component: ${itemPath}`)
      }
      
      // Validate component-specific subdirectories
      const subDirs = ['hooks', 'utils', 'constants', 'config', 'types', '__tests__']
      for (const subDir of subDirs) {
        const subDirPath = join(itemPath, subDir)
        if (existsSync(subDirPath)) {
          // __tests__ directories don't need index.ts files
          if (subDir !== '__tests__' && !hasIndexFile(subDirPath)) {
            violations.push(`❌ Missing index.ts in ${subDir} for component: ${itemPath}`)
            hasViolations = true
          }
          
          // Validate files in subdirectory
          const subFiles = getAllFiles(subDirPath)
          for (const file of subFiles) {
            // Test files in __tests__ are allowed
            if (subDir === '__tests__' && isTestFile(file)) {
              continue
            }
            
            if (!isTestFile(file) && extname(file) !== '.ts') {
              violations.push(`❌ File in component ${subDir} must use .ts extension: ${file}`)
              hasViolations = true
            }
            
            const fileName = basename(file, extname(file))
            if (subDir === 'hooks' && !fileName.startsWith('use')) {
              violations.push(`❌ Hook file must start with 'use': ${file}`)
              hasViolations = true
            }
          }
        }
      }
    } else if (stat.isFile()) {
      // Direct component files (flat structure) - Rule 17 violation
      if (isComponentFile(itemPath)) {
        violations.push(`❌ Component file must be in component directory: ${itemPath}`)
        violations.push(`   Required structure: ${join(componentsDir, basename(item, '.tsx'), basename(item))}`)
        hasViolations = true
      }
    }
  }
}

/**
 * Validate shared hooks directory
 */
function validateSharedHooksDirectory(hooksDir) {
  if (!hasIndexFile(hooksDir)) {
    violations.push(`❌ Missing index.ts in shared hooks: ${hooksDir}`)
    hasViolations = true
  }
  
  const files = getAllFiles(hooksDir)
  
  for (const file of files) {
    if (!isTestFile(file)) {
      const fileName = basename(file, extname(file))
      
      // Skip index.ts files and utility files
      if (fileName === 'index' || file.includes('/utils/') || file.includes('/helpers/')) {
        continue
      }
      
      // Only validate actual hook files (not utilities, helpers, types, etc.)
      if (!fileName.startsWith('use')) {
        violations.push(`❌ Shared hook file must start with 'use': ${file}`)
        hasViolations = true
      }
      
      if (extname(file) !== '.ts') {
        violations.push(`❌ Hook file must use .ts extension: ${file}`)
        hasViolations = true
      }
      
      // Check for co-located test
      const testFile = file.replace(/\.ts$/, '.test.ts')
      if (!existsSync(testFile)) {
        console.log(`⚠️  No test file found for shared hook: ${file}`)
      }
    }
  }
}

/**
 * Validate services directory
 */
function validateServicesDirectory(servicesDir) {
  if (!hasIndexFile(servicesDir)) {
    violations.push(`❌ Missing index.ts in services: ${servicesDir}`)
    hasViolations = true
  }
  
  const files = getAllFiles(servicesDir)
  
  for (const file of files) {
    if (!isTestFile(file)) {
      const fileName = basename(file, extname(file))
      
      // Skip index.ts files
      if (fileName === 'index') {
        continue
      }
      
      // BaseService and similar base classes can be PascalCase
      if (fileName === 'BaseService' || fileName.startsWith('Base')) {
        continue
      }
      
      if (!isCamelCase(fileName)) {
        violations.push(`❌ Service file must be camelCase: ${file}`)
        hasViolations = true
      }
      
      if (extname(file) !== '.ts') {
        violations.push(`❌ Service file must use .ts extension: ${file}`)
        hasViolations = true
      }
      
      // Check for co-located test
      const testFile = file.replace(/\.ts$/, '.test.ts')
      if (!existsSync(testFile)) {
        console.log(`⚠️  No test file found for service: ${file}`)
      }
    }
  }
}

/**
 * Validate types directory
 */
function validateTypesDirectory(typesDir) {
  if (!hasIndexFile(typesDir)) {
    violations.push(`❌ Missing index.ts in types: ${typesDir}`)
    hasViolations = true
  }
  
  const files = getAllFiles(typesDir)
  
  for (const file of files) {
    if (!isTestFile(file)) {
      if (extname(file) !== '.ts') {
        violations.push(`❌ Type file must use .ts extension: ${file}`)
        hasViolations = true
      }
    }
  }
}

/**
 * Validate page structure
 */
function validatePageStructure() {
  console.log('\n📋 Validating page structure...')
  
  const pagesDir = join(SRC_DIR, 'pages')
  if (!existsSync(pagesDir)) {
    return
  }
  
  const pages = readdirSync(pagesDir).filter(item => {
    const itemPath = join(pagesDir, item)
    return statSync(itemPath).isDirectory() && !isExcludedDir(itemPath)
  })
  
  for (const page of pages) {
    const pagePath = join(pagesDir, page)
    
    // Check page index.ts (only if page has files)
    try {
      const items = readdirSync(pagePath)
      if (items.length > 0 && !hasIndexFile(pagePath)) {
        violations.push(`❌ Missing index.ts in page: ${pagePath}`)
        hasViolations = true
      }
    } catch (error) {
      // Skip if directory can't be read
    }
    
    // Check for page component directory (PascalCase)
    const capitalizedPageName = page.charAt(0).toUpperCase() + page.slice(1)
    const pageComponentDir = join(pagePath, capitalizedPageName)
    const pageComponentFile = join(pagePath, `${capitalizedPageName}.tsx`)
    const pageComponentFileWithSuffix = join(pagePath, `${capitalizedPageName}Page.tsx`)
    
    // Page must have a component (either directory or file)
    // Allow both Banking.tsx and BankingPage.tsx patterns
    if (!existsSync(pageComponentDir) && !existsSync(pageComponentFile) && !existsSync(pageComponentFileWithSuffix)) {
      violations.push(`❌ Page must have a component file or directory: ${pagePath}`)
      violations.push(`   Expected: ${pageComponentFile}, ${pageComponentFileWithSuffix}, or directory ${pageComponentDir}`)
      hasViolations = true
    }
    
    // Validate components directory (only if it exists and has files)
    const componentsDir = join(pagePath, 'components')
    if (existsSync(componentsDir)) {
      try {
        const items = readdirSync(componentsDir)
        if (items.length > 0 && !hasIndexFile(componentsDir)) {
          violations.push(`❌ Missing index.ts in page components: ${componentsDir}`)
          hasViolations = true
        }
      } catch (error) {
        // Skip if directory can't be read
      }
    }
  }
}

/**
 * Validate test co-location (no __tests__ directory for new structure)
 */
function validateTestCoLocation() {
  console.log('\n📋 Validating test co-location...')
  
  const testsDir = join(SRC_DIR, '__tests__')
  if (existsSync(testsDir)) {
    // Legacy __tests__ directory exists - warn but don't fail (migration period)
    console.log('⚠️  Legacy __tests__ directory found. Consider migrating tests to be co-located with source files.')
    console.log('   Tests should be in the same directory as the files they test.')
  }
  
  // Check that tests are co-located with source
  const allFiles = getAllFiles(SRC_DIR)
  const testFiles = allFiles.filter(f => isTestFile(f))
  
  for (const testFile of testFiles) {
    const sourceFile = testFile.replace(/\.(test|spec)\.(ts|tsx)$/, '.$2')
    const testDir = dirname(testFile)
    const sourceDir = dirname(sourceFile)
    
    // Test should be in same directory as source OR in __tests__ subfolder of source directory
    const isInTestsSubfolder = testDir.endsWith('__tests__') && testDir === join(sourceDir, '__tests__')
    const isSameDirectory = testDir === sourceDir
    
    if (!isSameDirectory && !isInTestsSubfolder) {
      // Check if it's in legacy root __tests__ structure (src/__tests__)
      const rootTestsPath = join(SRC_DIR, '__tests__')
      if (testDir.startsWith(rootTestsPath)) {
        // Legacy structure - warn
        console.log(`⚠️  Test file not co-located: ${testFile}`)
        console.log(`   Consider moving to: ${sourceDir}/__tests__/ or ${sourceDir}/`)
      }
    }
  }
}

/**
 * Validate file naming conventions
 */
function validateFileNaming() {
  console.log('\n📋 Validating file naming conventions...')
  
  const allFiles = getAllFiles(SRC_DIR)
  const EXCLUDED_FILES = [
    'main.tsx', // Entry point - special case
    'App.tsx', // Root component - special case
    'setupTests.ts', // Test setup - special case
  ]
  
  for (const file of allFiles) {
    // Skip excluded files
    if (EXCLUDED_FILES.includes(basename(file))) {
      continue
    }
    
    if (isTestFile(file)) {
      continue // Test files are validated separately
    }
    
    const fileName = basename(file, extname(file))
    const ext = extname(file)
    const dir = dirname(file)
    const dirName = basename(dir)
    
    // Skip index.ts files - they're allowed
    if (fileName === 'index') {
      continue
    }
    
    if (ext === '.tsx') {
      // Component files must be PascalCase
      if (!isPascalCase(fileName)) {
        violations.push(`❌ Component file must be PascalCase: ${file}`)
        hasViolations = true
      }
    } else if (ext === '.ts') {
      // Skip utility/helper files in hooks/utils
      if (file.includes('/utils/') || file.includes('/helpers/') || file.includes('/base/')) {
        // Utility files don't need 'use' prefix
        continue
      }
      
      // Check if it's in a component directory
      if (isPascalCase(dirName) && dirName !== 'src') {
        // Component-specific file - should be camelCase
        if (!isCamelCase(fileName)) {
          violations.push(`❌ Component-specific file must be camelCase: ${file}`)
          hasViolations = true
        }
      } else if (dir.includes('hooks') && !dir.includes('components') && !dir.includes('utils')) {
        // Shared hook (not in utils) must start with 'use' and be camelCase
        if (!fileName.startsWith('use')) {
          violations.push(`❌ Hook file must start with 'use': ${file}`)
          hasViolations = true
        }
        if (!isCamelCase(fileName)) {
          violations.push(`❌ Hook file must be camelCase: ${file}`)
          hasViolations = true
        }
      } else if (dir.includes('services') && !dir.includes('base')) {
        // Service file must be camelCase (except base services)
        if (!isCamelCase(fileName) && fileName !== 'BaseService' && !fileName.startsWith('Base')) {
          violations.push(`❌ Service file must be camelCase: ${file}`)
          hasViolations = true
        }
      }
    }
  }
}

/**
 * Main validation function
 */
function validateFileStructure() {
  console.log('\n🚀 Rule 17: File and Folder Structure Validation')
  console.log('==================================================\n')
  
  try {
    validateDomainStructure()
    validatePageStructure()
    validateTestCoLocation()
    validateFileNaming()
    
    if (hasViolations) {
      console.log('\n❌ File structure validation failed!')
      console.log('\n📋 Violations found:')
      violations.forEach(violation => console.log(violation))
      console.log('\n📖 Please refer to Rule 17 in DEVELOPMENT_STANDARDS.md for structure requirements')
      console.log('\n==================================================\n')
      process.exit(1)
    }
    
    console.log('\n✅ File structure validation passed!')
    console.log('✅ All files follow Rule 17 structure requirements')
    console.log('\n==================================================\n')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error during file structure validation:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

// Run validation
validateFileStructure()

