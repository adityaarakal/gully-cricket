# Credit Card Feature Backlog

This backlog captures the remaining work required to satisfy the locked `CREDIT_CARD_MANAGEMENT_REQUIREMENTS.md`. Each item links back to a requirement section and records its current status. Use this document to plan the next delivery phase now that the initial dashboards and reminders are live but the flows remain read-only.

## Summary Table

| ID | Requirement Reference | Task | Status | Notes |
|----|------------------------|------|--------|-------|
| CC-001 | §1 Relationship with Bank Accounts | Build credit card create/edit/delete UI backed by `creditCardService`, including bank account selection and validation of single-account linkage. | ✅ Completed | Toolbar actions and modals now create/edit/delete cards, enforce single linked bank, and refresh state via `useCreditCardManagement`. All quality gates passed. |
| CC-002 | §5 Billing and Payments | Implement statement generation & payment workflows: create statements, mark paid/partial, enforce payment source bank account updates. | ⏳ Pending | Services exist but no user-facing triggers; bank balance integration not wired. |
| CC-003 | §6 Transaction Tracking | Provide manual transaction entry form with category, amount, EMI/subscription flags, and quick filters for RuPay/EMI/subscriptions. | ⏳ Pending | Dashboards expect data but there is no capture surface. |
| CC-004 | §3 Usage Patterns & §4 EMI Management | Add EMI creation flow (convert transaction to EMI), schedule viewer, early closure handling. | ⏳ Pending | `creditCardEmiService` only accessed via reminder aggregation. |
| CC-005 | §3 Usage Patterns | Surface subscription management UI (create/edit/cancel) including merchant metadata and renewal cadence. | ⏳ Pending | Subscription tables render but cannot be populated. |
| CC-006 | §7 Dashboards & Insights | Wire dashboard metrics to reflect RuPay vs other card usage once data entry flows exist; add utilisation filters per requirement. | ⏳ Pending | Metrics currently show empty states without data. |
| CC-007 | §8 Notifications & Reminders | Extend reminder preferences (horizon, severity overrides) and prepare hooks for external delivery (email/SMS) once infrastructure is ready. | ⏳ Pending | Current reminder engine is fixed-horizon, in-app only. |
| CC-008 | §9 Data & Validation | Ensure cross-domain consistency: when payments are recorded, propagate deltas to banking balances and guard against duplicate EMI schedules. | ⏳ Pending | Integration logic not implemented; services operate in isolation. |
| CC-009 | §10 Testing & Quality Gates | Add integration/e2e tests covering full RuPay cycle, EMI lifecycle, subscription renewals, and bank linkage effects. | ⏳ Pending | Existing tests cover reminders only. |

## Implementation Plan

- **CC-001** *(Done)*: Extended `useCreditCardManagement` with mutation handlers, bank loading, and modal state; added presentational modals and toolbar actions so cards can be created, edited, or deleted with mandatory bank linkage.
- **CC-002**: Extend statement/payment services with UX-facing helpers exposed through `useCreditCardStatements` and `useCreditCardPayments`; when posting payments, update linked bank balances through shared banking utilities.
- **CC-003**: Build a `useCreditCardTransactions` hook that supports manual entry (category, EMI/subscription flags) plus quick filters (RuPay, EMI, subscriptions); keep tables presentational.
- **CC-004**: Allow transactions to convert to EMI via modal forms backed by `creditCardEmiService.createPlan`, expose schedule/early closure handling in a dedicated hook.
- **CC-005**: Provide subscription management modals and a `useCreditCardSubscriptions` hook around `creditCardSubscriptionService` for create/edit/cancel flows.
- **CC-006**: Enhance `creditCardCalculations` to compute RuPay vs other network insights and utilisation filters once data entry exists; memoise selectors to keep UI pure.
- **CC-007**: Add reminder preference storage (per-card horizon/severity overrides) and stub outbound delivery hooks for future email/SMS channels while keeping the current UI configurable.
- **CC-008**: Ensure cross-domain consistency by funnelling payment adjustments through a shared banking integration helper and adding duplicate EMI schedule guards inside services.
- **CC-009**: Layer integration/e2e Jest suites that walk through RuPay billing, EMI lifecycle, subscription renewals, and banking balance impacts; maintain 100% coverage.

## Next Actions

1. Prioritise CC-002 through CC-005 to unlock data creation; dashboards depend on these inputs.
2. Once data entry exists, address CC-006 and CC-008 to ensure analytics and banking linkage behave as specified.
3. Extend the automated test suite per CC-009 alongside each feature rollout.
4. Track notification preference enhancements (CC-007) for a later iteration once outbound channels are defined.

Update this backlog as items move in progress or complete, and reflect changes in the main tracker when new phases are planned.

