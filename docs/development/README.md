# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+
- Git

### Installation
```bash
git clone <repository-url>
cd expense-manager
npm install
```

### Development Commands
```bash
# Start development server
npm run dev

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

The project follows a **domain-driven architecture**:

```
src/
├── domains/           # Business domains
├── shared/            # Shared utilities
├── pages/             # Page components
├── components/        # Shared UI components
├── hooks/             # Shared hooks
├── utils/             # Utility functions
├── constants/         # App constants
└── __tests__/         # Test files
```

## Development Standards

### 1. Zero Tolerance Policy
- **0 lint/TypeScript/import errors**
- **0 lint/TypeScript/import warnings**
- **100% unit test coverage**
- **SOLID and DRY principles enforced**

### 2. File Extensions
- **Components**: `.tsx` extension only
- **All other files**: `.ts` extension only
- **No exceptions allowed**

### 3. Presentational Components
- Components must be **presentational only**
- Business logic moved to **custom hooks**
- State management in **hooks**, not components
- Data fetching in **services**, not components

### 4. Code Reusability
- Extract common functionality to **utilities**
- Create **reusable hooks** for common logic
- Build **shared components** for repeated patterns
- **No duplicate implementations** allowed

### 5. Testing Requirements
- **100% test coverage** mandatory
- Unit tests for **every component**
- Unit tests for **every hook**
- Unit tests for **every service**
- Unit tests for **every utility**

## Domain Development

### Creating a New Domain

1. **Create domain folder**:
```bash
mkdir src/domains/new-domain/{types,services,hooks,components}
```

2. **Define types** (`types/index.ts`):
```typescript
export interface NewDomainEntity {
  id: string
  name: string
  createdAt: Date
}
```

3. **Create service** (`services/index.ts`):
```typescript
export class NewDomainService {
  static getAll(): NewDomainEntity[] {
    // Implementation
  }
  
  static add(entity: Omit<NewDomainEntity, 'id' | 'createdAt'>): boolean {
    // Implementation
  }
}
```

4. **Create hooks** (`hooks/index.ts`):
```typescript
export function useNewDomain() {
  const [entities, setEntities] = useState<NewDomainEntity[]>([])
  
  const addEntity = (entity: Omit<NewDomainEntity, 'id' | 'createdAt'>) => {
    // Implementation
  }
  
  return { entities, addEntity }
}
```

5. **Create components** (`components/`):
```typescript
export function NewDomainComponent() {
  const { entities, addEntity } = useNewDomain()
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

6. **Export from domain** (`index.ts`):
```typescript
export * from './types'
export * from './services'
export * from './hooks'
export * from './components'
```

### Adding to Main Domain Index
```typescript
// src/domains/index.ts
export * from './new-domain'
```

## Testing Guidelines

### Test File Structure
```
src/__tests__/
├── domains/
│   ├── banking/
│   ├── expenses/
│   └── new-domain/
├── components/
├── hooks/
└── utils/
```

### Test Naming Convention
- `*.test.ts` for utility tests
- `*.test.tsx` for component tests
- `*.solid.test.tsx` for SOLID principle tests

### Test Requirements
- **100% coverage** for all files
- **Mock external dependencies**
- **Test error scenarios**
- **Test edge cases**
- **Use coverage ignore comments** for untestable code

### Example Test
```typescript
import { renderHook, act } from '@testing-library/react'
import { useNewDomain } from '../../domains/new-domain/hooks'

describe('useNewDomain hook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useNewDomain())
    expect(result.current.entities).toEqual([])
  })
  
  it('adds new entity', () => {
    const { result } = renderHook(() => useNewDomain())
    
    act(() => {
      result.current.addEntity({ name: 'Test' })
    })
    
    expect(result.current.entities).toHaveLength(1)
  })
})
```

## Pre-commit Hooks

The project uses Husky and lint-staged for pre-commit validation:

- **ESLint**: Code quality checks
- **TypeScript**: Type checking
- **Jest**: Test coverage validation
- **Architecture**: Custom validation scripts

### Bypassing Pre-commit Hooks
**NOT ALLOWED** - All commits must pass validation.

## Code Review Checklist

- [ ] 100% test coverage
- [ ] No linting errors or warnings
- [ ] TypeScript compilation passes
- [ ] SOLID principles followed
- [ ] DRY principle followed
- [ ] Presentational components only
- [ ] File extensions correct
- [ ] Code reusability maximized
- [ ] Architecture validation passes

## Troubleshooting

### Common Issues

1. **Coverage below 100%**
   - Add tests for uncovered code
   - Use `// istanbul ignore next` for untestable code

2. **Linting errors**
   - Run `npm run lint:fix` to auto-fix
   - Fix remaining errors manually

3. **TypeScript errors**
   - Check type definitions
   - Ensure proper imports

4. **Architecture validation fails**
   - Check file extensions
   - Ensure presentational components
   - Verify code reusability

### Getting Help

- Check existing tests for examples
- Review domain structure
- Consult development standards
- Run validation scripts for specific errors
