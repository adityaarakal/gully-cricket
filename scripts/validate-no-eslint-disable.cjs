const fs = require('fs');
const path = require('path');

function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, coverage, dist, etc.
      if (!['node_modules', 'coverage', 'dist', '.git'].includes(file)) {
        findFiles(filePath, fileList);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      // Skip test files and type definition files
      if (!file.includes('test') && !file.includes('spec') && !file.includes('types')) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

function validateNoEslintDisable() {
  const srcDir = path.join(process.cwd(), 'src');
  const docsDir = path.join(process.cwd(), 'docs');
  const allFiles = [...findFiles(srcDir), ...findFiles(docsDir)];
  
  const violations = [];
  
  allFiles.forEach(filePath => {
    // Skip type definition files
    if (filePath.includes('/types/')) {
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for eslint-disable comments
    const eslintDisableRegex = /eslint-disable/gi;
    if (eslintDisableRegex.test(content)) {
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (eslintDisableRegex.test(line)) {
          violations.push({
            file: filePath,
            line: index + 1,
            content: line.trim()
          });
        }
      });
    }
  });
  
  if (violations.length > 0) {
    console.error('\n❌ ESLint-disable violations found:');
    violations.forEach(violation => {
      console.error(`  ${violation.file}:${violation.line}`);
      console.error(`    ${violation.content}`);
    });
    console.error('\n❌ NO eslint-disable comments are allowed. Fix the issues instead!');
    process.exit(1);
  }
  
  console.log('✅ No eslint-disable comments found');
}

validateNoEslintDisable();
