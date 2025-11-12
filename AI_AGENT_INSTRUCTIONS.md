# AI AGENT INSTRUCTIONS - STRICT COMPLIANCE REQUIRED

## 🚨 CRITICAL: ZERO TOLERANCE POLICY FOR AI AGENTS

**⚠️ THIS DOCUMENT IS MANDATORY READING FOR ALL AI AGENTS ⚠️**

## 🎯 APPLICATION VISION - ALWAYS REMEMBER

**Before planning ANY feature, ALWAYS:**
1. Run `npm run check:vision` to review the application's core purpose
2. Read `docs/VISION.md` for complete vision details
3. Ensure every feature supports: **Financial projections for current and future months (5+ years ahead)**
4. Verify alignment with: **Transaction-based forecasting and decision support**

**Core Principle**: *"This is all about projections into future and current months with the transactions I keep on recording"*

**MANDATORY**: Every feature must help users:
- Project financial future (current month + 5+ years)
- Make informed decisions (savings, expenditures, purchases)
- Use transaction history as foundation
- Understand expected balances after income/expenses

---

## 🔒 STRICT ENFORCEMENT RULES

### **RULE 1: NO BYPASSING ALLOWED - ZERO TOLERANCE**
- ❌ **NEVER use `--no-verify` flag**
- ❌ **NEVER use `--skip-hooks` flag**
- ❌ **NEVER use `--no-hooks` flag**
- ❌ **NEVER set bypass environment variables**
- ❌ **NEVER attempt to disable pre-commit hooks**
- ❌ **NEVER try to circumvent validation checks**

### **RULE 2: MANDATORY COMPLIANCE**
- ✅ **ALWAYS fix ALL ESLint errors before committing**
- ✅ **ALWAYS ensure 100% test coverage**
- ✅ **ALWAYS pass ALL validation checks**
- ✅ **ALWAYS follow SOLID & DRY principles**
- ✅ **ALWAYS maintain architectural standards**

### **RULE 3: BYPASS DETECTION SYSTEM**
The system actively monitors for bypass attempts:
- **Environment Variables**: `HUSKY_SKIP_HOOKS`, `SKIP_HOOKS`, `SKIP_PRE_COMMIT`, `BYPASS_CHECKS`
- **Git Flags**: `--no-verify`, `--skip-hooks`, `--no-hooks`
- **Command Line**: Any bypass-related flags
- **CI/CD**: Bypass attempts in automated environments

---

## 🚨 CONSEQUENCES OF BYPASSING

**ANY bypass attempt will result in:**
1. ❌ **Immediate commit failure**
2. ❌ **Security violation logged**
3. ❌ **Policy violation recorded**
4. ❌ **All operations blocked**
5. ❌ **Zero tolerance enforcement**

---

## 📋 REQUIRED WORKFLOW FOR AI AGENTS

### **Before ANY Feature Planning or Implementation:**
1. **MANDATORY: Run `npm run check:vision`** - Review application vision and core purpose
2. **Verify alignment** - Ensure feature supports financial projections (5+ years ahead)
3. **Check decision support** - Confirm feature helps with savings, expenditures, purchase decisions
4. **Reference vision** - See `docs/VISION.md` for complete vision details

**CRITICAL**: Every feature must align with the core purpose: *"Projections into future and current months with the transactions I keep on recording"*

### **Before ANY Commit:**
1. **Run `npm run validate:all`** - Must pass completely
2. **Fix ALL ESLint errors** - Zero tolerance
3. **Ensure 100% test coverage** - No exceptions
4. **Pass ALL architectural checks** - SOLID/DRY compliance
5. **Verify build success** - Production build must work
6. **Check security audit** - No vulnerabilities allowed
7. **Commit WITHOUT bypassing** - No flags, no environment variables

### **If Validation Fails:**
1. **STOP** - Do not attempt to commit
2. **FIX** - Address ALL issues found
3. **RETEST** - Re-run validation until 100% pass
4. **COMMIT** - Only when ALL checks pass

---

## 🔧 ENFORCEMENT MECHANISMS

### **Active Monitoring:**
- **Pre-commit hooks** scan for bypass attempts
- **Bypass detection script** monitors all methods
- **Environment variable scanning** detects bypass flags
- **Command line analysis** identifies bypass flags
- **Git configuration** enforces hook execution

### **Blocking Conditions:**
- **ANY bypass attempt detected**
- **ANY ESLint error/warning**
- **ANY TypeScript compilation error**
- **ANY test failure**
- **ANY coverage below 100%**
- **ANY architectural violation**
- **ANY build failure**
- **ANY security vulnerability**

---

## ⚠️ CRITICAL WARNINGS FOR AI AGENTS

### **DO NOT:**
- ❌ Use `git commit --no-verify`
- ❌ Set `HUSKY_SKIP_HOOKS=1`
- ❌ Use `SKIP_HOOKS=true`
- ❌ Try `--skip-hooks` flag
- ❌ Attempt to disable hooks
- ❌ Bypass any validation checks
- ❌ Commit with errors present
- ❌ Ignore test failures
- ❌ Skip coverage requirements

### **ALWAYS:**
- ✅ Fix ALL issues before committing
- ✅ Pass ALL validation checks
- ✅ Maintain 100% test coverage
- ✅ Follow architectural standards
- ✅ Ensure build success
- ✅ Pass security audits
- ✅ Comply with ZERO TOLERANCE policy

---

## 🎯 SUCCESS CRITERIA

**A commit is ONLY approved when:**
1. ✅ **No bypass attempts detected**
2. ✅ **All ESLint checks pass**
3. ✅ **TypeScript compilation succeeds**
4. ✅ **All tests pass with 100% coverage**
5. ✅ **All architectural validations pass**
6. ✅ **Build succeeds**
7. ✅ **Security audit passes**
8. ✅ **All quality gates pass**

---

## 📞 EMERGENCY PROCEDURES

**If you encounter issues:**
1. **DO NOT bypass** - This violates policy
2. **Fix the issues** - Address root causes
3. **Re-run validation** - Ensure compliance
4. **Seek help** - Ask for guidance if needed
5. **Maintain standards** - Never compromise quality

---

## 🔒 POLICY ENFORCEMENT

**This policy is:**
- **MANDATORY** - No exceptions allowed
- **AUTOMATED** - System enforces compliance
- **MONITORED** - All attempts are logged
- **ZERO TOLERANCE** - No bypassing permitted
- **STRICTLY ENFORCED** - Violations block operations

---

**⚠️ REMEMBER: ZERO TOLERANCE POLICY - NO BYPASSING ALLOWED ⚠️**

**Last Updated:** 2024  
**Enforcement Status:** ACTIVE - STRICT COMPLIANCE REQUIRED  
**Policy:** ZERO TOLERANCE - NO EXCEPTIONS
