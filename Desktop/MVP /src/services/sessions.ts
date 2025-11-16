import { createClient } from '@supabase/supabase-js';
import { Session } from '../types/session';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/**
 * Fetch all sessions for a class.
 * @param classId - class_id of the class
 * @returns Promise<Session[]>
 */
export async function getSessionsByClass(classId: string): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('class_id', classId)
      .order('start_time', { ascending: true });
    if (error) throw error;
    console.log('[DB] Success: Loaded sessions for class', classId, data);
    return data as Session[];
  } catch (error) {
    console.error('[DB] Error:', error);
    throw new Error('Unable to load sessions. Please try again later.');
  }
}