#!/usr/bin/env node

/**
 * PR Workflow Setup Script
 * Sets up comprehensive PR workflow between any two branches
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Configuration
const CONFIG = {
  workflowsDir: '.github/workflows',
  templatesDir: '.github',
  docsDir: 'docs/workflows'
}

// Available workflows
const WORKFLOWS = {
  'pr-validation': {
    name: 'Pull Request Validation',
    file: 'pr-validation.yml',
    description: 'Comprehensive PR validation with all development standards'
  },
  'branch-protection': {
    name: 'Branch Protection Setup',
    file: 'branch-protection.yml',
    description: 'Automated branch protection configuration'
  },
  'pr-auto-merge': {
    name: 'PR Auto-Merge',
    file: 'pr-auto-merge.yml',
    description: 'Intelligent auto-merge functionality'
  }
}

// Available templates
const TEMPLATES = {
  'pr-template': {
    name: 'Pull Request Template',
    file: 'pull_request_template.md',
    description: 'Standardized PR template with compliance checklist'
  }
}

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m',   // Red
    reset: '\x1b[0m'     // Reset
  }
  
  const icon = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  }
  
  console.log(`${colors[type]}${icon[type]} ${message}${colors.reset}`)
}

function createDirectories() {
  log('Creating required directories...')
  
  const dirs = [
    CONFIG.workflowsDir,
    CONFIG.templatesDir,
    CONFIG.docsDir
  ]
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      log(`Created directory: ${dir}`, 'success')
    } else {
      log(`Directory exists: ${dir}`)
    }
  })
}

function setupWorkflows() {
  log('Setting up GitHub Actions workflows...')
  
  Object.entries(WORKFLOWS).forEach(([key, workflow]) => {
    const filePath = path.join(CONFIG.workflowsDir, workflow.file)
    
    if (fs.existsSync(filePath)) {
      log(`Workflow exists: ${workflow.name}`)
    } else {
      log(`Creating workflow: ${workflow.name}`, 'warning')
      // Note: In a real implementation, you would copy the workflow files here
    }
  })
}

function setupTemplates() {
  log('Setting up PR templates...')
  
  Object.entries(TEMPLATES).forEach(([key, template]) => {
    const filePath = path.join(CONFIG.templatesDir, template.file)
    
    if (fs.existsSync(filePath)) {
      log(`Template exists: ${template.name}`)
    } else {
      log(`Creating template: ${template.name}`, 'warning')
      // Note: In a real implementation, you would copy the template files here
    }
  })
}

function setupDocumentation() {
  log('Setting up workflow documentation...')
  
  const docPath = path.join(CONFIG.docsDir, 'PR_WORKFLOW.md')
  
  if (fs.existsSync(docPath)) {
    log('Documentation exists: PR Workflow Guide')
  } else {
    log('Creating documentation: PR Workflow Guide', 'warning')
    // Note: In a real implementation, you would copy the documentation here
  }
}

function validateSetup() {
  log('Validating PR workflow setup...')
  
  const checks = [
    { path: CONFIG.workflowsDir, name: 'Workflows Directory' },
    { path: CONFIG.templatesDir, name: 'Templates Directory' },
    { path: CONFIG.docsDir, name: 'Documentation Directory' },
    { path: path.join(CONFIG.workflowsDir, 'pr-validation.yml'), name: 'PR Validation Workflow' },
    { path: path.join(CONFIG.workflowsDir, 'branch-protection.yml'), name: 'Branch Protection Workflow' },
    { path: path.join(CONFIG.workflowsDir, 'pr-auto-merge.yml'), name: 'PR Auto-Merge Workflow' },
    { path: path.join(CONFIG.templatesDir, 'pull_request_template.md'), name: 'PR Template' },
    { path: path.join(CONFIG.docsDir, 'PR_WORKFLOW.md'), name: 'PR Workflow Documentation' }
  ]
  
  let allValid = true
  
  checks.forEach(check => {
    if (fs.existsSync(check.path)) {
      log(`${check.name}: ✅`, 'success')
    } else {
      log(`${check.name}: ❌`, 'error')
      allValid = false
    }
  })
  
  return allValid
}

function showUsage() {
  log('PR Workflow Setup Complete!', 'success')
  log('')
  log('📋 Available Workflows:')
  Object.entries(WORKFLOWS).forEach(([key, workflow]) => {
    log(`  • ${workflow.name}: ${workflow.description}`)
  })
  
  log('')
  log('📋 Available Templates:')
  Object.entries(TEMPLATES).forEach(([key, template]) => {
    log(`  • ${template.name}: ${template.description}`)
  })
  
  log('')
  log('🚀 Next Steps:')
  log('1. Create a feature branch: git checkout -b feature/your-feature')
  log('2. Make your changes and commit them')
  log('3. Push the branch: git push origin feature/your-feature')
  log('4. Create a PR: gh pr create --title "Your PR Title"')
  log('5. All validations will run automatically')
  log('6. Add "auto-merge" label for automatic merging when ready')
  
  log('')
  log('🛡️ Development Standards Enforced:')
  log('  • Zero ESLint errors/warnings')
  log('  • TypeScript compilation success')
  log('  • SOLID & DRY principles')
  log('  • 100% test coverage')
  log('  • File extension strictness')
  log('  • Presentational components only')
  log('  • Code reusability maximized')
  log('  • Build success')
  log('  • Security audit passed')
  
  log('')
  log('📚 Documentation:')
  log('  • PR Workflow Guide: docs/workflows/PR_WORKFLOW.md')
  log('  • Development Standards: docs/development/DEVELOPMENT_STANDARDS.md')
  log('  • Architecture Guide: docs/architecture/README.md')
}

function main() {
  log('🚀 Setting up PR Workflow System...')
  log('')
  
  try {
    createDirectories()
    setupWorkflows()
    setupTemplates()
    setupDocumentation()
    
    log('')
    const isValid = validateSetup()
    
    if (isValid) {
      log('')
      showUsage()
    } else {
      log('')
      log('❌ Setup validation failed. Please check the missing files.', 'error')
      process.exit(1)
    }
    
  } catch (error) {
    log(`❌ Setup failed: ${error.message}`, 'error')
    process.exit(1)
  }
}

// Run the setup
main()
