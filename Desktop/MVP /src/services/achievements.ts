import { createClient } from '@supabase/supabase-js';
import { Achievement } from '../types/achievement';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/**
 * Fetch all achievements.
 * @returns Promise<Achievement[]>
 */
export async function getAchievements(): Promise<Achievement[]> {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('xp_reward', { ascending: false });
    if (error) throw error;
    console.log('[XP] Success: Loaded achievements', data);
    return data as Achievement[];
  } catch (error) {
    console.error('[XP] Error:', error);
    throw new Error('Unable to load achievements. Please try again later.');
  }
}