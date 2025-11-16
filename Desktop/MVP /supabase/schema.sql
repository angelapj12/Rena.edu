-- WellnessHub Database Schema
-- This creates all tables, functions, and security policies for the wellness class management app

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- ENUMS (with IF NOT EXISTS equivalent)
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
-- TABLES
-- =====================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firebase_uid TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    phone TEXT,
    role user_role DEFAULT 'student',
    
    -- Gamification fields
    xp_points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    
    -- Profile fields
    avatar_url TEXT,
    date_of_birth DATE,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    medical_notes TEXT,
    
    -- Admin/Instructor fields
    bio TEXT,
    certifications TEXT[],
    hourly_rate DECIMAL(8,2),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- Instructors table (extends users)
CREATE TABLE IF NOT EXISTS instructors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    specialties TEXT[] DEFAULT '{}',
    years_experience INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    featured_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    instructor_id UUID REFERENCES instructors(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    
    -- Scheduling
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    
    -- Capacity
    max_capacity INTEGER NOT NULL DEFAULT 20,
    current_bookings INTEGER DEFAULT 0,
    waitlist_count INTEGER DEFAULT 0,
    
    -- Pricing
    price DECIMAL(8,2) DEFAULT 0,
    drop_in_price DECIMAL(8,2),
    
    -- Location/Format
    location TEXT,
    is_virtual BOOLEAN DEFAULT false,
    meeting_link TEXT,
    
    -- Status and features
    status class_status DEFAULT 'scheduled',
    is_featured BOOLEAN DEFAULT false,
    featured_until TIMESTAMP WITH TIME ZONE,
    
    -- XP reward
    xp_reward INTEGER DEFAULT 10,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    
    -- Booking details
    status booking_status DEFAULT 'confirmed',
    booked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    
    -- Attendance and feedback
    attended BOOLEAN DEFAULT false,
    checked_in_at TIMESTAMP WITH TIME ZONE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    
    -- Payment
    amount_paid DECIMAL(8,2) DEFAULT 0,
    payment_method TEXT,
    payment_status payment_status DEFAULT 'pending',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique booking per user per class
    UNIQUE(user_id, class_id)
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    xp_reward INTEGER DEFAULT 0,
    
    -- Unlock criteria
    criteria_type TEXT NOT NULL, -- 'classes_attended', 'streak_days', 'level_reached', 'total_xp'
    criteria_value INTEGER NOT NULL,
    
    -- Display
    badge_color TEXT DEFAULT '#3B82F6',
    is_secret BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements (join table)
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, achievement_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    
    -- Related data
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    achievement_id UUID REFERENCES achievements(id) ON DELETE SET NULL,
    
    -- Status
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Push notification
    push_sent BOOLEAN DEFAULT false,
    push_sent_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    
    -- Transaction details
    amount DECIMAL(8,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_method TEXT NOT NULL,
    payment_provider TEXT, -- 'stripe', 'paypal', etc.
    provider_transaction_id TEXT,
    
    -- Status
    status payment_status DEFAULT 'pending',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

-- Class reviews table
CREATE TABLE IF NOT EXISTS class_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE UNIQUE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES instructors(id) ON DELETE SET NULL,
    
    -- Review content
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT,
    
    -- Moderation
    is_approved BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_level ON users(level);

-- Classes indexes
CREATE INDEX IF NOT EXISTS idx_classes_start_time ON classes(start_time);
CREATE INDEX IF NOT EXISTS idx_classes_category ON classes(category);
CREATE INDEX IF NOT EXISTS idx_classes_status ON classes(status);
CREATE INDEX IF NOT EXISTS idx_classes_instructor ON classes(instructor_id);
CREATE INDEX IF NOT EXISTS idx_classes_featured ON classes(is_featured, featured_until);

-- Bookings indexes
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_class_id ON bookings(class_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to calculate user level from XP
CREATE OR REPLACE FUNCTION calculate_level_from_xp(xp_points INTEGER)
RETURNS INTEGER AS $$
BEGIN
    -- Level formula: level = floor(sqrt(xp / 100)) + 1
    -- Level 1: 0-99 XP, Level 2: 100-399 XP, Level 3: 400-899 XP, etc.
    RETURN FLOOR(SQRT(xp_points::FLOAT / 100)) + 1;
END;
$$ LANGUAGE plpgsql;

-- Function to handle class booking
CREATE OR REPLACE FUNCTION book_class(
    p_user_id UUID,
    p_class_id UUID,
    p_amount_paid DECIMAL DEFAULT 0
)
RETURNS JSON AS $$
DECLARE
    v_class_record classes%ROWTYPE;
    v_booking_id UUID;
    v_result JSON;
BEGIN
    -- Get class details with row lock
    SELECT * INTO v_class_record 
    FROM classes 
    WHERE id = p_class_id AND status = 'scheduled'
    FOR UPDATE;
    
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Class not found or not available');
    END IF;
    
    -- Check if user already has a booking
    IF EXISTS (SELECT 1 FROM bookings WHERE user_id = p_user_id AND class_id = p_class_id) THEN
        RETURN json_build_object('success', false, 'error', 'Already booked');
    END IF;
    
    -- Check capacity
    IF v_class_record.current_bookings >= v_class_record.max_capacity THEN
        -- Add to waitlist
        INSERT INTO bookings (user_id, class_id, status, amount_paid)
        VALUES (p_user_id, p_class_id, 'waitlist', p_amount_paid)
        RETURNING id INTO v_booking_id;
        
        UPDATE classes 
        SET waitlist_count = waitlist_count + 1 
        WHERE id = p_class_id;
        
        RETURN json_build_object('success', true, 'booking_id', v_booking_id, 'status', 'waitlist');
    ELSE
        -- Confirm booking
        INSERT INTO bookings (user_id, class_id, status, amount_paid)
        VALUES (p_user_id, p_class_id, 'confirmed', p_amount_paid)
        RETURNING id INTO v_booking_id;
        
        UPDATE classes 
        SET current_bookings = current_bookings + 1 
        WHERE id = p_class_id;
        
        RETURN json_build_object('success', true, 'booking_id', v_booking_id, 'status', 'confirmed');
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to cancel booking
CREATE OR REPLACE FUNCTION cancel_booking(
    p_booking_id UUID,
    p_user_id UUID,
    p_reason TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    v_booking bookings%ROWTYPE;
    v_class_id UUID;
BEGIN
    -- Get booking details
    SELECT * INTO v_booking 
    FROM bookings 
    WHERE id = p_booking_id AND user_id = p_user_id AND status IN ('confirmed', 'waitlist');
    
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Booking not found or cannot be cancelled');
    END IF;
    
    v_class_id := v_booking.class_id;
    
    -- Update booking status
    UPDATE bookings 
    SET status = 'cancelled', 
        cancelled_at = NOW(),
        cancellation_reason = p_reason
    WHERE id = p_booking_id;
    
    -- Update class counts
    IF v_booking.status = 'confirmed' THEN
        UPDATE classes SET current_bookings = current_bookings - 1 WHERE id = v_class_id;
        
        -- Promote someone from waitlist
        WITH next_waitlist AS (
            SELECT id FROM bookings 
            WHERE class_id = v_class_id AND status = 'waitlist' 
            ORDER BY created_at 
            LIMIT 1
        )
        UPDATE bookings 
        SET status = 'confirmed'
        WHERE id IN (SELECT id FROM next_waitlist);
        
        -- Update waitlist count
        UPDATE classes SET waitlist_count = (
            SELECT COUNT(*) FROM bookings WHERE class_id = v_class_id AND status = 'waitlist'
        ) WHERE id = v_class_id;
        
    ELSIF v_booking.status = 'waitlist' THEN
        UPDATE classes SET waitlist_count = waitlist_count - 1 WHERE id = v_class_id;
    END IF;
    
    RETURN json_build_object('success', true);
END;
$$ LANGUAGE plpgsql;

-- Function to update user XP and level
CREATE OR REPLACE FUNCTION update_user_xp(
    p_user_id UUID,
    p_xp_gain INTEGER
)
RETURNS JSON AS $$
DECLARE
    v_old_xp INTEGER;
    v_new_xp INTEGER;
    v_old_level INTEGER;
    v_new_level INTEGER;
    v_level_up BOOLEAN := false;
BEGIN
    -- Get current XP and level
    SELECT xp_points, level INTO v_old_xp, v_old_level
    FROM users WHERE id = p_user_id;
    
    -- Calculate new values
    v_new_xp := v_old_xp + p_xp_gain;
    v_new_level := calculate_level_from_xp(v_new_xp);
    
    IF v_new_level > v_old_level THEN
        v_level_up := true;
    END IF;
    
    -- Update user
    UPDATE users 
    SET xp_points = v_new_xp, 
        level = v_new_level,
        last_activity_date = CURRENT_DATE
    WHERE id = p_user_id;
    
    RETURN json_build_object(
        'success', true,
        'old_xp', v_old_xp,
        'new_xp', v_new_xp,
        'old_level', v_old_level,
        'new_level', v_new_level,
        'level_up', v_level_up
    );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_reviews ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (firebase_uid = auth.jwt() ->> 'sub');
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (firebase_uid = auth.jwt() ->> 'sub');
CREATE POLICY "Anyone can view public user data" ON users FOR SELECT USING (true);
CREATE POLICY "Service role can manage users" ON users FOR ALL USING (auth.role() = 'service_role');

-- Instructors policies  
CREATE POLICY "Anyone can view instructors" ON instructors FOR SELECT USING (true);
CREATE POLICY "Instructors can update their own profile" ON instructors FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

-- Classes policies
CREATE POLICY "Anyone can view scheduled classes" ON classes FOR SELECT USING (status = 'scheduled');
CREATE POLICY "Admins can manage classes" ON classes FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE firebase_uid = auth.jwt() ->> 'sub' AND role = 'admin')
);

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);
CREATE POLICY "Users can create their own bookings" ON bookings FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);
CREATE POLICY "Users can update their own bookings" ON bookings FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

