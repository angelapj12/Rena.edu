import { useState } from 'react';

// Demo accounts for testing
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

export default function App() {
  console.log('App component is loading...');
  
  const [selectedAccount, setSelectedAccount] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showFilter, setShowFilter] = useState(false);

  // Mock instructor data
  const instructors = [
    { id: 1, name: 'Sarah Thompson', specialty: 'Master Yoga Teacher', avatar: '👩‍🏫' },
    { id: 2, name: 'Mike Chen', specialty: 'HIIT Instructor', avatar: '👨‍💼' },
    { id: 3, name: 'Lisa Rodriguez', specialty: 'Pilates Expert', avatar: '👩‍⚕️' },
    { id: 4, name: 'David Kim', specialty: 'Strength Training', avatar: '💪' },
    { id: 5, name: 'Emma Wilson', specialty: 'Meditation Guide', avatar: '🧘‍♀️' },
    { id: 6, name: 'Alex Brown', specialty: 'Cardio Specialist', avatar: '🏃‍♂️' }
  ];
  
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
          background: '#3a3b47',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginBottom: '8px'
          }}>
            🧘‍♀️ WellnessHub
          </h1>
          <p style={{ color: '#9ca3af', marginBottom: '32px' }}>
            Choose a demo account to test the app
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {DEMO_ACCOUNTS.map(account => (
              <button
                key={account.id}
                onClick={() => {
                  setSelectedAccount(account);
                  setCurrentPage(account.role === 'admin' ? 'instructors' : 'dashboard');
                }}
                style={{
                  padding: '16px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: account.role === 'admin' ? '#dc2626' : '#cff45e',
                  color: account.role === 'admin' ? 'white' : '#1f2937',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {account.display_name}
                  </div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>
                    {account.role === 'admin' ? 'Admin Dashboard' : 'Student Experience'}
                  </div>
                </div>
                <div style={{ fontSize: '24px' }}>
                  {account.role === 'admin' ? '⚡' : '🎯'}
                </div>
              </button>
            ))}
          </div>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: '#f3f4f6',
            borderRadius: '8px',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              🗄️ Database Status
            </h3>
            <ul style={{ fontSize: '12px', color: '#6b7280', listStyle: 'none', padding: 0, margin: 0 }}>
              <li>✅ Supabase: Ready</li>
              <li>🔄 Demo Data: Loaded</li>
              <li>🎯 Ready for testing</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Main app interface for logged-in users
  return (
    <div style={{ 
      minHeight: '100vh',
      maxWidth: '430px',
      margin: '0 auto',
      background: '#000000',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Header */}
      <header style={{
        background: '#3a3b47',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        padding: '16px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🧘‍♀️</span>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
            WellnessHub
          </h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: selectedAccount?.role === 'admin' ? '#dc2626' : '#cff45e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: selectedAccount?.role === 'admin' ? 'white' : '#1f2937',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {selectedAccount?.display_name?.charAt(0) || 'U'}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#ffffff' }}>
                {selectedAccount?.display_name}
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                {selectedAccount?.role === 'admin' ? 'Admin' : `Level ${selectedAccount?.level} • ${selectedAccount?.xp_points} XP`}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => {
              setSelectedAccount(null);
              setSelectedAccount(null);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #4b5563',
              background: '#4b5563',
              color: '#ffffff',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Switch Account
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div style={{ 
        padding: '20px',
        minHeight: 'calc(100vh - 80px)',
        textAlign: 'center'
      }}>
        {selectedAccount?.role === 'student' ? (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 16px 0', color: '#ffffff' }}>
              Welcome, {selectedAccount.display_name}!
            </h2>
            <p style={{ fontSize: '16px', color: '#9ca3af', margin: '0 0 20px 0' }}>
              Student Dashboard - Your wellness journey
            </p>
            <div style={{
              background: 'rgba(207, 244, 94, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              margin: '20px 0'
            }}>
              <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#cff45e' }}>
                Your Progress
              </div>
              <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                Level {selectedAccount.level} • {selectedAccount.xp_points} XP • {selectedAccount.current_streak} day streak
              </div>
            </div>
          </div>
        ) : selectedAccount?.role === 'admin' && currentPage === 'instructors' ? (
          // Instructor Management Interface
          <div style={{ 
            padding: '0px', 
            paddingBottom: '100px',
            minHeight: '100vh',
            background: '#cff45e' // Lime green background like in the image
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
              {/* View Toggle */}
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

              {/* Filter Button */}
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
                // List View
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
                // Grid View
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

            {/* Navigation */}
            <div style={{
              position: 'fixed',
              bottom: '0',
              left: '0',
              right: '0',
              background: '#1f2937',
              padding: '16px',
              display: 'flex',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <button
                onClick={() => setCurrentPage('dashboard')}
                style={{
                  background: 'rgba(75, 85, 99, 0.5)',
                  color: '#9ca3af',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('instructors')}
                style={{
                  background: '#cff45e',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                👨‍🏫 Instructors
              </button>
              <button
                style={{
                  background: 'rgba(75, 85, 99, 0.5)',
                  color: '#9ca3af',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                🏃‍♀️ Classes
              </button>
              <button
                onClick={() => {
                  setSelectedAccount(null);
                  setCurrentPage('dashboard');
                }}
                style={{
                  background: 'rgba(220, 38, 38, 0.8)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 16px 0', color: '#ffffff' }}>
              Admin Dashboard
            </h2>
            <p style={{ fontSize: '16px', color: '#9ca3af', margin: '0 0 20px 0' }}>
              Welcome, {selectedAccount.display_name}! Manage your wellness hub.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
              margin: '20px 0'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>12</div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>Active Classes</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>8</div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>Instructors</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>156</div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>Students</div>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('instructors')}
              style={{
                background: '#cff45e',
                color: '#000000',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              👨‍🏫 Manage Instructors
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
