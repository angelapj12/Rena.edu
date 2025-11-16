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

// Mock data for classes and instructors
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

const mockInstructors = [
  {
    id: 1,
    name: 'Sarah Wilson',
    title: 'Certified Yoga Instructor',
    bio: 'Sarah has been practicing yoga for over 10 years and teaching for 5. She specializes in Hatha and Vinyasa yoga.',
    specialties: ['Hatha Yoga', 'Vinyasa', 'Meditation'],
    experience: 5,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=400'
  },
  {
    id: 2,
    name: 'Mike Johnson',
    title: 'Personal Trainer & Fitness Coach',
    bio: 'Mike is a certified personal trainer with expertise in HIIT, strength training, and functional fitness.',
    specialties: ['HIIT', 'Strength Training', 'Functional Fitness'],
    experience: 8,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  }
];

const findInstructorByName = (name: string) => {
  return mockInstructors.find(instructor => instructor.name === name) || {
    id: 0,
    name: name,
    title: 'Wellness Instructor',
    bio: 'Experienced wellness instructor dedicated to helping students achieve their health and fitness goals.',
    specialties: ['Wellness'],
    experience: 3,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=400'
  };
};

// Component types
interface ClassSession {
  id: string;
  class_id: number;
  date: string;
  time: string;
  instructor: string;
  available_spots: number;
  total_spots: number;
  booking_deadline?: string;
}

interface Booking {
  id: string;
  user_id: string;
  session_id: string;
  status: 'confirmed' | 'cancelled' | 'waitlist';
  booked_at: string;
  session?: ClassSession;
}

// Main App Component
function App() {
  // State management
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'browse' | 'schedule' | 'profile' | 'admin' | 'class-details' | 'instructor-details'>('login');
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedInstructorId, setSelectedInstructorId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'browse' | 'schedule' | 'profile'>('dashboard');

  // Login handler
  const handleLogin = (accountType: 'student' | 'admin') => {
    const account = DEMO_ACCOUNTS.find(acc => acc.role === accountType);
    if (account) {
      setCurrentUser(account);
      setCurrentView('dashboard');
      
      // Mock some bookings for the student
      if (accountType === 'student') {
        setUserBookings([
          {
            id: 'booking-1',
            user_id: account.id,
            session_id: 'session-1',
            status: 'confirmed',
            booked_at: new Date().toISOString(),
            session: {
              id: 'session-1',
              class_id: 1,
              date: '2024-01-15',
              time: '09:00',
              instructor: 'Sarah Wilson',
              available_spots: 8,
              total_spots: 15,
            }
          }
        ]);
      }
    }
  };

  // Class selection handler
  const handleClassSelect = (classId: number) => {
    setSelectedClassId(classId);
    setCurrentView('class-details');
  };

  // Instructor selection handler
  const handleInstructorSelect = (instructorId: number) => {
    setSelectedInstructorId(instructorId);
    setCurrentView('instructor-details');
  };

  // Session booking handler
  const handleBookSession = (sessionId: string) => {
    if (!currentUser) return;
    
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      user_id: currentUser.id,
      session_id: sessionId,
      status: 'confirmed',
      booked_at: new Date().toISOString(),
    };
    
    setUserBookings(prev => [...prev, newBooking]);
    console.log('Session booked:', sessionId);
  };

  // Cancel booking handler
  const handleCancelBooking = (bookingId: string) => {
    setUserBookings(prev => prev.filter(booking => booking.id !== bookingId));
    console.log('Booking cancelled:', bookingId);
  };

  // Back navigation handler
  const handleBack = () => {
    setCurrentView(currentUser?.role === 'admin' ? 'admin' : 'browse');
  };

  // Tab navigation handler
  const handleTabChange = (tab: 'dashboard' | 'browse' | 'schedule' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'dashboard') {
      setCurrentView('dashboard');
    } else if (tab === 'browse') {
      setCurrentView('browse');
    } else if (tab === 'schedule') {
      setCurrentView('schedule');
    } else if (tab === 'profile') {
      setCurrentView('profile');
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

    const upcomingBookings = userBookings.filter(booking => booking.status === 'confirmed');
    
    return (
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
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
          {upcomingBookings.length > 0 ? (
            <div className="space-y-3">
              {upcomingBookings.slice(0, 3).map(booking => {
                const classData = mockClasses.find(c => c.id.toString() === booking.session?.class_id.toString());
                if (!classData) return null;
                
                return (
                  <div key={booking.id} className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={classData.image_url}
                        alt={classData.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{classData.title}</h3>
                        <p className="text-sm text-gray-500">{classData.instructor_name}</p>
                        {booking.session && (
                          <p className="text-xs text-gray-400">
                            {new Date(booking.session.date).toLocaleDateString()} at {booking.session.time}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleClassSelect(classData.id)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    );
  };

  // Continue in next part due to length...
  
  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'dashboard' && <DashboardContent />}
      
      {/* Placeholder for other views */}
      {currentView === 'browse' && (
        <div className="max-w-md mx-auto p-4 text-center">
          <h2 className="text-xl font-bold mb-4">Browse Classes</h2>
          <p>Browse functionality coming soon...</p>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      )}
      
      {currentView === 'schedule' && (
        <div className="max-w-md mx-auto p-4 text-center">
          <h2 className="text-xl font-bold mb-4">My Schedule</h2>
          <p>Schedule functionality coming soon...</p>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
