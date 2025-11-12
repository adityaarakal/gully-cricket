#!/usr/bin/env node

/**
 * Source Folder Coverage Validation Script
 * Ensures 80% PER-FILE test coverage - EACH file must meet threshold individually
 * 
 * Rule 3: 80% PER-FILE UNIT TEST COVERAGE - MANDATORY FOR EACH FILE
 * - EVERY file in `src` must have unit tests with 80% minimum coverage
 * - Coverage checked for EACH file individually: statements, functions, branches, lines
 * - Zero tolerance for ANY file below 80% on ANY metric
 * 
 * 🔒 LOCKED SCRIPT - AI AGENT PROTECTION 🔒
 * ⚠️ CRITICAL: This script is LOCKED and protected from AI agent modifications ⚠️
 */

// Delegate to per-file coverage validator
require('./validate-per-file-coverage.cjs')
