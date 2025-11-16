import { useState } from 'react';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Navigation handlers
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

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  // Login Screen - Lime Green Background
  if (!isLoggedIn) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#a3e635' }} // lime-400
      >
        <div className="w-full max-w-sm mx-auto p-8">
          {/* Logo/Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">WellnessHub</h1>
            <p className="text-white/80 text-lg">Your fitness journey starts here</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>
            
            <div className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 border border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-4 border border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                }}
              >
                Sign In
              </button>
            </div>

            <div className="text-center mt-6">
              <button className="text-gray-600 hover:text-gray-800">
                Forgot your password?
              </button>
            </div>
          </div>

          {/* Sign Up */}
          <div className="text-center mt-6">
            <p className="text-white">
              Don't have an account?{' '}
              <button className="text-white font-bold underline">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard - Main Home Screen
  if (currentView === 'dashboard') {
    return (
      <div 
        className="min-h-screen pb-24"
        style={{ backgroundColor: '#a3e635' }} // lime-400
      >
        {/* Header */}
        <div className="px-4 pt-12 pb-6">
          <div className="max-w-sm mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Good Morning</h1>
                <p className="text-white/80 text-lg">Ready for your workout?</p>
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 mb-6">
          <div className="max-w-sm mx-auto grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-gray-800">4</div>
              <div className="text-sm text-gray-600">Classes This Week</div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-gray-800">12</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="px-4">
          <div className="max-w-sm mx-auto">
            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Today's Schedule</h2>
              
              <div className="space-y-4">
                {/* Active Class */}
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">Morning Yoga</h3>
                      <p className="text-sm text-gray-600">9:00 AM - 10:00 AM</p>
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
                      Join
                    </button>
                  </div>
                </div>

                {/* Upcoming Class */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-600">HIIT Training</h3>
                      <p className="text-sm text-gray-500">6:00 PM - 7:00 PM</p>
                    </div>
                    <span className="text-gray-500 text-sm">Upcoming</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={showBrowse}
                className="w-full mt-6 p-4 border-2 border-dashed border-green-500 rounded-2xl text-green-500 font-bold hover:bg-green-50"
              >
                + Book more classes
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-sm mx-auto flex">
            <button 
              onClick={showDashboard}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'dashboard' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'dashboard' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="text-xs font-bold">Home</span>
            </button>
            <button 
              onClick={showBrowse}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'browse' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'browse' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs font-bold">Explore</span>
            </button>
            <button 
              onClick={showClasses}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'classes' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'classes' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold">Classes</span>
            </button>
            <button 
              onClick={showProfile}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'profile' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-bold">Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Browse Classes View
  if (currentView === 'browse') {
    return (
      <div 
        className="min-h-screen pb-24"
        style={{ backgroundColor: '#a3e635' }} // lime-400
      >
        {/* Header */}
        <div className="px-4 pt-12 pb-6">
          <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-white mb-4">Explore Classes</h1>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-3 shadow-lg">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search classes..."
                  className="flex-1 text-gray-700 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 mb-6">
          <div className="max-w-sm mx-auto">
            <div className="flex space-x-3 overflow-x-auto pb-2">
              <button className="bg-white text-green-600 px-6 py-2 rounded-full font-bold whitespace-nowrap shadow-lg">
                All
              </button>
              <button className="bg-white/50 text-white px-6 py-2 rounded-full font-bold whitespace-nowrap">
                Yoga
              </button>
              <button className="bg-white/50 text-white px-6 py-2 rounded-full font-bold whitespace-nowrap">
                HIIT
              </button>
              <button className="bg-white/50 text-white px-6 py-2 rounded-full font-bold whitespace-nowrap">
                Strength
              </button>
            </div>
          </div>
        </div>

        {/* Class Cards */}
        <div className="px-4">
          <div className="max-w-sm mx-auto space-y-4">
            {/* Class Card 1 */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Morning Yoga Flow</h3>
                  <p className="text-gray-600">Sarah Wilson</p>
                </div>
                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                  Available
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>60 min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>Studio A</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span>12/15</span>
                </div>
              </div>

              <button className="w-full bg-green-500 text-white py-3 rounded-2xl font-bold hover:bg-green-600 transition-colors">
                Book Now
              </button>
            </div>

            {/* Class Card 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">HIIT Blast</h3>
                  <p className="text-gray-600">Marcus Johnson</p>
                </div>
                <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                  Full
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>45 min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>Studio B</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span>20/20</span>
                </div>
              </div>

              <button className="w-full bg-gray-300 text-gray-500 py-3 rounded-2xl font-bold" disabled>
                Waitlist
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-sm mx-auto flex">
            <button 
              onClick={showDashboard}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'dashboard' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'dashboard' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="text-xs font-bold">Home</span>
            </button>
            <button 
              onClick={showBrowse}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'browse' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'browse' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs font-bold">Explore</span>
            </button>
            <button 
              onClick={showClasses}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'classes' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'classes' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold">Classes</span>
            </button>
            <button 
              onClick={showProfile}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'profile' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-bold">Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Classes View (placeholder)
  if (currentView === 'classes') {
    return (
      <div 
        className="min-h-screen pb-24 flex items-center justify-center"
        style={{ backgroundColor: '#a3e635' }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">My Classes</h1>
          <p className="text-white/80">Your booked classes will appear here</p>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-sm mx-auto flex">
            <button 
              onClick={showDashboard}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'dashboard' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'dashboard' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="text-xs font-bold">Home</span>
            </button>
            <button 
              onClick={showBrowse}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'browse' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'browse' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs font-bold">Explore</span>
            </button>
            <button 
              onClick={showClasses}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'classes' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'classes' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold">Classes</span>
            </button>
            <button 
              onClick={showProfile}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'profile' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-bold">Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Profile View (placeholder)
  if (currentView === 'profile') {
    return (
      <div 
        className="min-h-screen pb-24 flex items-center justify-center"
        style={{ backgroundColor: '#a3e635' }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Profile</h1>
          <p className="text-white/80">Your profile settings will appear here</p>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-sm mx-auto flex">
            <button 
              onClick={showDashboard}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'dashboard' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'dashboard' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="text-xs font-bold">Home</span>
            </button>
            <button 
              onClick={showBrowse}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'browse' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'browse' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs font-bold">Explore</span>
            </button>
            <button 
              onClick={showClasses}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'classes' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'classes' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold">Classes</span>
            </button>
            <button 
              onClick={showProfile}
              className={`flex-1 flex flex-col items-center py-3 px-2 ${
                activeTab === 'profile' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-bold">Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
