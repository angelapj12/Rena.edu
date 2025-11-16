-- Updated Test Data for Deployed Schema
-- This matches the exact column names from our deployed schema

-- =====================================================
-- 1. USERS (10 records)
-- =====================================================

INSERT INTO users (firebase_uid, email, display_name, role, xp, level, current_streak, longest_streak, last_activity_date, profile_image_url) VALUES
-- Students
('kX9mP2qR7sNv8wE3tA1B9cF4gH5j', 'emily.johnson@example.com', 'Emily Johnson', 'student', 150, 2, 5, 8, '2025-09-28', 'https://picsum.photos/seed/emily/200'),
('mY2nQ3rS8tOw9xF4uB2C0dG5hI6k', 'carlos.fernandez@example.com', 'Carlos Fernandez', 'student', 300, 4, 10, 15, '2025-09-29', 'https://picsum.photos/seed/carlos/200'),
('nZ3oR4sT9uPx0yG5vC3D1eH6iJ7l', 'samantha.lee@example.com', 'Samantha Lee', 'student', 75, 1, 2, 3, '2025-09-27', 'https://picsum.photos/seed/samantha/200'),
('oA4pS5tU0vQy1zH6wD4E2fI7jK8m', 'andrea.moreno@example.com', 'Andrea Moreno', 'student', 500, 6, 12, 20, '2025-09-30', 'https://picsum.photos/seed/andrea/200'),
('pB5qT6uV1wRz2aI7xE5F3gJ8kL9n', 'james.taylor@example.com', 'James Taylor', 'student', 220, 3, 7, 12, '2025-09-29', 'https://picsum.photos/seed/james/200'),
('sE8tW9yZ4cSb5fL0aI6xG2hK3mN7', 'maria.gonzalez@example.com', 'Maria Gonzalez', 'student', 400, 5, 9, 18, '2025-09-28', 'https://picsum.photos/seed/mariag/200'),
-- Admin/Instructors
('qC6rU7vW2xSa3bJ8yF6G4hL9mO0p', 'lucas.romero@example.com', 'Lucas Romero', 'admin', 0, 1, 0, 0, NULL, 'https://picsum.photos/seed/lucas/200'),
('rD7sV8wX3yTb4cK9zG7H5iM0nP1q', 'amira.hassan@example.com', 'Amira Hassan', 'admin', 0, 1, 0, 0, NULL, 'https://picsum.photos/seed/amira/200'),
('tF9uY0aZ5dTc6eM1bJ8aH6jN4oQ8', 'sofia.martinez@example.com', 'Sofia Martinez', 'admin', 0, 1, 0, 0, NULL, 'https://picsum.photos/seed/sofia/200'),
('uG0vZ1bA6eUd7fN2cK9bI7kO5pR9', 'david.kim@example.com', 'David Kim', 'admin', 0, 1, 0, 0, NULL, 'https://picsum.photos/seed/david/200');

-- =====================================================
-- 2. INSTRUCTORS (5 records) 
-- =====================================================

INSERT INTO instructors (user_id, instructor_name, instructor_title, bio, credentials, email, phone, is_active, profile_image_url, hourly_rate) 
SELECT 
    users.id,
    'Sofia Martinez',
    'Dance Instructor',
    'Sofia has trained in contemporary and modern dance for over 12 years.',
    ARRAY['BA in Performing Arts', 'Certified Contemporary Dance Teacher'],
    'sofia.martinez@example.com',
    '+34 600 123 456',
    true,
    'https://picsum.photos/seed/sofia/200',
    50.00
FROM users WHERE firebase_uid = 'tF9uY0aZ5dTc6eM1bJ8aH6jN4oQ8';

INSERT INTO instructors (user_id, instructor_name, instructor_title, bio, credentials, email, phone, is_active, profile_image_url, hourly_rate) 
SELECT 
    users.id,
    'David Kim',
    'Startup Mentor',
    'David is a serial entrepreneur and angel investor.',
    ARRAY['MBA - Harvard Business School', 'Founder of 3 startups'],
    'david.kim@example.com',
    '+34 600 987 654',
    true,
    'https://picsum.photos/seed/david/200',
    75.00
FROM users WHERE firebase_uid = 'uG0vZ1bA6eUd7fN2cK9bI7kO5pR9';

INSERT INTO instructors (user_id, instructor_name, instructor_title, bio, credentials, email, phone, is_active, profile_image_url, hourly_rate) 
SELECT 
    users.id,
    'Amira Hassan',
    'Leadership Coach',
    'Amira has led leadership workshops across Europe.',
    ARRAY['MA in Leadership & Management', 'ICF Certified Coach'],
    'amira.hassan@example.com',
    '+34 600 555 111',
    true,
    'https://picsum.photos/seed/amira/200',
    60.00
