-- Test Data for Your Existing Schema
-- Based on your actual users table structure

-- =====================================================
-- 1. USERS (10 records) - Using your actual columns
-- =====================================================

INSERT INTO users (firebase_uid, email, display_name, role, photo_url) VALUES
-- Students
('kX9mP2qR7sNv8wE3tA1B9cF4gH5j', 'emily.johnson@example.com', 'Emily Johnson', 'student', 'https://picsum.photos/seed/emily/200'),
('mY2nQ3rS8tOw9xF4uB2C0dG5hI6k', 'carlos.fernandez@example.com', 'Carlos Fernandez', 'student', 'https://picsum.photos/seed/carlos/200'),
('nZ3oR4sT9uPx0yG5vC3D1eH6iJ7l', 'samantha.lee@example.com', 'Samantha Lee', 'student', 'https://picsum.photos/seed/samantha/200'),
('oA4pS5tU0vQy1zH6wD4E2fI7jK8m', 'andrea.moreno@example.com', 'Andrea Moreno', 'student', 'https://picsum.photos/seed/andrea/200'),
('pB5qT6uV1wRz2aI7xE5F3gJ8kL9n', 'james.taylor@example.com', 'James Taylor', 'student', 'https://picsum.photos/seed/james/200'),
('sE8tW9yZ4cSb5fL0aI6xG2hK3mN7', 'maria.gonzalez@example.com', 'Maria Gonzalez', 'student', 'https://picsum.photos/seed/maria/200'),
-- Admin/Instructors  
('qC6rU7vW2xSa3bJ8yF6G4hL9mO0p', 'lucas.romero@example.com', 'Lucas Romero', 'admin', 'https://picsum.photos/seed/lucas/200'),
('rD7sV8wX3yTb4cK9zG7H5iM0nP1q', 'amira.hassan@example.com', 'Amira Hassan', 'admin', 'https://picsum.photos/seed/amira/200'),
('tF9uY0aZ5dTc6eM1bJ8aH6jN4oQ8', 'sofia.martinez@example.com', 'Sofia Martinez', 'admin', 'https://picsum.photos/seed/sofia/200'),
('uG0vZ1bA6eUd7fN2cK9bI7kO5pR9', 'david.kim@example.com', 'David Kim', 'admin', 'https://picsum.photos/seed/david/200');

-- Check what was inserted
SELECT firebase_uid, email, display_name, role FROM users ORDER BY created_at DESC LIMIT 10;

-- Success message
SELECT 'Test users inserted successfully with your existing schema! 🎉' as result;
