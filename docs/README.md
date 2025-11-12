# Expense Manager Documentation

Welcome to the Expense Manager documentation. This comprehensive financial management application is built with React, TypeScript, and follows domain-driven architecture principles.

## 🎯 Start Here

### [Application Vision & Core Purpose](./VISION.md) ⭐
**READ THIS FIRST** - Understand the core purpose and goals of the application:
- Financial projections for current and future months (5+ years ahead)
- Decision support for savings, expenditures, and purchases
- Transaction-based forecasting and planning

## 📚 Documentation Sections

### 🏗️ [Architecture](./architecture/README.md)
- Domain-driven design overview
- Folder structure explanation
- Architecture principles
- Data flow patterns
- Benefits and best practices

### 🛠️ [Development Guide](./development/README.md)
- Getting started instructions
- Development standards
- Domain development guidelines
- Testing requirements
- Code review checklist

### 🚀 [Deployment](./deployment/)
- [Automatic Deployment Setup](./deployment/AUTOMATIC_DEPLOYMENT_SETUP.md)
- [Vercel Deployment Guide](./deployment/VERCEL_DEPLOYMENT_GUIDE.md)

### 📋 [Development Standards](./development/DEVELOPMENT_STANDARDS.md)
- Locked development rules
- Zero tolerance policies
- Pre-commit hook enforcement
- Code quality requirements

### 🗂️ Project Tracking & Summaries
- [Credit Card Integration Tracker](./tasks/credit-card-integration-tracker.md)
- [Credit Card Integration Summary](./tasks/credit-card-integration-summary.md)
- [Credit Card Release Notes](./tasks/credit-card-release-notes.md)
- [Credit Card Feature Backlog](./tasks/credit-card-feature-backlog.md)

### 📋 Requirements Documentation
- [Banking Account Management Requirements](./requirements/BANKING_ACCOUNT_MANAGEMENT_REQUIREMENTS.md)
- [Credit Card Management Requirements](./requirements/CREDIT_CARD_MANAGEMENT_REQUIREMENTS.md)
- [Expense Transaction Management Requirements](./requirements/EXPENSE_TRANSACTION_MANAGEMENT_REQUIREMENTS.md) ⭐ **NEW**

### 🔌 [API Documentation](./api/README.md)
- API endpoints overview
- Authentication methods
- Request/response formats
- Error handling
- Rate limiting

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Run tests**:
   ```bash
   npm run test:coverage
   ```

4. **Run linting**:
   ```bash
   npm run lint
   ```

## 🏛️ Architecture Overview

The Expense Manager follows a **domain-driven architecture** with the following domains:

- **🏦 Banking**: Banks, accounts, credit cards, EMIs
- **💰 Expenses**: Expense tracking, categories, filtering
- **📈 Income**: Income sources and tracking
- **📊 Reports**: Financial reports and analytics
- **👤 User**: User management and preferences

## 🔒 Development Standards

This project enforces **strict development standards**:

- ✅ **0 errors, 0 warnings** (ESLint, TypeScript)
- ✅ **80% test coverage** mandatory
- ✅ **SOLID and DRY principles** enforced
- ✅ **Presentational components** only
- ✅ **File extension strictness** (.tsx for components, .ts for others)
- ✅ **Code reusability** maximized
- ✅ **Pre-commit hooks** block non-compliant code

## 📁 Project Structure

```
src/
├── domains/           # Domain-driven architecture
│   ├── banking/       # Banking domain
│   ├── expenses/      # Expenses domain
│   ├── income/        # Income domain
│   ├── reports/       # Reports domain
│   └── user/          # User domain
├── shared/            # Shared utilities
├── pages/             # Page components
├── components/        # Shared UI components
├── hooks/             # Shared hooks
├── utils/             # Utility functions
└── __tests__/         # Test files
```

## 🧪 Testing

- **80% test coverage** required
- **Unit tests** for all components, hooks, services
- **SOLID principle tests** for architecture validation
- **Pre-commit hooks** enforce coverage requirements

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript checks
- `npm run validate:all` - Run all validations

## 📖 Contributing

1. Read the [Development Standards](./development/DEVELOPMENT_STANDARDS.md)
2. Follow the [Development Guide](./development/README.md)
3. Ensure 100% test coverage
4. Pass all pre-commit hooks
5. Follow domain-driven architecture

## 🆘 Support

- Check the [Development Guide](./development/README.md) for troubleshooting
- Review [Architecture Documentation](./architecture/README.md) for structure questions
- Consult [API Documentation](./api/README.md) for endpoint details

---

**Note**: This project enforces strict development standards. All code must pass validation before commits are allowed.
