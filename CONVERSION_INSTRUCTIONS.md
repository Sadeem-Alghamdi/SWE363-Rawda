# TSX to JSX Conversion Instructions

This document explains how to convert all `.tsx` files in the Rawda project to `.jsx` files.

## Quick Start

### Option 1: Node.js Script (Recommended - Cross-platform)

```bash
node CONVERT_ALL_FILES.js
```

### Option 2: Bash Script (Unix/Linux/Mac)

```bash
chmod +x CONVERT_ALL_FILES.sh
./CONVERT_ALL_FILES.sh
```

### Option 3: Manual Python Script

```bash
python3 convert_tsx_to_jsx.py
```

## What the Script Does

1. **Renames Files**: Converts all `.tsx` files to `.jsx` (except `ImageWithFallback.tsx` which is protected)
2. **Updates Entrypoint**: Changes `App.tsx` to `App.jsx` in `__figma__entrypoint__.ts`
3. **Updates Imports**: Fixes all import statements throughout the codebase to reference `.jsx` instead of `.tsx`

## Protected Files

The following files are kept as `.tsx` and will NOT be converted:
- `ImageWithFallback.tsx` (system component)

## Files Affected

Approximately **101 files** will be converted, including:
- Main app files (`App.tsx`, `routes.tsx`)
- Component files (all custom components)
- UI library components (shadcn/ui components)
- Page components (Expert, Gardener, Admin, Store dashboards)
- Layout components

## Verification

After running the script, verify that:

1. No `.tsx` files remain (except `ImageWithFallback.tsx`):
   ```bash
   find src -name "*.tsx" -type f
   ```
   Should only return: `src/app/components/figma/ImageWithFallback.tsx`

2. All imports are updated:
   ```bash
   grep -r "\.tsx" src --include="*.jsx" --include="*.js"
   ```
   Should only show references to `ImageWithFallback.tsx`

3. The entrypoint is updated:
   ```bash
   cat __figma__entrypoint__.ts
   ```
   Should show `import('./src/app/App.jsx')`

## Troubleshooting

### Script Fails or Errors

If the automated script fails, you can:

1. Check for file permission issues
2. Ensure all files are saved and not open in an editor
3. Run the script again - it's safe to run multiple times

### Manual Fallback

If scripts don't work, you can manually:
1. Rename each `.tsx` to `.jsx`
2. Find and replace all `from "./xxx.tsx"` to `from "./xxx.jsx"` 
3. Find and replace all `from '../xxx.tsx'` to `from '../xxx.jsx'`
4. Update `__figma__entrypoint__.ts` to import `App.jsx`

## After Conversion

Your project structure will remain the same, but all TypeScript JSX files will now be JavaScript JSX files:

- `/src/app/App.jsx` ✓
- `/src/app/routes.jsx` ✓
- `/src/app/components/**/*.jsx` ✓
- `/src/app/pages/**/*.jsx` ✓
- `/src/app/layouts/**/*.jsx` ✓

The project will continue to work normally with React and Vite!
