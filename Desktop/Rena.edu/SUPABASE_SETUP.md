# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `rena-edu` (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose closest to your users
5. Click "Create new project"

## Step 2: Create the Database Table

Once your project is created, go to the SQL Editor and run this SQL to create the `booking_requests` table:

```sql
-- Create booking_requests table
CREATE TABLE booking_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chinese_last_name TEXT NOT NULL,
  chinese_first_name TEXT NOT NULL,
  english_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  class_description TEXT NOT NULL,
  preferred_times TEXT,
  access_option TEXT CHECK (access_option IN ('flexible', 'committed', 'resident')),
  additional_notes TEXT,
  equipment TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'needs_followup', 'approved_pending_schedule', 'approved', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_booking_requests_email ON booking_requests(email);

-- Create an index on status for filtering
CREATE INDEX idx_booking_requests_status ON booking_requests(status);

-- Status values and their meanings:
-- 'submitted' - User submitted form
-- 'under_review' - Admin has opened / reviewed
-- 'needs_followup' - Missing info / clarification
-- 'approved_pending_schedule' - Approved, logistics not final
-- 'approved' - Fully confirmed
-- 'declined' - Closed

-- Create an index on created_at for sorting
CREATE INDEX idx_booking_requests_created_at ON booking_requests(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public inserts (form submissions)
CREATE POLICY "Allow public inserts" ON booking_requests
  FOR INSERT
  WITH CHECK (true);

-- Create a policy to allow authenticated users to read (optional, for admin panel)
-- You can modify this based on your needs
CREATE POLICY "Allow authenticated reads" ON booking_requests
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

## Step 3: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (found under "Project URL")
   - **anon public** key (found under "Project API keys" → "anon public")

## Step 4: Set Up Environment Variables

### For Local Development:

1. Create a `.env.local` file in your project root (same directory as `package.json`)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 3.

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. Make sure to add them for all environments (Production, Preview, Development)
5. Redeploy your application after adding the variables

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/book` page
3. Fill out the booking form
4. Submit the form
5. Check your Supabase dashboard:
   - Go to **Table Editor** → **booking_requests**
   - You should see your submitted data

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure `.env.local` exists and contains both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your development server after creating/updating `.env.local`

### Error: "new row violates row-level security policy"
- Make sure you've created the RLS policy for public inserts (see SQL above)
- Check that RLS is enabled and the policy allows inserts

### Error: "invalid input value for enum" or status constraint violation
- Make sure your database status constraint matches the workflow:
  - `submitted` - User submitted form
  - `under_review` - Admin has opened / reviewed
  - `needs_followup` - Missing info / clarification
  - `approved_pending_schedule` - Approved, logistics not final
  - `approved` - Fully confirmed
  - `declined` - Closed

### Form submission fails silently
- Check browser console for error messages
- Check Supabase dashboard → Logs for any database errors
- Verify your table structure matches the code (column names should match)

## Next Steps

- Consider adding email notifications when a booking is submitted
- Create an admin panel to view and manage booking requests
- Add validation rules on the Supabase side
- Set up automated status updates
