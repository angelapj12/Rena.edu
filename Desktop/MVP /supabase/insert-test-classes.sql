-- Classes Test Data (from your test dataset)
-- Create classes table if it doesn't exist, then insert test data

-- First check if classes table exists, create if not
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id VARCHAR(50) UNIQUE NOT NULL,
    class_name VARCHAR(200) NOT NULL,
    class_category VARCHAR(100) NOT NULL,
    class_description TEXT,
    learning_outcomes TEXT[],
    level VARCHAR(50),
    duration VARCHAR(50),
    capacity INTEGER,
    certification BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    image VARCHAR(255),
    price DECIMAL(10,2),
    xp_reward INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert test classes
INSERT INTO classes (class_id, class_name, class_category, class_description, learning_outcomes, level, duration, capacity, certification, active, image, price, xp_reward) VALUES
('class001', 'Creative Dance for Beginners', 'Dance', 'An introductory dance class focusing on rhythm, body movement, and creativity.', ARRAY['Basic dance steps', 'Improved coordination', 'Increased confidence in movement'], 'beginner', '1h 30m', 20, false, true, 'dance_beginners.jpg', 25.00, 100),
('class002', 'Leadership Lab', 'Leadership', 'Hands-on leadership training through role-play, group exercises, and reflection.', ARRAY['Team collaboration', 'Conflict resolution', 'Public speaking'], 'intermediate', '3h', 25, true, true, 'leadership_lab.jpg', 40.00, 200),
('class003', 'Entrepreneurship Bootcamp', 'Business', 'A fast-paced course on idea validation, pitching, and startup basics.', ARRAY['Business model creation', 'Pitching skills', 'Market analysis'], 'all levels', '3h', 30, true, true, 'entrepreneurship_bootcamp.jpg', 50.00, 250),
('class004', 'Mindfulness & Meditation', 'Wellness', 'Guided mindfulness and meditation practice to improve focus and reduce stress.', ARRAY['Daily meditation routine', 'Stress management', 'Improved focus'], 'all levels', '1h', 40, false, true, 'mindfulness.jpg', 15.00, 80),
('class005', 'Acting & Stage Performance', 'Theatre', 'Develop stage presence, acting skills, and storytelling ability.', ARRAY['Improved acting skills', 'Stage confidence', 'Voice projection'], 'advanced', '3h', 15, true, true, 'acting_stage.jpg', 45.00, 220)

ON CONFLICT (class_id) DO UPDATE SET
  class_name = EXCLUDED.class_name,
  class_category = EXCLUDED.class_category,
  class_description = EXCLUDED.class_description,
  learning_outcomes = EXCLUDED.learning_outcomes,
  level = EXCLUDED.level,
  duration = EXCLUDED.duration,
  capacity = EXCLUDED.capacity,
  certification = EXCLUDED.certification,
  active = EXCLUDED.active,
  image = EXCLUDED.image,
  price = EXCLUDED.price,
  xp_reward = EXCLUDED.xp_reward,
  updated_at = NOW();

-- Check what was inserted
SELECT class_id, class_name, class_category, price, capacity FROM classes ORDER BY created_at DESC;