FROM users WHERE firebase_uid = 'rD7sV8wX3yTb4cK9zG7H5iM0nP1q';

INSERT INTO instructors (user_id, instructor_name, instructor_title, bio, credentials, email, phone, is_active, profile_image_url, hourly_rate) 
SELECT 
    users.id,
    'Lucas Romero',
    'Mindfulness Instructor',
    'Lucas specializes in mindfulness, yoga, and breathwork.',
    ARRAY['RYT 500 Yoga Teacher Certification', 'Mindfulness Coach Certificate'],
    'lucas.romero@example.com',
    '+34 600 222 333',
    true,
    'https://picsum.photos/seed/lucas/200',
    40.00
FROM users WHERE firebase_uid = 'qC6rU7vW2xSa3bJ8yF6G4hL9mO0p';

INSERT INTO instructors (user_id, instructor_name, instructor_title, bio, credentials, email, phone, is_active, profile_image_url, hourly_rate) 
SELECT 
    users.id,
    'Maria Gonzalez',
    'Stage Performance Coach',
    'Maria is a professional actress and vocal coach.',
    ARRAY['BA in Theater Arts', 'Vocal Training Certificate'],
    'maria.gonzalez@example.com',
    '+34 600 444 777',
    false,
    'https://picsum.photos/seed/maria/200',
    55.00
FROM users WHERE firebase_uid = 'sE8tW9yZ4cSb5fL0aI6xG2hK3mN7';

-- =====================================================
-- 3. CLASS TEMPLATES (5 records)
-- =====================================================

INSERT INTO class_templates (class_id, class_name, class_description, class_category, level, duration, learning_outcomes, price) VALUES
('class001', 'Creative Dance for Beginners', 'An introductory dance class focusing on rhythm, body movement, and creativity.', 'Dance', 'Beginner', '90 minutes', ARRAY['Basic dance steps', 'Improved coordination', 'Increased confidence in movement'], 25.00),
('class002', 'Leadership Lab', 'Hands-on leadership training through role-play, group exercises, and reflection.', 'Leadership', 'Intermediate', '3 hours', ARRAY['Team collaboration', 'Conflict resolution', 'Public speaking'], 40.00),
('class003', 'Entrepreneurship Bootcamp', 'A fast-paced course on idea validation, pitching, and startup basics.', 'Business', 'All Levels', '3 hours', ARRAY['Business model creation', 'Pitching skills', 'Market analysis'], 50.00),
('class004', 'Mindfulness & Meditation', 'Guided mindfulness and meditation practice to improve focus and reduce stress.', 'Wellness', 'All Levels', '1 hour', ARRAY['Daily meditation routine', 'Stress management', 'Improved focus'], 15.00),
('class005', 'Acting & Stage Performance', 'Develop stage presence, acting skills, and storytelling ability.', 'Theatre', 'Advanced', '3 hours', ARRAY['Improved acting skills', 'Stage confidence', 'Voice projection'], 45.00);

