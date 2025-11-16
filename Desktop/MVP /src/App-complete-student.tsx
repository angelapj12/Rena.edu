import { useState, useEffect } from 'react';

// Demo accounts
const DEMO_ACCOUNTS = [
  {
    id: 'demo-student-1',
    firebase_uid: 'demo-student-uid',
    email: 'student@wellnesshub.com',
    display_name: 'Demo Student',
    role: 'student' as const,
    xp_points: 150,
    level: 2,
    current_streak: 3,
    longest_streak: 7,
    avatar_url: null,
    phone: '+1-555-0123',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-admin-1', 
    firebase_uid: 'demo-admin-uid',
    email: 'admin@wellnesshub.com',
    display_name: 'Demo Admin',
    role: 'admin' as const,
    xp_points: 500,
    level: 5,
    current_streak: 10,
    longest_streak: 15,
    avatar_url: null,
    phone: '+1-555-0100',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

type User = typeof DEMO_ACCOUNTS[0];

// Student Dashboard Component
function DashboardContent({ user, bookings }: { user: User; bookings: any[] }) {
  return (
    <div style={{ 
      padding: '20px', 
      paddingBottom: '100px',
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #cff45e, #a3d977)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          margin: '0 0 8px 0',
          color: '#000000'
        }}>
          Welcome back, {user.display_name}!
        </h1>
        <p style={{ margin: '0', color: '#333333' }}>
          Ready for your next workout?
        </p>
      </div>

      {/* Progress Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a' }}>
            {user.level}
          </div>
          <div style={{ fontSize: '14px', color: '#666666' }}>Level</div>
        </div>
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc2626' }}>
            {user.current_streak}
          </div>
          <div style={{ fontSize: '14px', color: '#666666' }}>Day Streak</div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          margin: '0 0 16px 0',
          color: '#000000'
        }}>
          Today's Classes
        </h2>
        <div style={{
          background: '#f3f4f6',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            🧘‍♀️
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#000000' }}>
              Morning Yoga
            </h3>
            <p style={{ margin: '0', fontSize: '14px', color: '#666666' }}>
              9:00 AM - 10:00 AM • Sarah Wilson
            </p>
          </div>
          <button style={{
            background: '#16a34a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Join
          </button>
        </div>
      </div>

      {/* Achievements */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          margin: '0 0 16px 0',
          color: '#000000'
        }}>
          Recent Achievements
        </h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{
            background: '#fbbf24',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            🏆
          </div>
          <div style={{
            background: '#10b981',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            ⭐
          </div>
          <div style={{
            background: '#8b5cf6',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            🔥
          </div>
        </div>
      </div>
    </div>
  );
}

// Browse Classes Component
function BrowseContent({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const classes = [
    { id: 1, title: 'Morning Yoga', instructor: 'Sarah Wilson', time: '9:00 AM', duration: '60 min', spots: '12/15' },
    { id: 2, title: 'HIIT Training', instructor: 'Mike Chen', time: '10:30 AM', duration: '45 min', spots: '8/12' },
    { id: 3, title: 'Pilates Flow', instructor: 'Lisa Rodriguez', time: '2:00 PM', duration: '50 min', spots: '15/20' },
  ];

  return (
    <div style={{ 
      padding: '20px', 
      paddingBottom: '100px',
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #cff45e, #a3d977)'
    }}>
      <h1 style={{ 
        fontSize: '24px', 
        fontWeight: '600', 
        margin: '0 0 24px 0',
        color: '#000000'
      }}>
        Browse Classes
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {classes.map((cls) => (
          <div
            key={cls.id}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#000000' }}>
                  {cls.title}
                </h3>
                <p style={{ margin: '0', fontSize: '14px', color: '#666666' }}>
                  {cls.instructor}
                </p>
              </div>
              <div style={{
                background: '#dcfce7',
                color: '#16a34a',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {cls.spots} spots
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '14px', color: '#666666' }}>
              <span>⏰ {cls.time}</span>
              <span>⌛ {cls.duration}</span>
            </div>
            <button
              onClick={() => setCurrentPage('class-details')}
              style={{
                background: '#16a34a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Book Class
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// My Bookings Component
function BookingsContent() {
  const bookings = [
    { id: 1, class: 'Morning Yoga', date: 'Today', time: '9:00 AM', status: 'confirmed' },
    { id: 2, class: 'HIIT Training', date: 'Tomorrow', time: '10:30 AM', status: 'confirmed' },
    { id: 3, class: 'Pilates Flow', date: 'Oct 10', time: '2:00 PM', status: 'waitlist' },
  ];

  return (
    <div style={{ 
      padding: '20px', 
      paddingBottom: '100px',
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #cff45e, #a3d977)'
    }}>
      <h1 style={{ 
        fontSize: '24px', 
        fontWeight: '600', 
        margin: '0 0 24px 0',
        color: '#000000'
      }}>
        My Bookings
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {bookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#000000' }}>
                  {booking.class}
                </h3>
                <p style={{ margin: '0', fontSize: '14px', color: '#666666' }}>
                  {booking.date} at {booking.time}
                </p>
              </div>
              <div style={{
                background: booking.status === 'confirmed' ? '#dcfce7' : '#fef3c7',
                color: booking.status === 'confirmed' ? '#16a34a' : '#d97706',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500',
                textTransform: 'capitalize'
              }}>
                {booking.status}
              </div>
            </div>
            <button style={{
              background: '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Leaderboard Component
function LeaderboardContent() {
  const leaderboard = [
    { id: 1, name: 'Alex Champion', xp: 2450, level: 12, avatar: '🏆' },
    { id: 2, name: 'Sarah Star', xp: 2100, level: 10, avatar: '⭐' },
    { id: 3, name: 'Mike Mentor', xp: 1850, level: 9, avatar: '💪' },
    { id: 4, name: 'Lisa Legend', xp: 1600, level: 8, avatar: '🔥' },
    { id: 5, name: 'Demo Student', xp: 150, level: 2, avatar: '🧘‍♀️' },
  ];

  return (
    <div style={{ 
      padding: '20px', 
      paddingBottom: '100px',
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #cff45e, #a3d977)'
    }}>
      <h1 style={{ 
        fontSize: '24px', 
        fontWeight: '600', 
        margin: '0 0 24px 0',
        color: '#000000'
      }}>
        Leaderboard
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {leaderboard.map((user, index) => (
          <div
            key={user.id}
            style={{
              background: index === 0 ? '#fbbf24' : '#ffffff',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{
              background: index === 0 ? '#ffffff' : '#f3f4f6',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              {index + 1}
            </div>
            <div style={{
              background: '#f3f4f6',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              {user.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ 
                margin: '0 0 4px 0', 
                fontSize: '16px', 
                color: index === 0 ? '#ffffff' : '#000000',
                fontWeight: user.name === 'Demo Student' ? 'bold' : 'normal'
              }}>
                {user.name}
              </h3>
              <p style={{ 
                margin: '0', 
                fontSize: '14px', 
                color: index === 0 ? '#ffffff' : '#666666'
              }}>
                Level {user.level} • {user.xp} XP
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Profile Component
function ProfileContent({ user }: { user: User }) {
  return (
    <div style={{ 
      padding: '20px', 
      paddingBottom: '100px',
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #cff45e, #a3d977)'
    }}>
      <h1 style={{ 
        fontSize: '24px', 
        fontWeight: '600', 
        margin: '0 0 24px 0',
        color: '#000000'
      }}>
        Profile
      </h1>

      {/* Profile Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#16a34a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          margin: '0 auto 16px auto'
        }}>
          🧘‍♀️
        </div>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#000000' }}>
          {user.display_name}
        </h2>
        <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#666666' }}>
          {user.email}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>
              {user.level}
            </div>
            <div style={{ fontSize: '12px', color: '#666666' }}>Level</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
              {user.current_streak}
            </div>
            <div style={{ fontSize: '12px', color: '#666666' }}>Day Streak</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6' }}>
              {user.xp_points}
            </div>
            <div style={{ fontSize: '12px', color: '#666666' }}>XP Points</div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#000000' }}>
          Settings
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button style={{
            background: 'transparent',
            border: 'none',
            padding: '12px 0',
            textAlign: 'left',
            fontSize: '16px',
            color: '#000000',
            cursor: 'pointer',
            borderBottom: '1px solid #f3f4f6'
          }}>
            📧 Notification Settings
          </button>
          <button style={{
            background: 'transparent',
            border: 'none',
            padding: '12px 0',
            textAlign: 'left',
            fontSize: '16px',
            color: '#000000',
            cursor: 'pointer',
            borderBottom: '1px solid #f3f4f6'
          }}>
            🔒 Privacy Settings
          </button>
          <button style={{
            background: 'transparent',
            border: 'none',
            padding: '12px 0',
            textAlign: 'left',
            fontSize: '16px',
            color: '#000000',
            cursor: 'pointer'
          }}>
            ❓ Help & Support
          </button>
        </div>
      </div>
    </div>
  );
}

// Instructor Management Component
function InstructorManagement() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showFilter, setShowFilter] = useState(false);

  const instructors = [
    { id: 1, name: 'Sarah Thompson', specialty: 'Master Yoga Teacher', avatar: '👩‍🏫' },
    { id: 2, name: 'Mike Chen', specialty: 'HIIT Instructor', avatar: '👨‍💼' },
    { id: 3, name: 'Lisa Rodriguez', specialty: 'Pilates Expert', avatar: '👩‍⚕️' },
    { id: 4, name: 'David Kim', specialty: 'Strength Training', avatar: '💪' },
    { id: 5, name: 'Emma Wilson', specialty: 'Meditation Guide', avatar: '🧘‍♀️' },
    { id: 6, name: 'Alex Brown', specialty: 'Cardio Specialist', avatar: '🏃‍♂️' }
  ];

  return (
    <div style={{ 
      padding: '0px', 
      paddingBottom: '100px',
      minHeight: '100vh',
      background: '#cff45e'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '20px 16px 16px 16px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          margin: '0',
          color: '#000000'
        }}>
          Instructor Management
        </h1>
      </div>

      {/* View Toggle and Filter */}
      <div style={{
        padding: '0 16px 16px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '25px',
          padding: '4px'
        }}>
          <button
            onClick={() => setViewMode('list')}
            style={{
              background: viewMode === 'list' ? '#000000' : 'transparent',
              color: viewMode === 'list' ? '#ffffff' : '#000000',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              background: viewMode === 'grid' ? '#000000' : 'transparent',
              color: viewMode === 'grid' ? '#ffffff' : '#000000',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Grid View
          </button>
        </div>

        <button
          onClick={() => setShowFilter(!showFilter)}
          style={{
            background: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span style={{ fontSize: '16px' }}>☰</span>
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '0 16px' }}>
        {viewMode === 'list' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  {instructor.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    margin: '0 0 4px 0',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#000000'
                  }}>
                    {instructor.name}
                  </h3>
                  <p style={{
                    margin: '0',
                    fontSize: '14px',
                    color: '#666666'
                  }}>
                    {instructor.specialty}
                  </p>
                </div>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '8px'
                }}>
                  ❯
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '16px',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px'
                }}>
                  <button style={{
                    background: 'rgba(0,0,0,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>
                    📝
                  </button>
                </div>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  margin: '0 auto 12px auto'
                }}>
                  {instructor.avatar}
                </div>
                <h3 style={{
                  margin: '0 0 4px 0',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000000'
                }}>
                  {instructor.name}
                </h3>
                <p style={{
                  margin: '0',
                  fontSize: '12px',
                  color: '#666666'
                }}>
                  {instructor.specialty}
                </p>
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  justifyContent: 'center',
                  marginTop: '8px'
                }}>
                  <span style={{
                    background: '#fbbf24',
                    color: '#ffffff',
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '12px',
                    fontWeight: '500'
                  }}>
                    YOGA
                  </span>
                  <span style={{
                    background: '#10b981',
                    color: '#ffffff',
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '12px',
                    fontWeight: '500'
                  }}>
                    PILATES
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [selectedAccount, setSelectedAccount] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const bookings: any[] = [];

  // Login screen
  if (!selectedAccount) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#2d2e37',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            margin: '0 0 8px 0',
            color: '#000000'
          }}>
            🧘‍♀️ Wellness Hub
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#666',
            margin: '0 0 32px 0'
          }}>
            Choose an account to continue
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.id}
                onClick={() => {
                  setSelectedAccount(account);
                  setCurrentPage(account.role === 'admin' ? 'instructors' : 'dashboard');
                }}
                style={{
                  background: account.role === 'admin' ? '#dc2626' : '#cff45e',
                  color: account.role === 'admin' ? '#ffffff' : '#000000',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: account.role === 'admin' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    {account.role === 'admin' ? '👑' : '🧘‍♀️'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600' }}>{account.display_name}</div>
                    <div style={{ 
                      fontSize: '12px', 
                      opacity: 0.8,
                      textTransform: 'capitalize'
                    }}>
                      {account.role}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main app with navigation
  return (
    <div style={{
      minHeight: '100vh',
      maxWidth: '430px',
      margin: '0 auto',
      background: '#000000',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative'
    }}>
      {/* Content */}
      {selectedAccount.role === 'admin' && currentPage === 'instructors' ? (
        <InstructorManagement />
      ) : currentPage === 'dashboard' ? (
        <DashboardContent user={selectedAccount} bookings={bookings} />
      ) : currentPage === 'classes' ? (
        <BrowseContent setCurrentPage={setCurrentPage} />
      ) : currentPage === 'bookings' ? (
        <BookingsContent />
      ) : currentPage === 'leaderboard' ? (
        <LeaderboardContent />
      ) : currentPage === 'profile' ? (
        <ProfileContent user={selectedAccount} />
      ) : (
        <DashboardContent user={selectedAccount} bookings={bookings} />
      )}

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        background: '#1f2937',
        padding: '12px',
        display: 'flex',
        justifyContent: 'space-around',
        gap: '8px'
      }}>
        {selectedAccount.role === 'student' ? (
          // Student Navigation
          <>
            <button
              onClick={() => setCurrentPage('dashboard')}
              style={{
                background: currentPage === 'dashboard' ? '#cff45e' : 'transparent',
                color: currentPage === 'dashboard' ? '#000000' : '#9ca3af',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>🏠</span>
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentPage('classes')}
              style={{
                background: currentPage === 'classes' ? '#cff45e' : 'transparent',
                color: currentPage === 'classes' ? '#000000' : '#9ca3af',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>🏃‍♀️</span>
              <span>Classes</span>
            </button>
            <button
              onClick={() => setCurrentPage('bookings')}
              style={{
                background: currentPage === 'bookings' ? '#cff45e' : 'transparent',
                color: currentPage === 'bookings' ? '#000000' : '#9ca3af',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>📅</span>
              <span>Bookings</span>
            </button>
            <button
              onClick={() => setCurrentPage('leaderboard')}
              style={{
                background: currentPage === 'leaderboard' ? '#cff45e' : 'transparent',
                color: currentPage === 'leaderboard' ? '#000000' : '#9ca3af',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>🏆</span>
              <span>Leaderboard</span>
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              style={{
                background: currentPage === 'profile' ? '#cff45e' : 'transparent',
                color: currentPage === 'profile' ? '#000000' : '#9ca3af',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>👤</span>
              <span>Profile</span>
            </button>
          </>
        ) : (
          // Admin Navigation
          <>
            <button
              onClick={() => setCurrentPage('dashboard')}
              style={{
                background: currentPage === 'dashboard' ? '#cff45e' : 'transparent',
                color: currentPage === 'dashboard' ? '#000000' : '#9ca3af',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>📊</span>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setCurrentPage('instructors')}
              style={{
                background: currentPage === 'instructors' ? '#cff45e' : 'transparent',
                color: currentPage === 'instructors' ? '#000000' : '#9ca3af',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>👨‍🏫</span>
              <span>Instructors</span>
            </button>
            <button
              style={{
                background: 'transparent',
                color: '#9ca3af',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>🏃‍♀️</span>
              <span>Classes</span>
            </button>
          </>
        )}
        
        {/* Logout */}
        <button
          onClick={() => {
            setSelectedAccount(null);
            setCurrentPage('dashboard');
          }}
          style={{
            background: 'rgba(220, 38, 38, 0.8)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
