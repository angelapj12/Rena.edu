# Git Push Steps for Localization Deployment

Run these commands in your terminal to push localization changes to Vercel:

## Step 1: Stage all localization files
```bash
cd /Users/ang/Desktop/Rena.edu
git add messages/
git add src/app/\[locale\]/
git add src/i18n/
git add src/middleware.ts
git add next.config.js
git add src/app/layout.tsx
git add src/components/
git add package.json
git add package-lock.json
```

## Step 2: Add documentation files (optional)
```bash
git add LOCALIZATION_*.md
git add DEPLOYMENT_CHECKLIST.md
```

## Step 3: Commit the changes
```bash
git commit -m "Add localization support: English and Traditional Chinese with next-intl"
```

## Step 4: Push to GitHub
```bash
git push origin main
```

## Important Notes

⚠️ **BEFORE PUSHING:**
- Make sure `next-intl` is installed: `npm install next-intl`
- The package should be in `package.json` and `package-lock.json` (it will be added when you commit)

📝 **After pushing:**
- Vercel will automatically deploy
- Make sure in Vercel settings:
  - Root Directory: `Desktop/Rena.edu`
  - Framework Preset: `Next.js`
  - Build & Development Settings: Auto-detected

🔍 **If you see lock file errors:**
```bash
rm -f /Users/ang/.git/index.lock
```
Then try the git commands again.
