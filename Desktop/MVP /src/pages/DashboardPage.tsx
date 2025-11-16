import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { getMyStats } from '../services/gamification';
import type { StudentStats } from '../types';

interface Achievement {
  name: string;
  xpReward: number;
}

interface GameStats extends StudentStats {
  achievements?: Achievement[];
  totalClassesAttended?: number;
  currentStreak?: number;
  weeklyGoalProgress?: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [gameStats, setGameStats] = useState<GameStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGameStats = async () => {
      if (user?.uid) {
        try {
          const stats = await getMyStats(user.uid);
          const gameStats: GameStats = {
            ...stats,
            achievements: [],
            totalClassesAttended: 0,
            currentStreak: stats.streakDaily,
            weeklyGoalProgress: 75
          };
          setGameStats(gameStats);
        } catch (error) {
          console.error('[Dashboard] Error loading game stats:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadGameStats();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Wellness Journey</h1>

      {/* Level and XP Progress */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Level {gameStats?.level || 1}
            </h2>
            <p className="text-gray-600">
              {gameStats?.totalXP || 0} XP Total
            </p>
          </div>
          <div className="text-3xl">🏆</div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="bg-primary-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${gameStats?.progressPct || 0}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          {gameStats?.nextLevelXP ? (gameStats.nextLevelXP - gameStats.totalXP) : 0} XP to next level
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-primary-600 mb-1">
            {gameStats?.totalClassesAttended || 0}
          </div>
          <div className="text-sm text-gray-600">Classes Attended</div>
        </div>
        
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-success-600 mb-1">
            {gameStats?.currentStreak || 0}
          </div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
        
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {gameStats?.achievements?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Achievements</div>
        </div>
        
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {gameStats?.weeklyGoalProgress || 0}%
          </div>
          <div className="text-sm text-gray-600">Weekly Goal</div>
        </div>
      </div>

      {/* Recent Achievements */}
      {gameStats?.achievements && gameStats.achievements.length > 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {gameStats.achievements.slice(0, 3).map((achievement: Achievement, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="text-2xl">🏅</div>
                <div>
                  <div className="font-medium text-gray-900">
                    {achievement.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    +{achievement.xpReward} XP
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="btn-primary p-4 text-left">
            <div className="font-medium">Book a Class</div>
            <div className="text-sm opacity-90">Maintain your streak</div>
          </button>
          <button className="btn-outline p-4 text-left">
            <div className="font-medium">View Bookings</div>
            <div className="text-sm text-gray-600">Check your schedule</div>
          </button>
        </div>
      </div>
    </div>
  );
}
