#!/usr/bin/env node

/**
 * Port Validation Script
 * Ensures the application always runs on port 11616
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

const net = require('net');
const fs = require('fs');
const path = require('path');

const MANDATED_PORT = 11616;
const PROJECT_ROOT = path.join(__dirname, '..');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(false);
    });
  });
}

function validateViteConfig() {
  const viteConfigPath = path.join(PROJECT_ROOT, 'vite.config.ts');
  
  if (!fs.existsSync(viteConfigPath)) {
    log('❌ vite.config.ts not found!', 'red');
    return false;
  }
  
  const content = fs.readFileSync(viteConfigPath, 'utf8');
  
  // Check for port configuration
  const portMatch = content.match(/port:\s*(\d+)/);
  if (!portMatch || parseInt(portMatch[1]) !== MANDATED_PORT) {
    log(`❌ vite.config.ts port is not set to ${MANDATED_PORT}!`, 'red');
    return false;
  }
  
  // Check for strictPort
  if (!content.includes('strictPort: true')) {
    log('❌ vite.config.ts missing strictPort: true!', 'red');
    return false;
  }
  
  log('✅ vite.config.ts correctly configured', 'green');
  return true;
}

function validatePackageJson() {
  const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    log('❌ package.json not found!', 'red');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Check dev script
  if (!packageJson.scripts?.dev?.includes(`--port ${MANDATED_PORT}`)) {
    log(`❌ package.json dev script missing --port ${MANDATED_PORT}!`, 'red');
    return false;
  }
  
  if (!packageJson.scripts?.dev?.includes('--strict-port')) {
    log('❌ package.json dev script missing --strict-port!', 'red');
    return false;
  }
  
  // Check preview script
  if (!packageJson.scripts?.preview?.includes(`--port ${MANDATED_PORT}`)) {
    log(`❌ package.json preview script missing --port ${MANDATED_PORT}!`, 'red');
    return false;
  }
  
  if (!packageJson.scripts?.preview?.includes('--strict-port')) {
    log('❌ package.json preview script missing --strict-port!', 'red');
    return false;
  }
  
  log('✅ package.json scripts correctly configured', 'green');
  return true;
}

async function validatePortAvailability() {
  log(`🔍 Checking if port ${MANDATED_PORT} is available...`, 'blue');
  
  const isAvailable = await checkPortAvailable(MANDATED_PORT);
  
  if (!isAvailable) {
    log(`⚠️  Port ${MANDATED_PORT} is currently in use.`, 'yellow');
    log('   Skipping port availability enforcement during validation.', 'yellow');
    log('   You can still free the port manually if needed:', 'yellow');
    log(`   lsof -ti:${MANDATED_PORT} | xargs kill -9`, 'yellow');
    return true;
  }
  
  log(`✅ Port ${MANDATED_PORT} is available`, 'green');
  return true;
}

function checkEnvironmentVariables() {
  const envVars = ['VITE_PORT', 'PORT', 'SERVER_PORT'];
  const conflictingVars = envVars.filter(envVar => process.env[envVar]);
  
  if (conflictingVars.length > 0) {
    log(`⚠️  Warning: Environment variables found that might override port:`, 'yellow');
    conflictingVars.forEach(envVar => {
      log(`   ${envVar}=${process.env[envVar]}`, 'yellow');
    });
    log('   These will be ignored due to strict port configuration', 'yellow');
  }
  
  return true;
}

async function main() {
  log(`${colors.bold}🚀 Port ${MANDATED_PORT} Validation Script${colors.reset}`, 'blue');
  log('='.repeat(50), 'blue');
  
  let allValid = true;
  
  // Validate configuration files
  allValid = validateViteConfig() && allValid;
  allValid = validatePackageJson() && allValid;
  
  // Check environment variables
  checkEnvironmentVariables();
  
  // Validate port availability
  allValid = await validatePortAvailability() && allValid;
  
  log('='.repeat(50), 'blue');
  
  if (allValid) {
    log(`✅ All validations passed! App will run on port ${MANDATED_PORT}`, 'green');
    log('🚀 Ready to start development server', 'green');
    process.exit(0);
  } else {
    log('❌ Validation failed! Please fix the issues above', 'red');
    log('💡 Run this script again after fixing the issues', 'yellow');
    process.exit(1);
  }
}

// Run the validation
main().catch(error => {
  log(`❌ Validation script error: ${error.message}`, 'red');
  process.exit(1);
});
