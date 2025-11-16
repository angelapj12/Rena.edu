-- Instructors Test Data (from your test dataset)
-- Create instructors table if it doesn't exist, then insert test data

-- First check if instructors table exists, create if not
CREATE TABLE IF NOT EXISTS instructors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instructor_id VARCHAR(50) UNIQUE NOT NULL,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    experience_years INTEGER,
    bio TEXT,
    achievements TEXT[],
    rating DECIMAL(3,2),
    total_classes INTEGER DEFAULT 0,
    total_students INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    profile_image VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert test instructors
INSERT INTO instructors (instructor_id, firebase_uid, name, specialization, experience_years, bio, achievements, rating, total_classes, total_students, active, profile_image, contact_email, contact_phone) VALUES
('instructor001', 'firebase_instructor_001', 'Sarah Johnson', 'Dance & Movement', 8, 'Professional dancer with 8 years of teaching experience specializing in contemporary and creative movement.', ARRAY['Certified Dance Movement Therapist', 'Winner of Regional Dance Competition 2020', 'Master Trainer Certification'], 4.9, 85, 450, true, 'sarah_johnson.jpg', 'sarah.johnson@wellness.com', '+1-555-0101'),
('instructor002', 'firebase_instructor_002', 'Michael Chen', 'Leadership & Communication', 12, 'Executive coach and leadership consultant with extensive corporate training background.', ARRAY['Certified Executive Coach (ICF)', 'MBA from Stanford University', 'TEDx Speaker'], 4.8, 120, 680, true, 'michael_chen.jpg', 'michael.chen@wellness.com', '+1-555-0102'),
('instructor003', 'firebase_instructor_003', 'Emily Rodriguez', 'Business & Entrepreneurship', 6, 'Serial entrepreneur and startup mentor with multiple successful exits.', ARRAY['Founded 3 successful startups', 'Mentor at TechStars Accelerator', 'Forbes 30 Under 30'], 4.7, 65, 320, true, 'emily_rodriguez.jpg', 'emily.rodriguez@wellness.com', '+1-555-0103'),
('instructor004', 'firebase_instructor_004', 'David Park', 'Mindfulness & Wellness', 10, 'Certified mindfulness instructor and wellness coach with background in psychology.', ARRAY['Certified Mindfulness-Based Stress Reduction Instructor', 'Licensed Clinical Therapist', '500-hour Yoga Teacher Training'], 4.9, 200, 1200, true, 'david_park.jpg', 'david.park@wellness.com', '+1-555-0104'),
('instructor005', 'firebase_instructor_005', 'Jessica Williams', 'Theatre & Performance', 15, 'Professional actress and theatre director with Broadway and film experience.', ARRAY['Broadway performer for 8 years', 'Directing degree from Juilliard', 'Tony Award nomination'], 4.8, 95, 380, true, 'jessica_williams.jpg', 'jessica.williams@wellness.com', '+1-555-0105')

ON CONFLICT (instructor_id) DO UPDATE SET
  firebase_uid = EXCLUDED.firebase_uid,
  name = EXCLUDED.name,
  specialization = EXCLUDED.specialization,
  experience_years = EXCLUDED.experience_years,
  bio = EXCLUDED.bio,
  achievements = EXCLUDED.achievements,
  rating = EXCLUDED.rating,
  total_classes = EXCLUDED.total_classes,
  total_students = EXCLUDED.total_students,
  active = EXCLUDED.active,
  profile_image = EXCLUDED.profile_image,
  contact_email = EXCLUDED.contact_email,
  contact_phone = EXCLUDED.contact_phone,
  updated_at = NOW();

-- Check what was inserted
SELECT instructor_id, name, specialization, rating, total_classes FROM instructors ORDER BY created_at DESC;
