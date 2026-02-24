# Verify Supabase Connection

## Your Credentials
- **Project ID**: `ydzngmpadhsgzjoksnvg`
- **Expected URL**: `https://ydzngmpadhsgzjoksnvg.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (matches)

## Steps to Verify

### 1. Check Your `.env.local` File

Make sure your `.env.local` file in the project root contains:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ydzngmpadhsgzjoksnvg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkem5nbXBhZGhzZ3pqb2tzbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MzU1MjcsImV4cCI6MjA4NDExMTUyN30.hoT93eczIHs8X1rzkLSvA2ixzqclZcG0TYM5ouW5kFg
```

**Important**: 
- No quotes around the values
- No spaces around the `=` sign
- Make sure there are no trailing spaces

### 2. Verify in Supabase Dashboard

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Go to **Settings** → **API**
4. Check the **Project URL** - it should match exactly: `https://ydzngmpadhsgzjoksnvg.supabase.co`
5. Check the **anon public** key matches

### 3. Test Connection Directly

You can test if the URL resolves by:

1. **In your browser**, try opening: `https://ydzngmpadhsgzjoksnvg.supabase.co/rest/v1/`
   - If it loads (even with an error), DNS is working
   - If it says "can't reach this page" or "ERR_NAME_NOT_RESOLVED", DNS is the issue

2. **In terminal**, test DNS resolution:
   ```bash
   nslookup ydzngmpadhsgzjoksnvg.supabase.co
   ```
   - Should return an IP address if DNS is working

### 4. Common Issues

#### Issue: Project Just Reactivated
- **Solution**: Wait 2-5 minutes for DNS propagation
- Try again after waiting

#### Issue: DNS Not Resolving
- **Solution**: 
  - Check your internet connection
  - Try a different network (mobile hotspot)
  - Clear DNS cache: `sudo dscacheutil -flushcache` (macOS)

#### Issue: Wrong URL Format
- **Solution**: Make sure the URL in `.env.local` exactly matches the Project URL from Supabase dashboard
- Should be: `https://ydzngmpadhsgzjoksnvg.supabase.co` (with `https://`)

#### Issue: Environment Variables Not Loading
- **Solution**: 
  - Restart your dev server after creating/updating `.env.local`
  - Make sure `.env.local` is in the project root (same directory as `package.json`)
  - Check for typos in variable names: `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)

### 5. Restart Dev Server

After making any changes to `.env.local`:

1. Stop the server (Ctrl+C)
2. Start again: `npm run dev`
3. Check the console for: `Supabase URL: https://ydzngmpadhsgzjoksnvg.supabase.co`

### 6. Check Browser Console

When you open the admin portal, check the browser console for:
- Connection test results
- Any error messages
- The Supabase URL being used

The improved error messages will now tell you exactly what's wrong.
