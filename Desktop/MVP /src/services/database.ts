import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on your actual schema
export interface User {
  firebase_uid: string
  email: string
  role: 'student' | 'admin'
  display_name?: string
  photo_url?: string
  created_at: string
  updated_at: string
}

// We'll add more types as we discover your other tables
export interface Booking {
  id: string
  user_id: string
  session_id: string
  booking_status: string
  booking_date: string
  cancellation_date?: string
  payment_status: string
  payment_amount?: number
  mindbody_booking_id?: string
  stripe_payment_intent_id?: string
  notes?: string
  created_at: string
  updated_at: string
  student_uid?: string
  status: string
  attended_at?: string
  class_id?: string
  booked_at: string
}
