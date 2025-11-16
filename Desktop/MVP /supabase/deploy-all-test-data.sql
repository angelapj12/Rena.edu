-- Deploy All Test Data
-- Run this script to insert all test data into the existing database
-- Script combines all test data files in the correct order

-- 1. First insert users (already exists, but update if needed)
\i '/Users/ang/Desktop/MVP /supabase/insert-test-users.sql'

-- 2. Insert instructors
\i '/Users/ang/Desktop/MVP /supabase/insert-test-instructors.sql'

-- 3. Insert classes
\i '/Users/ang/Desktop/MVP /supabase/insert-test-classes.sql'

-- 4. Insert sessions
\i '/Users/ang/Desktop/MVP /supabase/insert-test-sessions.sql'

-- 5. Insert bookings
\i '/Users/ang/Desktop/MVP /supabase/insert-test-bookings.sql'

-- 6. Insert achievements
\i '/Users/ang/Desktop/MVP /supabase/insert-test-achievements.sql'

-- Final verification queries
SELECT 'Users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'Instructors', COUNT(*) FROM instructors
UNION ALL
SELECT 'Classes', COUNT(*) FROM classes
UNION ALL
SELECT 'Sessions', COUNT(*) FROM sessions
UNION ALL
SELECT 'Bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'Achievements', COUNT(*) FROM achievements
ORDER BY table_name;
