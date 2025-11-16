// Database Types
export interface User {
  firebase_uid: string;
  email: string;
  role: 'student' | 'admin' | 'instructor';
  display_name?: string;
  photo_url?: string;
  created_at: string;
}

export interface Instructor {
  id: string;
  name: string;
  bio?: string;
  photo_url?: string;
  specialty?: string;
  contact?: string;
  user_firebase_uid?: string;
}

export interface WellnessClass {
  id: string;
  title: string;
  description?: string;
  category: 'Yoga' | 'Dance' | 'Nutrition' | 'Fitness' | 'Other';
  start_at: string;
  end_at: string;
  location?: string;
  max_capacity: number;
  xp_reward: number;
  instructor_id?: string;
  promoted: boolean;
  promoted_until?: string;
  created_by?: string;
  created_at: string;
  instructor?: Instructor;
}

export interface Booking {
  id: string;
  class_id: string;
  student_uid: string;
  status: 'booked' | 'cancelled' | 'attended' | 'no_show';
  booked_at: string;
  attended_at?: string;
  class?: WellnessClass;
}

export interface XPLedger {
  id: string;
  student_uid: string;
  class_id?: string;
  delta: number;
  reason: 'attendance' | 'streak_bonus' | 'admin_adjust' | 'reversal';
  created_at: string;
}

export interface Streak {
  student_uid: string;
  kind: 'daily' | 'weekly';
  current_streak: number;
  best_streak: number;
  last_increment_date?: string;
}

export interface ClassCapacity {
  class_id: string;
  max_capacity: number;
  booked_count: number;
  remaining: number;
}

// API Request/Response Types
export interface ClassCard extends WellnessClass {
  remaining_capacity: number;
}

export interface ClassDetails extends WellnessClass {
  remaining_capacity: number;
  is_booked?: boolean;
  booking_id?: string;
}

export interface ClassUpsert {
  id?: string;
  title: string;
  description?: string;
  category: WellnessClass['category'];
  start_at: string;
  end_at: string;
  location?: string;
  max_capacity: number;
  xp_reward: number;
  instructor_id?: string;
}

export interface StudentStats {
  totalXP: number;
  level: number;
  nextLevelXP: number;
  progressPct: number;
  streakDaily: number;
  bestDaily: number;
  xpHistory: Array<{
    date: string;
    delta: number;
    reason: XPLedger['reason'];
  }>;
}

export interface LevelInfo {
  level: number;
  nextLevelXP: number;
  progressPct: number;
}

// Firebase Types
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  messagingSenderId: string;
  appId: string;
  vapidKey: string;
}

export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
}

// Analytics Types
export interface CapacitySnapshot {
  classId: string;
  title: string;
  start_at: string;
  max_capacity: number;
  booked: number;
  remaining: number;
}

export interface AttendanceStats {
  booked: number;
  attended: number;
  no_show: number;
  attendance_rate: number;
}

// Error Types
export interface APIError {
  message: string;
  code?: string;
  details?: any;
}
