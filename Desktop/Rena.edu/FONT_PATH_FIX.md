# Font Path Case Sensitivity Fix

## Problem Found
CSS was referencing `/fonts/Axiforma/` but font files are in `public/fonts/axiforma/` (lowercase).

**Why this matters:**
- macOS filesystem: Case-insensitive (works locally) ✅
- Linux filesystem (Vercel): Case-sensitive (fonts fail to load) ❌

## Fix Applied
Updated `src/app/globals.css` to use correct lowercase path: `/fonts/axiforma/`

## Next Steps
Commit and push this fix:

```bash
git add src/app/globals.css
git commit -m "Fix font path case sensitivity for Vercel deployment"
git push origin main
```

After deployment, fonts should load correctly and styling should be fixed!
