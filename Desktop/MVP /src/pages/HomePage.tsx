import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { listUpcomingClasses } from '../services/db';
import { getUpcomingBookings } from '../services/booking';
import { getMyStats } from '../services/gamification';
import { LoadingSpinner, LoadingCard } from '../components/LoadingSpinner';
import type { ClassCard, Booking, StudentStats } from '../types';

export default function HomePage() {
  const { user, userProfile } = useAuth();
  const [featuredClasses, setFeaturedClasses] = useState<ClassCard[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !userProfile) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load featured classes
        const featuredResult = await listUpcomingClasses({
          promotedFirst: true,
        });
        
        // Get only promoted classes for featured section
        const promoted = featuredResult.filter(cls => cls.promoted);
        setFeaturedClasses(promoted.slice(0, 6));

        // Load user's upcoming bookings
        const bookingsResult = await getUpcomingBookings(user.uid);
        setUpcomingBookings(bookingsResult.slice(0, 3));

        // Load user stats (only for students)
        if (userProfile.role === 'student') {
          const statsResult = await getMyStats(user.uid);
          setStats(statsResult);
        }
      } catch (err) {
        console.error('Failed to load home page data:', err);
        setError('Failed to load data. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, userProfile]);

  if (loading) {
    return <HomePage.Loading />;
  }

  if (error) {
    return <HomePage.Error error={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {userProfile?.display_name || 'User'}! 👋
        </h1>
        <p className="text-gray-600">
          Ready to continue your wellness journey?
        </p>
      </div>

      {/* Stats Overview (Students only) */}
      {userProfile?.role === 'student' && stats && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.level}</div>
                <div className="text-primary-100 text-sm">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.totalXP}</div>
                <div className="text-primary-100 text-sm">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center">
                  {stats.streakDaily > 0 ? '🔥' : '⭐'} {stats.streakDaily}
                </div>
                <div className="text-primary-100 text-sm">Day Streak</div>
              </div>
            </div>
            <Link
              to="/dashboard"
              className="inline-block mt-4 text-white underline hover:no-underline"
            >
              View full dashboard →
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/browse"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">��</div>
            <div className="font-medium text-gray-900">Browse Classes</div>
          </Link>
          <Link
            to="/bookings"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">📅</div>
            <div className="font-medium text-gray-900">My Bookings</div>
          </Link>
          <Link
            to="/dashboard"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium text-gray-900">Dashboard</div>
          </Link>
          {userProfile?.role === 'admin' && (
            <Link
              to="/admin"
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-medium text-gray-900">Admin Panel</div>
            </Link>
          )}
        </div>
      </div>

      {/* Featured Classes */}
      {featuredClasses.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Featured Classes ⭐</h2>
            <Link
              to="/browse"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredClasses.map((cls) => (
              <ClassCard key={cls.id} class={cls} featured />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Upcoming Classes</h2>
            <Link
              to="/bookings"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {featuredClasses.length === 0 && upcomingBookings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🧘‍♀️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to start your wellness journey?
          </h3>
          <p className="text-gray-600 mb-6">
            Explore our classes and book your first session!
          </p>
          <Link to="/browse" className="btn btn-primary">
            Browse Classes
          </Link>
        </div>
      )}
    </div>
  );
}

// Component for class cards
function ClassCard({ class: cls, featured = false }: { class: ClassCard; featured?: boolean }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <Link
      to={`/class/${cls.id}`}
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{cls.title}</h3>
            <p className="text-sm text-gray-600">{cls.category}</p>
          </div>
          {featured && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Featured
            </span>
          )}
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <span>📅</span>
            <span className="ml-2">{formatDate(cls.start_at)}</span>
          </div>
          {cls.location && (
            <div className="flex items-center">
              <span>📍</span>
              <span className="ml-2">{cls.location}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span>👥</span>
              <span className="ml-2">
                {cls.remaining_capacity}/{cls.max_capacity} spots left
              </span>
            </div>
            <div className="flex items-center text-primary-600">
              <span>✨</span>
              <span className="ml-1">{cls.xp_reward} XP</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Component for booking cards
function BookingCard({ booking }: { booking: Booking }) {
  if (!booking.class) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <Link
      to={`/class/${booking.class.id}`}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow flex items-center justify-between"
    >
      <div>
        <h4 className="font-medium text-gray-900">{booking.class.title}</h4>
        <p className="text-sm text-gray-600 mt-1">
          {formatDate(booking.class.start_at)}
        </p>
        {booking.class.location && (
          <p className="text-sm text-gray-500">📍 {booking.class.location}</p>
        )}
      </div>
      <div className="text-right">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Booked
        </span>
      </div>
    </Link>
  );
}

// Loading state component
HomePage.Loading = function HomePageLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    </div>
  );
};

// Error state component
HomePage.Error = function HomePageError({ 
  error, 
  onRetry 
}: { 
  error: string; 
  onRetry: () => void; 
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😞</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button onClick={onRetry} className="btn btn-primary">
          Try Again
        </button>
      </div>
    </div>
  );
};
