import { useState } from 'react';

// User types matching the green design
const DEMO_ACCOUNTS = [
  {
    id: 'demo-student-1',
    firebase_uid: 'demo-student-uid',
    email: 'student@wellnesshub.com',
    display_name: 'Demo Student',
    role: 'student' as const,
    xp_points: 850,
    level: 4,
    current_streak: 7,
    longest_streak: 12,
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
    xp_points: 1200,
    level: 6,
    current_streak: 15,
    longest_streak: 20,
    avatar_url: null,
    phone: '+1-555-0100',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

type User = typeof DEMO_ACCOUNTS[0];

function App() {
  const [selectedAccount, setSelectedAccount] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'browse' | 'classes' | 'schedule' | 'profile' | 'personal' | 'class-details' | 'instructor-details' | 'admin' | 'notifications' | 'settings'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation functions
  const showDashboard = () => {
    setCurrentView('dashboard');
    setActiveTab('dashboard');
  };

  const showBrowse = () => {
    setCurrentView('browse');
    setActiveTab('browse');
  };

  const showClasses = () => {
    setCurrentView('classes');
    setActiveTab('classes');
  };

  const showProfile = () => {
    setCurrentView('profile');
    setActiveTab('profile');
  };

  const showClassDetails = () => {
    setCurrentView('class-details');
  };

  const showInstructorDetails = () => {
    setCurrentView('instructor-details');
  };

  const showNotifications = () => {
    setCurrentView('notifications');
  };

  const showSettings = () => {
    setCurrentView('settings');
  };

  // Login Screen matching the original green wireframe design
  if (!selectedAccount) {
    return (
      <div className="min-h-screen bg-lime-400 flex items-center justify-center p-4">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">WellnessHub</h1>
            <p className="text-black">Transform your wellness journey</p>
          </div>

          <div className="bg-white rounded-2xl p-6 space-y-4 shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-6 text-black">Welcome Back</h2>
            
            <button
              onClick={() => {
                setSelectedAccount(DEMO_ACCOUNTS[0]);
                showDashboard();
              }}
              className="w-full bg-gray-800 text-white p-4 rounded-xl font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Continue as Student</span>
            </button>

            <button
              onClick={() => {
                setSelectedAccount(DEMO_ACCOUNTS[1]);
                setCurrentView('admin');
              }}
              className="w-full border border-gray-300 text-gray-700 p-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Continue as Admin</span>
            </button>

            <div className="text-center text-sm text-gray-500 mt-6">
              <p>Experience the fresh green wellness interface</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard matching the original green wireframe design
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-lime-400">
        {/* Header matching wireframe */}
        <div className="bg-lime-400 px-4 pt-12 pb-6 text-black">
          <div className="max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Good Morning!</h1>
                <p className="text-black text-lg">{selectedAccount.display_name}</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={showNotifications}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                >
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5h5m-5-5l5 5M10 18V3m5 18l-5-5m5 5V3" />
                  </svg>
                </button>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Stats Cards matching wireframe */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-black">{selectedAccount.level}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-black">{selectedAccount.xp_points}</div>
                <div className="text-sm text-gray-600">XP Points</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-black">{selectedAccount.current_streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>

            {/* Progress Bar matching wireframe */}
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-black">Level {selectedAccount.level} Progress</span>
                <span className="text-xs text-gray-600">{selectedAccount.xp_points}/1000 XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-lime-400 h-3 rounded-full" 
                  style={{ width: `${(selectedAccount.xp_points / 1000) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-sm mx-auto pb-24 -mt-4">
          {/* Quick Actions matching wireframe */}
          <div className="bg-white rounded-t-3xl px-6 pt-8 pb-6">
            <h2 className="text-xl font-bold mb-6 text-black">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={showBrowse}
                className="bg-lime-100 p-6 rounded-2xl flex flex-col items-center space-y-3 hover:bg-lime-200 transition-colors"
              >
                <div className="w-14 h-14 bg-lime-400 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="font-semibold text-black">Browse Classes</span>
              </button>
              
              <button 
                onClick={showClasses}
                className="bg-lime-100 p-6 rounded-2xl flex flex-col items-center space-y-3 hover:bg-lime-200 transition-colors"
              >
                <div className="w-14 h-14 bg-lime-400 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-semibold text-black">My Classes</span>
              </button>
            </div>
          </div>

          {/* Today's Schedule matching wireframe */}
          <div className="bg-white mx-4 mt-4 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black">Today's Schedule</h2>
              <span className="text-lime-600 text-sm font-medium bg-lime-100 px-3 py-1 rounded-full">Oct 8</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-lime-50 rounded-xl border-l-4 border-lime-400">
                <div className="w-12 h-12 bg-lime-400 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black">Morning Yoga Flow</h3>
                  <p className="text-lime-600 text-sm font-medium">Sarah Wilson</p>
                  <p className="text-gray-600 text-sm">9:00 AM - 10:00 AM</p>
                </div>
                <button 
                  onClick={showClassDetails}
                  className="bg-lime-400 text-black px-4 py-2 rounded-xl text-sm font-medium hover:bg-lime-500 transition-colors"
                >
                  Join
                </button>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border-l-4 border-gray-300">
                <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-500">HIIT Training</h3>
                  <p className="text-gray-400 text-sm">Marcus Johnson</p>
                  <p className="text-gray-400 text-sm">6:00 PM - 7:00 PM</p>
                </div>
                <span className="text-gray-400 text-sm">Upcoming</span>
              </div>
            </div>

            <button 
              onClick={showBrowse}
              className="w-full mt-6 p-4 border-2 border-dashed border-lime-400 rounded-xl text-lime-600 font-medium hover:bg-lime-50 transition-colors"
            >
              + Book more classes
            </button>
          </div>

          {/* Weekly Goals matching wireframe */}
          <div className="bg-white mx-4 mt-4 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-black">Weekly Goals</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-black font-medium">Classes Attended</span>
                  <span className="text-lime-600 font-bold">4/6</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-lime-400 h-3 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-black font-medium">Workout Minutes</span>
                  <span className="text-lime-600 font-bold">180/300</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-lime-400 h-3 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation matching wireframe */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-sm mx-auto flex">
            <button 
              onClick={showDashboard}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'dashboard' ? 'text-lime-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'dashboard' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="text-xs font-medium">Home</span>
            </button>
            <button 
              onClick={showBrowse}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'browse' ? 'text-lime-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'browse' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs font-medium">Explore</span>
            </button>
            <button 
              onClick={showClasses}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'classes' ? 'text-lime-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'classes' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium">Classes</span>
            </button>
            <button 
              onClick={showProfile}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'profile' ? 'text-lime-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

          {/* Enhanced Today's Schedule */}
          <div className="bg-white/95 backdrop-blur-md mx-4 mt-4 p-6 rounded-3xl shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Today's Schedule</h2>
              <span className="text-green-600 text-sm font-bold bg-green-100 px-3 py-1 rounded-full">Oct 8</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-5 rounded-2xl border-l-4 shadow-lg" style={{
                background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                borderLeftColor: '#22c55e'
              }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                }}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">Morning Yoga Flow</h3>
                  <p className="text-green-600 text-sm font-bold">Sarah Wilson</p>
                  <p className="text-gray-600 text-sm font-medium">9:00 AM - 10:00 AM</p>
                </div>
                <button 
                  onClick={showClassDetails}
                  className="text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  }}
                >
                  Join
                </button>
              </div>

              <div className="flex items-center space-x-4 p-5 bg-gray-100 rounded-2xl border-l-4 border-gray-300 shadow-lg">
                <div className="w-14 h-14 bg-gray-400 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-600 text-lg">HIIT Training</h3>
                  <p className="text-gray-500 text-sm font-medium">Marcus Johnson</p>
                  <p className="text-gray-500 text-sm">6:00 PM - 7:00 PM</p>
                </div>
                <span className="text-gray-500 text-sm font-medium">Upcoming</span>
              </div>
            </div>

            <button 
              onClick={showBrowse}
              className="w-full mt-6 p-5 border-3 border-dashed rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
              style={{
                borderColor: '#22c55e',
                color: '#22c55e',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
              }}
            >
              + Book more classes
            </button>
          </div>

          {/* Enhanced Weekly Goals */}
          <div className="bg-white/95 backdrop-blur-md mx-4 mt-4 p-6 rounded-3xl shadow-2xl border border-white/50">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Weekly Goals</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-800 font-bold">Classes Attended</span>
                  <span className="text-green-600 font-bold text-xl">4/6</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                  <div className="h-4 rounded-full shadow-lg" style={{ 
                    width: '67%',
                    background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
                  }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-800 font-bold">Workout Minutes</span>
                  <span className="text-green-600 font-bold text-xl">180/300</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                  <div className="h-4 rounded-full shadow-lg" style={{ 
                    width: '60%',
                    background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
          {/* Enhanced Today's Schedule */}
          <div className="bg-white/95 backdrop-blur-md mx-4 mt-4 p-6 rounded-3xl shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Today's Schedule</h2>
              <span className="text-green-600 text-sm font-bold bg-green-100 px-3 py-1 rounded-full">Oct 8</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-5 rounded-2xl border-l-4 shadow-lg" style={{
                background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                borderLeftColor: '#22c55e'
              }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                }}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">Morning Yoga Flow</h3>
                  <p className="text-green-600 text-sm font-bold">Sarah Wilson</p>
                  <p className="text-gray-600 text-sm font-medium">9:00 AM - 10:00 AM</p>
                </div>
                <button 
                  onClick={showClassDetails}
                  className="text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  }}
                >
                  Join
                </button>
              </div>

              <div className="flex items-center space-x-4 p-5 bg-gray-100 rounded-2xl border-l-4 border-gray-300 shadow-lg">
                <div className="w-14 h-14 bg-gray-400 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-600 text-lg">HIIT Training</h3>
                  <p className="text-gray-500 text-sm font-medium">Marcus Johnson</p>
                  <p className="text-gray-500 text-sm">6:00 PM - 7:00 PM</p>
                </div>
                <span className="text-gray-500 text-sm font-medium">Upcoming</span>
              </div>
            </div>

            <button 
              onClick={showBrowse}
              className="w-full mt-6 p-5 border-3 border-dashed rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
              style={{
                borderColor: '#22c55e',
                color: '#22c55e',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
              }}
            >
              + Book more classes
            </button>
          </div>

          {/* Enhanced Weekly Goals */}
          <div className="bg-white/95 backdrop-blur-md mx-4 mt-4 p-6 rounded-3xl shadow-2xl border border-white/50">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Weekly Goals</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-800 font-bold">Classes Attended</span>
                  <span className="text-green-600 font-bold text-xl">4/6</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                  <div className="h-4 rounded-full shadow-lg" style={{ 
                    width: '67%',
                    background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
                  }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-800 font-bold">Workout Minutes</span>
                  <span className="text-green-600 font-bold text-xl">180/300</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                  <div className="h-4 rounded-full shadow-lg" style={{ 
                    width: '60%',
                    background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl">
          <div className="max-w-sm mx-auto flex">
            <button 
              onClick={showDashboard}
              className={`flex-1 flex flex-col items-center py-4 px-2 transition-all duration-300 ${
                activeTab === 'dashboard' 
                  ? 'text-green-600 transform scale-110' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <svg className="w-7 h-7 mb-1" fill={activeTab === 'dashboard' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="text-xs font-bold">Home</span>
            </button>
            <button 
              onClick={showBrowse}
              className={`flex-1 flex flex-col items-center py-4 px-2 transition-all duration-300 ${
                activeTab === 'browse' 
                  ? 'text-green-600 transform scale-110' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <svg className="w-7 h-7 mb-1" fill={activeTab === 'browse' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs font-bold">Explore</span>
            </button>
            <button 
              onClick={showClasses}
              className={`flex-1 flex flex-col items-center py-4 px-2 transition-all duration-300 ${
                activeTab === 'classes' 
                  ? 'text-green-600 transform scale-110' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <svg className="w-7 h-7 mb-1" fill={activeTab === 'classes' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold">Classes</span>
            </button>
            <button 
              onClick={showProfile}
              className={`flex-1 flex flex-col items-center py-4 px-2 transition-all duration-300 ${
                activeTab === 'profile' 
                  ? 'text-green-600 transform scale-110' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <svg className="w-7 h-7 mb-1" fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-bold">Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Browse Classes - Green Theme
  if (currentView === 'browse') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 via-lime-500 to-green-600 px-4 pt-12 pb-6 text-white">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Explore Classes</h1>
              <button 
                onClick={showSettings}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search classes, instructors..."
                className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border-0 rounded-2xl focus:ring-2 focus:ring-white focus:bg-white text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto -mt-4">
          {/* Categories - Green Theme */}
          <div className="bg-white rounded-t-3xl px-6 pt-8 pb-6 shadow-lg">
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {['All', 'Yoga', 'HIIT', 'Pilates', 'Meditation', 'Strength'].map((category, index) => (
                <button
                  key={category}
                  className={`px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    index === 0
                      ? 'bg-gradient-to-r from-green-500 to-lime-600 text-white shadow-lg'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Classes */}
          <div className="px-4 pt-4 space-y-4">
            {/* Featured Class Card */}
            <div className="bg-gradient-to-br from-green-500 to-lime-600 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    🔥 FEATURED
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    Beginner
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Power Yoga Fusion</h3>
                <p className="text-green-100 mb-4">Transform your body and mind with dynamic flow</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">60 min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm">12/15</span>
                    </div>
                  </div>
                  <button
                    onClick={showClassDetails}
                    className="bg-white text-green-600 px-6 py-3 rounded-2xl font-semibold hover:bg-green-50 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Regular Class Cards */}
            {[
              { name: 'Morning Stretch', instructor: 'Emma Davis', time: '30 min', level: 'Beginner', spots: '8/12', color: 'from-green-400 to-lime-500' },
              { name: 'Core Strength', instructor: 'Mike Wilson', time: '45 min', level: 'Intermediate', spots: '5/10', color: 'from-lime-400 to-green-500' },
              { name: 'Meditation Flow', instructor: 'Sarah Chen', time: '20 min', level: 'All Levels', spots: '15/20', color: 'from-green-500 to-lime-400' },
              { name: 'HIIT Blast', instructor: 'Jake Martinez', time: '30 min', level: 'Advanced', spots: '6/8', color: 'from-lime-500 to-green-600' },
            ].map((classItem, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`h-32 bg-gradient-to-br ${classItem.color} relative`}>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                    {classItem.level}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-800">{classItem.name}</h3>
                    <span className="text-sm text-gray-500">{classItem.time}</span>
                  </div>
                  
                  <button 
                    onClick={showInstructorDetails}
                    className="text-green-600 font-medium mb-3 hover:text-green-700 transition-colors"
                  >
                    {classItem.instructor}
                  </button>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{classItem.spots} spots</span>
                    </div>
                    
                    <button
                      onClick={showClassDetails}
                      className="bg-gradient-to-r from-green-500 to-lime-600 text-white px-6 py-2 rounded-xl font-medium hover:from-green-600 hover:to-lime-700 transition-all duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-md mx-auto flex">
            <button 
              onClick={showDashboard}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${activeTab === 'dashboard' ? 'text-green-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'dashboard' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="text-xs font-medium">Home</span>
            </button>
            <button 
              onClick={showBrowse}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${activeTab === 'browse' ? 'text-green-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'browse' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs font-medium">Explore</span>
            </button>
            <button 
              onClick={showClasses}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${activeTab === 'classes' ? 'text-green-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'classes' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium">Classes</span>
            </button>
            <button 
              onClick={showProfile}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${activeTab === 'profile' ? 'text-green-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Class Details - Green Theme
  if (currentView === 'class-details') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50">
        {/* Header with back button */}
        <div className="bg-gradient-to-r from-green-500 via-lime-500 to-green-600 px-4 pt-12 pb-6 text-white">
          <div className="max-w-md mx-auto">
            <div className="flex items-center mb-4">
              <button 
                onClick={showBrowse}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors mr-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold">Class Details</h1>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto -mt-4">
          {/* Class Hero */}
          <div className="bg-gradient-to-br from-green-500 to-lime-600 rounded-t-3xl p-8 text-white shadow-xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Power Yoga Fusion</h2>
              <p className="text-green-100 mb-4">Transform your body and mind with dynamic flow</p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>60 min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>12/15 spots</span>
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Beginner</span>
              </div>
            </div>
          </div>

          {/* Instructor Info */}
          <div className="bg-white p-6 shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-lime-500 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <button 
                  onClick={showInstructorDetails}
                  className="font-bold text-lg text-gray-800 hover:text-green-600 transition-colors"
                >
                  Sarah Wilson
                </button>
                <p className="text-green-600 font-medium">Certified Yoga Instructor</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm ml-2">4.9 • 6 years exp</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Join Sarah for an energizing Power Yoga session that combines strength, flexibility, and mindfulness. Perfect for all fitness levels with modifications provided.
            </p>

            {/* What to Expect */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3">What to Expect</h3>
              <div className="space-y-2">
                {[
                  'Dynamic flowing sequences',
                  'Strength-building poses',
                  'Breathing techniques',
                  'Relaxation and meditation'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white mt-2 p-6 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-4">Upcoming Sessions</h3>
            <div className="space-y-4">
              {[
                { date: 'Today, Oct 7', time: '9:00 AM', spots: '12/15', available: true },
                { date: 'Tomorrow, Oct 8', time: '9:00 AM', spots: '8/15', available: true },
                { date: 'Wed, Oct 9', time: '9:00 AM', spots: '15/15', available: false },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-2xl">
                  <div>
                    <div className="font-semibold text-gray-800">{session.date}</div>
                    <div className="text-green-600 font-medium">{session.time}</div>
                    <div className="text-sm text-gray-500">{session.spots} spots</div>
                  </div>
                  <button 
                    disabled={!session.available}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      session.available 
                        ? 'bg-gradient-to-r from-green-500 to-lime-600 text-white hover:from-green-600 hover:to-lime-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {session.available ? 'Book' : 'Full'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Placeholder views for other sections with green theme
  const PlaceholderView = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-500 via-lime-500 to-green-600 px-4 pt-12 pb-6 text-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      </div>
      
      <div className="max-w-md mx-auto p-4 -mt-4">
        <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-lime-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
          <button 
            onClick={showDashboard}
            className="bg-gradient-to-r from-green-500 to-lime-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-green-600 hover:to-lime-700 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
        <div className="max-w-md mx-auto flex">
          <button 
            onClick={showDashboard}
            className={`flex-1 flex flex-col items-center py-3 px-2 ${activeTab === 'dashboard' ? 'text-green-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill={activeTab === 'dashboard' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={showBrowse}
            className={`flex-1 flex flex-col items-center py-3 px-2 ${activeTab === 'browse' ? 'text-green-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill={activeTab === 'browse' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs font-medium">Explore</span>
          </button>
          <button 
            onClick={showClasses}
            className={`flex-1 flex flex-col items-center py-3 px-2 ${activeTab === 'classes' ? 'text-green-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill={activeTab === 'classes' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium">Classes</span>
          </button>
          <button 
            onClick={showProfile}
            className={`flex-1 flex flex-col items-center py-3 px-2 ${activeTab === 'profile' ? 'text-green-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Handle other views
  if (currentView === 'classes') {
    return (
      <PlaceholderView 
        title="My Classes" 
        description="View your booked classes, attendance history, and manage your wellness journey." 
        icon={
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      />
    );
  }

  if (currentView === 'profile') {
    return (
      <PlaceholderView 
        title="Profile" 
        description="Manage your account, track achievements, and customize your wellness experience." 
        icon={
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />
    );
  }

  if (currentView === 'instructor-details') {
    return (
      <PlaceholderView 
        title="Instructor Profile" 
        description="Learn more about your wellness instructors and their specialties." 
        icon={
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        }
      />
    );
  }

  if (currentView === 'admin') {
    return (
      <PlaceholderView 
        title="Admin Dashboard" 
        description="Manage classes, instructors, users, and monitor platform analytics." 
        icon={
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        }
      />
    );
  }

  // Default fallback
  return <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 flex items-center justify-center">
    <div className="text-green-600 text-lg font-medium">Loading...</div>
  </div>;
}

export default App;
