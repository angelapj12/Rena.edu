-- Sessions Test Data (from your test dataset)
-- Create sessions table if it doesn't exist, then insert test data

-- First check if sessions table exists, create if not
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(50) UNIQUE NOT NULL,
    class_id VARCHAR(50) NOT NULL,
    session_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    instructor_id VARCHAR(50) NOT NULL,
    location VARCHAR(200),
    capacity INTEGER,
    available_slots INTEGER,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'scheduled',
    special_requirements TEXT,
    price DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert test sessions
INSERT INTO sessions (session_id, class_id, session_date, start_time, end_time, instructor_id, location, capacity, available_slots, registration_deadline, status, special_requirements, price) VALUES
('session001', 'class001', '2024-12-15', '10:00:00', '11:30:00', 'instructor001', 'Studio A, Building 2', 20, 16, '2024-12-14 12:00:00+00', 'scheduled', 'Comfortable clothing for movement', 25.00),
('session002', 'class001', '2024-12-18', '14:00:00', '15:30:00', 'instructor002', 'Studio A, Building 2', 20, 18, '2024-12-17 12:00:00+00', 'scheduled', 'Comfortable clothing for movement', 25.00),
('session003', 'class002', '2024-12-20', '09:00:00', '12:00:00', 'instructor003', 'Conference Room B, Building 1', 25, 20, '2024-12-19 18:00:00+00', 'scheduled', 'Notebook and pen required', 40.00),
('session004', 'class002', '2024-12-22', '13:00:00', '16:00:00', 'instructor003', 'Conference Room B, Building 1', 25, 22, '2024-12-21 18:00:00+00', 'scheduled', 'Notebook and pen required', 40.00),
('session005', 'class003', '2024-12-25', '10:00:00', '13:00:00', 'instructor004', 'Innovation Lab, Building 3', 30, 25, '2024-12-24 18:00:00+00', 'scheduled', 'Laptop recommended', 50.00),
('session006', 'class003', '2024-12-27', '14:00:00', '17:00:00', 'instructor004', 'Innovation Lab, Building 3', 30, 28, '2024-12-26 18:00:00+00', 'scheduled', 'Laptop recommended', 50.00),
('session007', 'class004', '2024-12-16', '18:00:00', '19:00:00', 'instructor005', 'Wellness Center, Building 1', 40, 35, '2024-12-16 06:00:00+00', 'scheduled', 'Yoga mat provided', 15.00),
('session008', 'class004', '2024-12-19', '17:30:00', '18:30:00', 'instructor005', 'Wellness Center, Building 1', 40, 38, '2024-12-19 06:00:00+00', 'scheduled', 'Yoga mat provided', 15.00),
('session009', 'class005', '2024-12-21', '15:00:00', '18:00:00', 'instructor001', 'Theater Room, Building 4', 15, 12, '2024-12-20 18:00:00+00', 'scheduled', 'Script will be provided', 45.00),
('session010', 'class005', '2024-12-23', '10:00:00', '13:00:00', 'instructor002', 'Theater Room, Building 4', 15, 14, '2024-12-22 18:00:00+00', 'scheduled', 'Script will be provided', 45.00)

ON CONFLICT (session_id) DO UPDATE SET
  class_id = EXCLUDED.class_id,
  session_date = EXCLUDED.session_date,
  start_time = EXCLUDED.start_time,
  end_time = EXCLUDED.end_time,
  instructor_id = EXCLUDED.instructor_id,
  location = EXCLUDED.location,
  capacity = EXCLUDED.capacity,
  available_slots = EXCLUDED.available_slots,
  registration_deadline = EXCLUDED.registration_deadline,
  status = EXCLUDED.status,
  special_requirements = EXCLUDED.special_requirements,
  price = EXCLUDED.price,
  updated_at = NOW();

-- Check what was inserted
SELECT session_id, class_id, session_date, start_time, location, available_slots FROM sessions ORDER BY session_date;
