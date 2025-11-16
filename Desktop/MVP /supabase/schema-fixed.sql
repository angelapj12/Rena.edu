-- WellnessHub Database Schema - FIXED VERSION
-- This creates all tables, functions, and security policies for the wellness class management app
-- Tables are ordered to resolve foreign key dependencies

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
-- TABLES (in dependency order)
-- =====================================================

-- 1. Users table (no dependencies)
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

-- 2. Instructors table (depends on users)
CREATE TABLE IF NOT EXISTS instructors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE, -- One instructor per user
    instructor_name TEXT NOT NULL,
    instructor_title TEXT,
    bio TEXT,
    credentials TEXT[] DEFAULT '{}',
    email TEXT,
    phone TEXT,
    years_experience INTEGER DEFAULT 0,
    specialty TEXT,
    active BOOLEAN DEFAULT true,
    image TEXT,
    average_rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    total_classes_taught INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    featured_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Class Templates table (depends on instructors)
CREATE TABLE IF NOT EXISTS class_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id TEXT UNIQUE NOT NULL, -- For easy reference (class001, class002, etc.)
    class_name TEXT NOT NULL,
    class_description TEXT,
    class_category TEXT NOT NULL,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
    
    -- Course details
    duration TEXT, -- e.g., "8 weeks", "90 minutes"
    learning_outcomes TEXT[],
    certification BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    image TEXT,
    
    -- Default settings for sessions
    default_capacity INTEGER NOT NULL DEFAULT 20,
    default_price DECIMAL(8,2) DEFAULT 0,
    default_xp_reward INTEGER DEFAULT 10,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Class Sessions table (depends on class_templates and instructors)
CREATE TABLE IF NOT EXISTS class_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT UNIQUE NOT NULL, -- For easy reference (sess001, sess002, etc.)
    class_template_id UUID REFERENCES class_templates(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES instructors(id) ON DELETE SET NULL,
    
    -- Session details
    class_name TEXT NOT NULL, -- Denormalized for easy queries
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    
    -- Capacity and pricing (can override template defaults)
    capacity INTEGER NOT NULL,
    current_bookings INTEGER DEFAULT 0,
    waitlist_count INTEGER DEFAULT 0,
    price DECIMAL(8,2) DEFAULT 0,
    
    -- Location/Format
    location TEXT,
    is_virtual BOOLEAN DEFAULT false,
    meeting_link TEXT,
    
    -- Status and features
    status class_status DEFAULT 'scheduled',
    active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    featured_until TIMESTAMP WITH TIME ZONE,
    
    -- XP reward (can override template default)
    xp_reward INTEGER DEFAULT 10,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Bookings table (depends on users and class_sessions)
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES class_sessions(id) ON DELETE CASCADE,
    
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
    
    -- Ensure unique booking per user per session
    UNIQUE(user_id, session_id)
);

-- 6. Achievements table (no dependencies)
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

-- 7. User achievements (depends on users and achievements)
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, achievement_id)
);

-- 8. Notifications table (depends on users, class_sessions, bookings, achievements)
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    
    -- Related data
    session_id UUID REFERENCES class_sessions(id) ON DELETE SET NULL,
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

-- 9. Payment transactions table (depends on users and bookings)
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

