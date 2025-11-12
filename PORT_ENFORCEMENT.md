# Port 11616 Enforcement

## 🔒 LOCKED DOCUMENT - AI AGENT PROTECTION 🔒

**⚠️ CRITICAL: This document is LOCKED and protected from AI agent modifications ⚠️**

- **Document Status**: LOCKED - Requires explicit human permission to modify
- **AI Agent Policy**: NO UNAUTHORIZED UPDATES ALLOWED
- **Modification Process**: Must request explicit permission from document owner
- **Enforcement**: Port validation scripts depend on this documentation
- **Version Control**: All changes must be tracked and approved

**DO NOT MODIFY WITHOUT EXPLICIT PERMISSION**

---

This project **MANDATES** that the development server runs on port **11616**. This is enforced through multiple layers of configuration to ensure consistency across all environments.

## Enforcement Mechanisms

### 1. Vite Configuration (`vite.config.ts`)
```typescript
server: {
  port: 11616,
  strictPort: true, // Mandate port 11616 - fail if port is unavailable
  host: true, // Allow external connections
  open: true,
}
```

### 2. Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite --port 11616 --strict-port",
    "preview": "vite preview --port 11616 --strict-port"
  }
}
```

### 3. Port Validation Script
Run `npm run validate:port` to verify that:
- Port 11616 is available
- Configuration files are correct
- No conflicting environment variables exist

## What This Means

- ✅ **Strict Enforcement**: The app will **FAIL** if port 11616 is not available
- ✅ **No Fallbacks**: No automatic port switching to other ports
- ✅ **Consistent Environment**: Same port across all developers and environments
- ✅ **Clear Error Messages**: Immediate feedback if port is unavailable

## Troubleshooting

### Port Already in Use
If port 11616 is already in use:
```bash
# Find what's using the port
lsof -ti:11616

# Kill the process
lsof -ti:11616 | xargs kill -9

# Or restart your terminal/IDE
```

### Validation Failed
Run the validation script to check configuration:
```bash
npm run validate:port
```

### Environment Variables
The following environment variables are **ignored** due to strict port configuration:
- `VITE_PORT`
- `PORT` 
- `SERVER_PORT`

## Commands

```bash
# Start development server (mandated port 11616)
npm run dev

# Validate port configuration
npm run validate:port

# Preview production build (mandated port 11616)
npm run preview
```

## Why Port 11616?

- **Unique**: Unlikely to conflict with other common development ports
- **Memorable**: Easy to remember and type
- **Consistent**: Same port across all environments
- **Professional**: Avoids common ports like 3000, 8080, etc.
