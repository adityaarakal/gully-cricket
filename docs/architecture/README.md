# Expense Manager - Architecture Documentation

## Overview

The Expense Manager is a comprehensive financial management application built with React, TypeScript, and Vite. It follows a **domain-driven architecture** pattern to ensure scalability, maintainability, and clear separation of concerns.

## Architecture Principles

### 1. Domain-Driven Design (DDD)
The application is organized around business domains rather than technical layers:

- **Banking Domain**: Banks, accounts, credit cards, EMIs
- **Expenses Domain**: Expense tracking, categories, filtering
- **Income Domain**: Income sources and tracking
- **Reports Domain**: Financial reports and analytics
- **User Domain**: User management and preferences

### 2. Clean Architecture
Each domain follows clean architecture principles:
- **Types**: Domain-specific TypeScript interfaces
- **Services**: Business logic and data operations
- **Hooks**: State management and side effects
- **Components**: UI components specific to the domain

### 3. Shared Utilities
Common functionality is shared across domains:
- **Validation**: Form validation utilities
- **Formatters**: Currency, date, number formatting
- **API**: HTTP client and API utilities
- **Types**: Common interfaces and types

## Folder Structure

```
src/
├── domains/                    # Domain-driven architecture
│   ├── banking/               # Banking domain
│   │   ├── types/            # Bank, BankAccount, CreditCard, EMI types
│   │   ├── services/         # BankingService with CRUD operations
│   │   ├── hooks/            # useBanks, useBankAccounts, useCreditCards, useEMIs
│   │   └── components/       # Banking-specific components
│   ├── expenses/             # Expenses domain
│   │   ├── types/            # Expense, ExpenseCategory, ExpenseFilter types
│   │   ├── services/         # ExpenseService with CRUD operations
│   │   ├── hooks/            # useExpenses, useExpenseCategories
│   │   └── components/       # Expense-specific components
│   ├── income/               # Income domain
│   │   ├── types/            # IncomeSource, Income types
│   │   └── components/        # Income-specific components
│   ├── reports/               # Reports domain
│   │   ├── types/            # ReportPeriod, ExpenseReport, CategoryBreakdown types
│   │   └── components/        # Report-specific components
│   ├── user/                  # User domain
│   │   ├── types/            # User, UserPreferences types
│   │   └── components/        # User-specific components
│   └── index.ts              # All domain exports
├── shared/                    # Shared utilities
│   ├── types/                # BaseEntity, ApiResponse, Pagination types
│   ├── validation/           # Form validation utilities
│   ├── formatters/           # Currency, date, number formatters
│   └── api/                  # API utilities
├── pages/                     # Page components
│   ├── dashboard/            # Dashboard page
│   ├── expenses/             # Expenses page
│   ├── categories/           # Categories page
│   ├── reports/              # Reports page
│   └── settings/             # Settings page
├── components/               # Shared UI components
│   ├── ui/                   # Reusable UI components
│   ├── layout/               # Layout components
│   └── forms/                # Form components
├── hooks/                    # Shared hooks
├── utils/                    # Utility functions
├── constants/                # App constants
└── __tests__/                # All tests organized by feature
```

## Domain Structure

Each domain follows the same structure:

### Types (`types/index.ts`)
- Domain-specific TypeScript interfaces
- Data transfer objects (DTOs)
- Enums and constants

### Services (`services/index.ts`)
- Business logic implementation
- Data persistence operations
- External API integrations
- CRUD operations

### Hooks (`hooks/index.ts`)
- React hooks for state management
- Side effects handling
- Data fetching and caching
- Form state management

### Components (`components/`)
- Domain-specific UI components
- Form components
- List and detail views
- Charts and visualizations

## Data Flow

1. **UI Components** use domain-specific hooks
2. **Hooks** call domain services for business logic
3. **Services** handle data persistence and external APIs
4. **Types** ensure type safety across all layers

## Benefits

- **Scalability**: Easy to add new features within domains
- **Maintainability**: Clear separation of concerns
- **Testability**: Each domain can be tested independently
- **Reusability**: Shared utilities reduce code duplication
- **Type Safety**: Comprehensive TypeScript coverage

## Development Standards

All development follows strict standards documented in `docs/development/DEVELOPMENT_STANDARDS.md`:

- 100% test coverage requirement
- SOLID and DRY principles
- Presentational components only
- File extension strictness
- Code reusability enforcement

## Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Run tests: `npm run test`
4. Run linting: `npm run lint`
5. Build for production: `npm run build`

## Contributing

Please read the development standards before contributing. All code must pass:
- ESLint checks (0 errors, 0 warnings)
- TypeScript compilation
- 100% test coverage
- Architecture validation
- Pre-commit hooks