-- =====================================================
-- 4. CLASS SESSIONS (10 records)
-- =====================================================

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants, current_bookings, waitlist_count, location_type, location_address, status) 
SELECT 
    'sess001',
    ct.id,
    inst.id,
    '2025-10-05',
    '10:00',
    '11:30',
    20,
    8,
    2,
    'in-person',
    'Studio A, Wellness Center',
    'scheduled'
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class001' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'tF9uY0aZ5dTc6eM1bJ8aH6jN4oQ8';

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants, current_bookings, waitlist_count, location_type, location_address, status) 
SELECT 
    'sess002',
    ct.id,
    inst.id,
    '2025-10-12',
    '10:00',
    '11:30',
    20,
    5,
    0,
    'in-person',
    'Studio A, Wellness Center',
    'scheduled'
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class001' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'tF9uY0aZ5dTc6eM1bJ8aH6jN4oQ8';

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants, current_bookings, waitlist_count, location_type, location_address, status) 
SELECT 
    'sess003',
    ct.id,
    inst.id,
    '2025-10-08',
    '14:00',
    '17:00',
    25,
    12,
    3,
    'hybrid',
    'Conference Room B',
    'scheduled'
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class002' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'rD7sV8wX3yTb4cK9zG7H5iM0nP1q';

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants, current_bookings, waitlist_count, location_type, location_address, status) 
SELECT 
    'sess004',
    ct.id,
    inst.id,
    '2025-10-15',
    '14:00',
    '17:00',
    25,
    7,
    1,
    'hybrid',
    'Conference Room B',
    'scheduled'
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class002' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'rD7sV8wX3yTb4cK9zG7H5iM0nP1q';

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants, current_bookings, waitlist_count, location_type, location_address, status) 
SELECT 
    'sess005',
    ct.id,
    inst.id,
    '2025-10-10',
    '09:00',
    '12:00',
    30,
    18,
    5,
    'virtual',
    'Zoom Meeting Room',
    'scheduled'
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class003' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'uG0vZ1bA6eUd7fN2cK9bI7kO5pR9';

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants, current_bookings, waitlist_count, location_type, location_address, status) 
SELECT 
    'sess006',
    ct.id,
    inst.id,
    '2025-10-17',
    '09:00',
    '12:00',
    30,
    22,
    8,
    'virtual',
    'Zoom Meeting Room',
    'scheduled'
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class003' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'uG0vZ1bA6eUd7fN2cK9bI7kO5pR9';

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants, current_bookings, waitlist_count, location_type, location_address, status) 
SELECT 
    'sess007',
    ct.id,
    inst.id,
    '2025-10-06',
    '18:00',
    '19:00',
    40,
    25,
    0,
    'in-person',
    'Meditation Hall',
    'scheduled'
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class004' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'qC6rU7vW2xSa3bJ8yF6G4hL9mO0p';

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants, current_bookings, waitlist_count, location_type, location_address, status) 
SELECT 
    'sess008',
    ct.id,
    inst.id,
    '2025-10-13',
    '18:00',
    '19:00',
    40,
    30,
    5,
    'in-person',
    'Meditation Hall',
    'scheduled'
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class004' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'qC6rU7vW2xSa3bJ8yF6G4hL9mO0p';

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants, current_bookings, waitlist_count, location_type, location_address, status) 
SELECT 
    'sess009',
    ct.id,
    inst.id,
    '2025-10-11',
    '15:00',
    '18:00',
    15,
    10,
    2,
    'in-person',
    'Theater Studio',
    'scheduled'
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class005' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'sE8tW9yZ4cSb5fL0aI6xG2hK3mN7';

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants, current_bookings, waitlist_count, location_type, location_address, status) 
SELECT 
    'sess010',
    ct.id,
    inst.id,
    '2025-10-18',
    '15:00',
    '18:00',
    15,
    8,
    0,
    'in-person',
    'Theater Studio',
    'scheduled'
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class005' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'sE8tW9yZ4cSb5fL0aI6xG2hK3mN7';

-- =====================================================
-- 5. BOOKINGS (12 records)
-- =====================================================

-- Sample bookings using the actual user and session IDs from database
INSERT INTO bookings (user_id, session_id, status, amount_paid, attended) 
SELECT 
    u.id,
    cs.id,
    'confirmed',
    25.00,
    NULL
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'kX9mP2qR7sNv8wE3tA1B9cF4gH5j'  -- Emily Johnson
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class001'
AND cs.session_id = 'sess001'
LIMIT 1;

INSERT INTO bookings (user_id, session_id, status, amount_paid, attended) 
SELECT 
    u.id,
    cs.id,
    'confirmed',
    15.00,
    NULL
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'kX9mP2qR7sNv8wE3tA1B9cF4gH5j'  -- Emily Johnson
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class004'
AND cs.session_id = 'sess007'
LIMIT 1;

INSERT INTO bookings (user_id, session_id, status, amount_paid, attended) 
SELECT 
    u.id,
    cs.id,
    'confirmed',
    40.00,
    NULL
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'mY2nQ3rS8tOw9xF4uB2C0dG5hI6k'  -- Carlos Fernandez
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class002'
AND cs.session_id = 'sess003'
LIMIT 1;

INSERT INTO bookings (user_id, session_id, status, amount_paid, attended) 
SELECT 
    u.id,
    cs.id,
    'confirmed',
    50.00,
    NULL
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'mY2nQ3rS8tOw9xF4uB2C0dG5hI6k'  -- Carlos Fernandez
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class003'
AND cs.session_id = 'sess005'
LIMIT 1;

INSERT INTO bookings (user_id, session_id, status, amount_paid, attended) 
SELECT 
    u.id,
    cs.id,
    'confirmed',
    25.00,
    NULL
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'nZ3oR4sT9uPx0yG5vC3D1eH6iJ7l'  -- Samantha Lee
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class001'
AND cs.session_id = 'sess001'
LIMIT 1;

INSERT INTO bookings (user_id, session_id, status, amount_paid, attended) 
SELECT 
    u.id,
    cs.id,
    'waitlist',
    15.00,
    NULL
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'nZ3oR4sT9uPx0yG5vC3D1eH6iJ7l'  -- Samantha Lee
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class004'
AND cs.session_id = 'sess007'
LIMIT 1;

INSERT INTO bookings (user_id, session_id, status, amount_paid, attended) 
SELECT 
    u.id,
    cs.id,
    'confirmed',
    50.00,
    NULL
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'oA4pS5tU0vQy1zH6wD4E2fI7jK8m'  -- Andrea Moreno
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class003'
AND cs.session_id = 'sess005'
LIMIT 1;