-- Achievements policies
CREATE POLICY "Anyone can view achievements" ON achievements FOR SELECT USING (true);

-- User achievements policies
CREATE POLICY "Users can view their own achievements" ON user_achievements FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

-- Payment transactions policies
CREATE POLICY "Users can view their own transactions" ON payment_transactions FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

-- Class reviews policies
CREATE POLICY "Anyone can view approved reviews" ON class_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can create reviews for their bookings" ON class_reviews FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- Insert default achievements
INSERT INTO achievements (name, description, icon_name, xp_reward, criteria_type, criteria_value, badge_color) VALUES
('First Class', 'Attended your first wellness class', 'trophy', 50, 'classes_attended', 1, '#10B981'),
('Dedicated Student', 'Attended 5 classes', 'medal', 100, 'classes_attended', 5, '#3B82F6'),
('Wellness Warrior', 'Attended 10 classes', 'crown', 200, 'classes_attended', 10, '#8B5CF6'),
('Class Champion', 'Attended 25 classes', 'diamond', 500, 'classes_attended', 25, '#F59E0B'),
('Streak Starter', 'Maintained a 3-day activity streak', 'fire', 75, 'streak_days', 3, '#EF4444'),
('Streak Master', 'Maintained a 7-day activity streak', 'flame', 150, 'streak_days', 7, '#F97316'),
('Level Up', 'Reached level 5', 'star', 250, 'level_reached', 5, '#6366F1'),
('XP Hunter', 'Earned 1000 XP points', 'gem', 300, 'total_xp', 1000, '#EC4899');

-- Insert sample admin user (you can update this with your actual Firebase UID)
INSERT INTO users (firebase_uid, email, display_name, role, xp_points, level) VALUES
('admin-demo-uid', 'admin@wellnesshub.com', 'WellnessHub Admin', 'admin', 0, 1)
ON CONFLICT (firebase_uid) DO NOTHING;

-- Success message
SELECT 'WellnessHub database schema created successfully! 🎉' as result;
