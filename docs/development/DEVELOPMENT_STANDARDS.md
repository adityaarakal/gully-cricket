# DEVELOPMENT STANDARDS - MANDATORY RULES
## ⚠️ LOCKED DOCUMENT - NO MODIFICATIONS ALLOWED WITHOUT EXPLICIT PERMISSION ⚠️

**Document Version:** 2.8  
**Created:** 2024  
**Last Updated:** 2024 (Version 2.8 - Added Rule 18: Path alias enforcement - @/ required for internal imports)  
**Status:** LOCKED - Requires explicit permission to modify  
**Enforcement:** Pre-commit hooks + PR workflow (CI/CD) with zero tolerance + absolute bypass prevention + all 18 rules enforced

---

## 🚨 MANDATORY DEVELOPMENT RULES - ZERO TOLERANCE POLICY

### **⚠️⚠️⚠️ ALL RULES ARE MANDATORY - ENFORCED IN PRE-COMMIT AND PR WORKFLOW ⚠️⚠️⚠️**

**ABSOLUTE REQUIREMENT: ALL RULES MUST BE FOLLOWED - NO EXCEPTIONS**

- ✅ **ALL rules are enforced in pre-commit hook** - Commits are blocked if any rule fails
- ✅ **ALL rules are enforced in PR workflow** - PRs cannot be merged if any rule fails
- ✅ **Zero tolerance policy** - No exceptions, not even with user permission
- ✅ **Required status checks** - PR merge is blocked until ALL validations pass
- ✅ **No bypassing allowed** - Not for users, not for AI agents, not for anyone
- ✅ **Every rule has validation** - Automated checks ensure compliance

**ENFORCEMENT LOCATIONS:**
1. **Pre-commit hook** - Runs before every commit (local)
2. **PR workflow (CI/CD)** - Runs on every pull request (remote)
3. **Required status checks** - PR merge blocked until all pass

**VIOLATION CONSEQUENCES:**
- ❌ **Commit blocked** - Pre-commit hook prevents commit
- ❌ **PR blocked** - CI/CD prevents merge
- ❌ **Build failure** - Pipeline stops on any violation
- ❌ **Code review rejection** - Must fix before review approval
- ❌ **Merge impossible** - Cannot merge until all rules pass

### **⚠️ RULE 15: CONTINUOUS EXECUTION - AI AGENTS MUST WORK UNINTERRUPTED ⚠️**
**THIS RULE TAKES PRIORITY - READ FIRST**

- **NEVER stop mid-task** to ask for permission to continue - ZERO TOLERANCE for unnecessary interruptions
- **NEVER pause** after fixing some errors to ask if user wants more fixes - Continue until completion
- **ALWAYS continue executing** until the entire task is fully completed
- **ONLY stop when** explicit user permission is needed for critical decisions (e.g., breaking changes, architectural decisions)
- **NO interruptions** for routine task continuations (e.g., fixing more errors, refactoring more files)
- **When user says "continue"** or similar, AI agent MUST continue the same task without asking again
- **When user says "fix"** or similar, AI agent MUST fix ALL issues, not just some
- **Work systematically** through all violations until zero remain
- **Don't ask "should I continue?"** - Just continue until done
- **Automated tasks require no permission** - If it's part of the same task, continue automatically
- **Only ask permission** for things that truly require user decision (e.g., breaking API changes, major refactoring approaches)
- **This applies to ALL tasks** - Error fixing, refactoring, code improvements, validation fixes
- **AI agents MUST be aware of this rule** - It should be checked before every response
- **Enforcement:** AI agent behavior + user expectations + task completion tracking - NO EXCEPTIONS
- **Violation = Task Failure** - Stopping mid-task for routine continuations is a violation

### **RULE 1: ZERO ERRORS/WARNINGS POLICY**
- **0 lint errors** - Any ESLint error blocks commit
- **0 TypeScript errors** - Any TypeScript compilation error blocks commit  
- **0 import errors** - Any import resolution error blocks commit
- **0 warnings** - Any warning (lint/TypeScript/import) blocks commit
- **Enforcement:** Pre-commit hooks with `--max-warnings 0`

### **RULE 2: SOLID & DRY PRINCIPLES - MANDATORY**
- **Single Responsibility Principle (SRP)** - Each class/function has one reason to change
- **Open/Closed Principle (OCP)** - Open for extension, closed for modification
- **Liskov Substitution Principle (LSP)** - Derived classes must be substitutable for base classes
- **Interface Segregation Principle (ISP)** - No client should depend on unused interfaces
- **Dependency Inversion Principle (DIP)** - Depend on abstractions, not concretions
- **Don't Repeat Yourself (DRY)** - Zero tolerance for code duplication
- **Enforcement:** Custom ESLint rules + pre-commit analysis

### **RULE 3: 80% PER-FILE UNIT TEST COVERAGE - MANDATORY FOR EACH FILE**
- **EVERY file in `src` folder** must have unit tests with 80% minimum coverage
- **PER-FILE enforcement**: Each file is checked individually, not as an aggregate
- **All 4 metrics required**: Each file must meet 80% for:
  - **Statements**: 80% minimum
  - **Functions**: 80% minimum
  - **Branches**: 80% minimum
  - **Lines**: 80% minimum
- **Every component** in `src` must have unit tests
- **Every function** in `src` must have unit tests
- **Every utility** in `src` must have unit tests
- **Every hook** in `src` must have unit tests
- **Every service** in `src` must have unit tests
- **Every type/interface** that has logic must have unit tests
- **80% code coverage** required for EACH file individually - no exceptions
- **Even simple wrapper components** (e.g., ComingSoon pages) must have tests
- **Even index.ts files** that only re-export must have tests
- **No untested code** allowed in `src` folder
- **Zero tolerance** for ANY file below 80% on ANY metric
- **No file exemptions** - all source files in `src` must meet the threshold
- **Enforcement:** Jest per-file coverage thresholds + custom validation script in pre-commit + CI/CD

### **RULE 4: CODE REUSABILITY - MANDATORY**
- **Maximum code reuse** across the application
- **Extract common functionality** into reusable utilities
- **Create shared components** for repeated UI patterns
- **Build reusable hooks** for common logic patterns
- **Zero tolerance** for duplicate implementations
- **Enforcement:** ESLint rules + code analysis + pre-commit validation

### **RULE 5: PRESENTATIONAL COMPONENTS - MANDATORY**
- **Components must be presentational only** - no business logic
- **All state and logic** must be moved to custom hooks
- **Components handle only** UI rendering and user interactions
- **Business logic separation** - clean architecture enforced
- **Custom hooks** for all data fetching, state management, and side effects
- **Enforcement:** ESLint rules + architectural validation + pre-commit checks

### **RULE 6: FILE EXTENSION STRICTNESS - MANDATORY**
- **Only components** can use `.tsx` extension
- **All other files** must use `.ts` extension
- **No exceptions** - utilities, hooks, types, constants must be `.ts`
- **Strict file type enforcement** - prevents architectural violations
- **Enforcement:** ESLint rules + file validation + pre-commit hooks

### **RULE 7: NO ESLINT DISABLE - ZERO TOLERANCE**
- **NO eslint-disable comments** allowed in any file
- **NO eslint-disable-next-line** allowed
- **NO eslint-disable-file** allowed
- **FIX issues, don't bypass** - always fix the root cause
- **Refactor large files** - break into smaller components/hooks
- **Refactor complex functions** - extract into smaller functions
- **Zero tolerance** for disabling linting rules
- **Enforcement:** ESLint rules + pre-commit validation + code scanning

### **RULE 8: NO TEMPORARY VALIDATION ADJUSTMENTS**
- **NO temporary bypasses** of validation rules
- **NO conditional exclusions** in validation scripts
- **NO workarounds** for existing violations
- **FIX all violations** before enabling new rules
- **Enforce rules immediately** once added
- **Zero tolerance** for temporary rule adjustments
- **Enforcement:** Code review + commit validation

### **⚠️⚠️⚠️ RULE 9: PRE-COMMIT VALIDATION - ZERO BYPASSING TOLERANCE - ABSOLUTE STRICTNESS - --no-verify IS ABSOLUTELY FORBIDDEN ⚠️⚠️⚠️**
**THIS RULE TAKES HIGHEST PRIORITY - --no-verify IS FORBIDDEN AT ALL COSTS**