INSERT INTO bookings (user_id, session_id, status, amount_paid, attended) 
SELECT 
    u.id,
    cs.id,
    'confirmed',
    45.00,
    NULL
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'oA4pS5tU0vQy1zH6wD4E2fI7jK8m'  -- Andrea Moreno
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class005'
AND cs.session_id = 'sess009'
LIMIT 1;

-- =====================================================
-- 6. SAMPLE NOTIFICATIONS (5 records)
-- =====================================================

INSERT INTO notifications (user_id, type, title, message, session_id, booking_id, is_read) 
SELECT 
    u.id,
    'booking_confirmed',
    'Booking Confirmed!',
    'Your booking for Creative Dance for Beginners has been confirmed.',
    cs.id,
    b.id,
    false
FROM users u, class_sessions cs, class_templates ct, bookings b
WHERE u.firebase_uid = 'kX9mP2qR7sNv8wE3tA1B9cF4gH5j'  -- Emily Johnson
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class001'
AND cs.session_id = 'sess001'
AND b.user_id = u.id
AND b.session_id = cs.id
LIMIT 1;

INSERT INTO notifications (user_id, type, title, message, is_read) 
SELECT 
    u.id,
    'class_reminder',
    'Class Reminder',
    'Your Leadership Lab class starts in 2 hours!',
    false
FROM users u
WHERE u.firebase_uid = 'mY2nQ3rS8tOw9xF4uB2C0dG5hI6k'  -- Carlos Fernandez
LIMIT 1;

INSERT INTO notifications (user_id, type, title, message, is_read) 
SELECT 
    u.id,
    'level_up',
    'Level Up!',
    'Congratulations! You reached level 6!',
    true
FROM users u
WHERE u.firebase_uid = 'oA4pS5tU0vQy1zH6wD4E2fI7jK8m'  -- Andrea Moreno
LIMIT 1;

INSERT INTO notifications (user_id, type, title, message, is_read) 
SELECT 
    u.id,
    'achievement_unlocked',
    'Achievement Unlocked!',
    'You unlocked the "First Class" achievement!',
    false
FROM users u
WHERE u.firebase_uid = 'nZ3oR4sT9uPx0yG5vC3D1eH6iJ7l'  -- Samantha Lee
LIMIT 1;

INSERT INTO notifications (user_id, type, title, message, is_read) 
SELECT 
    u.id,
    'streak_milestone',
    'Streak Milestone!',
    'Amazing! You maintained a 7-day activity streak!',
    false
FROM users u
WHERE u.firebase_uid = 'pB5qT6uV1wRz2aI7xE5F3gJ8kL9n'  -- James Taylor
LIMIT 1;

-- =====================================================
-- 7. USER ACHIEVEMENTS (using achievement names)
-- =====================================================

-- Award "First Class" achievement to Emily Johnson
INSERT INTO user_achievements (user_id, achievement_id) 
SELECT 
    u.id,
    a.id
FROM users u, achievements a
WHERE u.firebase_uid = 'kX9mP2qR7sNv8wE3tA1B9cF4gH5j'  -- Emily Johnson
AND a.name = 'First Class';

-- Award achievements to Carlos Fernandez
INSERT INTO user_achievements (user_id, achievement_id) 
SELECT 
    u.id,
    a.id
FROM users u, achievements a
WHERE u.firebase_uid = 'mY2nQ3rS8tOw9xF4uB2C0dG5hI6k'  -- Carlos Fernandez
AND a.name IN ('First Class', 'Dedicated Student');

-- Award achievements to Andrea Moreno
INSERT INTO user_achievements (user_id, achievement_id) 
SELECT 
    u.id,
    a.id
FROM users u, achievements a
WHERE u.firebase_uid = 'oA4pS5tU0vQy1zH6wD4E2fI7jK8m'  -- Andrea Moreno
AND a.name IN ('First Class', 'Dedicated Student', 'Wellness Warrior', 'Level Up');

-- Award achievements to James Taylor
INSERT INTO user_achievements (user_id, achievement_id) 
SELECT 
    u.id,
    a.id
FROM users u, achievements a
WHERE u.firebase_uid = 'pB5qT6uV1wRz2aI7xE5F3gJ8kL9n'  -- James Taylor
AND a.name IN ('First Class', 'Streak Starter');

-- Award achievements to Maria Gonzalez
INSERT INTO user_achievements (user_id, achievement_id) 
SELECT 
    u.id,
    a.id
FROM users u, achievements a
WHERE u.firebase_uid = 'sE8tW9yZ4cSb5fL0aI6xG2hK3mN7'  -- Maria Gonzalez
AND a.name IN ('First Class', 'Dedicated Student', 'Streak Master');

-- Success message
SELECT 'Test data inserted successfully! 🎉' as result;
