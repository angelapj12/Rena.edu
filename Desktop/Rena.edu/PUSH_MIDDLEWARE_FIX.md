# Push Middleware Fix

**Updated the middleware to use next-intl's automatic matcher.**

Run these commands to push the fix:

```bash
cd /Users/ang/Desktop/Rena.edu
git add src/middleware.ts
git commit -m "Fix middleware: use next-intl automatic matcher"
git push origin main
```

This removes the custom matcher - next-intl handles it automatically, which should fix the 404 errors.

After pushing, wait for Vercel to redeploy, then test:
- `/` should redirect to `/en/`
- `/en/` should work
- `/zh-TW/` should work
