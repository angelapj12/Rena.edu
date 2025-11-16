// Simple React component with inline styles

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <nav style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e5e7eb',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '64px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🧘‍♀️</span>
            <h1 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#111827',
              margin: 0 
            }}>WellnessHub</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Demo Mode</span>
            <button style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}>Login</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
          
          {/* Welcome Section */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              color: '#111827',
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>Welcome to WellnessHub</h2>
            <p style={{ 
              color: '#6b7280', 
              marginBottom: '24px',
              fontSize: '18px'
            }}>Your gamified wellness journey starts here!</p>
            
            {/* Feature Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎮</div>
                <h3 style={{ fontWeight: '600', marginBottom: '8px', margin: '0 0 8px 0' }}>Gamification</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  Earn XP, level up, and unlock achievements
                </p>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏃‍♀️</div>
                <h3 style={{ fontWeight: '600', marginBottom: '8px', margin: '0 0 8px 0' }}>Classes</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  Book yoga, fitness, and wellness classes
                </p>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📊</div>
                <h3 style={{ fontWeight: '600', marginBottom: '8px', margin: '0 0 8px 0' }}>Progress</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  Track your wellness journey and streaks
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '32px'
          }}>
            {/* User Stats */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              padding: '24px'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '16px',
                margin: '0 0 16px 0'
              }}>Your Progress</h3>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                  marginBottom: '4px'
                }}>
                  <span>Level 3</span>
                  <span>250/400 XP</span>
                </div>
                <div style={{
                  width: '100%',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '999px',
                  height: '8px'
                }}>
                  <div style={{
                    backgroundColor: '#2563eb',
                    height: '8px',
                    borderRadius: '999px',
                    width: '62.5%'
                  }}></div>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                marginTop: '24px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: '#2563eb' 
                  }}>15</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Classes Attended</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: '#059669' 
                  }}>7</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Day Streak 🔥</div>
                </div>
              </div>
            </div>

            {/* Available Classes */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              padding: '24px'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '16px',
                margin: '0 0 16px 0'
              }}>Today's Classes</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontWeight: '500' }}>Morning Yoga</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>9:00 AM - 10:00 AM</div>
                  </div>
                  <button style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>Book</button>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontWeight: '500' }}>HIIT Workout</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>6:00 PM - 7:00 PM</div>
                  </div>
                  <button style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>Book</button>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontWeight: '500' }}>Meditation</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>8:00 PM - 8:30 PM</div>
                  </div>
                  <button style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>Book</button>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Notice */}
          <div style={{
            marginTop: '32px',
            backgroundColor: '#dbeafe',
            border: '1px solid #93c5fd',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              fontWeight: '600', 
              color: '#1e3a8a', 
              marginBottom: '8px',
              margin: '0 0 8px 0'
            }}>🚧 Demo Mode Active</h3>
            <p style={{ 
              color: '#1e40af', 
              fontSize: '14px', 
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              This is a preview of your WellnessHub app. To enable full functionality:
            </p>
            <div style={{ 
              color: '#1e40af', 
              fontSize: '14px',
              marginBottom: '16px'
            }}>
              <p style={{ margin: '4px 0' }}>1. Set up Supabase database (5 minutes)</p>
              <p style={{ margin: '4px 0' }}>2. Configure Firebase authentication (5 minutes)</p>
              <p style={{ margin: '4px 0' }}>3. Update environment variables</p>
            </div>
            <button 
              onClick={() => window.open('setup-wizard.html', '_blank')}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Setup Backend Services
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav style={{
        backgroundColor: 'white',
        boxShadow: '0 -1px 3px 0 rgba(0, 0, 0, 0.1)',
        borderTop: '1px solid #e5e7eb',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '100%'
        }}>
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: '#2563eb',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            <span style={{ fontSize: '14px' }}>🏠</span>
            <span style={{ fontSize: '12px' }}>Home</span>
          </button>
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: '#9ca3af',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            <span style={{ fontSize: '14px' }}>🔍</span>
            <span style={{ fontSize: '12px' }}>Browse</span>
          </button>
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: '#9ca3af',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            <span style={{ fontSize: '14px' }}>🎮</span>
            <span style={{ fontSize: '12px' }}>Dashboard</span>
          </button>
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: '#9ca3af',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            <span style={{ fontSize: '14px' }}>📅</span>
            <span style={{ fontSize: '12px' }}>Bookings</span>
          </button>
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: '#9ca3af',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            <span style={{ fontSize: '14px' }}>👤</span>
            <span style={{ fontSize: '12px' }}>Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;
