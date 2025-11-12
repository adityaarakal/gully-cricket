# Validation Fix Tasks - Complete Checklist

## Summary
**Total Issues**: 189 errors + 427 warnings = 616 problems

## Statistics
- **Files >100 lines**: 44 files need splitting
- **Functions >50 lines**: 133 functions need refactoring  
- **Unused variables**: 4 instances
- **Max params violations**: 2 instances
- **No-var-requires**: 1 instance
- **Magic numbers**: ~200+ warnings
- **TypeScript `any`**: ~150+ warnings
- **Non-null assertions**: ~20 warnings

## Critical Errors (189) - Must Fix

### 1. File Line Count Violations (>100 lines) - Priority: HIGH
**Rule**: `max-lines: ['error', 100]`
**Total**: 44 files
**Files to Split**:
- [ ] `AccountManagement.basic.test.tsx` (120 lines)
- [ ] `AccountManagement.modals.open.test.tsx` (115 lines)
- [ ] `AccountModals.rendering.test.tsx` (108 lines)
- [ ] `AccountsTable.interactions.test.tsx` (102 lines)
- [ ] `BankManagement.modals.test.tsx` (119 lines)
- [ ] `CreateAccountModal.submission.test.tsx` (114 lines)
- [ ] `DeleteAccountModal.deletion.test.tsx` (111 lines)
- [ ] `EditBankModal.submission.test.tsx` (102 lines)
- [ ] `BaseService.getters.test.ts` (111 lines)
- [ ] `BaseService.utilities.test.ts` (109 lines)
- [ ] `balanceOperations.consolidated.test.ts` (112 lines)
- [ ] `balanceStorage.test.ts` (120 lines)
- [ ] `entityOperations.updateAccount.test.ts` (114 lines)
- [ ] `updateBalanceService.executeBalanceUpdate.test.ts` (108 lines)
- [ ] `useBankManagement.operations.test.ts` (109 lines)
- [ ] `hookHelpers.computed.test.ts` (113 lines)
- [ ] `creditCardTransactionService.addTransaction.success.test.ts` (109 lines)
- [ ] `paymentFactory.test.ts` (108 lines)
- [ ] `useExpenses.test.ts` (107 lines)
- [ ] `formatters.test.ts` (118 lines)

**Total Files**: ~20 files

### 2. Function Line Count Violations (>50 lines) - Priority: HIGH
**Rule**: `max-lines-per-function: ['error', { max: 50, skipBlankLines: true, skipComments: true }]`
**Count**: ~80+ functions to refactor

**Common Patterns**:
- Test setup functions in `beforeEach` hooks
- Large mock object definitions
- Multiple test cases in single describe block

**Files with Most Violations**:
- [ ] `AccountFilters.filter.test.tsx` - setup function (62 lines)
- [ ] `AccountManagement.basic.test.tsx` - defaultHookReturn (87 lines)
- [ ] `AccountManagement.modalClose.*` - setup functions (64 lines each)
- [ ] `AccountModals.callbacks.test.tsx` - setup (60 lines)
- [ ] `AccountModals.rendering.test.tsx` - setup (72 lines)
- [ ] `AccountsList.test.tsx` - setup (67 lines)
- [ ] `AccountsTable.interactions.test.tsx` - setup (78 lines)
- [ ] `AccountsTable.rendering.*` - setup functions (64-72 lines)
- [ ] `BankManagement.basic.test.tsx` - setup (54 lines)
- [ ] `BankManagement.modalSubmit.test.tsx` - setup (63 lines)
- [ ] `BankModals.test.tsx` - setup (53 lines)
- [ ] `CreateAccountModal.*` - setup functions (52-82 lines)
- [ ] `CreateBankModal.*` - setup functions (56-68 lines)
- [ ] `DeleteAccountModal.deletion.test.tsx` - setup (77 lines)
- [ ] `DeleteBankModal.deletion.test.tsx` - setup (71 lines)
- [ ] `EditAccountModal.*` - setup functions (57-59 lines)
- [ ] `EditBankModal.submission.test.tsx` - setup (73 lines)
- [ ] `UpdateBalanceModal.*` - setup functions (53-66 lines)
- [ ] `formUtils.validation.test.ts` - describe block (78 lines)
- [ ] `useAccountManagement.operations.test.ts` - setup (60 lines)
- [ ] `useBankManagement.modals.test.ts` - setup (60 lines)
- [ ] `useBankManagement.operations.test.ts` - setup (69 lines)
- [ ] `accountHandlers.*` - setup functions (53-75 lines)
- [ ] `createBankHandler.test.ts` - setup (53 lines)
- [ ] `deleteBankHandler.test.ts` - setup (75 lines)
- [ ] `updateBankHandler.test.ts` - setup (58 lines)
- [ ] `hookHelpers.clickHandlers.test.ts` - setup (79 lines)
- [ ] `hookHelpers.computed.test.ts` - setup (92 lines)
- [ ] `useAccountHandlers.test.ts` - setup (76 lines)
- [ ] `accountValidation.updateForms.test.ts` - describe (53 lines)
- [ ] `balanceOperations.consolidated.test.ts` - describe (98 lines)
- [ ] `balanceOperations.history.test.ts` - setup (71 lines) + helper function (4 params)
- [ ] `balanceStorage.test.ts` - describe blocks (90 + 57 lines)
- [ ] `entityOperations.createAccount.test.ts` - describe (76 lines)
- [ ] `entityOperations.updateAccount.test.ts` - describe (97 lines)
- [ ] `updateBalanceService.executeBalanceUpdate.test.ts` - describe (84 lines)
- [ ] `accountService.balance.test.ts` - describe (71 lines)
- [ ] `storageOperations.test.ts` - describe (82 lines)
- [ ] `updateService.test.ts` - describe (60 lines)
- [ ] `bankingService.test.ts` - describe (84 lines)
- [ ] `creditCardService.*` - describe functions (51-52 lines)
- [ ] `creditCardStatementService.generation.test.ts` - describe (56 lines)
- [ ] `creditCardSubscriptionService.create.test.ts` - describe (53 lines)
- [ ] `creditCardTransactionService.*` - describe functions (62-83 lines)
- [ ] `creditCardPaymentService.*` - describe functions (57-70 lines)
- [ ] `emiFactory.*` - describe functions (53-62 lines)
- [ ] `emiStorage.test.ts` - describe (68 lines)
- [ ] `paymentFactory.test.ts` - describe (87 lines)
- [ ] `paymentStorage.test.ts` - describe (57 lines)
- [ ] `reminderHelpers.*` - describe functions (52-76 lines)
- [ ] `statementCalculations.totals.charges.test.ts` - describe (76 lines)
- [ ] `statementCollection.*` - describe functions (81 lines)
- [ ] `statementFactory.createStatement.test.ts` - describe (64 lines)
- [ ] `statementStorage.test.ts` - describe (67 lines)
- [ ] `subscriptionCollection.test.ts` - describe functions (74-76 lines)
- [ ] `subscriptionFactory.createSubscriptionEntity.test.ts` - describe (72 lines)
- [ ] `subscriptionStorage.test.ts` - describe (63 lines)
- [ ] `transactionUtils.*` - describe functions (56-66 lines)
- [ ] `useExpenses.test.ts` - describe (76 lines)
- [ ] `index.categories.test.ts` - describe (61 lines)
- [ ] `index.getExpensesByFilter.categoriesAndAccounts.test.ts` - describe (55 lines)
- [ ] `expenseService.add.test.ts` - describe (65 lines)
- [ ] `formatters.test.ts` - describe (96 lines)
- [ ] `validators.test.ts` - describe (67 lines)

