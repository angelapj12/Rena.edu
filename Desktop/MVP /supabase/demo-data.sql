-- Demo Data for WellnessHub
-- Run this in your Supabase SQL Editor to create demo accounts and classes

-- Insert demo users
INSERT INTO users (firebase_uid, email, display_name, role, xp_points, level, current_streak, longest_streak, phone, bio) VALUES
('demo-student-uid', 'student@wellnesshub.com', 'Demo Student', 'student', 150, 2, 3, 7, '+1-555-0123', 'Wellness enthusiast looking to stay active and healthy'),
('demo-admin-uid', 'admin@wellnesshub.com', 'Demo Admin', 'admin', 500, 5, 10, 15, '+1-555-0100', 'WellnessHub administrator managing classes and instructors'),
('demo-instructor-uid', 'instructor@wellnesshub.com', 'Sarah Johnson', 'student', 300, 3, 5, 12, '+1-555-0200', 'Certified yoga instructor with 8 years of experience')
ON CONFLICT (firebase_uid) DO UPDATE SET
  email = EXCLUDED.email,
  display_name = EXCLUDED.display_name,
  role = EXCLUDED.role,
  xp_points = EXCLUDED.xp_points,
  level = EXCLUDED.level,
  current_streak = EXCLUDED.current_streak,
  longest_streak = EXCLUDED.longest_streak,
  phone = EXCLUDED.phone,
  bio = EXCLUDED.bio;

-- Insert demo instructor profile
INSERT INTO instructors (user_id, specialties, years_experience, rating, total_reviews, is_featured) 
SELECT id, ARRAY['Yoga', 'Meditation', 'Pilates'], 8, 4.8, 156, true
FROM users WHERE firebase_uid = 'demo-instructor-uid'
ON CONFLICT DO NOTHING;

-- Insert demo classes
INSERT INTO classes (instructor_id, title, description, category, difficulty_level, start_time, end_time, duration_minutes, max_capacity, current_bookings, price, location, is_virtual, xp_reward, is_featured)
SELECT 
  i.id,
  'Morning Yoga Flow',
  'Start your day with energizing yoga poses and mindful breathing. Perfect for all levels.',
  'Yoga',
  'beginner',
  NOW() + INTERVAL '1 day',
  NOW() + INTERVAL '1 day' + INTERVAL '60 minutes',
  60,
  20,
  8,
  25.00,
  'Studio A - Main Floor',
  false,
  15,
  true
FROM instructors i
JOIN users u ON i.user_id = u.id
WHERE u.firebase_uid = 'demo-instructor-uid'
ON CONFLICT DO NOTHING;

INSERT INTO classes (instructor_id, title, description, category, difficulty_level, start_time, end_time, duration_minutes, max_capacity, current_bookings, price, location, is_virtual, xp_reward, is_featured)
SELECT 
  i.id,
  'HIIT Cardio Blast',
  'High-intensity interval training to boost your metabolism and build strength.',
  'Fitness',
  'intermediate',
  NOW() + INTERVAL '2 days',
  NOW() + INTERVAL '2 days' + INTERVAL '45 minutes',
  45,
  15,
  12,
  30.00,
  'Gym - Second Floor',
  false,
  20,
  false
FROM instructors i
JOIN users u ON i.user_id = u.id
WHERE u.firebase_uid = 'demo-instructor-uid'
ON CONFLICT DO NOTHING;

INSERT INTO classes (instructor_id, title, description, category, difficulty_level, start_time, end_time, duration_minutes, max_capacity, current_bookings, price, location, is_virtual, xp_reward, is_featured)
SELECT 
  i.id,
  'Meditation & Mindfulness',
  'Find inner peace through guided meditation and mindfulness practices.',
  'Meditation',
  'beginner',
  NOW() + INTERVAL '3 days',
  NOW() + INTERVAL '3 days' + INTERVAL '30 minutes',
  30,
  25,
  5,
  15.00,
  'Quiet Room',
  true,
  10,
  false
FROM instructors i
JOIN users u ON i.user_id = u.id
WHERE u.firebase_uid = 'demo-instructor-uid'
ON CONFLICT DO NOTHING;

INSERT INTO classes (instructor_id, title, description, category, difficulty_level, start_time, end_time, duration_minutes, max_capacity, current_bookings, price, location, is_virtual, xp_reward, is_featured)
SELECT 
  i.id,
  'Advanced Pilates',
  'Challenge yourself with advanced Pilates movements for core strength and flexibility.',
  'Pilates',
  'advanced',
  NOW() + INTERVAL '4 days',
  NOW() + INTERVAL '4 days' + INTERVAL '75 minutes',
  75,
  12,
  3,
  35.00,
  'Studio B',
  false,
  25,
  true
FROM instructors i
JOIN users u ON i.user_id = u.id
WHERE u.firebase_uid = 'demo-instructor-uid'
ON CONFLICT DO NOTHING;

-- Create some demo bookings for the student
INSERT INTO bookings (user_id, class_id, status, amount_paid, attended)
SELECT 
  u.id,
  c.id,
  'confirmed',
  c.price,
  true
FROM users u
CROSS JOIN classes c
WHERE u.firebase_uid = 'demo-student-uid' 
  AND c.title IN ('Morning Yoga Flow')
  AND NOT EXISTS (
    SELECT 1 FROM bookings b 
    WHERE b.user_id = u.id AND b.class_id = c.id
  )
LIMIT 1;

-- Success message
SELECT 'Demo data created successfully! 🎉' as result,
       'You now have demo accounts and classes to test with.' as details;
