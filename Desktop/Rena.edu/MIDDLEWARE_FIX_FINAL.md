# Middleware Matcher Fix for Static Assets

## Problem
Static assets (JS, CSS, images) are being requested from `/en/_next/...` instead of `/_next/...`, causing 404 errors.

## Root Cause
The middleware needs to explicitly exclude static asset paths so Next.js doesn't try to route them through the locale system.

## Fix Applied
Added explicit `matcher` configuration to exclude:
- `/api` - API routes
- `/_next` - Next.js internal files (static assets, chunks)
- `/_vercel` - Vercel internal files
- `.*\\..*` - Any files with extensions (images, fonts, etc.)

## Push the Fix

```bash
git add src/middleware.ts
git commit -m "Fix static assets 404: exclude static paths from middleware"
git push origin main
```

After deployment, assets should load from root (`/_next/...`) instead of `/en/_next/...`.
