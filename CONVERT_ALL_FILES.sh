#!/bin/bash

# TSX to JSX Conversion Script for Rawda Web App
# This script converts all .tsx files to .jsx (except protected files)

echo "========================================="
echo "TSX to JSX Conversion Script"
echo "========================================="
echo ""

# Navigate to project root
cd "$(dirname "$0")"

# Protected files that should not be renamed
PROTECTED="ImageWithFallback.tsx"

echo "Step 1: Renaming .tsx files to .jsx..."
echo "---------------------------------------"

# Counter
count=0

# Find and rename all .tsx files except protected ones
while IFS= read -r -d '' file; do
    # Check if file is not protected
    if [[ ! "$file" =~ "$PROTECTED" ]]; then
        newfile="${file%.tsx}.jsx"
        mv "$file" "$newfile" 2>/dev/null && {
            echo "✓ $file -> $newfile"
            ((count++))
        }
    fi
done < <(find ./src/app -name "*.tsx" -type f -print0)

echo ""
echo "Renamed $count files"
echo ""

echo "Step 2: Updating entrypoint file..."
echo "---------------------------------------"

# Update __figma__entrypoint__.ts
if [ -f "__figma__entrypoint__.ts" ]; then
    # Use perl for cross-platform compatibility
    perl -pi -e 's/App\.tsx/App.jsx/g' __figma__entrypoint__.ts
    echo "✓ Updated __figma__entrypoint__.ts"
else
    echo "⚠ __figma__entrypoint__.ts not found"
fi

echo ""
echo "Step 3: Updating import statements..."
echo "---------------------------------------"

# Update imports in all .jsx, .js, .ts files
update_count=0
while IFS= read -r -d '' file; do
    # Create backup
    cp "$file" "$file.bak"
    
    # Replace .tsx with .jsx in imports, but preserve ImageWithFallback.tsx
    # This handles: from "./something.tsx" and import('./something.tsx')
    perl -pi -e '
        s{(from\s+['"'"'"])([^'"'"'"]+)\.tsx(['"'"'"])}
         {my ($pre, $path, $post) = ($1, $2, $3); 
          $path =~ /ImageWithFallback/ ? "$pre$path.tsx$post" : "$pre$path.jsx$post"}ge;
        s{(import\s*\(['"'"'"])([^'"'"'"]+)\.tsx(['"'"'"]\))}
         {my ($pre, $path, $post) = ($1, $2, $3); 
          $path =~ /ImageWithFallback/ ? "$pre$path.tsx$post" : "$pre$path.jsx$post"}ge;
    ' "$file"
    
    # Check if file changed
    if ! cmp -s "$file" "$file.bak"; then
        echo "✓ Updated imports in: $file"
        ((update_count++))
    fi
    
    # Remove backup
    rm "$file.bak"
done < <(find ./src -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.ts" \) -print0)

echo ""
echo "Updated imports in $update_count files"
echo ""

echo "========================================="
echo "✅ Conversion Complete!"
echo "========================================="
echo ""
echo "Summary:"
echo "  - Renamed: $count .tsx files to .jsx"
echo "  - Updated: $update_count files with new import paths"
echo "  - Protected: $PROTECTED (kept as .tsx)"
echo ""
echo "Your project is now using .jsx files!"
echo ""
