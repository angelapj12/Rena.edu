-- Working Test Data for Your Existing Schema
-- Based on actual users table structure

-- =====================================================
-- 1. Insert test users (works with your actual schema)
-- =====================================================

INSERT INTO users (firebase_uid, email, role, display_name, photo_url) VALUES
-- Students
('test_student_1', 'emily.johnson@example.com', 'student', 'Emily Johnson', 'https://picsum.photos/seed/emily/200'),
('test_student_2', 'carlos.fernandez@example.com', 'student', 'Carlos Fernandez', 'https://picsum.photos/seed/carlos/200'),
('test_student_3', 'samantha.lee@example.com', 'student', 'Samantha Lee', 'https://picsum.photos/seed/samantha/200'),
('test_student_4', 'andrea.moreno@example.com', 'student', 'Andrea Moreno', 'https://picsum.photos/seed/andrea/200'),
('test_student_5', 'james.taylor@example.com', 'student', 'James Taylor', 'https://picsum.photos/seed/james/200'),
('test_student_6', 'maria.gonzalez@example.com', 'student', 'Maria Gonzalez', 'https://picsum.photos/seed/mariag/200'),
-- Admins
('test_admin_1', 'lucas.romero@example.com', 'admin', 'Lucas Romero', 'https://picsum.photos/seed/lucas/200'),
('test_admin_2', 'amira.hassan@example.com', 'admin', 'Amira Hassan', 'https://picsum.photos/seed/amira/200'),
('test_admin_3', 'sofia.martinez@example.com', 'admin', 'Sofia Martinez', 'https://picsum.photos/seed/sofia/200'),
('test_admin_4', 'david.kim@example.com', 'admin', 'David Kim', 'https://picsum.photos/seed/david/200');

-- Check what was inserted
SELECT firebase_uid, email, role, display_name FROM users ORDER BY created_at DESC LIMIT 10;

-- =====================================================
-- 2. Now let's see what other tables exist and try to populate them
-- =====================================================

-- List all your tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Success message
SELECT 'Test users inserted successfully! Check other tables above.' as result;
