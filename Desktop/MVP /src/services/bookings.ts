import { createClient } from '@supabase/supabase-js';
import { Booking } from '../types/booking';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/**
 * Fetch all bookings for a user.
 * @param userId - firebase_uid of the user
 * @returns Promise<Booking[]>
 */
export async function getBookingsByUser(userId: string): Promise<Booking[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    console.log('[Booking] Success: Loaded bookings for user', userId, data);
    return data as Booking[];
  } catch (error) {
    console.error('[Booking] Error:', error);
    throw new Error('Unable to load bookings. Please try again later.');
  }
}