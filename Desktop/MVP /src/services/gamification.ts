import { supabase } from './db';
import type { StudentStats, LevelInfo, XPLedger, Streak } from '../types';

export class GamificationError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'GamificationError';
  }
}

// Level calculation function - quadratic growth curve
export function levelFor(totalXP: number): LevelInfo {
  let level = 1;
  let nextLevelXP = 100; // Level 2 requires 100 XP
  let prevThreshold = 0;

  while (totalXP >= nextLevelXP) {
    level++;
    prevThreshold = nextLevelXP;
    // Each level requires more XP: 100, 250, 450, 700, 1000, etc.
    nextLevelXP += 50 * level;
  }

  const xpInCurrentLevel = totalXP - prevThreshold;
  const xpNeededForNextLevel = nextLevelXP - prevThreshold;
  const progressPct = Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100));

  return {
    level,
    nextLevelXP,
    progressPct,
  };
}

export async function getMyStats(studentUid: string): Promise<StudentStats> {
  console.log('[XP] getMyStats', studentUid);

  try {
    // Get XP ledger
    const { data: ledger, error: ledgerError } = await supabase
      .from('xp_ledger')
      .select('delta, reason, created_at')
      .eq('student_uid', studentUid)
      .order('created_at', { ascending: true });

    if (ledgerError) {
      console.error('[XP] Failed to fetch XP ledger', ledgerError);
      throw new GamificationError('Failed to fetch XP data');
    }

    // Calculate total XP
    const totalXP = (ledger || []).reduce((sum, entry) => sum + entry.delta, 0);
    
    // Calculate level info
    const { level, nextLevelXP, progressPct } = levelFor(totalXP);

    // Get streak data
    const { data: streakData, error: streakError } = await supabase
      .from('streaks')
      .select('*')
      .eq('student_uid', studentUid)
      .eq('kind', 'daily')
      .single();

    if (streakError && streakError.code !== 'PGRST116') {
      console.error('[XP] Failed to fetch streak data', streakError);
      // Don't throw error, just use defaults
    }

    // Prepare XP history (last 30 entries for chart)
    const xpHistory = (ledger || [])
      .slice(-30)
      .map(entry => ({
        date: entry.created_at.split('T')[0], // Get just the date part
        delta: entry.delta,
        reason: entry.reason,
      }));

    return {
      totalXP,
      level,
      nextLevelXP,
      progressPct,
      streakDaily: streakData?.current_streak || 0,
      bestDaily: streakData?.best_streak || 0,
      xpHistory,
    };
  } catch (error) {
    if (error instanceof GamificationError) {
      throw error;
    }
    console.error('[XP] Unexpected error in getMyStats', error);
    throw new GamificationError('Failed to fetch player stats');
  }
}

export async function applyAttendanceXP(
  studentUid: string,
  classId: string,
  baseXP: number
): Promise<{ totalXP: number; newLevel?: number; streakBonus?: number }> {
  console.log('[XP] applyAttendanceXP', { studentUid, classId, baseXP });

  try {
    // Get current stats to check for level up
    const currentStats = await getMyStats(studentUid);
    const oldLevel = currentStats.level;

    // Apply base XP for attendance
    const { error: xpError } = await supabase
      .from('xp_ledger')
      .insert({
        student_uid: studentUid,
        class_id: classId,
        delta: baseXP,
        reason: 'attendance',
      });

    if (xpError) {
      console.error('[XP] Failed to add attendance XP', xpError);
      throw new GamificationError('Failed to award XP');
    }

    // Update daily streak
    const streakResult = await updateStreaks(studentUid, new Date(), 'daily');
    
    // Calculate new total XP
    const newTotalXP = currentStats.totalXP + baseXP + (streakResult.bonusAwarded || 0);
    const { level: newLevel } = levelFor(newTotalXP);

    const result: any = {
      totalXP: newTotalXP,
    };

    if (newLevel > oldLevel) {
      result.newLevel = newLevel;
      console.log('[XP] Level up!', { oldLevel, newLevel });
    }

    if (streakResult.bonusAwarded) {
      result.streakBonus = streakResult.bonusAwarded;
    }

    return result;
  } catch (error) {
    if (error instanceof GamificationError) {
      throw error;
    }
    console.error('[XP] Unexpected error in applyAttendanceXP', error);
    throw new GamificationError('Failed to process attendance XP');
  }
}

export async function updateStreaks(
  studentUid: string,
  date: Date,
  kind: 'daily' | 'weekly' = 'daily'
): Promise<{ current: number; best: number; bonusAwarded?: number }> {
  console.log('[XP] updateStreaks', { studentUid, date, kind });

  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format

  try {
    const { data, error } = await supabase.rpc('update_daily_streak', {
      p_student: studentUid,
      p_date: dateString,
    });

    if (error) {
      console.error('[XP] Failed to update streak', error);
      throw new GamificationError('Failed to update streak');
    }

    // The PostgreSQL function handles bonus awarding internally
    return data || { current: 0, best: 0 };
  } catch (error) {
    if (error instanceof GamificationError) {
      throw error;
    }
    console.error('[XP] Unexpected error in updateStreaks', error);
    throw new GamificationError('Failed to update streaks');
  }
}

export async function adminAdjustXP(
  studentUid: string,
  delta: number,
  reason: string = 'admin_adjust'
): Promise<{ totalXP: number }> {
  console.log('[XP] adminAdjustXP', { studentUid, delta, reason });

  try {
    const { error } = await supabase
      .from('xp_ledger')
      .insert({
        student_uid: studentUid,
        delta: delta,
        reason: reason as any, // Cast to match type
      });

    if (error) {
      console.error('[XP] Failed to adjust XP', error);
      throw new GamificationError('Failed to adjust XP');
    }

    // Get new total
    const stats = await getMyStats(studentUid);
    return { totalXP: stats.totalXP };
  } catch (error) {
    if (error instanceof GamificationError) {
      throw error;
    }
    console.error('[XP] Unexpected error in adminAdjustXP', error);
    throw new GamificationError('Failed to adjust XP');
  }
}

export function getXPForLevel(targetLevel: number): number {
  let totalXP = 0;
  for (let level = 2; level <= targetLevel; level++) {
    totalXP += 50 * level;
  }
  return totalXP;
}

export function getLevelBadgeColor(level: number): string {
  if (level >= 50) return 'bg-purple-500';
  if (level >= 25) return 'bg-yellow-500';
  if (level >= 10) return 'bg-blue-500';
  if (level >= 5) return 'bg-green-500';
  return 'bg-gray-500';
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 100) return '🔥🔥🔥';
  if (streak >= 30) return '🔥🔥';
  if (streak >= 7) return '🔥';
  if (streak >= 3) return '✨';
  return '⭐';
}

// Leaderboard functions
export async function getTopPlayers(limit: number = 10) {
  console.log('[XP] getTopPlayers', limit);

  try {
    const { data, error } = await supabase.rpc('get_leaderboard', {
      p_limit: limit
    });

    if (error) {
      console.error('[XP] Failed to fetch leaderboard', error);
      throw new GamificationError('Failed to fetch leaderboard');
    }

    return data || [];
  } catch (error) {
    if (error instanceof GamificationError) {
      throw error;
    }
    console.error('[XP] Unexpected error in getTopPlayers', error);
    throw new GamificationError('Failed to fetch leaderboard');
  }
}