- **ABSOLUTE PROHIBITION: --no-verify flag** - FORBIDDEN AT ALL COSTS - NO EXCEPTIONS - NOT EVEN WITH USER PERMISSION - NEVER ALLOWED
- **All rules must pass** before commit - NO EXCEPTIONS - NO BYPASSING - NOT EVEN WITH USER PERMISSION
- **NO BYPASSING** of pre-commit hooks - ZERO TOLERANCE - ABSOLUTE PROHIBITION
- **NO --no-verify flag** usage - STRICTLY PROHIBITED - NOT ALLOWED UNDER ANY CIRCUMSTANCES - NOT EVEN WITH USER PERMISSION - NEVER ALLOWED
- **NO environment variable bypasses** - STRICTLY PROHIBITED (SKIP_HOOKS, SKIP_PRE_COMMIT, BYPASS_CHECKS, etc.) - NOT EVEN WITH USER PERMISSION
- **NO git flag bypasses** - STRICTLY PROHIBITED (--no-verify, --no-gpg-sign, etc.) - NOT EVEN WITH USER PERMISSION - NEVER ALLOWED
- **NO commit message bypasses** - STRICTLY PROHIBITED (trying to add [skip ci] or similar) - NOT EVEN WITH USER PERMISSION
- **NO ONE CAN BYPASS** - Not AI agents, not users, NO ONE - ABSOLUTE PROHIBITION
- **USER PERMISSION DOES NOT ALLOW BYPASSING** - Even with explicit user permission, validations CANNOT be skipped
- **--no-verify DETECTION IS MANDATORY** - All commit attempts with --no-verify are automatically blocked
- **Git hooks monitor for --no-verify** - Pre-commit and commit-msg hooks detect and block --no-verify usage
- **Validation scripts check for --no-verify** - Automated validation prevents --no-verify in scripts and history
- **ALL VALIDATIONS MUST PASS** - No exceptions, no bypasses, no skips - ever
- **Fix first, commit second** - always - NO BYPASSING EVER - NO EXCEPTIONS
- **Bypass detection system** - monitors all bypass attempts, including git hooks, flags, and env vars
- **Automatic commit rejection** - Any bypass attempt automatically blocks commit - user permission does not override this
- **Enforcement:** Husky + lint-staged + custom validation scripts + bypass detection + absolute strictness + --no-verify detection hooks

### **RULE 10: NO CONFIG FILE MODIFICATIONS WITHOUT PERMISSION**
- **AI agents CANNOT modify config files** without explicit user permission
- **Config files include:** eslint.config.js, vite.config.ts, tsconfig.json, package.json scripts
- **ALL config changes require explicit user approval** before implementation
- **Validation rule changes** must be approved by user first
- **AI agents must ask** before modifying any configuration
- **Zero tolerance** for unauthorized config modifications
- **Enforcement:** Manual review + explicit permission workflow

### **RULE 11: FIX ISSUES, NEVER BYPASS**
- **When encountering lint/validation errors**, MUST fix the issues
- **CANNOT update rules, scripts, or config** to bypass errors
- **CANNOT relax validation rules** to pass validation
- **CANNOT add eslint-disable comments** - this violates Rule 7
- **MUST refactor code** to comply with all rules
- **MUST break down large files** to meet max-lines requirement
- **MUST reduce complexity** to meet complexity requirements
- **Zero tolerance** for bypassing or relaxing rules
- **Enforcement:** Code review + commit validation + automated checks

### **RULE 12: AI AGENTS CANNOT SKIP OR BYPASS ANY VALIDATION CHECKS - ABSOLUTE PROHIBITION**
- **AI agents CANNOT skip any validation check** - present or future - ZERO TOLERANCE
- **AI agents CANNOT bypass any validation check** - present or future - ZERO TOLERANCE
- **AI agents CANNOT comment out validation checks** - ZERO TOLERANCE
- **AI agents CANNOT disable validation checks** - ZERO TOLERANCE
- **AI agents CANNOT temporarily skip validation** - even for infrastructure commits - ZERO TOLERANCE
- **AI agents CANNOT add "temporarily disabled" comments** - ZERO TOLERANCE
- **ALL validation checks MUST remain active** at all times - no exceptions
- **If validation fails, AI agents MUST fix the issues** - NOT skip the validation
- **Infrastructure commits MUST pass all validations** - cannot be exempted
- **Zero tolerance** for skipping, bypassing, or disabling any validation check
- **This applies to ALL checks** - current checks AND any checks added in the future
- **AI agents are explicitly FORBIDDEN** from modifying pre-commit hooks to skip checks
- **AI agents are explicitly FORBIDDEN** from modifying validation scripts to skip checks
- **AI agents are explicitly FORBIDDEN** from commenting out validation code
- **Enforcement:** Pre-commit hooks + validation scripts + code review + AI agent detection

### **RULE 13: ALL VALIDATIONS MUST PASS - NO EXCEPTIONS - NOT EVEN WITH USER PERMISSION**
- **ALL validation checks MUST pass** before commit - NO EXCEPTIONS - ABSOLUTE REQUIREMENT
- **USER PERMISSION DOES NOT ALLOW SKIPPING VALIDATIONS** - Even with explicit user permission, validations CANNOT be skipped
- **NO ONE CAN SKIP VALIDATIONS** - Not users, not AI agents, not anyone - ABSOLUTE PROHIBITION
- **ALL pre-commit validations must pass** - Every single check - no skips, no bypasses, no exceptions
- **ALL PR workflow validations must pass** - Every single check - no skips, no bypasses, no exceptions
- **Infrastructure commits MUST pass all validations** - Cannot be exempted, even with user permission
- **User permission is NOT a valid reason to skip validations** - All checks must pass regardless
- **If validations fail, issues MUST be fixed** - NOT skipped, NOT bypassed, NOT exempted
- **Zero tolerance for skipping validations** - Even with explicit user permission
- **This applies to ALL validations** - Current validations AND any validations added in the future
- **Pre-commit hooks enforce this** - All validations must pass before commit is allowed
- **PR workflow enforces this** - All validations must pass before merge is allowed
- **Enforcement:** Pre-commit hooks + PR workflow + validation scripts + absolute strictness - NO EXCEPTIONS

### **RULE 14: FIX ISSUES - NEVER DISABLE RULES OR IGNORE ERRORS - MANDATE FOR BEST CODE QUALITY**
- **NEVER disable linting rules** to fix errors - ZERO TOLERANCE for disabling rules
- **NEVER ignore TypeScript errors** - All type errors MUST be fixed
- **NEVER disable ESLint rules** in config - Fix the underlying code issues instead
- **ALWAYS fix the root cause** - Address the actual problem, not the symptom
- **If a rule is too strict, the code must adapt** - Code quality takes priority over convenience
- **No rule exceptions for test files** - Test files must follow the same quality standards
- **No config modifications to bypass errors** - Config changes only for legitimate improvements
- **Zero tolerance** for disabling, ignoring, or bypassing any validation rules
- **Best outcome code is MANDATORY** - Aim for the highest quality, not the easiest solution
- **All lint errors must be fixed** - No unused variables, no duplicate imports, no prefer-destructuring violations
- **All TypeScript errors must be fixed** - No missing properties, no type mismatches, no implicit any
- **This applies to ALL code** - Source code, test code, configuration files - everything
- **Enforcement:** ESLint + TypeScript compiler + pre-commit hooks + code review - NO EXCEPTIONS

### **RULE 15: CONTINUOUS EXECUTION - AI AGENTS MUST WORK UNINTERRUPTED UNTIL TASK COMPLETION**
- **NEVER stop mid-task** to ask for permission to continue - ZERO TOLERANCE for unnecessary interruptions
- **NEVER pause** after fixing some errors to ask if user wants more fixes - Continue until completion
- **ALWAYS continue executing** until the entire task is fully completed
- **ONLY stop when** explicit user permission is needed for critical decisions (e.g., breaking changes, architectural decisions)
- **NO interruptions** for routine task continuations (e.g., fixing more errors, refactoring more files)
- **When user says "continue"** or similar, AI agent MUST continue the same task without asking again
- **When user says "fix"** or similar, AI agent MUST fix ALL issues, not just some
- **Work systematically** through all violations until zero remain
- **Don't ask "should I continue?"** - Just continue until done
- **Automated tasks require no permission** - If it's part of the same task, continue automatically
- **Only ask permission** for things that truly require user decision (e.g., breaking API changes, major refactoring approaches)
- **This applies to ALL tasks** - Error fixing, refactoring, code improvements, validation fixes
- **Enforcement:** AI agent behavior + user expectations + task completion tracking - NO EXCEPTIONS

