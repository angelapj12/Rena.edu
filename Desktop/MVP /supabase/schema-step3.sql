-- WellnessHub Database Schema - Step 3: Functions and Security Policies
-- This adds all database functions and Row Level Security policies

-- =====================================================
-- DATABASE FUNCTIONS
-- =====================================================

-- Function to book a class
CREATE OR REPLACE FUNCTION book_class(
    p_user_id UUID,
    p_session_id UUID,
    p_amount_paid DECIMAL DEFAULT 0
)
RETURNS JSON AS $$
DECLARE
    v_session class_sessions%ROWTYPE;
    v_booking_id UUID;
BEGIN
    -- Get session details
    SELECT * INTO v_session FROM class_sessions WHERE id = p_session_id;
    
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Session not found');
    END IF;
    
    -- Check if user already has a booking
    IF EXISTS (SELECT 1 FROM bookings WHERE user_id = p_user_id AND session_id = p_session_id) THEN
        RETURN json_build_object('success', false, 'error', 'Already booked');
    END IF;
    
    -- Check capacity
    IF v_session.current_bookings >= v_session.max_participants THEN
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
    p_source TEXT DEFAULT 'manual'
)
RETURNS JSON AS $$
DECLARE
    v_user users%ROWTYPE;
    v_new_level INTEGER;
    v_old_level INTEGER;
BEGIN
    -- Get current user data
    SELECT * INTO v_user FROM users WHERE id = p_user_id;
    
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'User not found');
    END IF;
    
    v_old_level := v_user.level;
    
    -- Calculate new level (every 100 XP = 1 level)
    v_new_level := GREATEST(1, (v_user.xp + p_xp_amount) / 100);
    
    -- Update user XP and level
    UPDATE users 
    SET xp = xp + p_xp_amount,
        level = v_new_level,
        updated_at = NOW()
    WHERE id = p_user_id;
    
    -- Check for level up
    IF v_new_level > v_old_level THEN
        -- Create level up notification
        INSERT INTO notifications (user_id, type, title, message)
        VALUES (
            p_user_id,
            'level_up',
            'Level Up!',
            'Congratulations! You reached level ' || v_new_level || '!'
        );
        
        RETURN json_build_object(
            'success', true, 
            'xp_awarded', p_xp_amount,
            'total_xp', v_user.xp + p_xp_amount,
            'level_up', true,
            'new_level', v_new_level
        );
    END IF;
    
    RETURN json_build_object(
        'success', true, 
        'xp_awarded', p_xp_amount,
        'total_xp', v_user.xp + p_xp_amount,
        'level_up', false,
        'level', v_new_level
    );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
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
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (
    firebase_uid = auth.jwt() ->> 'sub'
);

CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (
    firebase_uid = auth.jwt() ->> 'sub'
);

CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (
    role = 'admin' AND firebase_uid = auth.jwt() ->> 'sub'
);

-- Instructors policies
CREATE POLICY "Anyone can view active instructors" ON instructors FOR SELECT USING (
    is_active = true
);

CREATE POLICY "Admins can manage instructors" ON instructors FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE firebase_uid = auth.jwt() ->> 'sub' AND role = 'admin')
);

-- Class templates policies
CREATE POLICY "Anyone can view class templates" ON class_templates FOR SELECT USING (true);

CREATE POLICY "Admins can manage class templates" ON class_templates FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE firebase_uid = auth.jwt() ->> 'sub' AND role = 'admin')
);

-- Class sessions policies
CREATE POLICY "Anyone can view scheduled sessions" ON class_sessions FOR SELECT USING (
    status = 'scheduled'
);

CREATE POLICY "Admins can manage all sessions" ON class_sessions FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE firebase_uid = auth.jwt() ->> 'sub' AND role = 'admin')
);

CREATE POLICY "Instructors can view their sessions" ON class_sessions FOR SELECT USING (
    instructor_id IN (
        SELECT id FROM instructors WHERE user_id IN (
            SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub'
        )
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

CREATE POLICY "Admins can view all bookings" ON bookings FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE firebase_uid = auth.jwt() ->> 'sub' AND role = 'admin')
);

-- Achievements policies
CREATE POLICY "Anyone can view achievements" ON achievements FOR SELECT USING (true);

CREATE POLICY "Admins can manage achievements" ON achievements FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE firebase_uid = auth.jwt() ->> 'sub' AND role = 'admin')
);

-- User achievements policies
CREATE POLICY "Users can view their own achievements" ON user_achievements FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

CREATE POLICY "System can award achievements" ON user_achievements FOR INSERT WITH CHECK (true);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

CREATE POLICY "System can create notifications" ON notifications FOR INSERT WITH CHECK (true);

-- Payment transactions policies
CREATE POLICY "Users can view their own transactions" ON payment_transactions FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

CREATE POLICY "Admins can view all transactions" ON payment_transactions FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE firebase_uid = auth.jwt() ->> 'sub' AND role = 'admin')
);

CREATE POLICY "System can create transactions" ON payment_transactions FOR INSERT WITH CHECK (true);

-- Class reviews policies
CREATE POLICY "Anyone can view reviews" ON class_reviews FOR SELECT USING (true);

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
