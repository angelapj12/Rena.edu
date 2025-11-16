-- Achievements Test Data (from your test dataset)
-- Create achievements table if it doesn't exist, then insert test data

-- First check if achievements table exists, create if not
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    achievement_id VARCHAR(50) UNIQUE NOT NULL,
    firebase_uid VARCHAR(255) NOT NULL,
    achievement_name VARCHAR(200) NOT NULL,
    achievement_description TEXT,
    achievement_type VARCHAR(50),
    xp_earned INTEGER,
    badge_icon VARCHAR(255),
    date_earned TIMESTAMP WITH TIME ZONE,
    class_related VARCHAR(50),
    level_unlocked INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert test achievements
INSERT INTO achievements (achievement_id, firebase_uid, achievement_name, achievement_description, achievement_type, xp_earned, badge_icon, date_earned, class_related, level_unlocked) VALUES
('achievement001', 'firebase_user_001', 'First Steps', 'Completed your first class! Welcome to your wellness journey.', 'milestone', 50, 'first_steps_badge.png', '2024-12-10 16:00:00+00', 'class001', 1),
('achievement002', 'firebase_user_002', 'Dance Enthusiast', 'Attended 3 dance classes - you have got rhythm!', 'activity', 100, 'dance_enthusiast_badge.png', '2024-12-11 12:30:00+00', 'class001', 2),
('achievement003', 'firebase_user_003', 'Leadership Learner', 'Completed your first leadership workshop.', 'skill', 150, 'leadership_badge.png', '2024-12-12 18:00:00+00', 'class002', 2),
('achievement004', 'firebase_user_004', 'Innovation Minded', 'Joined the entrepreneurship community!', 'milestone', 200, 'innovation_badge.png', '2024-12-13 14:00:00+00', 'class003', 3),
('achievement005', 'firebase_user_005', 'Mindful Moment', 'Completed your first mindfulness session.', 'wellness', 80, 'mindful_badge.png', '2024-12-14 19:00:00+00', 'class004', 1),
('achievement006', 'firebase_user_006', 'Stage Presence', 'Showcased your talent in acting class!', 'performance', 180, 'stage_badge.png', '2024-12-15 19:30:00+00', 'class005', 3),
('achievement007', 'firebase_user_007', 'Early Bird', 'Booked a class more than 5 days in advance!', 'planning', 25, 'early_bird_badge.png', '2024-12-12 19:20:00+00', NULL, 1),
('achievement008', 'firebase_user_008', 'Team Player', 'Participated in a team-building focused session.', 'collaboration', 120, 'team_badge.png', '2024-12-13 16:00:00+00', 'class002', 2),
('achievement009', 'firebase_user_009', 'Stress Buster', 'Prioritized stress management - great choice!', 'wellness', 90, 'stress_badge.png', '2024-12-14 18:30:00+00', 'class004', 2),
('achievement010', 'firebase_user_010', 'Dedicated Learner', 'Joined the waitlist - commitment to growth!', 'dedication', 30, 'dedicated_badge.png', '2024-12-15 17:40:00+00', 'class005', 1)

ON CONFLICT (achievement_id) DO UPDATE SET
  firebase_uid = EXCLUDED.firebase_uid,
  achievement_name = EXCLUDED.achievement_name,
  achievement_description = EXCLUDED.achievement_description,
  achievement_type = EXCLUDED.achievement_type,
  xp_earned = EXCLUDED.xp_earned,
  badge_icon = EXCLUDED.badge_icon,
  date_earned = EXCLUDED.date_earned,
  class_related = EXCLUDED.class_related,
  level_unlocked = EXCLUDED.level_unlocked;

-- Check what was inserted
SELECT achievement_id, firebase_uid, achievement_name, achievement_type, xp_earned FROM achievements ORDER BY date_earned DESC;
