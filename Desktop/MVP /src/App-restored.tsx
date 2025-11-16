import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Mock functions to replace missing services
const getBookingsByUser = async (userId: string) => [];
const getInstructors = async () => [];
const getClasses = async () => [];
const getUsers = async () => [];
const getSessionsByClass = async (classId: string) => [];
const getSchedule = async () => [];

// Move Supabase client to top-level
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

// Define User type
type User = {
  id: string;
  firebase_uid: string;
  email: string;
  display_name: string;
  role: 'student' | 'admin';
  xp_points: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  avatar_url: string | null;
  phone: string;
  created_at: string;
  updated_at: string;
};

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

export default function App() {
  const [selectedAccount, setSelectedAccount] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [notification, setNotification] = useState<{type: 'success' | 'error' | 'warning'; message: string} | null>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [waitlists, setWaitlists] = useState<any[]>([]);
  
  // Your existing state declarations
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [errorBookings, setErrorBookings] = useState<string | null>(null);
  
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Move getClassStats function inside App component
  const getClassStats = (classId: number, maxCapacity?: number) => {
    const confirmed = bookings.filter(b => b.classId === classId && b.status === 'confirmed').length;
    const waitlistCount = waitlists.filter(w => w.classId === classId).length;
    const spotsAvailable = (maxCapacity || 20) - confirmed;
    const isUserBooked = selectedAccount ? bookings.some(b => 
      b.userId === selectedAccount.firebase_uid && 
      b.classId === classId && 
      b.status === 'confirmed'
    ) : false;
    const userWaitlistPosition = selectedAccount ? waitlists.find(w => 
      w.userId === selectedAccount.firebase_uid && w.classId === classId
    )?.position : null;

    return {
      confirmed,
      waitlistCount,
      spotsAvailable,
      availableSpots: spotsAvailable, // Add alias for compatibility
      isUserBooked,
      userWaitlistPosition,
      isFull: spotsAvailable <= 0
    };
  };

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
                onClick={() => setSelectedAccount(account)}
                style={{
                  padding: '16px 20px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  background: '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  fontSize: '14px'
                }}
              >
                <div style={{ fontWeight: '600', color: '#000000', marginBottom: '4px' }}>
                  {account.display_name}
                </div>
                <div style={{ color: '#666', fontSize: '12px' }}>
                  {account.role} • Level {account.level} • {account.xp_points} XP
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main app interface for logged-in users
  if (selectedAccount.role === 'student') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#cff45e',
        paddingBottom: '100px'
      }}>
        {/* Student interface */}
        <div style={{
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            margin: '0 0 16px 0',
            color: '#000000'
          }}>
            Welcome, {selectedAccount.display_name}!
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#000000',
            margin: '0 0 20px 0'
          }}>
            Student Dashboard - Browse and book wellness classes
          </p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '12px',
            margin: '20px 0'
          }}>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Your Progress
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Level {selectedAccount.level} • {selectedAccount.xp_points} XP • {selectedAccount.current_streak} day streak
            </div>
          </div>
          <button
            onClick={() => setSelectedAccount(null)}
            style={{
              padding: '12px 24px',
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#cff45e',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Switch Account
          </button>
        </div>
      </div>
    );
  }

  // Admin interface
  return (
    <div style={{
      minHeight: '100vh',
      background: '#cff45e',
      paddingBottom: '100px'
    }}>
      {/* Admin interface */}
      <div style={{
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          margin: '0 0 16px 0',
          color: '#000000'
        }}>
          Admin Dashboard
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#000000',
          margin: '0 0 20px 0'
        }}>
          Welcome, {selectedAccount.display_name}! Manage your wellness hub.
        </p>
        
        {/* Admin features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          margin: '20px 0'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>12</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Active Classes</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>8</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Instructors</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>156</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Total Students</div>
          </div>
        </div>

        <button
          onClick={() => setSelectedAccount(null)}
          style={{
            padding: '12px 24px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#cff45e',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Switch Account
        </button>
      </div>
    </div>
  );
}
