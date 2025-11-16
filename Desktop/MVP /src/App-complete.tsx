import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Mock functions to replace missing services
const getBookingsByUser = async (userId: string) => [];
const getInstructors = async () => [];
const getClasses = async () => [];
const getUsers = async () => [];
const getSessionsByClass = async (classId:         </div>
      </div>
    </div>
  );
};

// Browse Content Component
interface BrowseContentProps {
  user: User;
  onClassSelect: (classId: number) => void;
  onInstructorSelect: (instructorId: number) => void;
}

const BrowseContent: React.FC<BrowseContentProps> = ({ onClassSelect, onInstructorSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Yoga', 'Fitness', 'Meditation', 'Pilates'];
  
  const filteredClasses = mockClasses.filter(classItem => {
    const matchesSearch = classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.instructor_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || classItem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Browse Classes</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search classes or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Class List */}
      <div className="p-4 space-y-4">
        {filteredClasses.map(classItem => (
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
              
              <button
                onClick={() => onInstructorSelect(findInstructorByName(classItem.instructor_name).id)}
                className="text-blue-600 text-sm font-medium mb-2 hover:underline"
              >
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
                  onClick={() => onClassSelect(classItem.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Dashboard Content Component
interface DashboardContentProps {
  user: User;
  userBookings: Booking[];
  onClassSelect: (classId: number) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ user, userBookings, onClassSelect }) => {
  const upcomingBookings = userBookings.filter(booking => booking.status === 'confirmed');
  
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Welcome back!</h1>
            <p className="text-blue-100">{user.display_name}</p>
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
            <div className="text-2xl font-bold">{user.level}</div>
            <div className="text-xs text-blue-100">Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{user.xp_points}</div>
            <div className="text-xs text-blue-100">XP Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{user.current_streak}</div>
            <div className="text-xs text-blue-100">Day Streak</div>
          </div>
        </div>
      </div>

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
                      onClick={() => onClassSelect(classData.id)}
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
            <button className="text-blue-600 text-sm font-medium hover:underline">
              Browse and book your first class
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; => [];
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

interface ClassDetailsContentProps {
  classId: number;
  onBack: () => void;
  user: User;
  onBookSession: (sessionId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  userBookings: Booking[];
}

interface InstructorDetailsContentProps {
  instructorId: number;
  onBack: () => void;
}

// Class Details Component
const ClassDetailsContent: React.FC<ClassDetailsContentProps> = ({ 
  classId, 
  onBack, 
  user,
  onBookSession,
  onCancelBooking,
  userBookings
}) => {
  const [selectedClass] = useState(() => mockClasses.find(c => c.id === classId) || mockClasses[0]);
  const [sessions] = useState<ClassSession[]>([
    {
      id: 'session-1',
      class_id: classId,
      date: '2024-01-15',
      time: '09:00',
      instructor: selectedClass.instructor_name,
      available_spots: 8,
      total_spots: selectedClass.maxCapacity,
    },
    {
      id: 'session-2', 
      class_id: classId,
      date: '2024-01-17',
      time: '09:00',
      instructor: selectedClass.instructor_name,
      available_spots: 12,
      total_spots: selectedClass.maxCapacity,
    },
    {
      id: 'session-3',
      class_id: classId,
      date: '2024-01-19',
      time: '09:00',
      instructor: selectedClass.instructor_name,
      available_spots: 15,
      total_spots: selectedClass.maxCapacity,
    }
  ]);

  const isSessionBooked = (sessionId: string) => {
    return userBookings.some(booking => 
      booking.session_id === sessionId && booking.status === 'confirmed'
    );
  };

  const getBookingForSession = (sessionId: string) => {
    return userBookings.find(booking => 
      booking.session_id === sessionId && booking.status === 'confirmed'
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center">
            <button 
              onClick={onBack}
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
        {/* Class Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={selectedClass.image_url} 
            alt={selectedClass.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-xl font-bold">{selectedClass.title}</h2>
            <p className="text-sm opacity-90">{selectedClass.category}</p>
          </div>
        </div>

        {/* Class Info */}
        <div className="bg-white p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="font-medium">{selectedClass.instructor_name}</span>
            </div>
            <span className="text-sm text-gray-500">{selectedClass.level}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{selectedClass.duration} min</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Max {selectedClass.maxCapacity}</span>
            </div>
          </div>

          <p className="text-gray-600">{selectedClass.description}</p>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white mt-2 p-4">
          <h3 className="font-semibold mb-3">Upcoming Sessions</h3>
          <div className="space-y-3">
            {sessions.map(session => {
              const isBooked = isSessionBooked(session.id);
              const booking = getBookingForSession(session.id);
              
              return (
                <div key={session.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{formatDate(session.date)}</div>
                      <div className="text-sm text-gray-500">{session.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {session.available_spots}/{session.total_spots} spots
                      </div>
                      <div className="text-xs text-gray-500">available</div>
                    </div>
                  </div>
                  
                  {isBooked ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Booked
                      </div>
                      <button
                        onClick={() => booking && onCancelBooking(booking.id)}
                        className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onBookSession(session.id)}
                      disabled={session.available_spots === 0}
                      className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        session.available_spots === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {session.available_spots === 0 ? 'Full' : 'Book Session'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Instructor Details Component
const InstructorDetailsContent: React.FC<InstructorDetailsContentProps> = ({ instructorId, onBack }) => {
  const [instructor] = useState(() => mockInstructors.find(i => i.id === instructorId) || mockInstructors[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center">
            <button 
              onClick={onBack}
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
        {/* Instructor Profile */}
        <div className="bg-white p-6">
          <div className="text-center">
            <img 
              src={instructor.image_url}
              alt={instructor.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-xl font-bold">{instructor.name}</h2>
            <p className="text-gray-600 mb-2">{instructor.title}</p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {instructor.rating}
              </div>
              <div>{instructor.experience} years exp</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white mt-2 p-4">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-gray-600">{instructor.bio}</p>
        </div>

        {/* Specialties */}
        <div className="bg-white mt-2 p-4">
          <h3 className="font-semibold mb-3">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {instructor.specialties.map((specialty, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Classes */}
        <div className="bg-white mt-2 p-4">
          <h3 className="font-semibold mb-3">Classes by {instructor.name}</h3>
          <div className="space-y-3">
            {mockClasses.filter(c => c.instructor_name === instructor.name).map(classItem => (
              <div key={classItem.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img 
                  src={classItem.image_url}
                  alt={classItem.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{classItem.title}</h4>
                  <p className="text-sm text-gray-500">{classItem.duration} min • {classItem.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
