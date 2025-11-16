import { useState } from 'react';

// Demo accounts for testing
const DEMO_ACCOUNTS = [
  {
    id: 'demo-student-1',
    firebase_uid: 'demo-student-uid',
    email: 'student@wellnesshub.com',
    display_name: 'Emily Carlton',
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

// Mock data for classes
const mockClasses = [
  {
    id: 1,
    title: 'Intro to yoga basics with Yulia',
    instructor_name: 'Yulia',
    category: 'Yoga',
    description: 'Start your day with gentle movements and mindful breathing',
    duration_minutes: 60,
    maxCapacity: 15,
    level: 'Beginner',
    start_time: '2024-10-09T09:00:00Z',
    instructor_image: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=400',
    image_url: 'https://images.unsplash.com/photo-1506629905996-9d2b8aa75e5d?w=400'
  },
  {
    id: 2,
    title: 'Public Speaking basics with Michael',
    instructor_name: 'Michael',
    category: 'Communication',
    description: 'Build confidence in public speaking',
    duration_minutes: 45,
    maxCapacity: 20,
    level: 'Intermediate',
    start_time: '2024-10-09T18:00:00Z',
    instructor_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    id: 3,
    title: 'Yoga Alignment with Yulia',
    instructor_name: 'Yulia',
    category: 'Yoga',
    description: 'Perfect your yoga poses with proper alignment',
    duration_minutes: 50,
    maxCapacity: 12,
    level: 'Intermediate',
    start_time: '2024-10-10T10:00:00Z',
    instructor_image: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=400',
    image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400'
  }
];

// Mock bookings data
const mockBookings = [
  {
    id: 1,
    userId: 'demo-student-uid',
    classId: 1,
    status: 'confirmed'
  },
  {
    id: 2,
    userId: 'demo-student-uid',
    classId: 3,
    status: 'confirmed'
  }
];

function App() {
  // State management
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_ACCOUNTS[0]); // Auto-login student
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'browse' | 'schedule' | 'profile' | 'class-details' | 'leaderboard' | 'instructors'>('dashboard');
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Login handler
  const handleLogin = (accountType: 'student' | 'admin') => {
    const account = DEMO_ACCOUNTS.find(acc => acc.role === accountType);
    if (account) {
      setCurrentUser(account);
      setCurrentView('dashboard');
    }
  };

  // Navigation handlers
  const showDashboard = () => {
    setCurrentView('dashboard');
    setCurrentPage('dashboard');
  };

  const showBrowse = () => {
    setCurrentView('browse');
    setCurrentPage('browse');
  };

  const showLeaderboard = () => {
    setCurrentView('leaderboard');
    setCurrentPage('leaderboard');
  };

  const showProfile = () => {
    setCurrentView('profile');
    setCurrentPage('profile');
  };

  const showInstructors = () => {
    setCurrentView('instructors');
    setCurrentPage('instructors');
  };

  // Login Screen
  if (!currentUser) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#1f2937',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>
              WellnessHub
            </h1>
            <p style={{ color: '#9ca3af' }}>Your journey to wellness starts here</p>
          </div>

          <div style={{
            background: 'rgba(45, 46, 55, 0.9)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', textAlign: 'center', marginBottom: '24px', color: '#ffffff' }}>
              Choose Your Account
            </h2>
            
            <button
              onClick={() => handleLogin('student')}
              style={{
                width: '100%',
                background: '#cff45e',
                color: '#000000',
                padding: '16px',
                borderRadius: '12px',
                fontWeight: '600',
                border: 'none',
                marginBottom: '12px',
                cursor: 'pointer'
              }}
            >
              Continue as Student
            </button>

            <button
              onClick={() => handleLogin('admin')}
              style={{
                width: '100%',
                background: 'transparent',
                color: '#ffffff',
                padding: '16px',
                borderRadius: '12px',
                fontWeight: '600',
                border: '2px solid #374151',
                cursor: 'pointer'
              }}
            >
              Continue as Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Content - Dark Theme Design
  if (currentView === 'dashboard') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#1f2937',
        paddingBottom: '80px'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #cff45e, #a3d977)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            {currentUser.display_name?.charAt(0) || 'E'}
          </div>
          
          <div style={{ flex: 1 }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#ffffff', 
              margin: '0 0 4px 0' 
            }}>
              Hello {currentUser.display_name || 'Emily'}!
            </h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#9ca3af', 
              margin: '0 0 8px 0' 
            }}>
              You are a champ
            </p>
            
            {/* XP Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Starter</span>
              <div style={{ 
                flex: 1, 
                height: '4px', 
                background: '#374151', 
                borderRadius: '2px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '60%',
                  background: '#cff45e',
                  borderRadius: '2px'
                }} />
              </div>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Legend</span>
            </div>
          </div>
          
          <div style={{
            color: '#cff45e',
            fontSize: '32px'
          }}>
            🏆
          </div>
        </div>

        {/* Upcoming Classes */}
        <div style={{
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px',
          padding: '16px',
          margin: '0 16px 16px 16px'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#ffffff', 
            margin: '0 0 16px 0' 
          }}>
            Upcoming Classes
          </h3>
          
          {(() => {
            // Get user's confirmed bookings
            const userBookings = mockBookings.filter(booking => 
              booking.userId === currentUser.firebase_uid && booking.status === 'confirmed'
            );
            
            // Get class details for booked classes
            const upcomingClasses = userBookings
              .map(booking => mockClasses.find(cls => cls.id === booking.classId))
              .filter(cls => cls && new Date(cls.start_time) > new Date())
              .sort((a, b) => new Date(a!.start_time).getTime() - new Date(b!.start_time).getTime())
              .slice(0, 3);

            if (upcomingClasses.length === 0) {
              return (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: '#9ca3af'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
                  <h4 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 8px 0' }}>
                    No Upcoming Classes
                  </h4>
                  <p style={{ fontSize: '14px', margin: '0' }}>
                    Book a class to see it here!
                  </p>
                </div>
              );
            }

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {upcomingClasses.map((cls) => cls && (
                  <div key={cls.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundImage: `url(${cls.instructor_image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      flexShrink: 0
                    }} />
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        fontSize: '16px', 
                        fontWeight: 'normal', 
                        color: '#ffffff', 
                        margin: '0 0 4px 0',
                        lineHeight: '1.2'
                      }}>
                        {cls.title}
                      </h4>
                      <div style={{ 
                        display: 'flex', 
                        gap: '8px', 
                        fontSize: '14px', 
                        color: '#9ca3af',
                        alignItems: 'center'
                      }}>
                        <span>{new Date(cls.start_time).toLocaleDateString()}</span>
                        <span>{new Date(cls.start_time).toLocaleTimeString()}</span>
                        <span>{cls.duration_minutes} mins</span>
                      </div>
                    </div>

                    <div style={{
                      background: '#cff45e',
                      color: '#000000',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      Booked
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Awards & Badges */}
        <div style={{
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px',
          padding: '16px',
          margin: '0 16px 16px 16px'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#ffffff', 
            margin: '0 0 16px 0' 
          }}>
            Awards & Badges
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '16px',
            marginBottom: '16px'
          }}>
            {[
              { icon: '🏆', label: 'Leaderboard', earned: true },
              { icon: '🌅', label: 'Morning Bird', earned: true },
              { icon: '📊', label: '10 day Streak', earned: true },
              { icon: '⭐', label: 'Gold Star', earned: false }
            ].map((badge, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: badge.earned ? '#cff45e' : '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  margin: '0 auto 8px auto',
                  opacity: badge.earned ? 1 : 0.3
                }}>
                  {badge.icon}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: badge.earned ? '#cff45e' : '#6b7280',
                  fontWeight: '500'
                }}>
                  {badge.label}
                </div>
              </div>
            ))}
          </div>

          {/* Second row of badges */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '16px'
          }}>
            {[
              { icon: '📚', label: 'Bookworm', earned: false },
              { icon: '💪', label: 'Strong', earned: false },
              { icon: '🧘', label: 'Zen Master', earned: false },
              { icon: '🎯', label: 'Goal Star', earned: false }
            ].map((badge, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  margin: '0 auto 8px auto',
                  opacity: 0.3
                }}>
                  {badge.icon}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  {badge.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div style={{
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px',
          padding: '16px',
          margin: '0 16px 16px 16px'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#ffffff', 
            margin: '0 0 16px 0' 
          }}>
            Leaderboard
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'Martha K.', xp: 300, level: 13, position: 1 },
              { name: 'Laura L.', xp: 100, level: 6, position: 2 },
              { name: 'Jane K.', xp: 100, level: 6, position: 3 }
            ].map((user, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 0'
              }}>
                <span style={{ 
                  color: '#9ca3af', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  minWidth: '24px' 
                }}>
                  #{user.position}
                </span>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  color: '#ffffff'
                }}>
                  {user.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#ffffff', 
                    margin: '0 0 2px 0' 
                  }}>
                    {user.name}
                  </h4>
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#9ca3af', 
                    margin: '0' 
                  }}>
                    {user.xp} pts XP +{user.level}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(31, 41, 55, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid #374151',
          padding: '12px 0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <button 
              onClick={showDashboard}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: currentPage === 'dashboard' ? '#cff45e' : '#9ca3af',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <div style={{ fontSize: '24px' }}>🏠</div>
              <span style={{ fontSize: '12px', fontWeight: '500' }}>Home</span>
            </button>

            <button 
              onClick={showBrowse}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: currentPage === 'browse' ? '#cff45e' : '#9ca3af',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <div style={{ fontSize: '24px' }}>📚</div>
              <span style={{ fontSize: '12px', fontWeight: '500' }}>Classes</span>
            </button>

            <button 
              style={{
                background: '#cff45e',
                border: 'none',
                borderRadius: '50%',
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#000000'
              }}
            >
              +
            </button>

            <button 
              onClick={showLeaderboard}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: currentPage === 'leaderboard' ? '#cff45e' : '#9ca3af',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <div style={{ fontSize: '24px' }}>📊</div>
              <span style={{ fontSize: '12px', fontWeight: '500' }}>Stats</span>
            </button>

            <button 
              onClick={showProfile}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: currentPage === 'profile' ? '#cff45e' : '#9ca3af',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <div style={{ fontSize: '24px' }}>👤</div>
              <span style={{ fontSize: '12px', fontWeight: '500' }}>Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Browse Classes View
  if (currentView === 'browse') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#1f2937',
        paddingBottom: '80px'
      }}>
        <div style={{ padding: '20px 16px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginBottom: '20px' }}>
            Browse
          </h1>
          
          {/* Search Bar */}
          <div style={{
            background: 'rgba(45, 46, 55, 0.9)',
            borderRadius: '12px',
            padding: '12px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '16px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search"
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '16px',
                outline: 'none',
                flex: 1
              }}
            />
            <button style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              ⚙️
            </button>
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', overflowX: 'auto' }}>
            {['Fitness', 'Wellness', 'Performance Arts'].map((category, i) => (
              <button
                key={category}
                style={{
                  background: i === 0 ? '#cff45e' : 'rgba(45, 46, 55, 0.9)',
                  color: i === 0 ? '#000000' : '#ffffff',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Classes */}
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginBottom: '16px' }}>
            Featured Classes
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mockClasses.map((cls) => (
              <div key={cls.id} style={{
                background: 'rgba(45, 46, 55, 0.9)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '120px',
                  backgroundImage: `url(${cls.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '12px',
                    padding: '4px 8px'
                  }}>
                    <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: '500' }}>
                      {cls.level}
                    </span>
                  </div>
                </div>
                
                <div style={{ padding: '16px' }}>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#ffffff', 
                    margin: '0 0 8px 0' 
                  }}>
                    {cls.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#9ca3af', 
                    margin: '0 0 12px 0',
                    lineHeight: '1.4'
                  }}>
                    {cls.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                      📅 {cls.duration_minutes} min
                    </div>
                    <button style={{
                      background: '#cff45e',
                      color: '#000000',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '6px 16px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(31, 41, 55, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid #374151',
          padding: '12px 0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <button 
              onClick={showDashboard}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: currentPage === 'dashboard' ? '#cff45e' : '#9ca3af',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <div style={{ fontSize: '24px' }}>🏠</div>
              <span style={{ fontSize: '12px', fontWeight: '500' }}>Home</span>
            </button>

            <button 
              onClick={showBrowse}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: currentPage === 'browse' ? '#cff45e' : '#9ca3af',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <div style={{ fontSize: '24px' }}>📚</div>
              <span style={{ fontSize: '12px', fontWeight: '500' }}>Classes</span>
            </button>

            <button 
              style={{
                background: '#cff45e',
                border: 'none',
                borderRadius: '50%',
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#000000'
              }}
            >
              +
            </button>

            <button 
              onClick={showLeaderboard}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: currentPage === 'leaderboard' ? '#cff45e' : '#9ca3af',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <div style={{ fontSize: '24px' }}>📊</div>
              <span style={{ fontSize: '12px', fontWeight: '500' }}>Stats</span>
            </button>

            <button 
              onClick={showProfile}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: currentPage === 'profile' ? '#cff45e' : '#9ca3af',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <div style={{ fontSize: '24px' }}>👤</div>
              <span style={{ fontSize: '12px', fontWeight: '500' }}>Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Other views (placeholder for now)
  return (
    <div style={{
      minHeight: '100vh',
      background: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>
          {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: '24px' }}>
          This view is coming soon!
        </p>
        <button 
          onClick={showDashboard}
          style={{
            background: '#cff45e',
            color: '#000000',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default App;