### **⚠️⚠️⚠️ RULE 16: ZERO ERRORS AND WARNINGS - ALL MUST BE FIXED BEFORE COMMIT ⚠️⚠️⚠️**
**THIS RULE TAKES HIGHEST PRIORITY - ALL ERRORS AND WARNINGS MUST BE FIXED**

- **ABSOLUTE REQUIREMENT: ZERO ERRORS** - ALL errors MUST be fixed before commit - NO EXCEPTIONS
- **ABSOLUTE REQUIREMENT: ZERO WARNINGS** - ALL warnings MUST be fixed before commit - NO EXCEPTIONS
- **NO lint errors allowed** - Any ESLint error blocks commit - ZERO TOLERANCE
- **NO lint warnings allowed** - Any ESLint warning blocks commit - ZERO TOLERANCE
- **NO TypeScript errors allowed** - Any TypeScript compilation error blocks commit - ZERO TOLERANCE
- **NO TypeScript warnings allowed** - Any TypeScript warning blocks commit - ZERO TOLERANCE
- **NO console errors in source code** - console.error() must be removed - Use Logger utility instead
- **NO console warnings in source code** - console.warn() must be removed - Use Logger utility instead
- **NO console.log for debugging** - Remove all debugging console.log statements before commit
- **NO import errors allowed** - Any import resolution error blocks commit - ZERO TOLERANCE
- **NO runtime errors allowed** - Code must not produce runtime errors - ZERO TOLERANCE
- **ALL errors and warnings must be fixed** - Not ignored, not suppressed, not bypassed - FIXED
- **NO EXCEPTIONS** - Not even for test files, not even for temporary code, not even with user permission
- **ESLint must run with --max-warnings 0** - Zero warnings allowed - ZERO TOLERANCE
- **TypeScript must compile with zero errors and warnings** - ZERO TOLERANCE
- **Validation runs before every commit** - Automated check ensures zero errors/warnings
- **Fix first, commit second** - Always - NO EXCEPTIONS
- **Enforcement:** Pre-commit hooks + ESLint --max-warnings 0 + TypeScript strict mode + automated validation scripts + zero tolerance policy

---

## 🔧 ENFORCEMENT MECHANISMS

### **⚠️ ALL RULES ARE MANDATORY AND ENFORCED IN BOTH PRE-COMMIT AND PR WORKFLOW ⚠️**

**PRE-COMMIT HOOK ENFORCEMENT (LOCAL - BLOCKS COMMITS):**
1. **Bypass Detection (Rule 9, 12, 13)** - Scans for all bypass methods, blocks commit if detected
2. **ESLint (Rule 1, 16)** - Zero errors/warnings, blocks commit if any found
3. **Zero Errors/Warnings Validation (Rule 1, 16)** - Comprehensive error/warning check, blocks commit if any found
4. **TypeScript (Rule 1, 16)** - Zero compilation errors, blocks commit if any found
5. **SOLID/DRY Analysis (Rule 2)** - Custom rule validation, blocks commit if violations found
6. **Unit Tests (Rule 3)** - 100% pass rate required, blocks commit if any fail
7. **Source Coverage Validation (Rule 3)** - 80% PER-FILE coverage required for EACH file individually, blocks commit if ANY file is below
8. **File Extension Check (Rule 6)** - Strict .tsx/.ts enforcement, blocks commit if violated
9. **Rule 17: File Structure Validation** - Hybrid component-based structure, blocks commit if violated
10. **Rule 18: Path Alias Validation** - @/ alias required for internal imports, blocks commit if relative paths found
11. **Presentational Components (Rule 5)** - Architecture validation, blocks commit if violated
12. **Code Reusability (Rule 4)** - Code reuse validation, blocks commit if violated
13. **No ESLint Disable (Rule 7)** - No eslint-disable comments allowed, blocks commit if found
14. **No Bypass (Rule 11)** - No bypassing allowed, blocks commit if detected
15. **No Config Modifications (Rule 10)** - Config changes require permission, blocks commit if unauthorized
16. **No Skip Checks (Rule 12)** - No skipping validations, blocks commit if detected
17. **No-Verify Prohibition (Rule 9)** - --no-verify forbidden, blocks commit if detected
18. **Rule 13 Validation** - All validations must pass, blocks commit if any fail
19. **Rule 15 Validation** - Continuous execution mandate, blocks commit if documentation incorrect
20. **Build Validation** - Production build success, blocks commit if build fails
21. **Security Audit** - No vulnerabilities, blocks commit if vulnerabilities found
22. **Comprehensive Validation (validate:all)** - Final comprehensive check, blocks commit if any check fails

**PR WORKFLOW ENFORCEMENT (CI/CD - BLOCKS PR MERGE):**
1. **ESLint (Rule 1, 16: MANDATORY)** - Zero errors/warnings, PR cannot merge if any found
2. **Zero Errors/Warnings Validation (Rule 1, 16: MANDATORY)** - Comprehensive check, PR cannot merge if any found
3. **TypeScript (Rule 1, 16: MANDATORY)** - Zero compilation errors, PR cannot merge if any found
4. **SOLID/DRY Analysis (Rule 2: MANDATORY)** - Custom rule validation, PR cannot merge if violations found
5. **Test Coverage (Rule 3: MANDATORY)** - 80% PER-FILE coverage required, PR cannot merge if ANY file is below
6. **Source Coverage Validation (Rule 3: MANDATORY)** - 80% PER-FILE for EACH file individually, PR cannot merge if ANY file is below
7. **File Extension Check (Rule 6: MANDATORY)** - Strict .tsx/.ts enforcement, PR cannot merge if violated
8. **Rule 17: File Structure Validation (MANDATORY)** - Hybrid structure, PR cannot merge if violated
9. **Rule 18: Path Alias Validation (MANDATORY)** - @/ alias required, PR cannot merge if relative paths found
10. **Presentational Components (Rule 5: MANDATORY)** - Architecture validation, PR cannot merge if violated
11. **Code Reusability (Rule 4: MANDATORY)** - Code reuse validation, PR cannot merge if violated
12. **No ESLint Disable (Rule 7: MANDATORY)** - No eslint-disable comments, PR cannot merge if found
13. **No Bypass (Rule 11: MANDATORY)** - No bypassing allowed, PR cannot merge if detected
14. **No Config Modifications (Rule 10: MANDATORY)** - Config changes require permission, PR cannot merge if unauthorized
15. **No Skip Checks (Rule 12: MANDATORY)** - No skipping validations, PR cannot merge if detected
16. **No-Verify Prohibition (Rule 9: MANDATORY)** - --no-verify forbidden, PR cannot merge if detected
17. **Rule 13 Validation (MANDATORY)** - All validations must pass, PR cannot merge if any fail
18. **Rule 15 Validation (MANDATORY)** - Continuous execution mandate, PR cannot merge if documentation incorrect
19. **Build Validation** - Production build success, PR cannot merge if build fails
20. **Security Audit** - No vulnerabilities, PR cannot merge if vulnerabilities found

**REQUIRED STATUS CHECKS:**
All validations above are configured as required status checks. PR merge is **ABSOLUTELY BLOCKED** until ALL checks pass.

