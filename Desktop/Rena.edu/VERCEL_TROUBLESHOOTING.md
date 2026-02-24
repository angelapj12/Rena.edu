# Vercel 404 Troubleshooting Guide

## Issue: 404 Errors for Static Assets

If you're seeing 404 errors for:
- `webpack.js`
- `main-app.js`
- `app-pages-internals.js`
- `page.js`
- `layout.css`

This means Next.js static assets aren't being served correctly.

## Solutions

### 1. Check Vercel Project Settings

In Vercel Dashboard → Settings → General:

- **Root Directory**: Should be `/` (empty) or leave blank
- **Framework Preset**: Should be "Next.js" (auto-detected)
- **Build Command**: Should be `npm run build` (auto-detected)
- **Output Directory**: Should be `.next` (auto-detected) - but Next.js handles this automatically

### 2. Verify Build Logs

1. Go to Deployments → Latest deployment
2. Check "Build Logs" tab
3. Look for:
   - ✅ "Build completed successfully"
   - ✅ "Generating static pages"
   - ❌ Any errors or warnings

### 3. Check Function Logs

1. In the same deployment
2. Check "Function Logs" tab
3. Look for runtime errors

### 4. Verify Environment Variables

Make sure these are set in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5. Clear Build Cache

1. Settings → General
2. Scroll to "Clear Build Cache"
3. Click "Clear Build Cache"
4. Redeploy

### 6. Check Git Repository Structure

The project should be at the root of the repository, not in a subdirectory.

Verify in Vercel:
- Settings → General → Root Directory should be `/` or empty

### 7. Force Fresh Deployment

1. Make a small change (like adding a comment)
2. Commit and push
3. This triggers a fresh build

## Current Status

✅ **vercel.json removed** - Vercel will auto-detect Next.js
✅ **All files committed to git**
✅ **Build works locally**

## Next Steps

1. **Redeploy on Vercel** (the latest commit should trigger auto-deploy)
2. **Check Build Logs** to see if build completes
3. **Verify Root Directory** is set correctly in Vercel settings
4. **Clear Build Cache** if issues persist

## If Still Not Working

Share:
1. Build logs from Vercel
2. Function logs (if any)
3. Screenshot of Vercel project settings (General tab)
