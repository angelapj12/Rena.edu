import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';
import ClassDetailsPage from './pages/ClassDetailsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClasses from './pages/admin/AdminClasses';
import AdminInstructors from './pages/admin/AdminInstructors';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import type { User } from './types';

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

function AuthenticatedApp() {
  const { user, login, logout } = useAuthContext();
  const [selectedAccount, setSelectedAccount] = useState<User | null>(null);

  // If no user is logged in, show login screen
  if (!user && !selectedAccount) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            marginBottom: '8px'
          }}>
            🧘‍♀️ WellnessHub
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '32px' }}>
            Choose a demo account to test the app
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {DEMO_ACCOUNTS.map(account => (
              <button
                key={account.id}
                onClick={() => {
                  setSelectedAccount(account);
                  login(account);
                }}
                style={{
                  padding: '16px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: account.role === 'admin' ? '#dc2626' : '#3b82f6',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.opacity = '1';
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
              🗄️ Database Connected
            </h3>
            <ul style={{ fontSize: '12px', color: '#6b7280', listStyle: 'none', padding: 0, margin: 0 }}>
              <li>✅ Supabase: fboviklybnvdxufqgiwv</li>
              <li>✅ Real bookings & XP tracking</li>
              <li>✅ Admin class management</li>
              <li>✅ Achievement system</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {/* Header */}
        <header style={{
          background: 'white',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🧘‍♀️</span>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
              WellnessHub
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: user?.role === 'admin' ? '#dc2626' : '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {user?.display_name?.charAt(0) || 'U'}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                  {user?.display_name}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {user?.role === 'admin' ? 'Admin' : `Level ${user?.level || 1} • ${user?.xp_points || 0} XP`}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => {
                logout();
                setSelectedAccount(null);
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                background: 'white',
                color: '#374151',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Switch Account
            </button>
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/class/:id" element={<ClassDetailsPage />} />
          
          {/* Admin Routes */}
          {user?.role === 'admin' && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/classes" element={<AdminClasses />} />
              <Route path="/admin/instructors" element={<AdminInstructors />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
            </>
          )}
          
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Bottom Navigation for Students */}
        {user?.role === 'student' && (
          <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'white',
            borderTop: '1px solid #e5e7eb',
            padding: '12px 0',
            display: 'flex',
            justifyContent: 'space-around',
            zIndex: 1000
          }}>
            {[
              { path: '/', icon: '🏠', label: 'Home' },
              { path: '/dashboard', icon: '📊', label: 'Dashboard' },
              { path: '/bookings', icon: '📅', label: 'Bookings' },
              { path: '/profile', icon: '👤', label: 'Profile' }
            ].map(item => (
              <a
                key={item.path}
                href={item.path}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#6b7280',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Admin Sidebar */}
        {user?.role === 'admin' && (
          <div style={{
            position: 'fixed',
            left: 0,
            top: '80px',
            bottom: 0,
            width: '240px',
            background: 'white',
            borderRight: '1px solid #e5e7eb',
            padding: '24px 0',
            zIndex: 100
          }}>
            <div style={{ padding: '0 24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', margin: 0 }}>
                Admin Panel
              </h3>
            </div>
            
            <nav>
              {[
                { path: '/admin', icon: '📊', label: 'Dashboard' },
                { path: '/admin/classes', icon: '🧘', label: 'Classes' },
                { path: '/admin/instructors', icon: '👨‍🏫', label: 'Instructors' },
                { path: '/admin/analytics', icon: '📈', label: 'Analytics' }
              ].map(item => (
                <a
                  key={item.path}
                  href={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 24px',
                    color: '#374151',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    borderLeft: '3px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f3f4f6';
                    e.currentTarget.style.borderLeftColor = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}
