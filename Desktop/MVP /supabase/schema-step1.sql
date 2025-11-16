-- WellnessHub Database Schema - Step 1: Create tables without foreign keys
-- This creates all tables and basic structure first

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- ENUMS
-- =====================================================

-- User role enum
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'admin', 'instructor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Booking status enum  
DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('confirmed', 'cancelled', 'waitlist', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Class status enum
DO $$ BEGIN
    CREATE TYPE class_status AS ENUM ('scheduled', 'cancelled', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Notification type enum
DO $$ BEGIN
    CREATE TYPE notification_type AS ENUM ('booking_confirmed', 'booking_cancelled', 'class_reminder', 'achievement_unlocked', 'level_up', 'streak_milestone');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Payment status enum
DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- TABLES (without foreign keys first)
-- =====================================================

-- 1. Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firebase_uid TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    phone TEXT,
    role user_role DEFAULT 'student',
    
    -- Profile info
    profile_image_url TEXT,
    bio TEXT,
    date_of_birth DATE,
    
    -- Gamification
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    
    -- Preferences
    notifications_enabled BOOLEAN DEFAULT true,
    marketing_emails BOOLEAN DEFAULT false,
    preferred_class_times TEXT[] DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Instructors table
CREATE TABLE IF NOT EXISTS instructors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- Will add foreign key constraint later
    instructor_name TEXT NOT NULL,
    instructor_title TEXT,
    bio TEXT,
    credentials TEXT[] DEFAULT '{}',
    email TEXT,
    phone TEXT,
    profile_image_url TEXT,
    
    -- Pricing
    hourly_rate DECIMAL(8,2),
    currency TEXT DEFAULT 'USD',
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Class Templates table
CREATE TABLE IF NOT EXISTS class_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id TEXT UNIQUE NOT NULL,
    class_name TEXT NOT NULL,
    class_description TEXT,
    class_category TEXT NOT NULL,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
    
    -- Course details
    duration TEXT,
    learning_outcomes TEXT[],
    required_equipment TEXT[],
    prerequisites TEXT,
    
    -- Pricing
    price DECIMAL(8,2) NOT NULL DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    
    -- Settings
    max_participants INTEGER DEFAULT 20,
    min_participants INTEGER DEFAULT 1,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Class Sessions table
CREATE TABLE IF NOT EXISTS class_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT UNIQUE NOT NULL,
    class_template_id UUID, -- Will add foreign key constraint later
    instructor_id UUID, -- Will add foreign key constraint later
    
    -- Session details
    session_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    timezone TEXT DEFAULT 'UTC',
    
    -- Capacity
    max_participants INTEGER NOT NULL DEFAULT 20,
    current_bookings INTEGER DEFAULT 0,
    waitlist_count INTEGER DEFAULT 0,
    
    -- Location
    location_type TEXT CHECK (location_type IN ('in-person', 'virtual', 'hybrid')),
    location_address TEXT,
    virtual_meeting_url TEXT,
    room_details TEXT,
    
    -- Status
    status class_status DEFAULT 'scheduled',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- Will add foreign key constraint later
    session_id UUID, -- Will add foreign key constraint later
    
    -- Booking details
    status booking_status DEFAULT 'confirmed',
    booking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    amount_paid DECIMAL(8,2) DEFAULT 0,
    payment_method TEXT,
    
    -- Cancellation
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    
    -- Attendance
    attended BOOLEAN,
    feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
    feedback_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    xp_reward INTEGER DEFAULT 0,
    
    -- Unlock criteria
    criteria_type TEXT NOT NULL,
    criteria_value INTEGER NOT NULL,
    
    -- Display
    badge_color TEXT DEFAULT '#3B82F6',
    is_secret BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. User achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- Will add foreign key constraint later
    achievement_id UUID, -- Will add foreign key constraint later
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- Will add foreign key constraint later
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    
    -- Related data
    session_id UUID, -- Will add foreign key constraint later
    booking_id UUID, -- Will add foreign key constraint later
    achievement_id UUID, -- Will add foreign key constraint later
    
    -- Status
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Push notification
    push_sent BOOLEAN DEFAULT false,
    push_sent_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Payment transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- Will add foreign key constraint later
    booking_id UUID, -- Will add foreign key constraint later
    
    -- Transaction details
    amount DECIMAL(8,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_method TEXT NOT NULL,
    payment_provider TEXT,
    provider_transaction_id TEXT,
    
    -- Status
    status payment_status DEFAULT 'pending',
    
    -- Timestamps
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Class reviews table
CREATE TABLE IF NOT EXISTS class_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID, -- Will add foreign key constraint later
    user_id UUID, -- Will add foreign key constraint later
    session_id UUID, -- Will add foreign key constraint later
    instructor_id UUID, -- Will add foreign key constraint later
    
    -- Review content
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Success message
SELECT 'Tables created successfully! Now run schema-step2.sql to add foreign keys.' as result;