### **Blocking Conditions:**
- **ANY BYPASS ATTEMPT** - Zero tolerance for bypassing - NOT EVEN WITH USER PERMISSION
- **ANY SKIP ATTEMPT** - Zero tolerance for skipping validation checks - NOT EVEN WITH USER PERMISSION
- **ANY AI AGENT BYPASS/SKIP ATTEMPT** - Absolute prohibition on AI agents skipping checks
- **ANY USER BYPASS/SKIP ATTEMPT** - Absolute prohibition - USER PERMISSION DOES NOT ALLOW BYPASSING
- **ALL VALIDATIONS MUST PASS** - No exceptions, not even with user permission
- Any ESLint error/warning
- Any TypeScript error
- Any import resolution failure
- Any SOLID/DRY principle violation
- Any code reusability violation
- Any presentational component violation
- Any file extension violation
- Any path alias violation (relative paths used instead of @/)
- Any unit test failure
- Coverage below 80% for ANY file in `src` folder (checked per-file, not aggregate)
- Any file below 80% on ANY metric (statements, functions, branches, lines)
- Any build failure
- Any security vulnerability
- Any code quality violation
- **Any validation check skipped or commented out** - Zero tolerance - NOT EVEN WITH USER PERMISSION

---

## 📋 DEVELOPMENT WORKFLOW

### **Before Every Commit:**
1. Run `npm run validate:all` - Comprehensive validation
2. Fix ALL issues found
3. Ensure 80% test coverage for EACH file individually in `src` folder
4. Verify that every file meets 80% for all 4 metrics (statements, functions, branches, lines)
4. Verify SOLID/DRY compliance
5. Commit only when ALL checks pass

### **Required Commands:**
- `npm run lint` - ESLint validation
- `npm run type-check` - TypeScript validation
- `npm run test` - Unit test execution
- `npm run test:coverage` - Coverage validation
- `npm run validate:solid-dry` - SOLID/DRY validation
- `npm run validate:all` - Complete validation suite

---

## ⚡ QUICK REFERENCE

### **SOLID Principles Checklist:**
- [ ] Single Responsibility - One class, one purpose
- [ ] Open/Closed - Extensible without modification
- [ ] Liskov Substitution - Proper inheritance
- [ ] Interface Segregation - Focused interfaces
- [ ] Dependency Inversion - Abstract dependencies

### **DRY Checklist:**
- [ ] No duplicate code blocks
- [ ] No duplicate logic
- [ ] No duplicate constants
- [ ] Extract common functionality
- [ ] Use shared utilities

### **Reusability Checklist:**
- [ ] Common functionality extracted to utilities
- [ ] Shared components created for repeated patterns
- [ ] Reusable hooks built for common logic
- [ ] No duplicate implementations
- [ ] Maximum code reuse achieved

### **Presentational Components Checklist:**
- [ ] Components contain only UI logic
- [ ] All business logic moved to custom hooks
- [ ] State management in hooks, not components
- [ ] Data fetching in hooks, not components
- [ ] Clean separation of concerns

### **File Extension Checklist:**
- [ ] Only components use .tsx extension
- [ ] All utilities use .ts extension
- [ ] All hooks use .ts extension
- [ ] All types use .ts extension
- [ ] All constants use .ts extension

### **File and Folder Structure Checklist (Rule 17):**
- [ ] All domains follow mandatory hybrid component-based structure (Rule 17.1)
- [ ] Component-specific code is co-located with components (tests, hooks, utils, constants, config)
- [ ] Shared code is in type-based folders (hooks/, services/, types/) (Rule 17.1)
- [ ] All pages follow mandatory hybrid component-based structure (Rule 17.2)
- [ ] All shared utilities follow mandatory shared structure (Rule 17.3)
- [ ] Root structure follows mandatory layout (Rule 17.4)
- [ ] Test files are co-located with source files (not in __tests__/) (Rule 17.5)
- [ ] All files follow naming conventions (PascalCase for components, camelCase for others) (Rule 17.6)
- [ ] All directories with exports have index.ts files (Rule 17.7)
- [ ] All styles are properly organized (global in styles/, component co-located) (Rule 17.8)
- [ ] All index.ts files use named exports
- [ ] Decision rule applied correctly (component-specific vs shared code separation)

### **No ESLint Disable Checklist:**
- [ ] No eslint-disable comments in any file
- [ ] Large files broken into smaller components
- [ ] Complex functions extracted into smaller functions
- [ ] All linting rules followed properly
- [ ] Code is clean and maintainable

### **Config File Modifications Checklist:**
- [ ] AI agent asked for permission before modifying config
- [ ] User explicitly approved config changes
- [ ] Config file changes documented in commit message
- [ ] No unauthorized config modifications
- [ ] Rule 10 compliance verified

### **Pre-Commit Validation Bypass Prevention Checklist:**
- [ ] NO --no-verify flag used (STRICTLY PROHIBITED - NOT EVEN WITH USER PERMISSION)
- [ ] NO environment variable bypasses (SKIP_HOOKS, SKIP_PRE_COMMIT, etc.)
- [ ] NO git flag bypasses used (NOT EVEN WITH USER PERMISSION)
- [ ] NO commit message bypasses attempted (NOT EVEN WITH USER PERMISSION)
- [ ] AI agent has NOT attempted any bypass
- [ ] User has NOT attempted any bypass (USER PERMISSION DOES NOT ALLOW BYPASSING)
- [ ] All validation checks passed before commit (REQUIRED - NO EXCEPTIONS)
- [ ] Rule 9 compliance verified
- [ ] Rule 13 compliance verified (ALL validations passed - NO EXCEPTIONS)

### **Fix Issues, Never Bypass Checklist:**
- [ ] All lint errors fixed in code
- [ ] No config files modified to bypass errors
- [ ] No validation rules relaxed or bypassed
- [ ] Large files broken down appropriately
- [ ] Complex functions simplified
- [ ] All issues fixed, not bypassed
- [ ] Rule 11 compliance verified

### **Continuous Execution Checklist (Rule 15 - No Unnecessary Interruptions):**
- [ ] AI agent continued working until task completion
- [ ] No mid-task stops to ask permission for routine continuations
- [ ] All related issues fixed in one session
- [ ] No unnecessary "should I continue?" questions
- [ ] Work continued systematically until zero violations remain
- [ ] Only stopped when explicit user permission needed for critical decisions
- [ ] Rule 15 compliance verified (continuous execution - no interruptions)

### **AI Agent Validation Skip/Bypass Prevention Checklist:**
- [ ] NO validation checks skipped or commented out
- [ ] NO "temporarily disabled" comments in validation code
- [ ] NO pre-commit hook modifications to skip checks
- [ ] NO validation script modifications to skip checks
- [ ] ALL validation checks remain active
- [ ] Infrastructure commits pass all validations
- [ ] AI agent has NOT attempted to skip any checks
- [ ] All issues fixed instead of bypassing
- [ ] Rule 12 compliance verified

### **All Validations Must Pass Checklist (Rule 13 - No Exceptions):**
- [ ] ALL pre-commit validations passed (REQUIRED - NO EXCEPTIONS)
- [ ] ALL PR workflow validations passed (REQUIRED - NO EXCEPTIONS)
- [ ] NO validations skipped, even with user permission
- [ ] NO validations bypassed, even with user permission
- [ ] ALL checks passed before commit
- [ ] ALL checks passed before merge
- [ ] User permission was NOT used to skip validations (NOT ALLOWED)
- [ ] All validation failures were fixed (NOT skipped or bypassed)
- [ ] Rule 13 compliance verified (ALL validations passed - NO EXCEPTIONS)

### **Testing Checklist (80% PER-FILE Coverage Required for `src` folder):**
- [ ] All components in `src` have unit tests written
- [ ] All functions in `src` have unit tests written
- [ ] All utilities in `src` have unit tests written
- [ ] All hooks in `src` have unit tests written
- [ ] All services in `src` have unit tests written
- [ ] **EACH file individually** has 80% coverage for statements
- [ ] **EACH file individually** has 80% coverage for functions
- [ ] **EACH file individually** has 80% coverage for branches
- [ ] **EACH file individually** has 80% coverage for lines
- [ ] All tests passing
- [ ] No code in `src` without corresponding tests
- [ ] Per-file coverage validation passes (no file below 80% on any metric)

---

## 📁 RULE 17: MANDATORY FILE AND FOLDER STRUCTURE

### **⚠️ MANDATORY STRUCTURE REQUIREMENTS - ALL NEW IMPLEMENTATIONS MUST FOLLOW THIS STRUCTURE ⚠️**

This rule defines the mandatory file and folder structure that **ALL** code must follow. This structure ensures:
- Consistent organization across the entire codebase
- Easy navigation and maintenance
- Clear separation of concerns
- Predictable file locations
- Scalable architecture

