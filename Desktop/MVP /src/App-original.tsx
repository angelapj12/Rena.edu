import { useState } from 'react';

// Original User type from your design
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
  // Original state structure - Auto-login with demo student account
  const [selectedAccount, setSelectedAccount] = useState<User | null>(DEMO_ACCOUNTS[0]);
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'browse' | 'classes' | 'schedule' | 'profile' | 'personal' | 'class-details' | 'instructor-details' | 'admin'>('dashboard');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation functions from original design
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

  const showPersonal = () => {
    setCurrentView('personal');
    setActiveTab('personal');
  };

  const showClassDetails = () => {
    setCurrentView('class-details');
  };

  const showInstructorDetails = () => {
    setCurrentView('instructor-details');
  };

  // Original Login Screen with exact styling
  if (!selectedAccount) {
    return (
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
              onClick={() => {
                setSelectedAccount(DEMO_ACCOUNTS[0]);
                showDashboard();
              }}
              className="w-full bg-blue-600 text-white p-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
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
              className="w-full border-2 border-gray-200 text-gray-700 p-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
              <span>Continue as Admin</span>
            </button>

            <div className="text-center text-sm text-gray-500 mt-6">
              <p>Demo accounts with original UI design</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original Dashboard Content with sophisticated design
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Original header design */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold">Welcome back!</h1>
                <p className="text-blue-100">{selectedAccount.display_name}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Original stats grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{selectedAccount.level}</div>
                <div className="text-xs text-blue-100">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{selectedAccount.xp_points}</div>
                <div className="text-xs text-blue-100">XP Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{selectedAccount.current_streak}</div>
                <div className="text-xs text-blue-100">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto pb-20">
          {/* Quick Actions - Original Design */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={showBrowse}
                className="bg-white p-4 rounded-xl shadow-sm border flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Browse Classes</span>
              </button>
              
              <button 
                onClick={showClasses}
                className="bg-white p-4 rounded-xl shadow-sm border flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">My Classes</span>
              </button>
            </div>
          </div>

          {/* Upcoming Classes Section - Original Design */}
          <div className="px-4 pb-4">
            <h2 className="text-lg font-semibold mb-3">Upcoming Classes</h2>
            <div className="space-y-3">
              {/* Sample upcoming class card with original styling */}
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Morning Yoga Flow</h3>
                    <p className="text-sm text-gray-500">Sarah Wilson</p>
                    <p className="text-xs text-gray-400">Today at 9:00 AM</p>
                  </div>
                  <button 
                    onClick={showClassDetails}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Placeholder for more classes */}
              <div className="bg-white rounded-xl p-6 text-center border-2 border-dashed border-gray-200">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="text-gray-500 mb-3">Book more classes</p>
                <button 
                  onClick={showBrowse}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Browse available classes
                </button>
              </div>
            </div>
          </div>

          {/* Progress Section - Original Gamification Design */}
          <div className="px-4 pb-4">
            <h2 className="text-lg font-semibold mb-3">Your Progress</h2>
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Level {selectedAccount.level} Progress</span>
                <span className="text-xs text-gray-500">{selectedAccount.xp_points}/300 XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                  style={{ width: `${(selectedAccount.xp_points / 300) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {300 - selectedAccount.xp_points} XP until Level {selectedAccount.level + 1}
              </p>
            </div>
          </div>
        </div>

        {/* Original Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto flex">
            <button 
              onClick={showDashboard}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="text-xs">Dashboard</span>
            </button>
            <button 
              onClick={showBrowse}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${activeTab === 'browse' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs">Browse</span>
            </button>
            <button 
              onClick={showClasses}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${activeTab === 'classes' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">Classes</span>
            </button>
            <button 
              onClick={showPersonal}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${activeTab === 'personal' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs">Personal</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Original Browse Classes View
  if (currentView === 'browse') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Original Browse Header */}
        <div className="bg-white p-4 shadow-sm">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Browse Classes</h1>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </button>
            </div>
            
            {/* Original Search Bar */}
            <div className="relative mb-4">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search classes or instructors..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Original Category Pills */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {['All', 'Yoga', 'Fitness', 'Meditation', 'Pilates', 'Strength'].map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    category === 'All'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Original Class Cards */}
        <div className="max-w-md mx-auto p-4 space-y-4">
          {/* Sample class card with original styling */}
          {[1, 2, 3, 4].map(index => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-48 bg-gradient-to-br from-purple-400 to-blue-500">
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                  Beginner
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">Sample Class {index}</h3>
                  <span className="text-sm text-gray-500">60min</span>
                </div>
                
                <button 
                  onClick={showInstructorDetails}
                  className="text-blue-600 text-sm font-medium mb-2 hover:underline"
                >
                  Instructor Name
                </button>
                
                <p className="text-gray-600 text-sm mb-3">A sample class description with placeholder content for the original design.</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>15 max</span>
                  </div>
                  
                  <button
                    onClick={showClassDetails}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Original Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto flex">
            <button 
              onClick={showDashboard}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="text-xs">Dashboard</span>
            </button>
            <button 
              onClick={showBrowse}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${activeTab === 'browse' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs">Browse</span>
            </button>
            <button 
              onClick={showClasses}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${activeTab === 'classes' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">Classes</span>
            </button>
            <button 
              onClick={showPersonal}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${activeTab === 'personal' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs">Personal</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Original Class Details View
  if (currentView === 'class-details') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Original header with back button */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center">
              <button 
                onClick={showBrowse}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-lg font-semibold">Class Details</h1>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Class Image Placeholder */}
          <div className="relative h-48 bg-gradient-to-br from-purple-400 to-blue-500">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-bold">Sample Class Title</h2>
              <p className="text-sm opacity-90">Category Name</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Class Info - Original Styling */}
          <div className="bg-white p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <button 
                  onClick={showInstructorDetails}
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  Instructor Name
                </button>
              </div>
              <span className="text-sm text-gray-500">Beginner</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>60 min</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Max 15</span>
              </div>
            </div>

            <p className="text-gray-600">This is a placeholder description for the class. In the original design, this would contain detailed information about the class content, what to expect, and preparation instructions.</p>
          </div>

          {/* Upcoming Sessions - Original Design */}
          <div className="bg-white mt-2 p-4">
            <h3 className="font-semibold mb-3">Upcoming Sessions</h3>
            <div className="space-y-3">
              {[1, 2, 3].map(index => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">Sample Date {index}</div>
                      <div className="text-sm text-gray-500">9:00 AM</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">12/15 spots</div>
                      <div className="text-xs text-gray-500">available</div>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 px-4 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    Book Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original Instructor Details View
  if (currentView === 'instructor-details') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with back button */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center">
              <button 
                onClick={showBrowse}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-lg font-semibold">Instructor Profile</h1>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Instructor Profile - Original Design */}
          <div className="bg-white p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Instructor Name</h2>
              <p className="text-gray-600 mb-2">Certified Wellness Instructor</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  4.9
                </div>
                <div>5 years exp</div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white mt-2 p-4">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-gray-600">This is a placeholder bio for the instructor. In the original design, this would contain detailed information about their background, certifications, and teaching philosophy.</p>
          </div>

          {/* Specialties */}
          <div className="bg-white mt-2 p-4">
            <h3 className="font-semibold mb-3">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {['Yoga', 'Meditation', 'Wellness', 'Mindfulness'].map((specialty, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Classes by Instructor */}
          <div className="bg-white mt-2 p-4 mb-4">
            <h3 className="font-semibold mb-3">Classes by this Instructor</h3>
            <div className="space-y-3">
              {[1, 2].map(index => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Sample Class {index}</h4>
                    <p className="text-sm text-gray-500">60 min • Beginner</p>
                  </div>
                  <button 
                    onClick={showClassDetails}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Placeholder views for other sections
  const PlaceholderView = ({ title, description }: { title: string; description: string }) => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
      </div>
      
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <button 
            onClick={showDashboard}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto flex">
          <button 
            onClick={showDashboard}
            className={`flex-1 flex flex-col items-center py-2 px-1 ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span className="text-xs">Dashboard</span>
          </button>
          <button 
            onClick={showBrowse}
            className={`flex-1 flex flex-col items-center py-2 px-1 ${activeTab === 'browse' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs">Browse</span>
          </button>
          <button 
            onClick={showClasses}
            className={`flex-1 flex flex-col items-center py-2 px-1 ${activeTab === 'classes' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Classes</span>
          </button>
          <button 
            onClick={showPersonal}
            className={`flex-1 flex flex-col items-center py-2 px-1 ${activeTab === 'personal' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs">Personal</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Handle other views with placeholders
  if (currentView === 'classes') {
    return <PlaceholderView title="My Classes" description="View and manage your booked classes, attendance history, and upcoming sessions." />;
  }

  if (currentView === 'personal') {
    return <PlaceholderView title="Personal Area" description="Manage your profile, preferences, achievements, and wellness journey progress." />;
  }

  if (currentView === 'admin') {
    return <PlaceholderView title="Admin Dashboard" description="Manage classes, instructors, users, and view analytics for the wellness hub platform." />;
  }

  // Default fallback
  return <div>Loading...</div>;
}

export default App;