-- 10. Class reviews table (depends on bookings, users, class_sessions, instructors)
CREATE TABLE IF NOT EXISTS class_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE UNIQUE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES class_sessions(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES instructors(id) ON DELETE SET NULL,
    
    -- Review content
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT,
    sample_review TEXT, -- For test data compatibility
    review_user_full_name TEXT, -- For test data compatibility
    
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

-- Instructors indexes
CREATE INDEX IF NOT EXISTS idx_instructors_user_id ON instructors(user_id);
CREATE INDEX IF NOT EXISTS idx_instructors_active ON instructors(active);
CREATE INDEX IF NOT EXISTS idx_instructors_specialty ON instructors(specialty);
CREATE INDEX IF NOT EXISTS idx_instructors_rating ON instructors(average_rating);

-- Class Templates indexes
CREATE INDEX IF NOT EXISTS idx_class_templates_class_id ON class_templates(class_id);
CREATE INDEX IF NOT EXISTS idx_class_templates_category ON class_templates(class_category);
CREATE INDEX IF NOT EXISTS idx_class_templates_active ON class_templates(active);
CREATE INDEX IF NOT EXISTS idx_class_templates_level ON class_templates(level);

-- Class Sessions indexes
CREATE INDEX IF NOT EXISTS idx_class_sessions_session_id ON class_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_class_sessions_template_id ON class_sessions(class_template_id);
CREATE INDEX IF NOT EXISTS idx_class_sessions_instructor_id ON class_sessions(instructor_id);
CREATE INDEX IF NOT EXISTS idx_class_sessions_start_time ON class_sessions(start_time);
CREATE INDEX IF NOT EXISTS idx_class_sessions_status ON class_sessions(status);
CREATE INDEX IF NOT EXISTS idx_class_sessions_active ON class_sessions(active);
CREATE INDEX IF NOT EXISTS idx_class_sessions_featured ON class_sessions(is_featured, featured_until);

-- Bookings indexes
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_session_id ON bookings(session_id);
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

-- Function to handle class session booking
CREATE OR REPLACE FUNCTION book_session(
    p_user_id UUID,
    p_session_id UUID,
    p_amount_paid DECIMAL DEFAULT 0
)
RETURNS JSON AS $$
DECLARE
    v_session_record class_sessions%ROWTYPE;
    v_booking_id UUID;
    v_result JSON;
BEGIN
    -- Get session details with row lock
    SELECT * INTO v_session_record 
    FROM class_sessions 
    WHERE id = p_session_id AND status = 'scheduled' AND active = true
    FOR UPDATE;
    
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Session not found or not available');
    END IF;
    
    -- Check if user already has a booking
    IF EXISTS (SELECT 1 FROM bookings WHERE user_id = p_user_id AND session_id = p_session_id) THEN
        RETURN json_build_object('success', false, 'error', 'Already booked');
    END IF;
    
    -- Check capacity
    IF v_session_record.current_bookings >= v_session_record.capacity THEN
        -- Add to waitlist
        INSERT INTO bookings (user_id, session_id, status, amount_paid)
        VALUES (p_user_id, p_session_id, 'waitlist', p_amount_paid)
        RETURNING id INTO v_booking_id;
        
        UPDATE class_sessions 
        SET waitlist_count = waitlist_count + 1 
        WHERE id = p_session_id;
        
        RETURN json_build_object('success', true, 'booking_id', v_booking_id, 'status', 'waitlist');
    ELSE
        -- Confirm booking
        INSERT INTO bookings (user_id, session_id, status, amount_paid)
        VALUES (p_user_id, p_session_id, 'confirmed', p_amount_paid)
        RETURNING id INTO v_booking_id;
        
        UPDATE class_sessions 
        SET current_bookings = current_bookings + 1 
        WHERE id = p_session_id;
        
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
    v_session_id UUID;
BEGIN
    -- Get booking details
    SELECT * INTO v_booking 
    FROM bookings 
    WHERE id = p_booking_id AND user_id = p_user_id AND status IN ('confirmed', 'waitlist');
    
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Booking not found or cannot be cancelled');
    END IF;
    
    v_session_id := v_booking.session_id;
    
    -- Update booking status
    UPDATE bookings 
    SET status = 'cancelled', 
        cancelled_at = NOW(),
        cancellation_reason = p_reason
    WHERE id = p_booking_id;
    
    -- Update session capacity
    IF v_booking.status = 'confirmed' THEN
        UPDATE class_sessions 
        SET current_bookings = current_bookings - 1
        WHERE id = v_session_id;
    ELSIF v_booking.status = 'waitlist' THEN
        UPDATE class_sessions 
        SET waitlist_count = waitlist_count - 1
        WHERE id = v_session_id;
    END IF;
    
    RETURN json_build_object('success', true, 'message', 'Booking cancelled successfully');
END;
$$ LANGUAGE plpgsql;

-- Function to award XP and handle level up
CREATE OR REPLACE FUNCTION award_xp(
    p_user_id UUID,
    p_xp_amount INTEGER,
    p_reason TEXT DEFAULT 'Activity completion'
)
RETURNS JSON AS $$
DECLARE
    v_old_xp INTEGER;
    v_new_xp INTEGER;
    v_old_level INTEGER;
    v_new_level INTEGER;
    v_level_up BOOLEAN := false;
BEGIN
    -- Get current user stats
    SELECT xp_points, level INTO v_old_xp, v_old_level
    FROM users WHERE id = p_user_id;
    
    -- Calculate new values
    v_new_xp := v_old_xp + p_xp_amount;
    v_new_level := calculate_level_from_xp(v_new_xp);
    v_level_up := v_new_level > v_old_level;
    
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
CREATE TRIGGER update_instructors_updated_at BEFORE UPDATE ON instructors FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_class_templates_updated_at BEFORE UPDATE ON class_templates FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_class_sessions_updated_at BEFORE UPDATE ON class_sessions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_sessions ENABLE ROW LEVEL SECURITY;
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
CREATE POLICY "Admins can manage instructors" ON instructors FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE firebase_uid = auth.jwt() ->> 'sub' AND role = 'admin')
);

-- Class Templates policies
CREATE POLICY "Anyone can view active class templates" ON class_templates FOR SELECT USING (active = true);
CREATE POLICY "Admins can manage class templates" ON class_templates FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE firebase_uid = auth.jwt() ->> 'sub' AND role = 'admin')
);

-- Class Sessions policies
CREATE POLICY "Anyone can view scheduled sessions" ON class_sessions FOR SELECT USING (status = 'scheduled' AND active = true);
CREATE POLICY "Admins can manage class sessions" ON class_sessions FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE firebase_uid = auth.jwt() ->> 'sub' AND role = 'admin')
);
CREATE POLICY "Instructors can view their sessions" ON class_sessions FOR SELECT USING (
    instructor_id IN (
        SELECT i.id FROM instructors i 
        JOIN users u ON i.user_id = u.id 
        WHERE u.firebase_uid = auth.jwt() ->> 'sub'
    )
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
('Streak Master', 'Maintained a 7-day activity streak', 'lightning', 150, 'streak_days', 7, '#F97316'),
('Level Up', 'Reached level 5', 'star', 250, 'level_reached', 5, '#6366F1'),
('XP Collector', 'Earned 1000 total XP', 'gem', 300, 'total_xp', 1000, '#EC4899')
ON CONFLICT (name) DO NOTHING;

-- Success message
SELECT 'Database schema deployed successfully! 🎉' as result;
