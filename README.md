# Expense Manager

**A forward-looking financial projection and planning application** that provides insights into incomes, expenses, and expected balances for current and future months (5+ years ahead) to help users make informed financial decisions.

> **Core Purpose**: Project your financial future based on transaction history to answer key questions like "How much can I save?", "Can I afford this purchase?", "Should I buy on EMI or direct?", and "What's my available budget for daily expenses?"

**Built with React, TypeScript, and domain-driven architecture.**

## 🚀 Features

- **Domain-Driven Architecture**: Banking, Expenses, Income, Reports, User domains
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Local Storage** for data persistence
- **80% Test Coverage** with Jest and React Testing Library
- **Strict Development Standards** with pre-commit hooks
- **SOLID & DRY Principles** enforced
- **Presentational Components** with custom hooks
- **Comprehensive Documentation**

## 📚 Documentation

For detailed documentation, please visit the [Documentation](./docs/README.md) folder:

- [🎯 **Application Vision & Core Purpose**](./docs/VISION.md) - **Start here to understand the application's goal**
- [🏗️ Architecture Guide](./docs/architecture/README.md)
- [🛠️ Development Guide](./docs/development/README.md)
- [🔌 API Documentation](./docs/api/README.md)
- [🚀 Deployment Guide](./docs/deployment/)
- [📋 Development Standards](./docs/development/DEVELOPMENT_STANDARDS.md)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Build for production
npm run build
```

## 🏛️ Architecture

The project follows **domain-driven architecture**:

```
src/
├── domains/           # Domain-driven architecture
│   ├── banking/       # Banking domain (banks, accounts, credit cards, EMIs)
│   ├── expenses/      # Expenses domain (expenses, categories, filtering)
│   ├── income/        # Income domain (income sources, tracking)
│   ├── reports/       # Reports domain (financial reports, analytics)
│   └── user/          # User domain (user management, preferences)
├── shared/            # Shared utilities (validation, formatters, API)
├── pages/             # Page components (dashboard, expenses, reports, etc.)
├── components/        # Shared UI components
├── hooks/             # Shared hooks
├── utils/             # Utility functions
└── __tests__/         # Test files organized by feature
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with 80% coverage requirement
- `npm run lint` - Run ESLint (0 errors, 0 warnings)
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run validate:all` - Run all validations

## 🔒 Development Standards

This project enforces **strict development standards**:

- ✅ **0 errors, 0 warnings** (ESLint, TypeScript)
- ✅ **80% test coverage** mandatory
- ✅ **SOLID and DRY principles** enforced
- ✅ **Presentational components** only
- ✅ **File extension strictness** (.tsx for components, .ts for others)
- ✅ **Code reusability** maximized
- ✅ **Pre-commit hooks** block non-compliant code

## 📖 Contributing

1. Read the [Development Standards](./docs/development/DEVELOPMENT_STANDARDS.md)
2. Follow the [Development Guide](./docs/development/README.md)
3. Ensure 80% test coverage
4. Pass all pre-commit hooks
5. Follow domain-driven architecture

## 📄 License

MIT