### **ZERO TOLERANCE - ALL FILES MUST FOLLOW THIS STRUCTURE**

---

### **1. DOMAIN STRUCTURE (MANDATORY FOR ALL DOMAINS) - HYBRID COMPONENT-BASED APPROACH**

Every domain in `src/domains/<domain-name>/` **MUST** follow this exact structure using a **hybrid approach**:
- **Component-specific code is co-located** with the component (component + its tests + component-specific hooks/utils/constants/config)
- **Shared code remains in type-based folders** (shared hooks/services/types used across multiple components)

```
src/domains/<domain-name>/
├── index.ts                    # Main domain exports (MANDATORY)
├── components/                 # Domain-specific UI components
│   ├── index.ts                # Component exports (MANDATORY)
│   ├── <ComponentName>/        # Component directory (CO-LOCATED STRUCTURE)
│   │   ├── index.ts            # Component export (MANDATORY)
│   │   ├── <ComponentName>.tsx # Component file (.tsx only)
│   │   ├── <ComponentName>.scss # Component styles (if needed)
│   │   ├── <ComponentName>.test.tsx # Component tests (CO-LOCATED)
│   │   ├── hooks/              # Component-specific hooks (CO-LOCATED)
│   │   │   ├── index.ts
│   │   │   └── use<ComponentName>.ts # Hook used ONLY by this component
│   │   ├── utils/              # Component-specific utilities (CO-LOCATED)
│   │   │   ├── index.ts
│   │   │   └── <utilityName>.ts # Utility used ONLY by this component
│   │   ├── constants/          # Component-specific constants (CO-LOCATED)
│   │   │   ├── index.ts
│   │   │   └── <constantsName>.ts # Constants used ONLY by this component
│   │   ├── config/             # Component-specific config (CO-LOCATED)
│   │   │   ├── index.ts
│   │   │   └── <configName>.ts # Config used ONLY by this component
│   │   └── types/              # Component-specific types (CO-LOCATED)
│   │       ├── index.ts
│   │       └── <typesName>.ts  # Types used ONLY by this component
│   ├── modals/                 # Modal components (if applicable)
│   │   ├── <ModalName>/        # Modal component directory (CO-LOCATED)
│   │   │   ├── index.ts
│   │   │   ├── <ModalName>.tsx
│   │   │   ├── <ModalName>.test.tsx
│   │   │   ├── hooks/          # Modal-specific hooks
│   │   │   ├── utils/          # Modal-specific utilities
│   │   │   ├── constants/      # Modal-specific constants
│   │   │   └── formFields/     # Form field components (if applicable)
│   │   │       └── <FieldName>/ # Field component directory (CO-LOCATED)
│   │   │           ├── index.ts
│   │   │           ├── <FieldName>.tsx
│   │   │           └── <FieldName>.test.tsx
│   │   └── shared/             # Shared modal utilities/hooks/types
│   │       ├── index.ts
│   │       └── <sharedName>.ts # Shared across multiple modals
│   └── <domain>.scss           # Domain-specific shared styles (if needed)
├── hooks/                      # SHARED hooks (used across MULTIPLE components)
│   ├── index.ts                 # Hook exports (MANDATORY)
│   ├── use<HookName>.ts         # Shared hook files (.ts only)
│   └── utils/                  # Shared hook utilities
│       ├── index.ts
│       ├── <utilityName>.ts
│       └── helpers/             # Helper functions for shared hooks
│           ├── index.ts
│           └── <helperName>.ts
├── services/                    # Domain-specific services (SHARED across components)
│   ├── index.ts                 # Service exports (MANDATORY)
│   ├── <serviceName>.ts        # Main service files (.ts only)
│   └── <subdomain>/             # Subdomain organization (if needed)
│       ├── index.ts
│       ├── <serviceName>.ts
│       └── base/                # Base services (if applicable)
│           ├── index.ts
│           └── <baseService>.ts
└── types/                       # Domain-specific types (SHARED across components)
    ├── index.ts                 # Type exports (MANDATORY)
    ├── base.ts                  # Base types
    ├── forms.ts                 # Form types
    ├── responses.ts             # API response types
    └── <specificTypes>.ts       # Additional shared type files as needed
```

**DECISION RULE: When to use component directory vs shared folders**

**USE COMPONENT DIRECTORY (Co-location) when:**
- ✅ Hook/utility/constant/config is used **ONLY by ONE component**
- ✅ Code is tightly coupled to the component
- ✅ Moving code would break component encapsulation
- ✅ Code would not be reused by other components

**USE SHARED FOLDERS (Type-based) when:**
- ✅ Hook/service/type is used by **MULTIPLE components**
- ✅ Code provides shared domain functionality
- ✅ Code is part of the domain's public API
- ✅ Code needs to be imported across different components

**MANDATORY REQUIREMENTS:**
- **Every domain MUST have** `index.ts` at the root
- **Every component directory MUST have** `index.ts` for the component export
- **Every subdirectory MUST have** `index.ts` for exports
- **Components MUST use** `.tsx` extension only
- **All other files MUST use** `.ts` extension only
- **Component-specific code MUST be co-located** with the component
- **Shared code MUST be in type-based folders** (hooks/, services/, types/)
- **Tests MUST be co-located** with the component they test
- **No files outside this structure** - All domain code must be organized within these folders

---

### **2. PAGE STRUCTURE (MANDATORY FOR ALL PAGES) - HYBRID COMPONENT-BASED APPROACH**

Every page in `src/pages/<page-name>/` **MUST** follow this exact structure using the **same hybrid approach**:

```
src/pages/<page-name>/
├── index.ts                     # Page exports (MANDATORY)
├── <PageName>/                  # Page component directory (CO-LOCATED)
│   ├── index.ts                 # Page component export (MANDATORY)
│   ├── <PageName>.tsx           # Main page component (.tsx only)
│   ├── <PageName>.scss          # Page styles (if needed)
│   ├── <PageName>.test.tsx      # Page tests (CO-LOCATED)
│   ├── hooks/                   # Page-specific hooks (CO-LOCATED)
│   │   ├── index.ts
│   │   └── use<PageName>.ts     # Hook used ONLY by this page
│   ├── utils/                   # Page-specific utilities (CO-LOCATED)
│   │   ├── index.ts
│   │   └── <utilityName>.ts     # Utility used ONLY by this page
│   ├── constants/               # Page-specific constants (CO-LOCATED)
│   │   ├── index.ts
│   │   └── <constantsName>.ts  # Constants used ONLY by this page
│   └── config/                  # Page-specific config (CO-LOCATED)
│       ├── index.ts
│       └── <configName>.ts      # Config used ONLY by this page
├── components/                   # Page-specific components
│   ├── index.ts                  # Component exports (MANDATORY)
│   └── <ComponentName>/         # Component directory (CO-LOCATED)
│       ├── index.ts
│       ├── <ComponentName>.tsx
│       ├── <ComponentName>.test.tsx
│       ├── hooks/               # Component-specific hooks
│       ├── utils/               # Component-specific utilities
│       ├── constants/           # Component-specific constants
│       └── config/              # Component-specific config
└── shared/                      # Shared page-level code (if multiple components share)
    ├── index.ts
    ├── hooks/                   # Shared hooks across page components
    │   └── use<SharedHook>.ts
    └── utils/                   # Shared utilities across page components
        └── <sharedUtility>.ts
```

**MANDATORY REQUIREMENTS:**
- **Every page MUST have** `index.ts` at the root
- **Every page component MUST have** its own directory with co-located files
- **Every component MUST have** its own directory if it has component-specific code
- **Page-specific code MUST be co-located** with the page/component
- **Shared page-level code MUST be in** `shared/` directory
- **Tests MUST be co-located** with the component/page they test

---

### **3. SHARED UTILITIES STRUCTURE**

The `src/shared/` directory **MUST** follow this structure:

