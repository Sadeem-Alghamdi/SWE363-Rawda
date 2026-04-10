#!/usr/bin/env node

/**
 * TSX to JSX Conversion Script for Rawda Web App
 * Converts all .tsx files to .jsx (except protected files)
 */

const fs = require('fs');
const path = require('path');

// Protected files
const PROTECTED_FILES = ['ImageWithFallback.tsx'];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = '') {
  console.log(`${color}${message}${colors.reset}`);
}

function findAllFiles(dir, extension, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'node_modules') {
      findAllFiles(filePath, extension, fileList);
    } else if (file.endsWith(extension)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function isProtected(filePath) {
  return PROTECTED_FILES.some(protected => filePath.includes(protected));
}

function renameFiles() {
  log('\n=========================================', colors.cyan);
  log('TSX to JSX Conversion Script', colors.cyan);
  log('=========================================\n', colors.cyan);
  
  log('Step 1: Renaming .tsx files to .jsx...', colors.cyan);
  log('---------------------------------------');
  
  const srcDir = path.join(__dirname, 'src', 'app');
  const tsxFiles = findAllFiles(srcDir, '.tsx').filter(f => !isProtected(f));
  
  let renameCount = 0;
  tsxFiles.forEach(file => {
    const newFile = file.replace(/\.tsx$/, '.jsx');
    try {
      fs.renameSync(file, newFile);
      log(`✓ ${path.relative(__dirname, file)} -> ${path.relative(__dirname, newFile)}`, colors.green);
      renameCount++;
    } catch (err) {
      log(`✗ Error renaming ${file}: ${err.message}`, colors.yellow);
    }
  });
  
  log(`\nRenamed ${renameCount} files\n`);
  return renameCount;
}

function updateEntrypoint() {
  log('Step 2: Updating entrypoint file...', colors.cyan);
  log('---------------------------------------');
  
  const entrypointPath = path.join(__dirname, '__figma__entrypoint__.ts');
  
  if (fs.existsSync(entrypointPath)) {
    try {
      let content = fs.readFileSync(entrypointPath, 'utf8');
      content = content.replace(/App\.tsx/g, 'App.jsx');
      fs.writeFileSync(entrypointPath, content, 'utf8');
      log('✓ Updated __figma__entrypoint__.ts', colors.green);
    } catch (err) {
      log(`✗ Error updating entrypoint: ${err.message}`, colors.yellow);
    }
  } else {
    log('⚠ __figma__entrypoint__.ts not found', colors.yellow);
  }
  log('');
}

function updateImports() {
  log('Step 3: Updating import statements...', colors.cyan);
  log('---------------------------------------');
  
  const srcDir = path.join(__dirname, 'src');
  const jsFiles = [
    ...findAllFiles(srcDir, '.jsx'),
    ...findAllFiles(srcDir, '.js'),
    ...findAllFiles(srcDir, '.ts'),
  ];
  
  // Also update entrypoint
  const entrypointPath = path.join(__dirname, '__figma__entrypoint__.ts');
  if (fs.existsSync(entrypointPath)) {
    jsFiles.push(entrypointPath);
  }
  
  let updateCount = 0;
  
  jsFiles.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      const originalContent = content;
      
      // Replace .tsx with .jsx in imports, but keep ImageWithFallback.tsx
      // Match: from './something.jsx' or from '../something.jsx'
      content = content.replace(
        /(from\s+["'])([^"']+)\.tsx(["'])/g,
        (match, p1, p2, p3) => {
          if (p2.includes('ImageWithFallback')) {
            return match; // Keep ImageWithFallback.tsx
          }
          return `${p1}${p2}.jsx${p3}`;
        }
      );
      
      // Match: import('./something.jsx') or import('./something.jsx')
      content = content.replace(
        /(import\s*\(["'])([^"']+)\.tsx(["']\))/g,
        (match, p1, p2, p3) => {
          if (p2.includes('ImageWithFallback')) {
            return match; // Keep ImageWithFallback.tsx
          }
          return `${p1}${p2}.jsx${p3}`;
        }
      );
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        log(`✓ Updated imports in: ${path.relative(__dirname, file)}`, colors.green);
        updateCount++;
      }
    } catch (err) {
      log(`✗ Error updating ${file}: ${err.message}`, colors.yellow);
    }
  });
  
  log(`\nUpdated imports in ${updateCount} files\n`);
  return updateCount;
}

// Main execution
try {
  const renameCount = renameFiles();
  updateEntrypoint();
  const updateCount = updateImports();
  
  log('=========================================', colors.cyan);
  log('✅ Conversion Complete!', colors.green);
  log('=========================================\n', colors.cyan);
  
  log('Summary:');
  log(`  - Renamed: ${renameCount} .tsx files to .jsx`);
  log(`  - Updated: ${updateCount} files with new import paths`);
  log(`  - Protected: ${PROTECTED_FILES.join(', ')} (kept as .tsx)`);
  log('\nYour project is now using .jsx files!\n');
  
} catch (err) {
  log(`\n✗ Fatal error: ${err.message}\n`, colors.yellow);
  process.exit(1);
}
