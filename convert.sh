#!/bin/bash

echo "🔄 Converting .tsx files to .jsx..."

# Find and rename all .tsx files except ImageWithFallback.tsx
find ./src -name "*.tsx" -not -name "ImageWithFallback.tsx" -type f | while read file; do
    newfile="${file%.tsx}.jsx"
    mv "$file" "$newfile"
    echo "✓ Renamed: $file -> $newfile"
done

# Update entrypoint to use .jsx
if [ -f "__figma__entrypoint__.ts" ]; then
    sed -i "s/App\.tsx/App.jsx/g" "__figma__entrypoint__.ts"
    echo "✓ Updated __figma__entrypoint__.ts"
fi

# Update all imports in .jsx files (excluding ImageWithFallback)
find ./src -name "*.jsx" -type f | while read file; do
    # Replace .tsx with .jsx in imports, but keep ImageWithFallback.tsx
    sed -i '/ImageWithFallback/!s/\.tsx/\.jsx/g' "$file"
done

# Update routes if it's now .jsx
if [ -f "./src/app/routes.jsx" ]; then
    sed -i '/ImageWithFallback/!s/\.tsx/\.jsx/g' "./src/app/routes.jsx"
    echo "✓ Updated routes.jsx"
fi

echo "✅ Conversion complete!"
echo "Note: ImageWithFallback.tsx kept as .tsx (protected file)"
