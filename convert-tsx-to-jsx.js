#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Protected files that should not be renamed
const PROTECTED_FILES = [
  'ImageWithFallback.tsx'
];

function getAllTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') && !PROTECTED_FILES.includes(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function renameFile(oldPath) {
  const newPath = oldPath.replace(/\.tsx$/, '.jsx');
  try {
    fs.renameSync(oldPath, newPath);
    console.log(`✓ Renamed: ${oldPath} -> ${newPath}`);
    return true;
  } catch (error) {
    console.error(`✗ Error renaming ${oldPath}:`, error.message);
    return false;
  }
}

function updateFileImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Update .tsx imports to .jsx (but keep ImageWithFallback.tsx)
    content = content.replace(
      /from ['"](.+?)\.tsx['"]/g,
      (match, p1) => {
        if (p1.includes('ImageWithFallback')) {
          return match; // Keep ImageWithFallback.tsx
        }
        return `from '${p1}.jsx'`;
      }
    );
    
    // Update dynamic imports
    content = content.replace(
      /import\(['"](.+?)\.tsx['"]\)/g,
      (match, p1) => {
        if (p1.includes('ImageWithFallback')) {
          return match;
        }
        return `import('${p1}.jsx')`;
      }
    );
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error.message);
  }
}

// Main execution
console.log('🔄 Starting TSX to JSX conversion...\n');

// Step 1: Get all .tsx files
const srcDir = path.join(__dirname, 'src');
const tsxFiles = getAllTsxFiles(srcDir);

console.log(`Found ${tsxFiles.length} .tsx files to convert\n`);

// Step 2: Rename all .tsx files to .jsx
console.log('📝 Renaming files...\n');
tsxFiles.forEach(renameFile);

// Step 3: Update entrypoint
console.log('\n📝 Updating entrypoint...\n');
const entrypointPath = path.join(__dirname, '__figma__entrypoint__.ts');
updateFileImports(entrypointPath);

// Step 4: Update all .jsx, .js, and .ts files to fix imports
console.log('\n📝 Updating imports in all files...\n');
function getAllJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'node_modules') {
      getAllJsFiles(filePath, fileList);
    } else if (file.match(/\.(jsx|js|ts)$/)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

const allJsFiles = getAllJsFiles(__dirname);
allJsFiles.forEach(updateFileImports);

console.log('\n✅ Conversion complete!');
console.log('\nNote: ImageWithFallback.tsx was kept as .tsx (protected file)');
