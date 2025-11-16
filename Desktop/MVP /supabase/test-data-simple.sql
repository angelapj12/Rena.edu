-- Simplified Test Data - Only Essential Columns
-- Run this after checking actual table structure

-- =====================================================
-- 1. USERS (10 records) - Using only basic columns
-- =====================================================

INSERT INTO users (firebase_uid, email, display_name, role) VALUES
-- Students
('kX9mP2qR7sNv8wE3tA1B9cF4gH5j', 'emily.johnson@example.com', 'Emily Johnson', 'student'),
('mY2nQ3rS8tOw9xF4uB2C0dG5hI6k', 'carlos.fernandez@example.com', 'Carlos Fernandez', 'student'),
('nZ3oR4sT9uPx0yG5vC3D1eH6iJ7l', 'samantha.lee@example.com', 'Samantha Lee', 'student'),
('oA4pS5tU0vQy1zH6wD4E2fI7jK8m', 'andrea.moreno@example.com', 'Andrea Moreno', 'student'),
('pB5qT6uV1wRz2aI7xE5F3gJ8kL9n', 'james.taylor@example.com', 'James Taylor', 'student'),
('sE8tW9yZ4cSb5fL0aI6xG2hK3mN7', 'maria.gonzalez@example.com', 'Maria Gonzalez', 'student'),
-- Admin/Instructors
('qC6rU7vW2xSa3bJ8yF6G4hL9mO0p', 'lucas.romero@example.com', 'Lucas Romero', 'admin'),
('rD7sV8wX3yTb4cK9zG7H5iM0nP1q', 'amira.hassan@example.com', 'Amira Hassan', 'admin'),
('tF9uY0aZ5dTc6eM1bJ8aH6jN4oQ8', 'sofia.martinez@example.com', 'Sofia Martinez', 'admin'),
('uG0vZ1bA6eUd7fN2cK9bI7kO5pR9', 'david.kim@example.com', 'David Kim', 'admin');

-- =====================================================
-- 2. INSTRUCTORS (5 records) - Using only basic columns
-- =====================================================

INSERT INTO instructors (user_id, instructor_name, instructor_title, bio) 
SELECT 
    users.id,
    'Sofia Martinez',
    'Dance Instructor',
    'Sofia has trained in contemporary and modern dance for over 12 years.'
FROM users WHERE firebase_uid = 'tF9uY0aZ5dTc6eM1bJ8aH6jN4oQ8';

INSERT INTO instructors (user_id, instructor_name, instructor_title, bio) 
SELECT 
    users.id,
    'David Kim',
    'Startup Mentor',
    'David is a serial entrepreneur and angel investor.'
FROM users WHERE firebase_uid = 'uG0vZ1bA6eUd7fN2cK9bI7kO5pR9';

INSERT INTO instructors (user_id, instructor_name, instructor_title, bio) 
SELECT 
    users.id,
    'Amira Hassan',
    'Leadership Coach',
    'Amira has led leadership workshops across Europe.'
FROM users WHERE firebase_uid = 'rD7sV8wX3yTb4cK9zG7H5iM0nP1q';

INSERT INTO instructors (user_id, instructor_name, instructor_title, bio) 
SELECT 
    users.id,
    'Lucas Romero',
    'Mindfulness Instructor',
    'Lucas specializes in mindfulness, yoga, and breathwork.'
FROM users WHERE firebase_uid = 'qC6rU7vW2xSa3bJ8yF6G4hL9mO0p';

-- =====================================================
-- 3. CLASS TEMPLATES (5 records) - Using only basic columns
-- =====================================================

INSERT INTO class_templates (class_id, class_name, class_description, class_category, level, duration) VALUES
('class001', 'Creative Dance for Beginners', 'An introductory dance class focusing on rhythm, body movement, and creativity.', 'Dance', 'Beginner', '90 minutes'),
('class002', 'Leadership Lab', 'Hands-on leadership training through role-play, group exercises, and reflection.', 'Leadership', 'Intermediate', '3 hours'),
('class003', 'Entrepreneurship Bootcamp', 'A fast-paced course on idea validation, pitching, and startup basics.', 'Business', 'All Levels', '3 hours'),
('class004', 'Mindfulness & Meditation', 'Guided mindfulness and meditation practice to improve focus and reduce stress.', 'Wellness', 'All Levels', '1 hour'),
('class005', 'Acting & Stage Performance', 'Develop stage presence, acting skills, and storytelling ability.', 'Theatre', 'Advanced', '3 hours');

