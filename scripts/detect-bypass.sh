#!/bin/bash

# ============================================================================
# BYPASS DETECTION SCRIPT - ZERO TOLERANCE POLICY ENFORCEMENT
# ============================================================================

echo "🚨 BYPASS DETECTION SYSTEM - ZERO TOLERANCE POLICY"
echo "⚠️  CHECKING FOR ALL POSSIBLE BYPASS METHODS"
echo ""

# Check for common bypass environment variables
BYPASS_DETECTED=false
BYPASS_METHODS=()

# Check for Husky bypass
if [ "$HUSKY_SKIP_HOOKS" = "1" ]; then
    BYPASS_DETECTED=true
    BYPASS_METHODS+=("HUSKY_SKIP_HOOKS=1")
fi

# Check for generic skip flags
if [ -n "$SKIP_HOOKS" ]; then
    BYPASS_DETECTED=true
    BYPASS_METHODS+=("SKIP_HOOKS=$SKIP_HOOKS")
fi

if [ -n "$SKIP_PRE_COMMIT" ]; then
    BYPASS_DETECTED=true
    BYPASS_METHODS+=("SKIP_PRE_COMMIT=$SKIP_PRE_COMMIT")
fi

if [ -n "$BYPASS_CHECKS" ]; then
    BYPASS_DETECTED=true
    BYPASS_METHODS+=("BYPASS_CHECKS=$BYPASS_CHECKS")
fi

# Check for git bypass flags in command line
if [[ "$*" == *"--no-verify"* ]]; then
    BYPASS_DETECTED=true
    BYPASS_METHODS+=("--no-verify flag")
fi

if [[ "$*" == *"--skip-hooks"* ]]; then
    BYPASS_DETECTED=true
    BYPASS_METHODS+=("--skip-hooks flag")
fi

if [[ "$*" == *"--no-hooks"* ]]; then
    BYPASS_DETECTED=true
    BYPASS_METHODS+=("--no-hooks flag")
fi

# Check for CI/CD bypass attempts
if [ -n "$CI" ] && [ -n "$SKIP_VALIDATION" ]; then
    BYPASS_DETECTED=true
    BYPASS_METHODS+=("CI SKIP_VALIDATION=$SKIP_VALIDATION")
fi

# Check for test environment bypasses
if [ -n "$NODE_ENV" ] && [ "$NODE_ENV" = "test" ] && [ -n "$SKIP_CHECKS" ]; then
    BYPASS_DETECTED=true
    BYPASS_METHODS+=("NODE_ENV=test SKIP_CHECKS=$SKIP_CHECKS")
fi

# ============================================================================
# ENFORCEMENT DECISION
# ============================================================================

if [ "$BYPASS_DETECTED" = true ]; then
    echo "❌ CRITICAL SECURITY VIOLATION DETECTED!"
    echo "❌ BYPASS ATTEMPTS IDENTIFIED:"
    for method in "${BYPASS_METHODS[@]}"; do
        echo "   - $method"
    done
    echo ""
    echo "🚨 ZERO TOLERANCE POLICY VIOLATION"
    echo "🔒 ENFORCEMENT: ALL OPERATIONS BLOCKED"
    echo ""
    echo "📋 REQUIRED ACTIONS:"
    echo "   1. Remove ALL bypass flags and environment variables"
    echo "   2. Fix ALL code quality issues"
    echo "   3. Ensure 100% test coverage"
    echo "   4. Pass ALL validation checks"
    echo "   5. Commit without bypassing"
    echo ""
    echo "⚠️  NO EXCEPTIONS - NO BYPASSING ALLOWED"
    echo "🔒 POLICY: ZERO TOLERANCE - STRICT COMPLIANCE REQUIRED"
    exit 1
else
    echo "✅ BYPASS DETECTION: CLEAN"
    echo "✅ NO BYPASS METHODS DETECTED"
    echo "✅ COMPLIANCE VERIFIED"
    echo ""
    echo "🔒 ENFORCEMENT STATUS: COMPLIANT"
    echo "📋 POLICY: ZERO TOLERANCE - NO BYPASSING ALLOWED"
    echo "✅ RESULT: Operations approved - All standards met"
    exit 0
fi
