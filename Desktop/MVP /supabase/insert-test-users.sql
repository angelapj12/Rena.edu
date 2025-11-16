-- Users Test Data (from your test dataset)
-- Insert into your existing users table structure

INSERT INTO users (firebase_uid, email, display_name, role, photo_url) VALUES
-- Students
('user001', 'emily.johnson@example.com', 'Emily Johnson', 'student', 'https://picsum.photos/seed/emily/200'),
('user002', 'carlos.fernandez@example.com', 'Carlos Fernandez', 'student', 'https://picsum.photos/seed/carlos/200'),
('user003', 'samantha.lee@example.com', 'Samantha Lee', 'student', 'https://picsum.photos/seed/samantha/200'),
('user004', 'andrea.moreno@example.com', 'Andrea Moreno', 'student', 'https://picsum.photos/seed/andrea/200'),
('user005', 'james.taylor@example.com', 'James Taylor', 'student', 'https://picsum.photos/seed/james/200'),
('user008', 'maria.gonzalez@example.com', 'Maria Gonzalez', 'student', 'https://picsum.photos/seed/maria/200'),

-- Admins/Instructors
('user006', 'lucas.romero@example.com', 'Lucas Romero', 'admin', 'https://picsum.photos/seed/lucas/200'),
('user007', 'amira.hassan@example.com', 'Amira Hassan', 'admin', 'https://picsum.photos/seed/amira/200'),
('user009', 'sofia.martinez@example.com', 'Sofia Martinez', 'admin', 'https://picsum.photos/seed/sofia/200'),
('user010', 'david.kim@example.com', 'David Kim', 'admin', 'https://picsum.photos/seed/david/200')

ON CONFLICT (firebase_uid) DO UPDATE SET
  email = EXCLUDED.email,
  display_name = EXCLUDED.display_name,
  role = EXCLUDED.role,
  photo_url = EXCLUDED.photo_url;

-- Check what was inserted
SELECT firebase_uid, email, display_name, role FROM users ORDER BY created_at DESC LIMIT 10;
