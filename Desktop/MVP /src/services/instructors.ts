import { createClient } from '@supabase/supabase-js';
import { Instructor } from '../types/instructor';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/**
 * Fetch all instructors from Supabase.
 * @returns Promise<Instructor[]>
 */
export async function getInstructors(): Promise<Instructor[]> {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    console.log('[DB] Success: Loaded instructors', data);
    return data as Instructor[];
  } catch (error) {
    console.error('[DB] Error:', error);
    throw new Error('Unable to load instructors. Please try again later.');
  }
}