-- =====================================================
-- 4. CLASS SESSIONS (5 records) - Using only basic columns
-- =====================================================

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants) 
SELECT 
    'sess001',
    ct.id,
    inst.id,
    '2025-10-05',
    '10:00',
    '11:30',
    20
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class001' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'tF9uY0aZ5dTc6eM1bJ8aH6jN4oQ8'
LIMIT 1;

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants) 
SELECT 
    'sess002',
    ct.id,
    inst.id,
    '2025-10-08',
    '14:00',
    '17:00',
    25
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class002' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'rD7sV8wX3yTb4cK9zG7H5iM0nP1q'
LIMIT 1;

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants) 
SELECT 
    'sess003',
    ct.id,
    inst.id,
    '2025-10-10',
    '09:00',
    '12:00',
    30
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class003' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'uG0vZ1bA6eUd7fN2cK9bI7kO5pR9'
LIMIT 1;

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants) 
SELECT 
    'sess004',
    ct.id,
    inst.id,
    '2025-10-06',
    '18:00',
    '19:00',
    40
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class004' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'qC6rU7vW2xSa3bJ8yF6G4hL9mO0p'
LIMIT 1;

INSERT INTO class_sessions (session_id, class_template_id, instructor_id, session_date, start_time, end_time, max_participants) 
SELECT 
    'sess005',
    ct.id,
    inst.id,
    '2025-10-11',
    '15:00',
    '18:00',
    15
FROM class_templates ct, instructors inst, users u
WHERE ct.class_id = 'class005' 
AND inst.user_id = u.id 
AND u.firebase_uid = 'sE8tW9yZ4cSb5fL0aI6xG2hK3mN7'
LIMIT 1;

-- =====================================================
-- 5. SAMPLE BOOKINGS (5 records)
-- =====================================================

INSERT INTO bookings (user_id, session_id, status) 
SELECT 
    u.id,
    cs.id,
    'confirmed'
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'kX9mP2qR7sNv8wE3tA1B9cF4gH5j'  -- Emily Johnson
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class001'
AND cs.session_id = 'sess001'
LIMIT 1;

INSERT INTO bookings (user_id, session_id, status) 
SELECT 
    u.id,
    cs.id,
    'confirmed'
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'mY2nQ3rS8tOw9xF4uB2C0dG5hI6k'  -- Carlos Fernandez
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class002'
AND cs.session_id = 'sess002'
LIMIT 1;

INSERT INTO bookings (user_id, session_id, status) 
SELECT 
    u.id,
    cs.id,
    'confirmed'
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'nZ3oR4sT9uPx0yG5vC3D1eH6iJ7l'  -- Samantha Lee
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class003'
AND cs.session_id = 'sess003'
LIMIT 1;

INSERT INTO bookings (user_id, session_id, status) 
SELECT 
    u.id,
    cs.id,
    'waitlist'
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'oA4pS5tU0vQy1zH6wD4E2fI7jK8m'  -- Andrea Moreno
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class004'
AND cs.session_id = 'sess004'
LIMIT 1;

INSERT INTO bookings (user_id, session_id, status) 
SELECT 
    u.id,
    cs.id,
    'confirmed'
FROM users u, class_sessions cs, class_templates ct
WHERE u.firebase_uid = 'pB5qT6uV1wRz2aI7xE5F3gJ8kL9n'  -- James Taylor
AND cs.class_template_id = ct.id 
AND ct.class_id = 'class005'
AND cs.session_id = 'sess005'
LIMIT 1;

-- Success message
SELECT 'Simplified test data inserted successfully! 🎉' as result;