```
src/shared/
├── index.ts                     # Main shared exports (MANDATORY)
├── api/                         # API utilities (if applicable)
├── formatters/                  # Formatter utilities
│   ├── index.ts                 # Formatter exports (MANDATORY)
│   └── <formatterName>.ts       # Formatter files (.ts only)
├── types/                       # Shared types
│   ├── index.ts                 # Type exports (MANDATORY)
│   └── <typeName>.ts            # Type files (.ts only)
└── validation/                  # Validation utilities
    ├── index.ts                 # Validation exports (MANDATORY)
    └── <validatorName>.ts       # Validator files (.ts only)
```

**MANDATORY REQUIREMENTS:**
- **Every subdirectory MUST have** `index.ts` for exports
- **No components in shared** - Components go in `src/components/`
- **Only reusable utilities** - Shared code only

---

### **4. ROOT LEVEL STRUCTURE**

The `src/` directory **MUST** follow this structure:

```
src/
├── components/                  # Shared UI components (tests co-located)
│   ├── index.ts                 # Component exports (MANDATORY)
│   ├── layout/                  # Layout components
│   │   └── <LayoutName>.tsx
│   ├── ui/                      # UI components
│   │   └── <ComponentName>.tsx
│   └── forms/                   # Form components
│       └── <FormName>.tsx
├── constants/                   # Application constants
│   └── index.ts                 # Constant exports (MANDATORY)
├── domains/                     # Domain-driven architecture
│   └── <domain>/                # Domain structure (see Rule 17.1)
├── hooks/                        # Shared hooks
│   ├── index.ts                 # Hook exports (MANDATORY)
│   ├── components/              # Component-specific hooks
│   │   └── <HookName>.ts
│   └── utils/                  # Hook utilities
│       └── <utilityName>.ts
├── pages/                       # Page components
│   └── <page>/                  # Page structure (see Rule 17.2)
├── services/                    # Shared services
│   ├── index.ts                 # Service exports (MANDATORY)
│   └── <serviceName>.ts         # Service files (.ts only)
├── shared/                      # Shared utilities
│   └── <category>/              # Shared category (see Rule 17.3)
├── stores/                      # State management (if applicable)
├── styles/                      # Global styles
│   ├── _variables.scss          # SCSS variables
│   ├── _mixins.scss             # SCSS mixins
│   └── theme.scss               # Theme styles
├── types/                       # Global types
│   └── index.ts                 # Type exports (MANDATORY)
├── utils/                       # Utility functions
│   ├── <utilityName>.ts         # Utility files (.ts only)
│   └── logger.ts                # Logging utilities
├── App.tsx                      # Main app component
├── index.scss                   # Global styles entry
├── main.tsx                     # Application entry point
└── setupTests.ts                # Test setup
```

---

### **5. TEST FILE STRUCTURE (MANDATORY) - CO-LOCATED WITH SOURCE**

**⚠️ CRITICAL CHANGE: Tests are now CO-LOCATED with their source files, NOT in `__tests__/` directory ⚠️**

Test files **MUST** be co-located with the files they test:

```
src/
├── domains/<domain>/components/<ComponentName>/
│   ├── <ComponentName>.tsx
│   ├── <ComponentName>.test.tsx        # CO-LOCATED with component
│   ├── <ComponentName>.<category>.test.tsx  # Category tests (CO-LOCATED)
│   └── hooks/
│       ├── use<ComponentName>.ts
│       └── use<ComponentName>.test.ts  # CO-LOCATED with hook
├── domains/<domain>/hooks/
│   ├── use<SharedHook>.ts
│   └── use<SharedHook>.test.ts         # CO-LOCATED with shared hook
├── services/
│   ├── <serviceName>.ts
│   └── <serviceName>.test.ts            # CO-LOCATED with service
└── utils/
    ├── <utilityName>.ts
    └── <utilityName>.<category>.test.ts # CO-LOCATED with utility
```

**MANDATORY REQUIREMENTS:**
- **Test files MUST be co-located** with the source files they test (same directory)
- **Test files MUST use** `.test.ts` or `.test.tsx` extension
- **Test naming MUST match** source file names with `.test` suffix
- **Test categories** can be added with dot notation: `<FileName>.<category>.test.ts`
- **NO separate `__tests__/` directory** - All tests live with their source files
- **Component tests** use `.test.tsx` extension
- **Hook/service/utility tests** use `.test.ts` extension

**EXAMPLES:**
- `src/domains/banking/components/AccountManagement/AccountManagement.tsx` → `src/domains/banking/components/AccountManagement/AccountManagement.test.tsx`
- `src/domains/banking/components/AccountManagement/hooks/useAccountManagement.ts` → `src/domains/banking/components/AccountManagement/hooks/useAccountManagement.test.ts`
- `src/domains/banking/hooks/useSharedHook.ts` → `src/domains/banking/hooks/useSharedHook.test.ts`
- `src/utils/localStorage.ts` → `src/utils/localStorage.get.test.ts`

**BENEFITS OF CO-LOCATION:**
- ✅ Easier to find tests for a specific file
- ✅ Better code organization and ownership
- ✅ Tests move with components during refactoring
- ✅ Clear visibility of test coverage per file
- ✅ Reduced cognitive load when working on a component

---

### **6. FILE NAMING CONVENTIONS (MANDATORY)**

**COMPONENT FILES:**
- **MUST use** PascalCase: `AccountManagement.tsx`
- **MUST use** `.tsx` extension only
- **MUST match** component name exactly

**HOOK FILES:**
- **MUST use** camelCase with `use` prefix: `useAccountManagement.ts`
- **MUST use** `.ts` extension only
- **MUST match** hook name exactly

**SERVICE FILES:**
- **MUST use** camelCase: `accountService.ts`
- **MUST use** `.ts` extension only
- **MUST match** service name exactly

**UTILITY FILES:**
- **MUST use** camelCase: `localStorage.ts`
- **MUST use** `.ts` extension only

**TYPE FILES:**
- **MUST use** camelCase: `base.ts`, `forms.ts`, `responses.ts`
- **MUST use** `.ts` extension only

**STYLE FILES:**
- **MUST use** camelCase or kebab-case: `banking.scss` or `banking-styles.scss`
- **MUST use** `.scss` extension only
- **MUST be co-located** with components or in `styles/` directory

---

### **7. INDEX FILE REQUIREMENTS (MANDATORY)**

**EVERY directory that contains exports MUST have an `index.ts` file:**

- **MUST export** all public APIs from the directory
- **MUST use** named exports (not default exports)
- **MUST be present** in:
  - Domain root: `src/domains/<domain>/index.ts`
  - Components: `src/domains/<domain>/components/index.ts`
  - Hooks: `src/domains/<domain>/hooks/index.ts`
  - Services: `src/domains/<domain>/services/index.ts`
  - Types: `src/domains/<domain>/types/index.ts`
  - Pages: `src/pages/<page>/index.ts`
  - Shared utilities: `src/shared/<category>/index.ts`

**INDEX FILE FORMAT:**
```typescript
/**
 * <Directory> Exports
 * 
 * Brief description of what this directory exports.
 */

export { <Export1> } from './<file1>'
export { <Export2> } from './<file2>'
export type { <Type1> } from './<types>'
```

---

### **8. STYLES ORGANIZATION (MANDATORY)**

**GLOBAL STYLES:**
- **MUST be in** `src/styles/` directory
- **MUST use** SCSS with variables and mixins
- **MUST be imported** in `src/index.scss`

**DOMAIN-SPECIFIC STYLES:**
- **MUST be co-located** with domain components
- **MUST use** naming: `<domain>.scss` (e.g., `banking.scss`)
- **MUST be imported** in component files or domain index

**COMPONENT-SPECIFIC STYLES:**
- **MUST be co-located** with component files
- **MUST use** naming: `<ComponentName>.scss`
- **MUST be imported** in component file

**PAGE-SPECIFIC STYLES:**
- **MUST be co-located** with page component
- **MUST use** naming: `<PageName>.scss`
- **MUST be imported** in page component

---

### **9. BENEFITS AND LIMITATIONS OF HYBRID COMPONENT-BASED STRUCTURE**

#### **✅ BENEFITS:**

**1. Component Co-location Benefits:**
- **Easier navigation** - All component-related code in one place
- **Better encapsulation** - Component-specific code stays with the component
- **Easier refactoring** - Move component = move all related code together
- **Clear ownership** - Easy to see what belongs to which component
- **Reduced cognitive load** - Everything related to a component is visible
- **Better test discoverability** - Tests are right next to the code they test

