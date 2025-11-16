-- Bookings Test Data (from your test dataset)
-- Assuming bookings table already exists from earlier exploration

-- Insert test bookings
INSERT INTO bookings (booking_id, firebase_uid, session_id, class_id, booking_date, status, payment_status, payment_amount, special_requests, created_at) VALUES
('booking001', 'firebase_user_001', 'session001', 'class001', '2024-12-10', 'confirmed', 'paid', 25.00, 'First time attending', '2024-12-10 14:30:00+00'),
('booking002', 'firebase_user_002', 'session001', 'class001', '2024-12-11', 'confirmed', 'paid', 25.00, NULL, '2024-12-11 09:15:00+00'),
('booking003', 'firebase_user_003', 'session003', 'class002', '2024-12-12', 'confirmed', 'paid', 40.00, 'Interested in advanced topics', '2024-12-12 16:45:00+00'),
('booking004', 'firebase_user_004', 'session005', 'class003', '2024-12-13', 'confirmed', 'paid', 50.00, 'Bringing my own laptop', '2024-12-13 11:20:00+00'),
('booking005', 'firebase_user_005', 'session007', 'class004', '2024-12-14', 'confirmed', 'paid', 15.00, NULL, '2024-12-14 08:30:00+00'),
('booking006', 'firebase_user_006', 'session009', 'class005', '2024-12-15', 'confirmed', 'paid', 45.00, 'Experienced performer', '2024-12-15 13:10:00+00'),
('booking007', 'firebase_user_007', 'session002', 'class001', '2024-12-12', 'pending', 'pending', 25.00, NULL, '2024-12-12 19:20:00+00'),
('booking008', 'firebase_user_008', 'session004', 'class002', '2024-12-13', 'confirmed', 'paid', 40.00, 'Team building focus', '2024-12-13 10:45:00+00'),
('booking009', 'firebase_user_009', 'session008', 'class004', '2024-12-14', 'confirmed', 'paid', 15.00, 'Stress management priority', '2024-12-14 15:25:00+00'),
('booking010', 'firebase_user_010', 'session010', 'class005', '2024-12-15', 'waitlist', 'pending', 45.00, 'Professional development', '2024-12-15 17:40:00+00')

ON CONFLICT (booking_id) DO UPDATE SET
  firebase_uid = EXCLUDED.firebase_uid,
  session_id = EXCLUDED.session_id,
  class_id = EXCLUDED.class_id,
  booking_date = EXCLUDED.booking_date,
  status = EXCLUDED.status,
  payment_status = EXCLUDED.payment_status,
  payment_amount = EXCLUDED.payment_amount,
  special_requests = EXCLUDED.special_requests,
  created_at = EXCLUDED.created_at;

-- Check what was inserted
SELECT booking_id, firebase_uid, session_id, status, payment_status, payment_amount FROM bookings ORDER BY created_at DESC;
