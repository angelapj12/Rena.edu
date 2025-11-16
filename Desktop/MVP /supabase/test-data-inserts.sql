-- Test Data Inserts for Wellness Class Management App
-- This file contains all test data with proper UUIDs and relationships
-- Run this AFTER deploying the schema-fixed.sql file

-- =====================================================
-- 1. USERS (10 records with proper Firebase UIDs)
-- =====================================================

INSERT INTO users (id, firebase_uid, email, display_name, role, xp_points, level, current_streak, longest_streak, last_activity_date, avatar_url) VALUES
-- Students
('550e8400-e29b-41d4-a716-446655440001', 'kX9mP2qR7sNv8wE3tA1B9cF4gH5j', 'emily.johnson@example.com', 'Emily Johnson', 'student', 150, 2, 5, 8, '2025-09-28', 'https://picsum.photos/seed/emily/200'),
('550e8400-e29b-41d4-a716-446655440002', 'mY2nQ3rS8tOw9xF4uB2C0dG5hI6k', 'carlos.fernandez@example.com', 'Carlos Fernandez', 'student', 300, 4, 10, 15, '2025-09-29', 'https://picsum.photos/seed/carlos/200'),
('550e8400-e29b-41d4-a716-446655440003', 'nZ3oR4sT9uPx0yG5vC3D1eH6iJ7l', 'samantha.lee@example.com', 'Samantha Lee', 'student', 75, 1, 2, 3, '2025-09-27', 'https://picsum.photos/seed/samantha/200'),
('550e8400-e29b-41d4-a716-446655440004', 'oA4pS5tU0vQy1zH6wD4E2fI7jK8m', 'andrea.moreno@example.com', 'Andrea Moreno', 'student', 500, 6, 12, 20, '2025-09-30', 'https://picsum.photos/seed/andrea/200'),
('550e8400-e29b-41d4-a716-446655440005', 'pB5qT6uV1wRz2aI7xE5F3gJ8kL9n', 'james.taylor@example.com', 'James Taylor', 'student', 220, 3, 7, 12, '2025-09-29', 'https://picsum.photos/seed/james/200'),
('550e8400-e29b-41d4-a716-446655440008', 'sE8tW9yZ4cSb5fL0aI6xG2hK3mN7', 'maria.gonzalez@example.com', 'Maria Gonzalez', 'student', 400, 5, 9, 18, '2025-09-28', 'https://picsum.photos/seed/mariag/200'),
-- Admin/Instructors
('550e8400-e29b-41d4-a716-446655440006', 'qC6rU7vW2xSa3bJ8yF6G4hL9mO0p', 'lucas.romero@example.com', 'Lucas Romero', 'admin', 0, 1, 0, 0, NULL, 'https://picsum.photos/seed/lucas/200'),
('550e8400-e29b-41d4-a716-446655440007', 'rD7sV8wX3yTb4cK9zG7H5iM0nP1q', 'amira.hassan@example.com', 'Amira Hassan', 'admin', 0, 1, 0, 0, NULL, 'https://picsum.photos/seed/amira/200'),
('550e8400-e29b-41d4-a716-446655440009', 'tF9uY0aZ5dTc6eM1bJ8aH6jN4oQ8', 'sofia.martinez@example.com', 'Sofia Martinez', 'admin', 0, 1, 0, 0, NULL, 'https://picsum.photos/seed/sofia/200'),
('550e8400-e29b-41d4-a716-446655440010', 'uG0vZ1bA6eUd7fN2cK9bI7kO5pR9', 'david.kim@example.com', 'David Kim', 'admin', 0, 1, 0, 0, NULL, 'https://picsum.photos/seed/david/200');

-- =====================================================
-- 2. INSTRUCTORS (5 records)
-- =====================================================