**2. Shared Code Benefits:**
- **Reusability** - Shared hooks/services/types are easy to find and reuse
- **Consistency** - Shared code ensures consistent patterns across components
- **Discoverability** - Easy to see what's available for reuse
- **Domain organization** - Type-based folders maintain domain boundaries

**3. Hybrid Approach Benefits:**
- **Best of both worlds** - Component co-location + shared code organization
- **Clear decision rules** - Explicit criteria for component-specific vs shared
- **Scalable** - Works for both small and large components
- **Flexible** - Can adapt structure as component needs change

#### **⚠️ LIMITATIONS AND CONSIDERATIONS:**

**1. Component Directory Limitations:**
- **Migration effort** - Existing code needs reorganization (one-time cost)
- **Imports need updates** - Component-specific code imports change
- **Larger component directories** - Complex components may have many subdirectories
- **Shared code detection** - Need discipline to move code from component to shared when reused

**2. Shared Code Limitations:**
- **Shared code discovery** - Need to check if code already exists before creating new
- **Dependency management** - Shared code creates dependencies between components
- **Breaking changes** - Changes to shared code affect multiple components

**3. Decision Making:**
- **Judgment required** - Developers must decide component-specific vs shared
- **Refactoring needed** - Code may need to move when reuse increases
- **Consistency** - Team must consistently apply decision rules

#### **📋 MITIGATION STRATEGIES:**

**1. Clear Decision Rules (Already Documented):**
- Use component directory if used by ONE component
- Use shared folders if used by MULTIPLE components
- Document shared code in domain index.ts files

**2. Code Review Process:**
- Review new components for proper structure placement
- Check if new code should be shared before creating component-specific
- Suggest moving code from component to shared when appropriate

**3. Regular Refactoring:**
- Periodically review component-specific code for reuse opportunities
- Move code from component directories to shared folders when reused
- Keep component directories lean with truly component-specific code

**4. Documentation:**
- Document shared hooks/services/types in domain index.ts
- Add comments explaining why code is component-specific
- Keep decision rule visible in code review guidelines

#### **🎯 WHEN TO USE THIS STRUCTURE:**

**✅ BEST FOR:**
- Medium to large applications with many components
- Teams that value code organization and discoverability
- Projects with reusable domain logic
- Codebases that need clear component boundaries
- Teams comfortable with directory-based organization

**⚠️ CONSIDER ALTERNATIVES FOR:**
- Very small applications (< 10 components)
- Prototypes or proof-of-concepts
- Teams new to React/TypeScript (may prefer simpler flat structure initially)

#### **🔍 COMPARISON WITH ALTERNATIVE APPROACHES:**

**Pure Component-Based (All code co-located):**
- ✅ Best for component isolation
- ❌ Harder to find shared code
- ❌ Duplication risk if not careful

**Pure Type-Based (Current old structure):**
- ✅ Easy to find all hooks/services at once
- ❌ Harder to see component relationships
- ❌ Tests separated from source

**Hybrid Approach (This structure):**
- ✅ Component co-location + shared code organization
- ✅ Best balance of benefits
- ⚠️ Requires discipline in decision-making

---

### **10. ENFORCEMENT**

**⚠️ RULE 17 IS MANDATORY AND ENFORCED IN BOTH PRE-COMMIT AND PR WORKFLOW ⚠️**

**PRE-COMMIT VALIDATION (LOCAL):**
- ✅ **Rule 17 file structure validation runs automatically** on every commit
- ✅ **Commit is blocked** if structure violations are found
- ✅ **Zero tolerance** - No exceptions, not even with user permission
- File structure validation scripts check:
  - Component directory structure compliance
  - Index file presence checks
  - File naming convention validation
  - Extension validation (.tsx for components, .ts for others)
  - Directory structure compliance
  - Test co-location validation

**PR WORKFLOW VALIDATION (CI/CD):**
- ✅ **Rule 17 file structure validation runs on every PR**
- ✅ **PR cannot be merged** if structure violations are found
- ✅ **Required status check** - PR merge is blocked until validation passes
- ✅ **Zero tolerance** - No exceptions, not even with user permission
- GitHub Actions workflow enforces Rule 17 as a mandatory check

**VIOLATION CONSEQUENCES:**
- ❌ **Commit blocked** - Files not following structure (pre-commit hook)
- ❌ **PR blocked** - Files not following structure (CI/CD pipeline)
- ❌ **Build failure** - CI/CD pipeline stops
- ❌ **Code review rejection** - Must reorganize files
- ❌ **Merge impossible** - PR cannot be merged until violations are fixed

---

### **11. MIGRATION GUIDELINES**

**When adding new code:**
1. **Follow the structure** defined in this rule
2. **Decide if code is component-specific or shared** using the decision rule
3. **Co-locate component-specific code** with the component (tests, hooks, utils, constants, config)
4. **Place shared code** in type-based folders (hooks/, services/, types/)
5. **Create index.ts files** for all export directories
6. **Use correct file extensions** (.tsx for components, .ts for others)
7. **Use correct naming conventions** (PascalCase for components, camelCase for others)
8. **Co-locate tests** with source files (not in __tests__/)

**When refactoring existing code:**
1. **Reorganize files** to match mandatory structure
2. **Move component-specific code** to component directories
3. **Move shared code** to type-based folders (hooks/, services/, types/)
4. **Co-locate test files** with their source files
5. **Create missing index.ts files**
6. **Update imports** to use index.ts exports and new file locations
7. **Update documentation** to reflect new structure

---

### **12. STRUCTURE COMPLIANCE CHECKLIST:**

- [ ] All domains follow Rule 17.1 structure
- [ ] All pages follow Rule 17.2 structure
- [ ] All shared utilities follow Rule 17.3 structure
- [ ] All files use correct extensions (.tsx for components, .ts for others)
- [ ] All files follow naming conventions (PascalCase for components, camelCase for others)
- [ ] All directories with exports have index.ts files
- [ ] All test files are co-located with their source files (in same directory or `__tests__/` subfolder within component)
- [ ] All styles are properly organized (global in styles/, domain co-located, component co-located)
- [ ] All index.ts files use named exports
- [ ] Root structure follows Rule 17.4 layout

---

**⚠️ THIS STRUCTURE IS MANDATORY - ALL NEW IMPLEMENTATIONS MUST FOLLOW IT ⚠️**

**⚠️ ZERO TOLERANCE - FILES NOT FOLLOWING THIS STRUCTURE WILL BLOCK COMMIT AND PR ⚠️**

**⚠️ ENFORCEMENT:**
- ✅ **Pre-commit hook blocks commits** - Rule 17 validation runs before every commit
- ✅ **PR workflow blocks merges** - Rule 17 validation runs on every pull request
- ✅ **Required status check** - PR cannot be merged until Rule 17 validation passes
- ✅ **No exceptions** - Not even with user permission

**⚠️ EXISTING CODE MUST BE REFACTORED TO MATCH THIS STRUCTURE OVER TIME ⚠️**

---

## 🔗 RULE 18: PATH ALIAS ENFORCEMENT - @/ ALIAS REQUIRED FOR INTERNAL IMPORTS

### **⚠️ MANDATORY REQUIREMENT - ALL INTERNAL IMPORTS MUST USE @/ ALIAS ⚠️**

**ABSOLUTE REQUIREMENT:**
- ✅ **ALL internal imports MUST use `@/` path alias** - Zero tolerance for relative paths
- ❌ **Relative paths (`../`, `./`) are FORBIDDEN** for internal imports
- ✅ **External packages are allowed** as-is (react, react-dom, etc.)

### **REQUIREMENTS:**

1. **Internal Imports (MANDATORY):**
   - ✅ **MUST use `@/` alias** for all files in `src/`
   - ❌ **MUST NOT use relative paths** (`../`, `./`)
   - ❌ **MUST NOT use other aliases** (`~/`, `*/`, etc.)

2. **External Packages (ALLOWED):**
   - ✅ **External packages** can be imported normally
   - ✅ **Allowed:** `react`, `react-dom`, `zustand`, `react-router-dom`, `date-fns`, `clsx`, etc.

