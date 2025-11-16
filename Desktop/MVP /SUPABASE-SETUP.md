# Supabase Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project" 
3. Sign in with GitHub/Google
4. Click "New Project"
5. Choose organization and enter:
   - **Name**: `wellness-hub` 
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to you
6. Click "Create new project"

### Step 2: Get Your Keys
After project is created:
1. Go to Settings → API
2. Copy your:
   - **Project URL** (looks like: `https://abc123xyz.supabase.co`)
   - **anon public key** (long JWT token)

### Step 3: Update Environment Variables
Replace these lines in your `.env` file:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_URL.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Create Database Tables
In Supabase dashboard, go to SQL Editor and run:

```sql
-- Create users table
CREATE TABLE users (
  firebase_uid VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255),
  role VARCHAR(20) DEFAULT 'student',
  photo_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create classes table  
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id VARCHAR(50) UNIQUE NOT NULL,
  class_name VARCHAR(200) NOT NULL,
  class_category VARCHAR(100) NOT NULL,
  class_description TEXT,
  level VARCHAR(50),
  duration VARCHAR(50),
  capacity INTEGER,
  price DECIMAL(10,2),
  xp_reward INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create instructors table
CREATE TABLE instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id VARCHAR(50) UNIQUE NOT NULL,
  firebase_uid VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  specialization VARCHAR(100),
  experience_years INTEGER,
  bio TEXT,
  rating DECIMAL(3,2),
  total_classes INTEGER DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Step 5: Test Connection
Run in browser console:
```javascript
testDatabaseConnection()
```

## 🎯 Current Status
- ❌ Current Supabase URL is invalid/demo
- ✅ Environment variables are properly loaded
- ✅ Offline test data system ready to use

## 🚀 Recommended Next Steps
1. **Immediate**: Use `insertOfflineTestData()` to test app functionality
2. **Later**: Set up real Supabase project following steps above
3. **Then**: Run `insertTestData()` to populate real database