**Solution Strategy**:
1. Extract large mock objects into separate constants
2. Split large `describe` blocks into smaller ones
3. Move `beforeEach` setup into helper functions
4. Extract repeated patterns into utility functions

### 3. Max Parameters Violations (>3 params) - Priority: MEDIUM
**Rule**: `max-params: ['error', 3]`
**Files**:
- [ ] `balanceOperations.history.test.ts` - helper function (4 params)
- [ ] `balanceStorage.test.ts` - helper function (4 params)

**Solution**: Use object parameters instead of multiple arguments

### 4. Unused Variables - Priority: LOW
**Rule**: `@typescript-eslint/no-unused-vars`
**Files**:
- [ ] `BankManagement.modals.test.tsx` - `waitFor` import
- [ ] `useAccountManagement.errors.test.ts` - `bankingService` import
- [ ] `creditCardPaymentService.recordPayment.sync.test.ts` - `CreditCardPayment` type
- [ ] `expenseService.update.test.ts` - `mockStorageKey` variable

**Solution**: Remove unused imports/variables or prefix with `_`

### 5. No Var Requires - Priority: MEDIUM
**Rule**: `@typescript-eslint/no-var-requires`
**Files**:
- [ ] `index.getExpensesByFilter.basic.test.ts` - line 27

**Solution**: Convert to ES6 import

## Warnings (427) - Should Fix

### 1. Magic Numbers (~200+ warnings)
**Rule**: `@typescript-eslint/no-magic-numbers`
**Pattern**: Use named constants for test values

**Common Values**:
- Amounts: 1000, 1500, 5000, 10000, etc.
- Dates: 2024, 2025
- Rates: 0.01, 0.02, 0.05
- Counts: 2, 3, 5, etc.

**Solution Strategy**:
```typescript
const TEST_AMOUNT_1000 = 1000
const TEST_AMOUNT_1500 = 1500
const TEST_YEAR_2024 = 2024
const TEST_RATE_0_01 = 0.01
```

### 2. TypeScript `any` Types (~150+ warnings)
**Rule**: `@typescript-eslint/no-explicit-any`
**Pattern**: Using `as any` in mocks and type assertions

**Solution Strategy**:
- Create proper mock types
- Use `jest.MockedFunction` and `jest.Mocked` types
- Define interfaces for mock return values

### 3. Non-null Assertions (~20 warnings)
**Rule**: `@typescript-eslint/no-non-null-assertion`
**Pattern**: Using `!` operator

**Solution**: Use proper null checks or optional chaining

## Fix Priority Order

1. **Phase 1**: Fix file line count violations (split files >100 lines)
2. **Phase 2**: Fix function line count violations (extract setup/helpers)
3. **Phase 3**: Fix unused variables and no-var-requires
4. **Phase 4**: Fix max-params violations
5. **Phase 5**: Address magic numbers (batch by pattern)
6. **Phase 6**: Fix TypeScript `any` types
7. **Phase 7**: Fix non-null assertions

## Progress Tracking

### Files Split: 0/20
### Functions Refactored: 0/80+
### Magic Numbers Fixed: 0/200+
### TypeScript Issues Fixed: 0/170+

## Notes
- All fixes must maintain test functionality
- Run `npm test` after each batch of fixes
- Run `npm run validate:all` to verify progress
- Document patterns for reusable fixes

