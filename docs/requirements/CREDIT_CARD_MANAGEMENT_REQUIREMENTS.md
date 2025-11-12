# Credit Card Requirements

> 🔒 **LOCKED DOCUMENT** - This requirements document is locked and must not be modified without explicit approval. Follow the established change review process before altering any content.

## 🔒 Document Status
- **Status**: LOCKED
- **Version**: 1.0
- **Lock Date**: 2025-11-01
- **Approved By**: Product Owner
- **Change Process**: Requires explicit owner approval and reviewed pull request

This document captures how the credit card capability must behave so it fits the way I actually use cards alongside my bank accounts.

## 1. Relationship with Bank Accounts
- Every credit card must be linked to exactly one bank account that funds its bill payments.
- Payments always flow from the linked bank account; the account cannot change once configured without an explicit remapping workflow.
- When a payment is recorded, reflect the cash outflow on the linked bank account and the balance reduction on the card.

## 2. Card Types and Networks
- Support cards on networks such as RuPay, Visa, and Mastercard.
- Allow storing card network, issuer, last four digits, and billing currency.
- For reporting, group transactions and balances by network (e.g., track RuPay separately from Visa/Mastercard).

## 3. Usage Patterns
- **RuPay cards**: used for regular monthly household expenses. They generate a single bill that is paid in full every month.
  - Record monthly statement generation date and due date.
  - Track total spend for the cycle and ensure the bill payment clears the statement balance.
- **Other cards (Visa/Mastercard)**: primarily used for EMIs, online bills, and subscriptions.
  - Need to record EMIs (equal monthly installments) when a purchase is converted to EMI.
  - Support both no-cost and cost-bearing EMIs (store interest or fees if applicable).
  - Store subscription metadata (merchant, renewal frequency) so recurring charges can be monitored.

## 4. EMI Management
- When a transaction is marked as EMI:
  - Capture principal amount, tenure (number of months), monthly installment, interest rate/fee if any, and start date.
  - Automatically generate a schedule of monthly installments until the EMI ends.
  - Each month, show the EMI installment as due and mark it paid when the overall bill payment is recorded.
  - Provide visibility into remaining EMI balance and months left.
- Allow early closure or foreclosure of an EMI and recalculate totals accordingly.

## 5. Billing and Payments
- Support statement cycles per card (closing date, due date).
- Track bill generation for each cycle and maintain status (open, paid, partially paid).
- When marking a bill as paid:
  - Capture payment date, paying bank account, amount, and reference.
  - For RuPay cards, default to full payment; partial payments should be allowed for other cards.
- Maintain payment history so I can review past settlements and confirm which bank funded them.

## 6. Transaction Tracking
- Record all card transactions with date, description, amount, category, and associated EMI/subscription flags.
- For EMIs, link each monthly installment to the original transaction.
- For subscriptions, allow tagging transactions to subscription records so recurring charges can be monitored.
- Provide quick filters for:
  - RuPay monthly expenses.
  - Active EMIs by card.
  - Subscriptions and online bill payments.

## 7. Dashboards & Insights
- RuPay overview: monthly spend, bill amount, payment status.
- EMI dashboard: list of active EMIs, monthly installment totals, upcoming payouts, and completion dates.
- Subscription tracker: merchants, next renewal dates, monthly/annual totals.
- Overall credit usage: total outstanding, utilization per card, payments due in the next 30 days.

## 8. Notifications & Reminders
- Reminder system for:
  - Upcoming RuPay bill due date.
  - Upcoming EMI installments (monthly reminders).
  - Upcoming subscription renewals.
- Optionally surface alerts on the dashboard; actual email/SMS delivery can be added later.

## 9. Data & Validation Requirements
- Ensure card and transaction data integrates cleanly with existing banking data models.
- Validate that every payment references a valid bank account and credit card.
- Prevent duplicate EMI schedules; maintain idempotent operations when syncing data.

## 10. Testing & Quality Gates
- Preserve the project mandate of 100% test coverage and zero lint warnings.
- Add integration tests covering:
  - RuPay expense cycle and payment.
  - EMI creation, schedule generation, and monthly settlement.
  - Subscription tracking workflow.
- Verify dashboards aggregate data correctly for the new card-centric views.

---
Last updated: 2025-11-01