INSERT INTO instructors (id, user_id, instructor_name, instructor_title, bio, credentials, email, phone, years_experience, specialty, active, image, average_rating, total_reviews, total_classes_taught) VALUES
('7f3a9c12-1e45-4a0a-9b82-91a12f1d23a1', '550e8400-e29b-41d4-a716-446655440009', 'Sofia Martinez', 'Dance Instructor', 'Sofia has trained in contemporary and modern dance for over 12 years, performing internationally.', ARRAY['BA in Performing Arts', 'Certified Contemporary Dance Teacher'], 'sofia.martinez@example.com', '+34 600 123 456', 12, 'Contemporary Dance', true, 'https://picsum.photos/seed/sofia/200', 4.80, 45, 128),
('3b84e7a1-54c2-4e98-b9b7-2898f1b4c914', '550e8400-e29b-41d4-a716-446655440010', 'David Kim', 'Startup Mentor', 'David is a serial entrepreneur and angel investor with a focus on tech startups.', ARRAY['MBA - Harvard Business School', 'Founder of 3 startups'], 'david.kim@example.com', '+34 600 987 654', 15, 'Entrepreneurship & Business Strategy', true, 'https://picsum.photos/seed/david/200', 4.70, 32, 89),
('c7e31d2f-17c8-40ef-92a0-118f6fdf6f65', '550e8400-e29b-41d4-a716-446655440007', 'Amira Hassan', 'Leadership Coach', 'Amira has led leadership workshops across Europe and mentors young professionals in organizational strategy.', ARRAY['MA in Leadership & Management', 'ICF Certified Coach'], 'amira.hassan@example.com', '+34 600 555 111', 10, 'Leadership Development', true, 'https://picsum.photos/seed/amira/200', 4.90, 67, 156),
('26d8f745-8b5e-4f31-9f4e-5e271b70b23e', '550e8400-e29b-41d4-a716-446655440006', 'Lucas Romero', 'Mindfulness Instructor', 'Lucas specializes in mindfulness, yoga, and breathwork, helping professionals manage stress.', ARRAY['RYT 500 Yoga Teacher Certification', 'Mindfulness Coach Certificate'], 'lucas.romero@example.com', '+34 600 222 333', 8, 'Mindfulness & Performance', true, 'https://picsum.photos/seed/lucas/200', 4.60, 73, 201),
('86f9d2aa-fd46-4d1f-b2cc-7b03164c6a27', '550e8400-e29b-41d4-a716-446655440008', 'Maria Gonzalez', 'Stage Performance Coach', 'Maria is a professional actress and vocal coach with a passion for empowering performers.', ARRAY['BA in Theater Arts', 'Vocal Training Certificate'], 'maria.gonzalez@example.com', '+34 600 444 777', 14, 'Stage Acting & Performance', false, 'https://picsum.photos/seed/maria/200', 4.50, 28, 72);

-- =====================================================
-- 3. CLASS TEMPLATES (5 records)
-- =====================================================

INSERT INTO class_templates (id, class_id, class_name, class_description, class_category, level, duration, learning_outcomes, certification, active, image, default_capacity, default_price, default_xp_reward) VALUES
('b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b01', 'class001', 'Creative Dance for Beginners', 'An introductory dance class focusing on rhythm, body movement, and creativity.', 'Dance', 'Beginner', '1h 30m', ARRAY['Basic dance steps', 'Improved coordination', 'Increased confidence in movement'], false, true, 'dance_beginners.jpg', 20, 25.00, 100),
('b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b02', 'class002', 'Leadership Lab', 'Hands-on leadership training through role-play, group exercises, and reflection.', 'Leadership', 'Intermediate', '3h', ARRAY['Team collaboration', 'Conflict resolution', 'Public speaking'], true, true, 'leadership_lab.jpg', 25, 40.00, 200),
('b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b03', 'class003', 'Entrepreneurship Bootcamp', 'A fast-paced course on idea validation, pitching, and startup basics.', 'Business', 'All Levels', '3h', ARRAY['Business model creation', 'Pitching skills', 'Market analysis'], true, true, 'entrepreneurship_bootcamp.jpg', 30, 50.00, 250),
('b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b04', 'class004', 'Mindfulness & Meditation', 'Guided mindfulness and meditation practice to improve focus and reduce stress.', 'Wellness', 'All Levels', '1h', ARRAY['Daily meditation routine', 'Stress management', 'Improved focus'], false, true, 'mindfulness.jpg', 40, 15.00, 80),
('b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b05', 'class005', 'Acting & Stage Performance', 'Develop stage presence, acting skills, and storytelling ability.', 'Theatre', 'Advanced', '3h', ARRAY['Improved acting skills', 'Stage confidence', 'Voice projection'], true, true, 'acting_stage.jpg', 15, 45.00, 220);

