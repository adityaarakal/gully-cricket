#!/usr/bin/env node

/**
 * Vision Check Script
 * 
 * This script ensures that the application vision is always considered
 * before planning or implementing features.
 * 
 * Usage:
 *   node scripts/check-vision.cjs
 *   npm run check:vision
 */

const fs = require('fs');
const path = require('path');

const VISION_FILE = path.join(__dirname, '..', 'docs', 'VISION.md');
const ANSI_COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function printColor(message, color = 'reset') {
  console.log(`${ANSI_COLORS[color]}${message}${ANSI_COLORS.reset}`);
}

function checkVision() {
  printColor('\n🎯 VISION CHECK - Application Core Purpose', 'bright');
  printColor('='.repeat(60), 'cyan');
  
  if (!fs.existsSync(VISION_FILE)) {
    printColor('❌ ERROR: Vision document not found!', 'red');
    printColor(`   Expected: ${VISION_FILE}`, 'red');
    process.exit(1);
  }
  
  const visionContent = fs.readFileSync(VISION_FILE, 'utf8');
  
  // Extract key vision points
  const corePurpose = visionContent.match(/## 🎯 Core Purpose\n\n(.*?)\n\n/s)?.[1] || '';
  const primaryGoal = visionContent.match(/## 📊 Primary Goal\n\n(.*?)\n\n/s)?.[1] || '';
  const developmentPrinciple = visionContent.match(/## 🎯 Development Principle\n\n> \*\*(.*?)\*\*/s)?.[1] || '';
  
  printColor('\n📋 CORE PURPOSE:', 'bright');
  printColor(corePurpose.trim(), 'green');
  
  printColor('\n📊 PRIMARY GOAL:', 'bright');
  printColor(primaryGoal.trim(), 'green');
  
  printColor('\n🧭 DEVELOPMENT PRINCIPLE:', 'bright');
  printColor(`"${developmentPrinciple.trim()}"`, 'yellow');
  
  printColor('\n✅ VISION CHECKLIST FOR FEATURE PLANNING:', 'bright');
  printColor('   Before planning any feature, ensure it:', 'cyan');
  printColor('   ✓ Supports financial projections (current and future)', 'green');
  printColor('   ✓ Enables informed decision-making (savings, expenditures, purchases)', 'green');
  printColor('   ✓ Uses transaction history as the foundation', 'green');
  printColor('   ✓ Provides visibility into months ahead (minimum 5 years)', 'green');
  
  printColor('\n📝 REMEMBER:', 'bright');
  printColor('   "This is all about projections into future and current months', 'yellow');
  printColor('    with the transactions I keep on recording"', 'yellow');
  
  printColor('\n' + '='.repeat(60), 'cyan');
  printColor('✅ Vision document loaded successfully!', 'green');
  printColor('   Reference: docs/VISION.md\n', 'cyan');
  
  return {
    success: true,
    corePurpose: corePurpose.trim(),
    primaryGoal: primaryGoal.trim(),
    developmentPrinciple: developmentPrinciple.trim()
  };
}

// If run directly
if (require.main === module) {
  try {
    const result = checkVision();
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    printColor(`\n❌ Error checking vision: ${error.message}`, 'red');
    process.exit(1);
  }
}

module.exports = { checkVision };

