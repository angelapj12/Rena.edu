-- Test Data for Existing Schema
-- Based on the actual database structure shown

-- First, let's check what tables you actually have
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check if there's a classes table
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'classes' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if there's an instructors table
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'instructors' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check the users table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
AND table_schema = 'public'
ORDER BY ordinal_position;