-- =====================================================
-- 4. CLASS SESSIONS (10 records)
-- =====================================================

INSERT INTO class_sessions (id, session_id, class_template_id, instructor_id, class_name, start_time, end_time, duration_minutes, capacity, current_bookings, waitlist_count, price, status, active, xp_reward) VALUES
-- Creative Dance Sessions
('c2ggde99-8e2d-4bf7-dd8f-8dd9de492c01', 'sess001', 'b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b01', '7f3a9c12-1e45-4a0a-9b82-91a12f1d23a1', 'Creative Dance for Beginners', '2025-10-10T15:00:00Z', '2025-10-10T16:30:00Z', 90, 20, 2, 0, 25.00, 'scheduled', true, 100),
('c2ggde99-8e2d-4bf7-dd8f-8dd9de492c02', 'sess002', 'b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b01', '7f3a9c12-1e45-4a0a-9b82-91a12f1d23a1', 'Creative Dance for Beginners', '2025-10-12T10:00:00Z', '2025-10-12T11:30:00Z', 90, 20, 0, 0, 25.00, 'scheduled', true, 100),

-- Leadership Lab Sessions
('c2ggde99-8e2d-4bf7-dd8f-8dd9de492c03', 'sess003', 'b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b02', 'c7e31d2f-17c8-40ef-92a0-118f6fdf6f65', 'Leadership Lab', '2025-10-11T09:00:00Z', '2025-10-11T12:00:00Z', 180, 25, 3, 0, 40.00, 'scheduled', true, 200),
('c2ggde99-8e2d-4bf7-dd8f-8dd9de492c04', 'sess004', 'b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b02', 'c7e31d2f-17c8-40ef-92a0-118f6fdf6f65', 'Leadership Lab', '2025-10-13T15:00:00Z', '2025-10-13T18:00:00Z', 180, 25, 25, 3, 40.00, 'scheduled', true, 200),

-- Entrepreneurship Bootcamp Sessions
('c2ggde99-8e2d-4bf7-dd8f-8dd9de492c05', 'sess005', 'b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b03', '3b84e7a1-54c2-4e98-b9b7-2898f1b4c914', 'Entrepreneurship Bootcamp', '2025-10-15T14:00:00Z', '2025-10-15T17:00:00Z', 180, 30, 1, 0, 50.00, 'scheduled', true, 250),
('c2ggde99-8e2d-4bf7-dd8f-8dd9de492c06', 'sess006', 'b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b03', '3b84e7a1-54c2-4e98-b9b7-2898f1b4c914', 'Entrepreneurship Bootcamp', '2025-10-17T10:00:00Z', '2025-10-17T13:00:00Z', 180, 30, 30, 2, 50.00, 'scheduled', true, 250),

-- Mindfulness & Meditation Sessions
('c2ggde99-8e2d-4bf7-dd8f-8dd9de492c07', 'sess007', 'b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b04', '26d8f745-8b5e-4f31-9f4e-5e271b70b23e', 'Mindfulness & Meditation', '2025-10-09T07:00:00Z', '2025-10-09T08:00:00Z', 60, 40, 1, 0, 15.00, 'scheduled', true, 80),
('c2ggde99-8e2d-4bf7-dd8f-8dd9de492c08', 'sess008', 'b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b04', '26d8f745-8b5e-4f31-9f4e-5e271b70b23e', 'Mindfulness & Meditation', '2025-10-11T07:00:00Z', '2025-10-11T08:00:00Z', 60, 40, 2, 0, 15.00, 'scheduled', true, 80),

