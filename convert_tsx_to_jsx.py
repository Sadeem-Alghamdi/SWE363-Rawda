#!/usr/bin/env python3

import os
import re
from pathlib import Path

# Protected files
PROTECTED_FILES = {'ImageWithFallback.tsx'}

def find_tsx_files(root_dir):
    """Find all .tsx files except protected ones"""
    tsx_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.tsx') and file not in PROTECTED_FILES:
                tsx_files.append(os.path.join(root, file))
    return tsx_files

def rename_tsx_to_jsx(file_path):
    """Rename a .tsx file to .jsx"""
    new_path = file_path.replace('.tsx', '.jsx')
    try:
        os.rename(file_path, new_path)
        print(f"✓ Renamed: {file_path} -> {new_path}")
        return True
    except Exception as e:
        print(f"✗ Error renaming {file_path}: {e}")
        return False

def update_imports_in_file(file_path):
    """Update imports from .tsx to .jsx in a file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Replace .tsx with .jsx in imports, but not for ImageWithFallback
        # Match: from "./something.tsx" or from '../something.tsx' 
        def replace_import(match):
            full_match = match.group(0)
            if 'ImageWithFallback' in full_match:
                return full_match
            return full_match.replace('.tsx', '.jsx')
        
        # Update static imports
        content = re.sub(
            r'from\s+["\']([^"\']+\.tsx)["\']',
            replace_import,
            content
        )
        
        # Update dynamic imports
        content = re.sub(
            r'import\(["\']([^"\']+\.tsx)["\']\)',
            replace_import,
            content
        )
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated imports: {file_path}")
            return True
        return False
    except Exception as e:
        print(f"✗ Error updating {file_path}: {e}")
        return False

def main():
    print("🔄 Starting TSX to JSX conversion...\n")
    
    # Get the project root directory
    script_dir = Path(__file__).parent
    src_dir = script_dir / 'src'
    
    if not src_dir.exists():
        print(f"✗ Source directory not found: {src_dir}")
        return
    
    # Step 1: Find all .tsx files
    print("📁 Finding .tsx files...\n")
    tsx_files = find_tsx_files(str(src_dir))
    print(f"Found {len(tsx_files)} .tsx files to convert\n")
    
    # Step 2: Rename all .tsx to .jsx
    print("📝 Renaming files...\n")
    for tsx_file in tsx_files:
        rename_tsx_to_jsx(tsx_file)
    
    # Step 3: Update entrypoint file
    print("\n📝 Updating entrypoint...\n")
    entrypoint = script_dir / '__figma__entrypoint__.ts'
    if entrypoint.exists():
        update_imports_in_file(str(entrypoint))
    
    # Step 4: Update all imports in .jsx, .js, and .ts files
    print("\n📝 Updating imports in all JavaScript/TypeScript files...\n")
    for ext in ['.jsx', '.js', '.ts']:
        for root, dirs, files in os.walk(str(src_dir)):
            for file in files:
                if file.endswith(ext):
                    file_path = os.path.join(root, file)
                    update_imports_in_file(file_path)
    
    print("\n✅ Conversion complete!")
    print("Note: ImageWithFallback.tsx was kept as .tsx (protected file)")

if __name__ == '__main__':
    main()
