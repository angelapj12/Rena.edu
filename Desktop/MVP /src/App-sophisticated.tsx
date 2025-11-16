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

// Mock data for classes
const mockClasses = [
  {
    id: 1,
    title: 'Morning Yoga Flow',
    instructor_name: 'Sarah Wilson',
    category: 'Yoga',
    description: 'Start your day with gentle movements and mindful breathing',
    duration: 60,
    maxCapacity: 15,
    level: 'Beginner',
    image_url: 'https://images.unsplash.com/photo-1506629905996-9d2b8aa75e5d?w=400'
  },
  {
    id: 2,
    title: 'HIIT Bootcamp',
    instructor_name: 'Mike Johnson',
    category: 'Fitness',
    description: 'High-intensity interval training for maximum results',
    duration: 45,
    maxCapacity: 20,
    level: 'Advanced',
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    id: 3,
    title: 'Meditation & Mindfulness',
    instructor_name: 'Emma Chen',
    category: 'Meditation',
    description: 'Find inner peace and clarity through guided meditation',
    duration: 30,
    maxCapacity: 25,
    level: 'All Levels',
    image_url: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400'
  },
  {
    id: 4,
    title: 'Pilates Core Strength',
    instructor_name: 'Lisa Rodriguez',
    category: 'Pilates',
    description: 'Build core strength and improve flexibility',
    duration: 50,
    maxCapacity: 12,
    level: 'Intermediate',
    image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400'
  }
];

function App() {
  // State management
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'browse' | 'schedule' | 'profile' | 'class-details'>('login');

  // Login handler
  const handleLogin = (accountType: 'student' | 'admin') => {
    const account = DEMO_ACCOUNTS.find(acc => acc.role === accountType);
    if (account) {
      setCurrentUser(account);
      setCurrentView('dashboard');
    }
  };

  // Navigation handlers
  const handleTabChange = (tab: 'dashboard' | 'browse' | 'schedule' | 'profile') => {
    setCurrentView(tab);
  };

  const handleClassSelect = () => {
    setCurrentView('class-details');
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
              <button 
                onClick={() => handleTabChange('browse')}
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
                onClick={() => handleTabChange('schedule')}
                className="bg-white p-4 rounded-xl shadow-sm border flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
              >
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
              <button 
                onClick={() => handleTabChange('browse')}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Browse and book your first class
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto flex">
            <button 
              onClick={() => handleTabChange('dashboard')}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${currentView === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="text-xs">Dashboard</span>
            </button>
            <button 
              onClick={() => handleTabChange('browse')}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${currentView === 'browse' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs">Browse</span>
            </button>
            <button 
              onClick={() => handleTabChange('schedule')}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${currentView === 'schedule' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">Schedule</span>
            </button>
            <button 
              onClick={() => handleTabChange('profile')}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${currentView === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Browse Content Component with all the class data and sophisticated design
  const BrowseContent = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
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
          
          {/* Search */}
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

          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {['All', 'Yoga', 'Fitness', 'Meditation', 'Pilates'].map(category => (
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

      {/* Class List with all your original data */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {mockClasses.map(classItem => (
          <div key={classItem.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="relative h-48">
              <img 
                src={classItem.image_url} 
                alt={classItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                {classItem.level}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{classItem.title}</h3>
                <span className="text-sm text-gray-500">{classItem.duration}min</span>
              </div>
              
              <button className="text-blue-600 text-sm font-medium mb-2 hover:underline">
                {classItem.instructor_name}
              </button>
              
              <p className="text-gray-600 text-sm mb-3">{classItem.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{classItem.maxCapacity} max</span>
                </div>
                
                <button
                  onClick={handleClassSelect}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto flex">
          <button 
            onClick={() => handleTabChange('dashboard')}
            className={`flex-1 flex flex-col items-center py-2 px-1 ${currentView === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span className="text-xs">Dashboard</span>
          </button>
          <button 
            onClick={() => handleTabChange('browse')}
            className={`flex-1 flex flex-col items-center py-2 px-1 ${currentView === 'browse' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs">Browse</span>
          </button>
          <button 
            onClick={() => handleTabChange('schedule')}
            className={`flex-1 flex flex-col items-center py-2 px-1 ${currentView === 'schedule' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Schedule</span>
          </button>
          <button 
            onClick={() => handleTabChange('profile')}
            className={`flex-1 flex flex-col items-center py-2 px-1 ${currentView === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Placeholder views for other sections with the same sophisticated design
  const PlaceholderView = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
      </div>
      
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">This feature is coming soon with full functionality including:</p>
          {title === 'My Schedule' && (
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• View your booked classes</li>
              <li>• Cancel bookings</li>
              <li>• Set reminders</li>
              <li>• Track attendance</li>
            </ul>
          )}
          {title === 'Profile' && (
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• Edit profile information</li>
              <li>• View XP and achievements</li>
              <li>• Manage preferences</li>
              <li>• Booking history</li>
            </ul>
          )}
          {title === 'Class Details' && (
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• Full class information</li>
              <li>• Instructor details</li>
              <li>• Available time slots</li>
              <li>• Book sessions</li>
            </ul>
          )}
          <button 
            onClick={() => handleTabChange('dashboard')}
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
            onClick={() => handleTabChange('dashboard')}
            className={`flex-1 flex flex-col items-center py-2 px-1 ${currentView === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span className="text-xs">Dashboard</span>
          </button>
          <button 
            onClick={() => handleTabChange('browse')}
            className={`flex-1 flex flex-col items-center py-2 px-1 ${currentView === 'browse' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs">Browse</span>
          </button>
          <button 
            onClick={() => handleTabChange('schedule')}
            className={`flex-1 flex flex-col items-center py-2 px-1 ${currentView === 'schedule' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Schedule</span>
          </button>
          <button 
            onClick={() => handleTabChange('profile')}
            className={`flex-1 flex flex-col items-center py-2 px-1 ${currentView === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Main render logic
  if (!currentUser) {
    return <LoginScreen />;
  }

  if (currentView === 'dashboard') {
    return <DashboardContent />;
  }

  if (currentView === 'browse') {
    return <BrowseContent />;
  }

  if (currentView === 'schedule') {
    return (
      <PlaceholderView 
        title="My Schedule" 
        icon={
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        icon={
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        } 
      />
    );
  }

  if (currentView === 'class-details') {
    return (
      <PlaceholderView 
        title="Class Details" 
        icon={
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        } 
      />
    );
  }

  return <DashboardContent />;
}

export default App;
