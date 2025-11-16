import { useState, useEffect } from 'react';

// Mock service functions
const getBookingsByUser = async (userId: string) => [];
const getInstructors = async () => [
  { id: 1, name: 'Sarah Thompson', specialty: 'Master Yoga Teacher', avatar: '👩‍🏫' },
  { id: 2, name: 'Mike Chen', specialty: 'HIIT Instructor', avatar: '👨‍💼' },
  { id: 3, name: 'Lisa Rodriguez', specialty: 'Pilates Expert', avatar: '👩‍⚕️' },
  { id: 4, name: 'David Kim', specialty: 'Strength Training', avatar: '💪' },
  { id: 5, name: 'Emma Wilson', specialty: 'Meditation Guide', avatar: '🧘‍♀️' },
  { id: 6, name: 'Alex Brown', specialty: 'Cardio Specialist', avatar: '🏃‍♂️' }
];
const getClasses = async () => [];
const getUsers = async () => [];

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

export default function App() {
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showFilter, setShowFilter] = useState(false);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loadingInstructors, setLoadingInstructors] = useState(true);
  const [errorInstructors, setErrorInstructors] = useState<string | null>(null);

  // Load instructors when on admin page
  useEffect(() => {
    if (selectedAccount?.role === 'admin' && currentPage === 'instructors') {
      async function fetchInstructors() {
        setLoadingInstructors(true);
        setErrorInstructors(null);
        try {
          const data = await getInstructors();
          setInstructors(data);
        } catch (err) {
          setErrorInstructors('Could not load instructors.');
        } finally {
          setLoadingInstructors(false);
        }
      }
      fetchInstructors();
    }
  }, [selectedAccount, currentPage]);

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

  // Admin Instructor Management Interface
  if (selectedAccount?.role === 'admin' && currentPage === 'instructors') {
    return (
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
          {loadingInstructors ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '18px', color: '#000000' }}>Loading instructors...</div>
            </div>
          ) : errorInstructors ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '18px', color: '#dc2626' }}>{errorInstructors}</div>
            </div>
          ) : viewMode === 'list' ? (
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

        {/* Bottom Navigation */}
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
              background: currentPage === 'dashboard' ? '#cff45e' : 'rgba(75, 85, 99, 0.5)',
              color: currentPage === 'dashboard' ? '#000000' : '#9ca3af',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setCurrentPage('instructors')}
            style={{
              background: currentPage === 'instructors' ? '#cff45e' : 'rgba(75, 85, 99, 0.5)',
              color: currentPage === 'instructors' ? '#000000' : '#9ca3af',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            👨‍🏫 Instructors
          </button>
          <button
            onClick={() => setCurrentPage('classes')}
            style={{
              background: currentPage === 'classes' ? '#cff45e' : 'rgba(75, 85, 99, 0.5)',
              color: currentPage === 'classes' ? '#000000' : '#9ca3af',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            🏃‍♀️ Classes
          </button>
          <button
            onClick={() => {
              setSelectedAccount(null);
              setCurrentPage('login');
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
    );
  }

  // Default fallback
  return (
    <div style={{
      minHeight: '100vh',
      background: '#cff45e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 16px 0', color: '#000000' }}>Welcome!</h1>
        <p style={{ margin: '0', color: '#666666' }}>
          Current page: {currentPage} | Role: {selectedAccount?.role}
        </p>
        <button
          onClick={() => setCurrentPage('instructors')}
          style={{
            background: '#000000',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            marginTop: '16px',
            cursor: 'pointer'
          }}
        >
          Go to Instructors
        </button>
      </div>
    </div>
  );
}
