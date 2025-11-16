import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { getMyBookings } from '../services/booking';
import type { Booking } from '../types';

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      if (user?.uid) {
        try {
          const userBookings = await getMyBookings(user.uid);
          setBookings(userBookings);
        } catch (error) {
          console.error('[Bookings] Error loading bookings:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadBookings();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'text-blue-600 bg-blue-50';
      case 'attended': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      case 'no_show': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const upcomingBookings = bookings.filter(b => 
    b.status === 'booked' && new Date(b.class?.start_at || '') > new Date()
  );
  
  const pastBookings = bookings.filter(b => 
    b.status !== 'booked' || new Date(b.class?.start_at || '') <= new Date()
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Classes</h2>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="card p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {booking.class?.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {booking.class?.start_at && formatDate(booking.class.start_at)}
                    </p>
                    {booking.class?.location && (
                      <p className="text-gray-500 text-sm">
                        📍 {booking.class.location}
                      </p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past Bookings */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Past Classes</h2>
        {pastBookings.length > 0 ? (
          <div className="space-y-4">
            {pastBookings.map((booking) => (
              <div key={booking.id} className="card p-4 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {booking.class?.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {booking.class?.start_at && formatDate(booking.class.start_at)}
                    </p>
                    {booking.class?.location && (
                      <p className="text-gray-500 text-sm">
                        📍 {booking.class.location}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    {booking.status === 'attended' && booking.class?.xp_reward && (
                      <p className="text-xs text-green-600 mt-1">
                        +{booking.class.xp_reward} XP
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No past bookings yet</p>
            <button className="btn-primary">
              Book Your First Class
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
          <p className="text-gray-600 mb-6">
            Start your wellness journey by booking your first class!
          </p>
          <button className="btn-primary">
            Browse Classes
          </button>
        </div>
      )}
    </div>
  );
}
