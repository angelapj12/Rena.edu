-- WellnessHub Database Schema - Step 2: Add foreign key constraints
-- This adds all foreign key constraints after tables are created

-- =====================================================
-- ADD FOREIGN KEY CONSTRAINTS
-- =====================================================

-- Add foreign key constraints to instructors table
ALTER TABLE instructors 
ADD CONSTRAINT fk_instructors_user_id 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Add unique constraint for one instructor per user
ALTER TABLE instructors 
ADD CONSTRAINT unique_instructor_per_user UNIQUE (user_id);

-- Add foreign key constraints to class_sessions table
ALTER TABLE class_sessions 
ADD CONSTRAINT fk_class_sessions_template_id 
FOREIGN KEY (class_template_id) REFERENCES class_templates(id) ON DELETE CASCADE;

ALTER TABLE class_sessions 
ADD CONSTRAINT fk_class_sessions_instructor_id 
FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL;

-- Add foreign key constraints to bookings table
ALTER TABLE bookings 
ADD CONSTRAINT fk_bookings_user_id 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE bookings 
ADD CONSTRAINT fk_bookings_session_id 
FOREIGN KEY (session_id) REFERENCES class_sessions(id) ON DELETE CASCADE;

-- Add unique constraint for one booking per user per session
ALTER TABLE bookings 
ADD CONSTRAINT unique_booking_per_user_session UNIQUE (user_id, session_id);

-- Add foreign key constraints to user_achievements table
ALTER TABLE user_achievements 
ADD CONSTRAINT fk_user_achievements_user_id 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_achievements 
ADD CONSTRAINT fk_user_achievements_achievement_id 
FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE;

-- Add unique constraint for one achievement per user
ALTER TABLE user_achievements 
ADD CONSTRAINT unique_user_achievement UNIQUE (user_id, achievement_id);

-- Add foreign key constraints to notifications table
ALTER TABLE notifications 
ADD CONSTRAINT fk_notifications_user_id 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE notifications 
ADD CONSTRAINT fk_notifications_session_id 
FOREIGN KEY (session_id) REFERENCES class_sessions(id) ON DELETE SET NULL;

ALTER TABLE notifications 
ADD CONSTRAINT fk_notifications_booking_id 
FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL;

ALTER TABLE notifications 
ADD CONSTRAINT fk_notifications_achievement_id 
FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE SET NULL;

-- Add foreign key constraints to payment_transactions table
ALTER TABLE payment_transactions 
ADD CONSTRAINT fk_payment_transactions_user_id 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE payment_transactions 
ADD CONSTRAINT fk_payment_transactions_booking_id 
FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL;

-- Add foreign key constraints to class_reviews table
ALTER TABLE class_reviews 
ADD CONSTRAINT fk_class_reviews_booking_id 
FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE;

ALTER TABLE class_reviews 
ADD CONSTRAINT fk_class_reviews_user_id 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE class_reviews 
ADD CONSTRAINT fk_class_reviews_session_id 
FOREIGN KEY (session_id) REFERENCES class_sessions(id) ON DELETE CASCADE;

ALTER TABLE class_reviews 
ADD CONSTRAINT fk_class_reviews_instructor_id 
FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL;

-- Add unique constraint for one review per booking
ALTER TABLE class_reviews 
ADD CONSTRAINT unique_review_per_booking UNIQUE (booking_id);

-- =====================================================
-- CREATE INDEXES
-- =====================================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_level ON users(level);

-- Instructors indexes
CREATE INDEX IF NOT EXISTS idx_instructors_user_id ON instructors(user_id);
CREATE INDEX IF NOT EXISTS idx_instructors_active ON instructors(is_active);
CREATE INDEX IF NOT EXISTS idx_instructors_featured ON instructors(featured);

-- Class templates indexes
CREATE INDEX IF NOT EXISTS idx_class_templates_class_id ON class_templates(class_id);
CREATE INDEX IF NOT EXISTS idx_class_templates_category ON class_templates(class_category);
CREATE INDEX IF NOT EXISTS idx_class_templates_level ON class_templates(level);

-- Class sessions indexes
CREATE INDEX IF NOT EXISTS idx_class_sessions_session_id ON class_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_class_sessions_template_id ON class_sessions(class_template_id);
CREATE INDEX IF NOT EXISTS idx_class_sessions_instructor_id ON class_sessions(instructor_id);
CREATE INDEX IF NOT EXISTS idx_class_sessions_date ON class_sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_class_sessions_status ON class_sessions(status);

-- Bookings indexes
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_session_id ON bookings(session_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);

-- Achievements indexes
CREATE INDEX IF NOT EXISTS idx_achievements_criteria_type ON achievements(criteria_type);

-- User achievements indexes
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);

-- Payment transactions indexes
CREATE INDEX IF NOT EXISTS idx_payment_transactions_user_id ON payment_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_booking_id ON payment_transactions(booking_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON payment_transactions(status);

-- Class reviews indexes
CREATE INDEX IF NOT EXISTS idx_class_reviews_user_id ON class_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_class_reviews_session_id ON class_reviews(session_id);
CREATE INDEX IF NOT EXISTS idx_class_reviews_instructor_id ON class_reviews(instructor_id);

-- Success message
SELECT 'Foreign key constraints and indexes added successfully! Now run schema-step3.sql for functions and policies.' as result;
