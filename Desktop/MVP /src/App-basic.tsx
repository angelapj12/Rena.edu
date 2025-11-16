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

function App() {
  // State management
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Login handler
  const handleLogin = (accountType: 'student' | 'admin') => {
    const account = DEMO_ACCOUNTS.find(acc => acc.role === accountType);
    if (account) {
      setCurrentUser(account);
    }
  };

  // Login Screen Component
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WellnessHub</h1>
          <p className="text-gray-600">Your journey to wellness starts here</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center mb-6">Choose Your Account</h2>
          
          <button
            onClick={() => handleLogin('student')}
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Continue as Student</span>
          </button>

          <button
            onClick={() => handleLogin('admin')}
            className="w-full border-2 border-gray-200 text-gray-700 p-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Continue as Admin</span>
          </button>

          <div className="text-center text-sm text-gray-500 mt-6">
            <p>Demo accounts with sample data</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard Content Component
  const DashboardContent = () => {
    if (!currentUser) return null;
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold">Welcome back!</h1>
                <p className="text-blue-100">{currentUser.display_name}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.level}</div>
                <div className="text-xs text-blue-100">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.xp_points}</div>
                <div className="text-xs text-blue-100">XP Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.current_streak}</div>
                <div className="text-xs text-blue-100">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-md mx-auto">
          {/* Quick Actions */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white p-4 rounded-xl shadow-sm border flex flex-col items-center space-y-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Browse Classes</span>
              </button>
              
              <button className="bg-white p-4 rounded-xl shadow-sm border flex flex-col items-center space-y-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">My Schedule</span>
              </button>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="px-4 pb-4">
            <h2 className="text-lg font-semibold mb-3">Upcoming Classes</h2>
            <div className="bg-white rounded-xl p-6 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 mb-3">No upcoming classes</p>
              <button className="text-blue-600 text-sm font-medium hover:underline">
                Browse and book your first class
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <div className="px-4 pb-8">
            <button 
              onClick={() => setCurrentUser(null)}
              className="w-full bg-red-600 text-white p-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main render logic
  if (!currentUser) {
    return <LoginScreen />;
  }

  return <DashboardContent />;
}

export default App;
