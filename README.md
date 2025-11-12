# Gully Cricket

**A comprehensive cricket match management and tracking application** for organizing gully cricket matches, tracking player and team statistics, managing tournaments, and building cricket communities.

> **Core Purpose**: Manage informal cricket matches, track player performance, organize tournaments, and build cricket communities through comprehensive match management and statistics tracking.

**Built with React, TypeScript, and domain-driven architecture.**

## 🚀 Features

- **Match Management**: Live scoring, match history, scheduling, and results tracking
- **Player & Team Management**: Player profiles, team rosters, statistics, and rankings
- **Tournament Organization**: Tournament creation, fixture management, standings, and brackets
- **Statistics & Analytics**: Comprehensive player and team statistics, performance trends, and records
- **Community Features**: Match invitations, player discovery, team connections, and match sharing
- **Domain-Driven Architecture**: Matches, Players, Teams, Tournaments, Statistics domains
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
│   ├── matches/       # Matches domain (scoring, history, scheduling)
│   ├── players/       # Players domain (profiles, stats, rankings)
│   ├── teams/         # Teams domain (rosters, management, stats)
│   ├── tournaments/   # Tournaments domain (fixtures, standings, brackets)
│   ├── statistics/    # Statistics domain (analytics, trends, records)
│   └── community/     # Community domain (invitations, discovery, sharing)
├── shared/            # Shared utilities (validation, formatters, API)
├── pages/             # Page components (dashboard, matches, players, teams, tournaments)
├── components/        # Shared UI components
├── hooks/             # Shared hooks
├── utils/             # Utility functions
└── __tests__/         # Test files organized by feature
```

## 🔧 Available Scripts

- `npm run dev` - Start development server (port 11616)
- `npm run build` - Build for production
- `npm run preview` - Preview production build (port 11616)
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

## 🏏 About Gully Cricket

**Gully Cricket** is informal street cricket played in narrow alleys (gullies) or small spaces, popular in India and South Asian countries. It features modified rules adapted for small playing areas and is a grassroots form of cricket that brings communities together.

This application brings professional match management tools to this grassroots cricket culture, helping players and teams organize, track, and improve their game.

## 📖 Contributing

1. Read the [Development Standards](./docs/development/DEVELOPMENT_STANDARDS.md)
2. Follow the [Development Guide](./docs/development/README.md)
3. Ensure 80% test coverage
4. Pass all pre-commit hooks
5. Follow domain-driven architecture

## 📄 License

MIT
