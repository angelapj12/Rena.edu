# Static Assets 404 Fix

## Problem
All static assets (JS, CSS, images) are being requested with `/en/` prefix:
- ❌ `/en/_next/static/chunks/...` (404)
- ❌ `/en/studio.png` (404)

**Should be:**
- ✅ `/_next/static/chunks/...`
- ✅ `/studio.png`

## Root Cause
Root `layout.tsx` was using `getLocale()` which breaks asset path resolution in next-intl.

## Fix Applied
✅ Removed `getLocale()` from root layout
✅ Simplified root layout to not use locale-dependent code

## Next Steps

1. **Commit and push the fix:**
   ```bash
   git add src/app/layout.tsx
   git commit -m "Fix static assets 404: remove getLocale from root layout"
   git push origin main
   ```

2. **After deployment, verify:**
   - Assets load from `/_next/...` (not `/en/_next/...`)
   - Images load from `/studio.png` (not `/en/studio.png`)
   - Styling works
   - Navigation works

## Why This Happens
In next-intl with App Router, the root layout must be simple and synchronous. Using `getLocale()` in the root layout causes Next.js to incorrectly prefix all asset paths with the locale.

The locale is handled by the middleware and the `[locale]` layout - the root layout should not access it.