3. **Examples:**

   **❌ FORBIDDEN (Relative paths):**
   ```typescript
   import { Component } from '../components/Component'
   import { service } from '../../services/service'
   import { hook } from './hooks/useHook'
   ```

   **✅ REQUIRED (@/ alias):**
   ```typescript
   import { Component } from '@/components/Component'
   import { service } from '@/services/service'
   import { hook } from '@/hooks/useHook'
   ```

   **✅ ALLOWED (External packages):**
   ```typescript
   import React from 'react'
   import { useState } from 'react'
   import { useStore } from 'zustand'
   ```

### **BENEFITS:**
- ✅ **Consistency** - All imports follow the same pattern
- ✅ **Refactoring-friendly** - Imports don't break when files move (within src/)
- ✅ **Clarity** - Clear distinction between internal and external imports
- ✅ **Maintainability** - Easier to understand import paths

### **ENFORCEMENT:**

**PRE-COMMIT VALIDATION:**
- ✅ Path alias validation runs automatically before every commit
- ✅ Commit is blocked if relative paths are detected
- ✅ Zero tolerance - No exceptions

**PR WORKFLOW VALIDATION:**
- ✅ Path alias validation runs on every PR
- ✅ PR cannot be merged if violations are found
- ✅ Required status check - PR merge blocked until validation passes
- ✅ Zero tolerance - No exceptions

**VIOLATION CONSEQUENCES:**
- ❌ **Commit blocked** - Pre-commit hook prevents commit
- ❌ **PR blocked** - CI/CD prevents merge
- ❌ **Build failure** - Pipeline stops on violations
- ❌ **Code review rejection** - Must fix before review approval

### **MIGRATION:**

**For new code:**
1. **Always use `@/` alias** for internal imports
2. **Never use relative paths** (`../`, `./`) for internal imports
3. **External packages** remain unchanged

**For existing code:**
1. **Replace all relative paths** with `@/` aliases
2. **Convert:** `../components/Component` → `@/components/Component`
3. **Convert:** `../../services/service` → `@/services/service`
4. **Keep external packages** as-is

---

## 🚫 VIOLATION CONSEQUENCES

**Any violation of these rules results in:**
- ❌ **Commit blocked** - No exceptions
- ❌ **Build failure** - CI/CD pipeline stops
- ❌ **Code review rejection** - Must fix before merge
- ❌ **Zero tolerance** - No bypassing allowed

---

## 📞 ESCALATION PROCESS

**If you believe a rule needs modification:**
1. **Document the exception** - Explain why
2. **Get explicit permission** - From project owner
3. **Update this document** - Only with permission
4. **Update enforcement** - Modify scripts accordingly

---

**⚠️ THIS DOCUMENT IS LOCKED - NO AI AGENT CAN MODIFY WITHOUT EXPLICIT PERMISSION ⚠️**

**⚠️ AI AGENTS ARE FORBIDDEN FROM USING --no-verify OR ANY BYPASS METHODS ⚠️**

**⚠️ AI AGENTS ARE ABSOLUTELY PROHIBITED FROM SKIPPING OR BYPASSING ANY VALIDATION CHECKS - PRESENT OR FUTURE ⚠️**

**⚠️ AI AGENTS CANNOT COMMENT OUT, DISABLE, OR TEMPORARILY SKIP ANY VALIDATION - ZERO TOLERANCE ⚠️**

**⚠️ ALL VALIDATION CHECKS MUST REMAIN ACTIVE AT ALL TIMES - NO EXCEPTIONS - INFRASTRUCTURE COMMITS INCLUDED ⚠️**

**⚠️ USER PERMISSION DOES NOT ALLOW BYPASSING VALIDATIONS - ALL CHECKS MUST PASS - NO EXCEPTIONS ⚠️**

**⚠️ NO ONE CAN SKIP OR BYPASS VALIDATIONS - NOT USERS, NOT AI AGENTS, NOT ANYONE - ABSOLUTE PROHIBITION ⚠️**

**⚠️ ALL VALIDATIONS MUST PASS FOR PRE-COMMIT AND PR WORKFLOW - NOT EVEN WITH USER PERMISSION ⚠️**

**⚠️⚠️⚠️ RULE 15 PRIORITY: AI AGENTS MUST CONTINUE EXECUTING TASKS WITHOUT STOPPING FOR PERMISSION - UNINTERRUPTED WORK UNTIL COMPLETION ⚠️⚠️⚠️**

**⚠️⚠️⚠️ NO MID-TASK INTERRUPTIONS - AI AGENTS WORK SYSTEMATICALLY UNTIL ALL ISSUES ARE RESOLVED - THIS IS MANDATORY ⚠️⚠️⚠️**

**⚠️⚠️⚠️ AI AGENTS: CHECK THIS RULE BEFORE EVERY RESPONSE - DO NOT STOP MID-TASK - CONTINUE UNTIL COMPLETE ⚠️⚠️⚠️**

**⚠️⚠️⚠️ IF USER SAYS "FIX", "CONTINUE", OR SIMILAR - WORK UNTIL ALL ERRORS ARE ZERO - NO PERMISSION NEEDED ⚠️⚠️⚠️**

---

## 📋 COMPREHENSIVE RULE ENFORCEMENT SUMMARY

### **⚠️⚠️⚠️ ALL RULES ARE MANDATORY - ENFORCED IN PRE-COMMIT AND PR WORKFLOW ⚠️⚠️⚠️**

**ABSOLUTE REQUIREMENT: ALL 18 RULES MUST BE FOLLOWED - NO EXCEPTIONS**

#### **CODE QUALITY RULES (MANDATORY):**
- ✅ **Rule 1 & 16: Zero Errors/Warnings** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 2: SOLID & DRY Principles** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 3: 80% Test Coverage** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**

#### **ARCHITECTURE RULES (MANDATORY):**
- ✅ **Rule 4: Code Reusability** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 5: Presentational Components** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 6: File Extension Strictness** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 17: Mandatory File Structure** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 18: Path Alias Enforcement (@/ required)** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**

#### **COMPLIANCE RULES (MANDATORY):**
- ✅ **Rule 7: No ESLint Disable** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 8: No Temporary Validation Adjustments** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 9: --no-verify FORBIDDEN** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 10: No Config Modifications** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 11: Fix Issues, Never Bypass** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 12: AI Agents Cannot Skip Validations** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 13: All Validations Must Pass** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 14: Fix Issues, Never Disable Rules** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Rule 15: Continuous Execution** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**

#### **BUILD & SECURITY (MANDATORY):**
- ✅ **Build Validation** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**
- ✅ **Security Audit** - Enforced in pre-commit AND PR workflow - **BLOCKS COMMIT AND PR IF FAILED**

**ENFORCEMENT LOCATIONS:**
1. **Pre-commit hook** (`.husky/pre-commit`) - Runs before every commit - **LOCAL ENFORCEMENT**
2. **PR workflow** (`.github/workflows/pr-validation.yml`) - Runs on every PR - **CI/CD ENFORCEMENT**
3. **Required status checks** - PR merge blocked until ALL checks pass - **REMOTE ENFORCEMENT**

**ZERO TOLERANCE POLICY:**
- ❌ **No exceptions** - Not even with user permission
- ❌ **No bypassing** - Not for users, not for AI agents, not for anyone
- ❌ **No skipping** - All validations must run and pass
- ❌ **No temporary adjustments** - Rules are permanently enforced
- ❌ **No --no-verify** - Absolutely forbidden under all circumstances

**VIOLATION CONSEQUENCES:**
- ❌ **Commit blocked** - Pre-commit hook prevents commit
- ❌ **PR blocked** - CI/CD prevents merge
- ❌ **Build failure** - Pipeline stops on any violation
- ❌ **Code review rejection** - Must fix before review approval
- ❌ **Merge impossible** - Cannot merge until all rules pass

---

**Last Updated:** 2024 (Version 2.8 - Added Rule 18: Path alias enforcement - @/ required for internal imports)  
**Next Review:** As needed with explicit permission  
**Enforcement Status:** ACTIVE - Zero Tolerance + Absolute Bypass Prevention + Continuous Execution Mandate + Structure Validation + Path Alias Enforcement + **ALL RULES ENFORCED IN PRE-COMMIT AND PR WORKFLOW**