-- Acting & Stage Performance Sessions
('c2ggde99-8e2d-4bf7-dd8f-8dd9de492c09', 'sess009', 'b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b05', '86f9d2aa-fd46-4d1f-b2cc-7b03164c6a27', 'Acting & Stage Performance', '2025-10-18T17:00:00Z', '2025-10-18T20:00:00Z', 180, 15, 0, 0, 45.00, 'scheduled', true, 220),
('c2ggde99-8e2d-4bf7-dd8f-8dd9de492c10', 'sess010', 'b1ffcd88-7d1c-3ae6-cc7e-7cc8ce481b05', '86f9d2aa-fd46-4d1f-b2cc-7b03164c6a27', 'Acting & Stage Performance', '2025-10-20T18:00:00Z', '2025-10-20T21:00:00Z', 180, 15, 15, 2, 45.00, 'scheduled', true, 220);

-- =====================================================
-- 5. BOOKINGS (10 records)
-- =====================================================

INSERT INTO bookings (id, user_id, session_id, status, attended, rating, booked_at, amount_paid, payment_status) VALUES
('d3hhef00-9f3e-5cg8-ee9g-9ee0ef503d01', '550e8400-e29b-41d4-a716-446655440001', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c01', 'confirmed', true, 5, '2025-09-25T10:00:00Z', 25.00, 'completed'),
('d3hhef00-9f3e-5cg8-ee9g-9ee0ef503d02', '550e8400-e29b-41d4-a716-446655440002', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c03', 'confirmed', true, 4, '2025-09-26T14:30:00Z', 40.00, 'completed'),
('d3hhef00-9f3e-5cg8-ee9g-9ee0ef503d03', '550e8400-e29b-41d4-a716-446655440003', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c04', 'waitlist', false, NULL, '2025-09-27T09:15:00Z', 0.00, 'pending'),
('d3hhef00-9f3e-5cg8-ee9g-9ee0ef503d04', '550e8400-e29b-41d4-a716-446655440004', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c07', 'confirmed', true, 5, '2025-09-28T08:00:00Z', 15.00, 'completed'),
('d3hhef00-9f3e-5cg8-ee9g-9ee0ef503d05', '550e8400-e29b-41d4-a716-446655440005', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c09', 'cancelled', false, NULL, '2025-09-24T16:45:00Z', 0.00, 'refunded'),
('d3hhef00-9f3e-5cg8-ee9g-9ee0ef503d06', '550e8400-e29b-41d4-a716-446655440006', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c01', 'confirmed', false, NULL, '2025-09-29T12:00:00Z', 25.00, 'completed'),
('d3hhef00-9f3e-5cg8-ee9g-9ee0ef503d07', '550e8400-e29b-41d4-a716-446655440007', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c03', 'confirmed', true, 5, '2025-09-26T11:20:00Z', 40.00, 'completed'),
('d3hhef00-9f3e-5cg8-ee9g-9ee0ef503d08', '550e8400-e29b-41d4-a716-446655440008', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c05', 'confirmed', true, 4, '2025-09-27T13:30:00Z', 50.00, 'completed'),
('d3hhef00-9f3e-5cg8-ee9g-9ee0ef503d09', '550e8400-e29b-41d4-a716-446655440009', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c08', 'waitlist', false, NULL, '2025-09-28T15:45:00Z', 0.00, 'pending'),
('d3hhef00-9f3e-5cg8-ee9g-9ee0ef503d10', '550e8400-e29b-41d4-a716-446655440010', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c08', 'confirmed', true, 5, '2025-09-29T07:30:00Z', 15.00, 'completed');

-- =====================================================
-- 6. ACHIEVEMENTS (Extended set - 12 records)
-- =====================================================

INSERT INTO achievements (id, name, description, icon_name, xp_reward, criteria_type, criteria_value, badge_color, is_secret) VALUES
('e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e01', 'First Class', 'Attend your first class', 'trophy', 50, 'classes_attended', 1, '#10B981', false),
('e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e02', 'Dedicated Learner', 'Attend 5 classes', 'medal', 100, 'classes_attended', 5, '#3B82F6', false),
('e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e03', 'Classroom Regular', 'Attend 10 classes', 'crown', 200, 'classes_attended', 10, '#8B5CF6', false),
('e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e04', 'Weekly Streak', 'Maintain a 7-day activity streak', 'fire', 150, 'streak_days', 7, '#EF4444', false),
('e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e05', 'One Month Consistency', 'Maintain a 30-day activity streak', 'lightning', 400, 'streak_days', 30, '#F97316', false),
('e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e06', 'Knowledge Sharer', 'Leave 5 class ratings', 'star', 100, 'ratings_given', 5, '#FBBF24', false),
('e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e07', 'Top Reviewer', 'Leave 20 class ratings', 'diamond', 250, 'ratings_given', 20, '#6366F1', false),
('e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e08', 'Level Up!', 'Reach Level 5', 'gem', 300, 'user_level', 5, '#EC4899', false),
('e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e09', 'Social Learner', 'Attend 3 different class categories', 'globe', 200, 'categories_completed', 3, '#14B8A6', false),
('e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e10', 'Graduated!', 'Complete a certified course', 'graduation', 500, 'certified_courses_completed', 1, '#F59E0B', false),
('e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e11', 'Early Bird', 'Attend a class before 8 AM', 'sunrise', 75, 'early_classes', 1, '#06B6D4', false),
('e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e12', 'Night Owl', 'Attend a class after 7 PM', 'moon', 75, 'late_classes', 1, '#7C3AED', false);

-- =====================================================
-- 7. USER ACHIEVEMENTS (Sample unlocked achievements)
-- =====================================================

INSERT INTO user_achievements (id, user_id, achievement_id, unlocked_at) VALUES
-- Emily Johnson achievements
('f5jjgh22-1h5g-7ei0-gg1i-1gg2gh725f01', '550e8400-e29b-41d4-a716-446655440001', 'e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e01', '2025-09-15T10:30:00Z'),
('f5jjgh22-1h5g-7ei0-gg1i-1gg2gh725f02', '550e8400-e29b-41d4-a716-446655440001', 'e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e04', '2025-09-22T14:20:00Z'),

-- Carlos Fernandez achievements
('f5jjgh22-1h5g-7ei0-gg1i-1gg2gh725f03', '550e8400-e29b-41d4-a716-446655440002', 'e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e01', '2025-09-10T09:15:00Z'),
('f5jjgh22-1h5g-7ei0-gg1i-1gg2gh725f04', '550e8400-e29b-41d4-a716-446655440002', 'e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e02', '2025-09-20T16:45:00Z'),
('f5jjgh22-1h5g-7ei0-gg1i-1gg2gh725f05', '550e8400-e29b-41d4-a716-446655440002', 'e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e04', '2025-09-25T11:30:00Z'),

-- Andrea Moreno achievements (highest level user)
('f5jjgh22-1h5g-7ei0-gg1i-1gg2gh725f06', '550e8400-e29b-41d4-a716-446655440004', 'e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e01', '2025-08-15T12:00:00Z'),
('f5jjgh22-1h5g-7ei0-gg1i-1gg2gh725f07', '550e8400-e29b-41d4-a716-446655440004', 'e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e02', '2025-08-22T15:30:00Z'),
('f5jjgh22-1h5g-7ei0-gg1i-1gg2gh725f08', '550e8400-e29b-41d4-a716-446655440004', 'e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e03', '2025-09-01T10:15:00Z'),
('f5jjgh22-1h5g-7ei0-gg1i-1gg2gh725f09', '550e8400-e29b-41d4-a716-446655440004', 'e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e08', '2025-09-15T13:45:00Z'),
('f5jjgh22-1h5g-7ei0-gg1i-1gg2gh725f10', '550e8400-e29b-41d4-a716-446655440004', 'e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e05', '2025-09-28T08:20:00Z');

-- =====================================================
-- 8. CLASS REVIEWS (Sample reviews)
-- =====================================================

INSERT INTO class_reviews (id, booking_id, user_id, session_id, instructor_id, rating, title, content, sample_review, review_user_full_name, is_approved, is_featured) VALUES
('g6kkhh33-2i6h-8fj1-hh2j-2hh3hh836g01', 'd3hhef00-9f3e-5cg8-ee9g-9ee0ef503d01', '550e8400-e29b-41d4-a716-446655440001', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c01', '7f3a9c12-1e45-4a0a-9b82-91a12f1d23a1', 5, 'Amazing Energy!', 'Sofia brings so much energy and passion to every class! I felt inspired and confident.', 'Sofia brings so much energy and passion to every class!', 'Emily Johnson', true, true),
('g6kkhh33-2i6h-8fj1-hh2j-2hh3hh836g02', 'd3hhef00-9f3e-5cg8-ee9g-9ee0ef503d02', '550e8400-e29b-41d4-a716-446655440002', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c03', 'c7e31d2f-17c8-40ef-92a0-118f6fdf6f65', 4, 'Great Leadership Insights', 'Really valuable session on leadership techniques. Amira has excellent real-world experience.', 'Amira helped me discover my authentic leadership voice.', 'Carlos Fernandez', true, false),
('g6kkhh33-2i6h-8fj1-hh2j-2hh3hh836g03', 'd3hhef00-9f3e-5cg8-ee9g-9ee0ef503d04', '550e8400-e29b-41d4-a716-446655440004', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c07', '26d8f745-8b5e-4f31-9f4e-5e271b70b23e', 5, 'Life-changing Meditation', 'Lucas guided us through the most peaceful meditation session. I feel so much more centered.', 'Lucas meditation sessions are life-changing.', 'Andrea Moreno', true, true),
('g6kkhh33-2i6h-8fj1-hh2j-2hh3hh836g04', 'd3hhef00-9f3e-5cg8-ee9g-9ee0ef503d07', '550e8400-e29b-41d4-a716-446655440007', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c03', 'c7e31d2f-17c8-40ef-92a0-118f6fdf6f65', 5, 'Transformative Leadership', 'Amira helped me discover my authentic leadership voice. The role-play exercises were incredibly effective.', 'Amira helped me discover my authentic leadership voice.', 'Amira Hassan', true, false),
('g6kkhh33-2i6h-8fj1-hh2j-2hh3hh836g05', 'd3hhef00-9f3e-5cg8-ee9g-9ee0ef503d08', '550e8400-e29b-41d4-a716-446655440008', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c05', '3b84e7a1-54c2-4e98-b9b7-2898f1b4c914', 4, 'Practical Business Insights', 'David practical insights really changed my perspective on business. Great real-world examples.', 'David practical insights really changed my perspective on business.', 'Maria Gonzalez', true, false);

-- =====================================================
-- 9. NOTIFICATIONS (Sample notifications)
-- =====================================================

INSERT INTO notifications (id, user_id, type, title, message, session_id, booking_id, achievement_id, is_read, sent_at) VALUES
('h7llii44-3j7i-9gk2-ii3k-3ii4ii947h01', '550e8400-e29b-41d4-a716-446655440001', 'booking_confirmed', 'Booking Confirmed', 'Your booking for Creative Dance for Beginners on Oct 10 at 3:00 PM has been confirmed!', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c01', 'd3hhef00-9f3e-5cg8-ee9g-9ee0ef503d01', NULL, true, '2025-09-25T10:01:00Z'),
('h7llii44-3j7i-9gk2-ii3k-3ii4ii947h02', '550e8400-e29b-41d4-a716-446655440001', 'achievement_unlocked', 'Achievement Unlocked!', 'Congratulations! You unlocked the "First Class" achievement and earned 50 XP!', NULL, NULL, 'e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e01', true, '2025-09-15T10:31:00Z'),
('h7llii44-3j7i-9gk2-ii3k-3ii4ii947h03', '550e8400-e29b-41d4-a716-446655440002', 'class_reminder', 'Class Reminder', 'Your Leadership Lab class starts in 1 hour. See you there!', 'c2ggde99-8e2d-4bf7-dd8f-8dd9de492c03', NULL, NULL, false, '2025-10-11T08:00:00Z'),
('h7llii44-3j7i-9gk2-ii3k-3ii4ii947h04', '550e8400-e29b-41d4-a716-446655440004', 'level_up', 'Level Up!', 'Amazing! You reached Level 6 and earned bonus XP!', NULL, NULL, NULL, true, '2025-09-28T14:30:00Z'),
('h7llii44-3j7i-9gk2-ii3k-3ii4ii947h05', '550e8400-e29b-41d4-a716-446655440004', 'streak_milestone', 'Streak Milestone!', 'Incredible! You maintained a 30-day streak and unlocked special rewards!', NULL, NULL, 'e4iifg11-0g4f-6dh9-ff0h-0ff1fg614e05', false, '2025-09-28T08:21:00Z');

-- =====================================================
-- 10. PAYMENT TRANSACTIONS (Sample transactions)
-- =====================================================

INSERT INTO payment_transactions (id, user_id, booking_id, amount, currency, payment_method, payment_provider, provider_transaction_id, status, created_at, processed_at) VALUES
('i8mmjj55-4k8j-0hl3-jj4l-4jj5jj058i01', '550e8400-e29b-41d4-a716-446655440001', 'd3hhef00-9f3e-5cg8-ee9g-9ee0ef503d01', 25.00, 'EUR', 'card', 'stripe', 'pi_1234567890abcdef', 'completed', '2025-09-25T10:00:30Z', '2025-09-25T10:00:35Z'),
('i8mmjj55-4k8j-0hl3-jj4l-4jj5jj058i02', '550e8400-e29b-41d4-a716-446655440002', 'd3hhef00-9f3e-5cg8-ee9g-9ee0ef503d02', 40.00, 'EUR', 'card', 'stripe', 'pi_2345678901bcdefg', 'completed', '2025-09-26T14:30:15Z', '2025-09-26T14:30:18Z'),
('i8mmjj55-4k8j-0hl3-jj4l-4jj5jj058i03', '550e8400-e29b-41d4-a716-446655440004', 'd3hhef00-9f3e-5cg8-ee9g-9ee0ef503d04', 15.00, 'EUR', 'paypal', 'paypal', 'PAYID-ML2B4RI12345678A', 'completed', '2025-09-28T08:00:45Z', '2025-09-28T08:01:02Z'),
('i8mmjj55-4k8j-0hl3-jj4l-4jj5jj058i04', '550e8400-e29b-41d4-a716-446655440006', 'd3hhef00-9f3e-5cg8-ee9g-9ee0ef503d06', 25.00, 'EUR', 'card', 'stripe', 'pi_3456789012cdefgh', 'completed', '2025-09-29T12:00:12Z', '2025-09-29T12:00:16Z'),
('i8mmjj55-4k8j-0hl3-jj4l-4jj5jj058i05', '550e8400-e29b-41d4-a716-446655440008', 'd3hhef00-9f3e-5cg8-ee9g-9ee0ef503d08', 50.00, 'EUR', 'card', 'stripe', 'pi_4567890123defghi', 'completed', '2025-09-27T13:30:25Z', '2025-09-27T13:30:28Z');

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

SELECT 'Test data inserted successfully! 🎉' as result,
       (SELECT COUNT(*) FROM users) as users_count,
       (SELECT COUNT(*) FROM instructors) as instructors_count,
       (SELECT COUNT(*) FROM class_templates) as class_templates_count,
       (SELECT COUNT(*) FROM class_sessions) as class_sessions_count,
       (SELECT COUNT(*) FROM bookings) as bookings_count,
       (SELECT COUNT(*) FROM achievements) as achievements_count,
       (SELECT COUNT(*) FROM user_achievements) as user_achievements_count,
       (SELECT COUNT(*) FROM class_reviews) as class_reviews_count,
       (SELECT COUNT(*) FROM notifications) as notifications_count,
       (SELECT COUNT(*) FROM payment_transactions) as payment_transactions_count;
