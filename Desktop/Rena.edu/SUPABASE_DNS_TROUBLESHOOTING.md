# Supabase DNS Troubleshooting

## Current Issue
DNS cannot resolve: `ydzngmpadhsgzjoksnvg.supabase.co`

## Possible Causes

### 1. Project Still Activating
If you just reactivated the project, DNS can take 5-15 minutes to propagate globally.

**Solution**: Wait 10-15 minutes and try again.

### 2. Project URL Changed
When a project is paused and reactivated, sometimes the URL changes.

**Solution**: Check your Supabase dashboard for the actual Project URL.

### 3. Project Not Fully Active
The project might show as "active" but still be initializing.

**Solution**: Check project status in dashboard.

## Steps to Fix

### Step 1: Verify Project URL in Supabase Dashboard

1. Go to https://app.supabase.com
2. Select your project
3. Go to **Settings** → **API**
4. Look at the **Project URL** field
5. **Copy the exact URL** shown there

The URL format should be: `https://[project-ref].supabase.co`

### Step 2: Check Project Status

1. In your Supabase dashboard, check the project status
2. Make sure it shows as "Active" (not "Paused" or "Initializing")
3. If it's still initializing, wait until it's fully active

### Step 3: Update `.env.local`

Once you have the correct Project URL from Step 1:

1. Open `.env.local` in your project root
2. Update `NEXT_PUBLIC_SUPABASE_URL` with the exact URL from the dashboard
3. Make sure it includes `https://` at the beginning
4. Save the file

### Step 4: Restart Dev Server

After updating `.env.local`:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Test DNS Resolution

In your terminal, test if the URL resolves:
```bash
nslookup [your-project-ref].supabase.co
```

Replace `[your-project-ref]` with the actual project reference from your dashboard.

If DNS resolves, you'll see an IP address.
If it doesn't, you'll see "can't find" - wait longer or check the URL.

## Alternative: Check Project Reference

The project reference (the part before `.supabase.co`) might be different. 

In your Supabase dashboard:
- Go to **Settings** → **General**
- Look for **Reference ID** or **Project Reference**
- This should match the part in your URL

## If URL is Different

If the dashboard shows a different URL than `ydzngmpadhsgzjoksnvg.supabase.co`:

1. Update `.env.local` with the correct URL
2. Update the fallback URL in `src/lib/supabase.ts` (optional, for safety)
3. Restart your dev server

## Still Not Working?

If after 15 minutes the DNS still doesn't resolve:

1. Double-check the Project URL in your Supabase dashboard
2. Verify the project is fully active (not paused)
3. Try accessing the URL directly in a browser
4. Contact Supabase support if the project shows as active but URL doesn't work
