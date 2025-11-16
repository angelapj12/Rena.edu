-- Minimal Test Data - Just Users First
-- This will help us understand what columns actually exist

-- =====================================================
-- 1. TEST USERS ONLY (5 records)
-- =====================================================

INSERT INTO users (firebase_uid, email, display_name, role) VALUES
('test-user-1', 'test1@example.com', 'Test User 1', 'student'),
('test-user-2', 'test2@example.com', 'Test User 2', 'student'),
('test-user-3', 'test3@example.com', 'Test User 3', 'admin'),
('test-user-4', 'test4@example.com', 'Test User 4', 'admin'),
('test-user-5', 'test5@example.com', 'Test User 5', 'student');

-- Check what was inserted
SELECT * FROM users LIMIT 5;

-- Success message
SELECT 'Minimal user test data inserted! Check the results above.' as result;
