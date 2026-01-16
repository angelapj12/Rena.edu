# Steps to Push to Git

## Step 1: Check Current Status
```bash
cd /Users/ang/Desktop/Rena.edu
git status
```

## Step 2: Add All Project Files
Add all files in the current directory (Rena.edu):
```bash
git add .
```

Or add specific files/directories:
```bash
git add src/
git add public/
git add package.json
git add next.config.js
git add tailwind.config.ts
git add tsconfig.json
git add postcss.config.js
git add README.md
git add DESIGN.md
git add SUPABASE_SETUP.md
git add DEPLOYMENT.md
git add vercel.json
```

## Step 3: Commit Your Changes
```bash
git commit -m "Initial commit: Rena.edu website with Supabase integration"
```

Or with a more detailed message:
```bash
git commit -m "Add Rena.edu website

- Next.js 14 with TypeScript and Tailwind CSS
- Booking form with multi-step wizard
- Supabase integration for form submissions
- Homepage, Space page, and Booking page
- Axiforma font integration
- Responsive design with animations"
```

## Step 4: Set Up Remote Repository (if not already set)

### Option A: Create a new repository on GitHub
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `Rena.edu` (or your preferred name)
3. **Don't** initialize with README, .gitignore, or license
4. Copy the repository URL (e.g., `https://github.com/yourusername/Rena.edu.git`)

### Option B: Use existing repository
If you already have a remote repository, skip to Step 5.

## Step 5: Add Remote Repository
```bash
git remote add origin https://github.com/yourusername/Rena.edu.git
```

Replace `yourusername` and `Rena.edu` with your actual GitHub username and repository name.

To check if remote is already set:
```bash
git remote -v
```

## Step 6: Push to GitHub
```bash
git push -u origin main
```

If you're on a different branch (like `master`), use:
```bash
git push -u origin master
```

## Troubleshooting

### If you get "remote origin already exists"
Remove the existing remote and add the new one:
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/Rena.edu.git
```

### If you get authentication errors
You may need to:
1. Use a Personal Access Token instead of password
2. Set up SSH keys
3. Use GitHub CLI: `gh auth login`

### If you need to force push (use with caution!)
```bash
git push -u origin main --force
```

## Important Notes

- `.env.local` is already in `.gitignore` and will NOT be committed (this is correct for security)
- Make sure to add the same environment variables in Vercel dashboard for deployment
- The deleted files from `../MVP/` are from a different project and can be ignored or cleaned up separately

## Quick Command Summary
```bash
cd /Users/ang/Desktop/Rena.edu
git add .
git commit -m "Initial commit: Rena.edu website"
git remote add origin https://github.com/yourusername/Rena.edu.git
git push -u origin main
```
