# Styling & Navigation Issues - Diagnostic & Fix

## Quick Checks (In Browser)

### 1. Check Browser Console
**Open Developer Tools:**
- Chrome/Edge: `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
- Look at the "Console" tab
- **Report back:** Any red errors?

### 2. Check if CSS is Loading
**In Browser Dev Tools:**
- Go to "Network" tab
- Refresh the page
- Filter by "CSS"
- **Look for:** `globals.css` or `app.css`
- **Is it loading?** (Status 200 = OK, 404 = missing)

### 3. Check if Tailwind is Applied
**Right-click on any element** → "Inspect"
- Look at the styles panel
- **Do you see Tailwind classes being applied?** (like `bg-[#FAF9F7]`, `text-[#2B2B2B]`)
- Or just default browser styles?

### 4. Test Navigation
- **Click the language switcher buttons** (EN / 繁中) - do they work?
- **Click "The Space" link** - does it navigate?
- **Click "Submit a Class" button** - does it navigate?
- **Check the URL** - does it change when you click?

## Possible Issues & Fixes

### Issue 1: CSS File Not Loading
**Symptom:** No styles at all, looks like plain HTML

**Check:**
- Browser Network tab → is `globals.css` loading?
- Check for 404 errors

**Fix:** CSS is imported in `src/app/layout.tsx` - verify the import path

### Issue 2: Tailwind Not Compiling
**Symptom:** Some styles work, but Tailwind classes don't

**Fix:** Make sure `postcss.config.js` exists and Tailwind is in dependencies

### Issue 3: JavaScript Errors Breaking Navigation
**Symptom:** Buttons/links don't respond to clicks

**Check:**
- Browser Console → any JavaScript errors?
- Common errors: "useTranslations is not a function", "Link is not defined"

### Issue 4: Font Loading Breaking Layout
**Symptom:** Layout is completely broken, elements overlapping

**Fix:** Font path is already fixed to lowercase `axiforma` - make sure it's pushed

### Issue 5: Client Component Issues
**Symptom:** Header/navigation not rendering or errors in console

**Check:**
- Header is marked `"use client"` ✓
- It's importing from `@/i18n/routing` ✓
- `useParams()` might fail if params aren't available

## Immediate Action Items

1. **Check Browser Console** - What errors do you see?
2. **Verify CSS Loading** - Is `globals.css` loading in Network tab?
3. **Test One Navigation** - Try clicking the language switcher, does URL change?
4. **Check Build Logs** - Any errors during the build on Vercel?

## Quick Test
**Open browser console and run:**
```javascript
// Check if next-intl is loaded
console.log(typeof window !== 'undefined' ? 'Client-side' : 'Server-side');

// Check if CSS is loaded
console.log(document.styleSheets.length);
```

**Report back:**
1. Console errors (copy/paste)
2. Does CSS file load? (from Network tab)
3. What happens when you click navigation links?
