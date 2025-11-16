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
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);


// ...rest of your code, including export default function App() { ... }

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




// ...existing code...

const [bookings, setBookings] = useState<any[]>([]);
const [loadingBookings, setLoadingBookings] = useState(true);
const [errorBookings, setErrorBookings] = useState<string | null>(null);

useEffect(() => {
  async function fetchBookings() {
    setLoadingBookings(true);
    setErrorBookings(null);
    try {
      if (selectedAccount) {
        const data = await getBookingsByUser(selectedAccount.firebase_uid);
        setBookings(data);
      }
    } catch (err) {
      setErrorBookings('Could not load bookings.');
    } finally {
      setLoadingBookings(false);
    }
  }
  fetchBookings();
}, [selectedAccount]);

  // Demo classes data


const [classes, setClasses] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchClasses() {
    setLoading(true);
    setError(null);
    try {
      const data = await getClasses();
      setClasses(data);
    } catch (err) {
      setError('Could not load classes.');
    } finally {
      setLoading(false);
    }
  }
  fetchClasses();
}, []);

  // Demo instructors data



    // Clear notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  
  // Booking system functions


//const supabase = createClient(
//import.meta.env.VITE_SUPABASE_URL,
//import.meta.env.VITE_SUPABASE_ANON_KEY
//);

/**
 * Fetch all bookings for a user.
 * @param userId - firebase_uid of the user
 * @returns Promise<Booking[]>
*/

const findInstructorByName = (name: string) => {
  // This would normally query your instructors data
  return {
    id: 'inst-1',
    name: name,
    title: 'Wellness Instructor',
    bio: 'Experienced instructor',
    experience_years: 5,
    classes_completed: 100,
    students_taught: 500,
    rating: 4.8,
    total_ratings: 150,
    image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=400'
  };
};




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
          background: '#3a3b47',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginBottom: '8px'
          }}>
            🧘‍♀️ WellnessHub
          </h1>
          <p style={{ color: '#9ca3af', marginBottom: '32px' }}>
            Choose a demo account to test the app
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {DEMO_ACCOUNTS.map(account => (
              <button
                key={account.id}
                onClick={() => {
                  setSelectedAccount(account);
                  setCurrentPage('dashboard');
                }}
                style={{
                  padding: '16px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: account.role === 'admin' ? '#dc2626' : '#cff45e',
                  color: account.role === 'admin' ? 'white' : '#1f2937',
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
              🗄️ Database Status
            </h3>
            <ul style={{ fontSize: '12px', color: '#6b7280', listStyle: 'none', padding: 0, margin: 0 }}>
              <li>✅ Supabase: fboviklybnvdxufqgiwv</li>
              <li>🔄 Demo Data: Run SQL first</li>
              <li>🎯 Ready for testing</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
const handleBookClass = async (classId: number, className: string, maxCapacity: number) => {
  if (!selectedAccount) return;
  
  try {
    const stats = getClassStats(classId, maxCapacity);
    
    if (stats.isFull) {
      setNotification({
        type: 'warning',
        message: 'This class is full. You have been added to the waitlist.'
      });
      return;
    }
    
    // Add booking logic here
    setBookings(prev => [...prev, {
      id: Date.now(),
      userId: selectedAccount.firebase_uid,
      classId: classId,
      status: 'confirmed',
      created_at: new Date().toISOString()
    }]);
    
    setNotification({
      type: 'success',
      message: `Successfully booked ${className}!`
    });
    
    setTimeout(() => setNotification(null), 3000);
  } catch (error) {
    setNotification({
      type: 'error',
      message: 'Failed to book class. Please try again.'
    });
  }
};
  // Main app after login
  return (
    <div style={{ 
      minHeight: '100vh',
      maxWidth: '430px', // Mobile constraint
      margin: '0 auto', // Center on larger screens
      background: '#000000',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Header */}
      <header style={{
        background: '#3a3b47',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        padding: '16px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🧘‍♀️</span>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
            WellnessHub
          </h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: selectedAccount?.role === 'admin' ? '#dc2626' : '#cff45e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: selectedAccount?.role === 'admin' ? 'white' : '#1f2937',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {selectedAccount?.display_name?.charAt(0) || 'U'}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#ffffff' }}>
                {selectedAccount?.display_name}
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                {selectedAccount?.role === 'admin' ? 'Admin' : `Level ${selectedAccount?.level} • ${selectedAccount?.xp_points} XP`}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => {
              setSelectedAccount(null);
              setCurrentPage('login');
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #4b5563',
              background: '#4b5563',
              color: '#ffffff',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Switch Account
          </button>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '16px',
          borderRadius: '8px',
          background: notification.type === 'success' ? '#cff45e' : 
                     notification.type === 'error' ? '#dc2626' : '#f59e0b',
          color: notification.type === 'success' ? '#1f2937' : 
                 notification.type === 'error' ? '#ffffff' : '#ffffff',
          fontWeight: '500',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          maxWidth: '350px'
        }}>
          {notification.message}
        </div>
      )}

      {/* Content Area - Mobile First */}
      <div style={{ 
        padding: '0 0 80px 0', // Always mobile spacing
        minHeight: 'calc(100vh - 80px)',
        overflowY: 'auto',
        width: '100%'
      }}>
        {/* Page Content */}
        <div style={{ 
          padding: '16px', 
          maxWidth: '100%',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {currentPage === 'dashboard' && (
            <DashboardContent 
              user={selectedAccount} 
              bookings={bookings}
              classes={classes}
            />
          )}
          {currentPage === 'classes' && selectedAccount?.role === 'student' && (
            <BrowseContent
              classes={classes}
              setCurrentPage={setCurrentPage}
              setSelectedClass={setSelectedClass}
              getClassStats={getClassStats}
            />
          )}
          {currentPage === 'class-details' && selectedClass && (
            <ClassDetailsContent 
              classData={selectedClass}
              setCurrentPage={setCurrentPage}
              getClassStats={getClassStats}
              handleBookClass={handleBookClass}
              setSelectedInstructor={setSelectedInstructor}
              findInstructorByName={findInstructorByName}
            />
          )}
          {currentPage === 'instructor-details' && selectedInstructor && (
            <InstructorDetailsContent 
              instructorData={selectedInstructor}
              setCurrentPage={setCurrentPage}
              classes={classes}
              handleBookClass={async (classId: number) => {
                const cls = classes.find(c => c.id === classId);
                if (cls) {
                  handleBookClass(classId, cls.title, cls.maxCapacity);
                }
              }}
            />
          )}
          {currentPage === 'bookings' && (
            <div style={{ padding: '10px', color: '#ffffff' }}>
              <h2>My Bookings</h2>
              <p>Bookings page will be implemented here</p>
            </div>
          )}
          {currentPage === 'profile' && (
            <PersonalAreaContent 
              user={selectedAccount} 
              setCurrentPage={setCurrentPage}
            />
          )}
          {currentPage === 'scan' && (
            <div style={{ padding: '10px', textAlign: 'center' }}>
              <div style={{
                background: 'rgba(45, 46, 55, 0.9)',
                borderRadius: '16px',
                padding: '40px 10px',
                marginTop: '60px'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>📱</div>
                <h2 style={{ color: '#ffffff', fontSize: '24px', marginBottom: '8px' }}>QR Scanner</h2>
                <p style={{ color: '#9ca3af', fontSize: '16px' }}>Scan QR codes to quickly join classes</p>
                <button style={{
                  background: '#cff45e',
                  color: '#1f2937',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '24px',
                  cursor: 'pointer'
                }}>
                  Open Camera
                </button>
              </div>
            </div>
          )}
          {currentPage === 'leaderboard' && (
            <LeaderboardContent />
          )}
          {currentPage === 'instructors' && selectedAccount?.role === 'admin' && (
            <AdminInstructorsContent />
          )}
          {currentPage === 'quick-actions' && selectedAccount?.role === 'admin' && (
            <AdminQuickActionsContent />
          )}
          {currentPage === 'classes' && selectedAccount?.role === 'admin' && (
            <AdminClassesContent />
          
          )}
          {currentPage === 'users' && selectedAccount?.role === 'admin' && (
            <AdminUserManagementContent 
              onSelectUser={(user) => {
                setSelectedUser(user);
                if (user.role === 'instructor') {
                  setCurrentPage('instructor-details');
                } else {
                  setCurrentPage('user-details');
                }
              }}
            />
          )}
          {currentPage === 'user-details' && selectedAccount?.role === 'admin' && selectedUser && (
            <AdminUserDetailsContent 
              user={selectedUser}
              onBack={() => {
                setSelectedUser(null);
                setCurrentPage('users');
              }}
            />
          )}
          {currentPage === 'instructor-details' && selectedAccount?.role === 'admin' && selectedUser && (
            <AdminInstructorUserDetailsContent 
              user={selectedUser}
              onBack={() => {
                setSelectedUser(null);
                setCurrentPage('users');
              }}
            />
          )}
          
        </div>
      </div>

      {/* Bottom Navigation for Students */}
      {selectedAccount?.role === 'student' && (
        <nav style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px 16px 0 0',
          padding: '16px 8px 20px 8px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(10px)'
        }}>
          {[
            { page: 'dashboard', icon: '🏠', label: 'Dashboard' },
            { page: 'scan', icon: '📱', label: 'Scan' },
            { page: 'classes', icon: '+', label: 'Book', isBookButton: true },
            { page: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { page: 'profile', icon: '👤', label: 'Personal Area' }
          ].map(item => (
            <button
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: item.isBookButton ? '#000000' : (currentPage === item.page ? '#1f2937' : '#ffffff'),
                background: item.isBookButton ? '#cff45e' : 'transparent',
                border: 'none',
                fontSize: '11px',
                fontWeight: '500',
                cursor: 'pointer',
                padding: item.isBookButton ? '12px' : '8px',
                borderRadius: item.isBookButton ? '50%' : '0',
                width: item.isBookButton ? '56px' : 'auto',
                height: item.isBookButton ? '56px' : 'auto',
                minHeight: item.isBookButton ? '56px' : '40px',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ 
                fontSize: item.isBookButton ? '24px' : '20px',
                fontWeight: item.isBookButton ? 'bold' : 'normal'
              }}>
                {item.icon}
              </span>
              {!item.isBookButton && (
                <span style={{ fontSize: '10px' }}>{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      )}

      {/* Admin Bottom Navigation - Mobile Only */}
      {selectedAccount?.role === 'admin' && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px 16px 0 0',
          padding: '16px 8px 20px 8px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(10px)'
        }}>
          {[
            { page: 'dashboard', icon: '📊', label: 'Stats' },
            { page: 'instructors', icon: '👨‍🏫', label: 'Instructors' },
            { page: 'quick-actions', icon: '+', label: 'Actions', isActionButton: true },
            { page: 'classes', icon: '🏋️', label: 'Classes' },
            { page: 'users', icon: '�', label: 'Users' }
          ].map(item => (
            <div
              key={item.page}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentPage(item.page)}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: item.isActionButton ? '50px' : '40px',
                  height: item.isActionButton ? '50px' : '40px',
                  background: item.isActionButton ? '#cff45e' : (currentPage === item.page ? '#cff45e' : 'rgba(75, 85, 99, 0.5)'),
                  color: item.isActionButton ? '#000000' : (currentPage === item.page ? '#000000' : '#9ca3af'),
                  border: 'none',
                  borderRadius: '50%',
                  fontSize: item.isActionButton ? '24px' : '20px',
                  fontWeight: item.isActionButton ? 'bold' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.icon}
              </button>
              <span style={{
                fontSize: '10px',
                color: currentPage === item.page ? '#cff45e' : '#9ca3af',
                fontWeight: currentPage === item.page ? '600' : 'normal',
                textAlign: 'center'
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Personal Area Component
function PersonalAreaContent({ user, setCurrentPage }: { user: any; setCurrentPage: (page: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1494790108755-2616b612b830?w=400&h=400&fit=crop&crop=face');
  const [formData, setFormData] = useState({
    firstName: user?.display_name?.split(' ')[0] || 'Emily',
    lastName: user?.display_name?.split(' ')[1] || 'Carlton',
    phone: '+853 63777685',
    email: user?.email || 'Emily Carlton',
    birthday: '28/02/1990',
    address: '40 Rainey Street, Austin TX 78701',
    language: 'English',
    allowMarketing: true
  });

  const handleSave = () => {
    // TODO: Save to database
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setShowImagePicker(false);
      
      // TODO: Upload to storage service (Firebase Storage, Supabase Storage, etc.)
      console.log('Uploading image:', file);
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the captured image
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setShowImagePicker(false);
      
      // TODO: Upload to storage service
      console.log('Captured image:', file);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d30 100%)',
      color: '#ffffff',
      padding: '0',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px 30px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '300',
          margin: '0 0 30px 0',
          color: '#ffffff'
        }}>
          Profile
        </h1>

        {/* Profile Picture */}
        <div style={{
          position: 'relative',
          display: 'inline-block',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)',
            backgroundImage: `url(${profileImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            margin: '0 auto',
            border: '4px solid rgba(255, 255, 255, 0.1)'
          }} />
          
          {/* Edit Icon */}
          <div 
            onClick={() => setShowImagePicker(true)}
            style={{
              position: 'absolute',
              bottom: '5px',
              right: '5px',
              width: '36px',
              height: '36px',
              background: '#cff45e',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: '3px solid #1a1a1a'
            }}
          >
            <span style={{ fontSize: '16px', color: '#000' }}>✏️</span>
          </div>
        </div>

        {/* Image Picker Modal */}
        {showImagePicker && (
          <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: '#2d2d30',
              borderRadius: '16px',
              padding: '24px',
              margin: '20px',
              maxWidth: '320px',
              width: '100%'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                margin: '0 0 20px 0',
                color: '#ffffff',
                textAlign: 'center'
              }}>
                Change Profile Picture
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {/* Upload from Gallery */}
                <label style={{
                  background: '#cff45e',
                  color: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'block',
                  transition: 'all 0.2s ease'
                }}>
                  📷 Choose from Gallery
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>

                {/* Take Photo */}
                <label style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'block',
                  transition: 'all 0.2s ease'
                }}>
                  📸 Take Photo
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleCameraCapture}
                    style={{ display: 'none' }}
                  />
                </label>

                {/* Cancel */}
                <button
                  onClick={() => setShowImagePicker(false)}
                  style={{
                    background: 'transparent',
                    color: 'rgba(255, 255, 255, 0.6)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Name and Join Date */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          margin: '0 0 8px 0',
          color: '#ffffff'
        }}>
          {formData.firstName} {formData.lastName}
        </h2>
        <p style={{
          fontSize: '16px',
          color: 'rgba(255, 255, 255, 0.6)',
          margin: '0'
        }}>
          Joined Jul 2022
        </p>
      </div>

      {/* Scrollable Content */}
      <div style={{
        height: 'calc(100vh - 300px)',
        overflowY: 'auto',
        padding: '0 20px 100px',
        boxSizing: 'border-box'
      }}>
        {/* Personal Info Section */}
        <div style={{
          background: 'rgba(45, 46, 55, 0.8)',
          borderRadius: '16px',
          padding: '24px',
          margin: '20px 0',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: '0',
              color: '#ffffff'
            }}>
              Personal Info
            </h3>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              style={{
                background: isEditing ? '#cff45e' : 'rgba(255, 255, 255, 0.1)',
                color: isEditing ? '#000' : '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>

          {/* Name Fields */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              👤
            </div>
            <div style={{ flex: 1, display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '4px'
                }}>
                  Last Name
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '6px',
                      padding: '8px',
                      color: '#fff',
                      fontSize: '16px',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  />
                ) : (
                  <div style={{ fontSize: '16px', color: '#fff' }}>
                    {formData.lastName}
                  </div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '4px'
                }}>
                  First Name
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '6px',
                      padding: '8px',
                      color: '#fff',
                      fontSize: '16px',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  />
                ) : (
                  <div style={{ fontSize: '16px', color: '#fff' }}>
                    {formData.firstName}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Phone */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              📞
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '4px'
              }}>
                Phone
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    padding: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                />
              ) : (
                <div style={{ fontSize: '16px', color: '#fff' }}>
                  {formData.phone}
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              📧
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '4px'
              }}>
                Email
              </div>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    padding: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                />
              ) : (
                <div style={{ fontSize: '16px', color: '#fff' }}>
                  {formData.email}
                </div>
              )}
            </div>
          </div>

          {/* Birthday */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              🎂
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '4px'
              }}>
                Birthday
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.birthday}
                  onChange={(e) => handleInputChange('birthday', e.target.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    padding: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                />
              ) : (
                <div style={{ fontSize: '16px', color: '#fff' }}>
                  {formData.birthday}
                </div>
              )}
            </div>
          </div>

          {/* Address */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0',
            gap: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              🏠
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '4px'
              }}>
                Address
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    padding: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                />
              ) : (
                <div style={{ fontSize: '16px', color: '#fff' }}>
                  {formData.address}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div style={{
          background: 'rgba(45, 46, 55, 0.8)',
          borderRadius: '16px',
          padding: '24px',
          margin: '20px 0',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 20px 0',
            color: '#ffffff'
          }}>
            Settings
          </h3>

          {/* Language */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              🌐
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '4px'
              }}>
                Language
              </div>
              <div style={{ fontSize: '16px', color: '#fff' }}>
                {formData.language}
              </div>
            </div>
          </div>

          {/* Password */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              🔒
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '4px'
              }}>
                Password
              </div>
              <div style={{ fontSize: '16px', color: '#fff' }}>
                ••••••••••
              </div>
            </div>
          </div>

          {/* Communications */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0',
            gap: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              🔔
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '4px'
              }}>
                Communications
              </div>
              <div style={{ fontSize: '16px', color: '#fff' }}>
                Allow personal marketing information
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          margin: '20px 0'
        }}>
          <button
            style={{
              background: 'rgba(220, 38, 38, 0.1)',
              border: '1px solid #dc2626',
              borderRadius: '12px',
              padding: '16px',
              color: '#dc2626',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// Page Components
function LeaderboardContent() {
  const [selectedPeriod, setSelectedPeriod] = useState('all-time');

  // Demo leaderboard data
  const leaderboardData = [
    {
      id: 1,
      name: 'Martha K.',
      xp: 300,
      level: 12,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b762?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Laura L.',
      xp: 300,
      level: 6,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Jane K.',
      xp: 300,
      level: 6,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Michael C.',
      xp: 300,
      level: 6,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Gordon R.',
      xp: 150,
      level: 6,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'Michelle L.',
      xp: 150,
      level: 6,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      paddingBottom: '100px'
    }}>
      <div style={{
        padding: '10px',
        maxWidth: '430px',
        margin: '0 auto'
      }}>
        {/* Title */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#ffffff',
          textAlign: 'center',
          margin: '20px 0 24px 0'
        }}>
          Leaderboard
        </h1>

        {/* Toggle Buttons */}
        <div style={{
          display: 'flex',
          background: 'rgba(75, 85, 99, 0.5)',
          borderRadius: '25px',
          padding: '4px',
          marginBottom: '32px',
          justifyContent: 'center',
          width: 'fit-content',
          margin: '0 auto 32px auto'
        }}>
          <button
            onClick={() => setSelectedPeriod('weekly')}
            style={{
              background: selectedPeriod === 'weekly' ? '#cff45e' : 'transparent',
              color: selectedPeriod === 'weekly' ? '#000000' : '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Weekly
          </button>
          <button
            onClick={() => setSelectedPeriod('all-time')}
            style={{
              background: selectedPeriod === 'all-time' ? '#cff45e' : 'transparent',
              color: selectedPeriod === 'all-time' ? '#000000' : '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            All Time
          </button>
        </div>

        {/* Crown and #1 User */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          {/* Crown */}
          <div style={{
            fontSize: '32px',
            marginBottom: '12px'
          }}>
            👑
          </div>

          {/* #1 User Profile */}
          <div style={{
            display: 'inline-block',
            position: 'relative'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '12px',
              backgroundColor: '#374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={leaderboardData[0].avatar}
                alt={leaderboardData[0].name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<span style="font-size: 36px;">👤</span>';
                  }
                }}
              />
            </div>
            
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              margin: '0 0 4px 0'
            }}>
              {leaderboardData[0].name}
            </h3>
            
            <p style={{
              fontSize: '14px',
              color: '#cff45e',
              margin: '0',
              fontWeight: 'normal'
            }}>
              {leaderboardData[0].xp} pts XP +{leaderboardData[0].level}
            </p>
          </div>
        </div>

        {/* Ranked List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {leaderboardData.slice(1).map((user, index) => (
            <div key={user.id} style={{
              background: 'rgba(75, 85, 99, 0.5)',
              borderRadius: '20px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              {/* Rank Number */}
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#ffffff',
                minWidth: '24px'
              }}>
                #{index + 2}
              </div>

              {/* Profile Image */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundImage: `url(${user.avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexShrink: 0
              }}></div>

              {/* Name */}
              <div style={{
                flex: 1,
                fontSize: '16px',
                fontWeight: '500',
                color: '#ffffff'
              }}>
                {user.name}
              </div>

              {/* XP Points */}
              <div style={{
                fontSize: '14px',
                color: '#cff45e',
                fontWeight: 'normal'
              }}>
                {user.xp} pts XP +{user.level}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard({ bookings }: { bookings: any[]; classes: any[] }) {
  const [selectedView, setSelectedView] = useState<'Overview' | 'Revenue' | 'Classes' | 'Instructors' | 'Student'>('Overview');

  // Calculate stats for display  
  const userIds = new Set();
  bookings.forEach(b => userIds.add(b.userId));
  // Using calculated and fallback values for display

  const renderOverviewDashboard = () => (
    <div style={{ padding: '20px', paddingBottom: '100px', minHeight: '100vh', background: '#cff45e' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 16px 0', color: '#000000', textAlign: 'center' }}>
          Dashboard
        </h1>
        
        {/* Statistics and Dropdown Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0', color: '#000000' }}>Statistics</h2>
          
          <div style={{ position: 'relative' }}>
            <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value as any)}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              minWidth: '120px'
            }}
          >
            <option value="Overview">Overview</option>
            <option value="Revenue">Revenue</option>
            <option value="Classes">Classes</option>
            <option value="Instructors">Instructors</option>
            <option value="Student">Student</option>
          </select>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '16px',
          padding: '20px',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '12px', marginBottom: '8px', opacity: 0.8 }}>Active Students</div>
          <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '4px' }}>132</div>
          <div style={{ fontSize: '12px', opacity: 0.6 }}>+ 28 this month</div>
        </div>

        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '16px',
          padding: '20px',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '12px', marginBottom: '8px', opacity: 0.8 }}>Active Classes</div>
          <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '4px' }}>18</div>
          <div style={{ fontSize: '12px', opacity: 0.6 }}>+ 3 this month</div>
        </div>

        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '16px',
          padding: '20px',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '12px', marginBottom: '8px', opacity: 0.8 }}>Average Attendance</div>
          <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '4px' }}>98%</div>
          <div style={{ fontSize: '12px', opacity: 0.6 }}>+ 5% this month</div>
        </div>

        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '16px',
          padding: '20px',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '12px', marginBottom: '8px', opacity: 0.8 }}>Utilization Rate</div>
          <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '4px' }}>75%</div>
          <div style={{ fontSize: '12px', opacity: 0.6 }}>+ 3% this month</div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#000000' }}>
          Recent Activity
        </h2>
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          padding: '20px',
          minHeight: '200px'
        }}>
          <div style={{ color: '#666666', textAlign: 'center', paddingTop: '60px' }}>
            Recent activity will appear here
          </div>
        </div>
      </div>
    </div>
  );

  const renderRevenueDashboard = () => (
    <div style={{ padding: '20px', paddingBottom: '100px', minHeight: '100vh', background: '#cff45e' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 16px 0', color: '#000000', textAlign: 'center' }}>Dashboard</h1>
        
        {/* Statistics and Dropdown Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0', color: '#000000' }}>Statistics</h2>
          
          <div style={{ position: 'relative' }}>
            <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value as any)}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              minWidth: '120px'
            }}
          >
            <option value="Overview">Overview</option>
            <option value="Revenue">Revenue</option>
            <option value="Classes">Classes</option>
            <option value="Instructors">Instructors</option>
            <option value="Student">Student</option>
          </select>
          </div>
        </div>
      </div>

      {/* Revenue Stats */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Total Monthly Revenue</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '75%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>12 / 48</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Avg Revenue per Instructor</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '46%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>23 / 50</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Avg Revenue per Course</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '80%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>80%</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Avg Revenue per Session</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '33%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>2 / 3</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Avg Revenue per Active Student</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '33%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>2 / 3</div>
        </div>
      </div>

      {/* Summary */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#000000' }}>Summary</h2>
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '16px',
          padding: '16px',
          border: '2px solid rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#000000', lineHeight: '1.5' }}>
            • Total Monthly Revenue is higher than last month. We are on track to beat historical records.
          </p>
        </div>
      </div>
    </div>
  );

  // Similar pattern for other dashboard views...
  const renderClassesDashboard = () => (
    <div style={{ padding: '20px', paddingBottom: '100px', minHeight: '100vh', background: '#cff45e' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 16px 0', color: '#000000', textAlign: 'center' }}>Dashboard</h1>
        
        {/* Statistics and Dropdown Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0', color: '#000000' }}>Statistics</h2>
          
          <div style={{ position: 'relative' }}>
            <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value as any)}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              minWidth: '120px'
            }}
          >
            <option value="Overview">Overview</option>
            <option value="Revenue">Revenue</option>
            <option value="Classes">Classes</option>
            <option value="Instructors">Instructors</option>
            <option value="Student">Student</option>
          </select>
          </div>
        </div>
      </div>

      {/* Classes Statistics */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Avg # Classes per Day</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '25%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>12 / 48</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Avg Capacity</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '46%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>23 / 50</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}># New Classes This Month</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '80%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>80%</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Total # Active Classes</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '67%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>2 / 3</div>
        </div>
      </div>

      {/* Summary */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#000000' }}>Summary</h2>
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '16px',
          padding: '16px',
          border: '2px solid rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#000000', lineHeight: '1.5' }}>
            • Avg Capacity has increased MoM. This could be the result of marketing efforts that convert and an aggressive student acquisition process.
          </p>
        </div>
      </div>
    </div>
  );

  const renderInstructorsDashboard = () => (
    <div style={{ padding: '20px', paddingBottom: '100px', minHeight: '100vh', background: '#cff45e' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 16px 0', color: '#000000', textAlign: 'center' }}>Dashboard</h1>
        
        {/* Statistics and Dropdown Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0', color: '#000000' }}>Statistics</h2>
          
          <div style={{ position: 'relative' }}>
            <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value as any)}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              minWidth: '120px'
            }}
          >
            <option value="Overview">Overview</option>
            <option value="Revenue">Revenue</option>
            <option value="Classes">Classes</option>
            <option value="Instructors">Instructors</option>
            <option value="Student">Student</option>
          </select>
          </div>
        </div>
      </div>

      {/* Instructors Statistics */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}># of New Instructors</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '25%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>12 / 48</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Total # Active Instructors</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '46%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>23 / 50</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Average # of Courses per Instructor</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '80%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>80%</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Avg Instructor Rating</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '67%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>2 / 3</div>
        </div>
      </div>

      {/* Summary */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#000000' }}>Summary</h2>
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '16px',
          padding: '16px',
          border: '2px solid rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#000000', lineHeight: '1.5' }}>
            • Total # of Instructors have risen since last month. This could be the result of a more aggressive partnership approach or could imply less favorable contract terms for our business.
          </p>
        </div>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div style={{ padding: '20px', paddingBottom: '100px', minHeight: '100vh', background: '#cff45e' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 16px 0', color: '#000000', textAlign: 'center' }}>Dashboard</h1>
        
        {/* Statistics and Dropdown Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0', color: '#000000' }}>Statistics</h2>
          
          <div style={{ position: 'relative' }}>
            <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value as any)}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              minWidth: '120px'
            }}
          >
            <option value="Overview">Overview</option>
            <option value="Revenue">Revenue</option>
            <option value="Classes">Classes</option>
            <option value="Instructors">Instructors</option>
            <option value="Student">Student</option>
          </select>
          </div>
        </div>
      </div>

      {/* Student Statistics */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}># of New Students</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '25%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>12 / 48</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Total # of Active Students</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '46%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>23 / 50</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Attendance Rate %</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '80%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>80%</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Avg Courses Enrolled per Student</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '67%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>2 / 3</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px' }}>Avg XP</div>
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#000000', height: '100%', width: '67%' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#000000', textAlign: 'right', marginTop: '4px' }}>2 / 3</div>
        </div>
      </div>

      {/* Summary */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#000000' }}>Summary</h2>
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '16px',
          padding: '16px',
          border: '2px solid rgba(0,0,0,0.1)'
        }}>
          <div style={{ margin: '0', fontSize: '14px', color: '#000000', lineHeight: '1.5' }}>
            <p style={{ margin: '0 0 12px 0' }}>
              • Number of new student enrolled is falling behind trend. This could be a result of a less aggressive student acquisition strategy.
            </p>
            <p style={{ margin: '0' }}>
              • Attendance Rate % has dropped since last month. This could imply a drop in class/instructor quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the appropriate dashboard based on selection
  switch (selectedView) {
    case 'Revenue':
      return renderRevenueDashboard();
    case 'Classes':
      return renderClassesDashboard();
    case 'Instructors':
      return renderInstructorsDashboard();
    case 'Student':
      return renderStudentDashboard();
    default:
      return renderOverviewDashboard();
  }
}

function DashboardContent({ user, bookings, classes }: { user: User; bookings: any[]; classes: any[] }) {
  if (user.role === 'admin') {
    return <AdminDashboard bookings={bookings} classes={classes} />;
  }

  return (
    <div style={{ padding: '10px', paddingBottom: '100px' }}>
      {/* Greeting Section */}
      <div style={{
        background: 'rgba(45, 46, 55, 0.9)',
        borderRadius: '16px',
        padding: '10px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #cff45e, #a3d977)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937'
        }}>
          {user.display_name?.charAt(0) || 'E'}
        </div>
        
        <div style={{ flex: 1 }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#ffffff', 
            margin: '0 0 4px 0' 
          }}>
            Hello {user.display_name || 'Emily'}!
          </h2>
          <p style={{ 
            fontSize: '14px', 
            color: '#9ca3af', 
            margin: '0 0 8px 0' 
          }}>
            You are a champ
          </p>
          
          {/* XP Progress Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Starter</span>
            <div style={{ 
              flex: 1, 
              height: '4px', 
              background: '#374151', 
              borderRadius: '2px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '60%',
                background: '#cff45e',
                borderRadius: '2px'
              }} />
              {/* Progress dots */}
              {[0, 25, 50, 75, 100].map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${pos}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: i <= 2 ? '#cff45e' : '#374151',
                  border: '1px solid #2d2e37'
                }} />
              ))}
            </div>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Legend</span>
          </div>
        </div>
        
        <div style={{
          color: '#cff45e',
          fontSize: '32px'
        }}>
          🏆
        </div>
      </div>

      {/* Upcoming Classes */}
      <div style={{
        background: 'rgba(45, 46, 55, 0.9)',
        borderRadius: '16px',
        padding: '10px',
        marginBottom: '16px'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#ffffff', 
          margin: '0 0 16px 0' 
        }}>
          Upcoming Classes
        </h3>
        
        {(() => {
          // Get user's confirmed bookings
          const userBookings = bookings.filter(booking => 
            booking.userId === user.firebase_uid && booking.status === 'confirmed'
          );
          
          // Get class details for booked classes
          const upcomingClasses = userBookings
            .map(booking => classes.find(cls => cls.id === booking.classId))
            .filter(cls => cls && new Date(cls.start_time) > new Date()) // Only future classes
            .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime()) // Sort by date
            .slice(0, 3); // Show only next 3 classes

          if (upcomingClasses.length === 0) {
            return (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#9ca3af'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>
                  📅
                </div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  margin: '0 0 8px 0'
                }}>
                  No Upcoming Classes
                </h4>
                <p style={{
                  fontSize: '14px',
                  margin: '0'
                }}>
                  Book a class to see it here!
                </p>
              </div>
            );
          }

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {upcomingClasses.map((cls) => (
                <div key={cls.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px'
                }}>
                  {/* Instructor Image */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundImage: `url(${cls.instructor_image || cls.image_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexShrink: 0
                  }}>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      fontSize: '16px', 
                      fontWeight: 'normal', 
                      color: '#ffffff', 
                      margin: '0 0 4px 0',
                      lineHeight: '1.2'
                    }}>
                      {cls.title} with {cls.instructor_name}
                    </h4>
                    <div style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      fontSize: '14px', 
                      color: '#9ca3af',
                      alignItems: 'center'
                    }}>
                      <span>
                        {new Date(cls.start_time).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          weekday: 'short'
                        })}
                      </span>
                      <span>
                        {new Date(cls.start_time).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </span>
                      <span>
                        {cls.duration_minutes} mins
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div style={{
                    background: '#cff45e',
                    color: '#000000',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    Booked
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Awards & Badges */}
      <div style={{
        background: 'rgba(45, 46, 55, 0.9)',
        borderRadius: '16px',
        padding: '10px',
        marginBottom: '16px'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#ffffff', 
          margin: '0 0 16px 0' 
        }}>
          Awards & Badges
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '16px',
          marginBottom: '16px'
        }}>
          {[
            { icon: '🏆', label: 'Leaderboard', earned: true },
            { icon: '🌅', label: 'Morning Bird', earned: true },
            { icon: '📊', label: '10 day Streak', earned: true },
            { icon: '⭐', label: 'Gold Star', earned: false }
          ].map((badge, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: badge.earned ? '#cff45e' : '#374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                margin: '0 auto 8px auto',
                opacity: badge.earned ? 1 : 0.3
              }}>
                {badge.icon}
              </div>
              <div style={{
                fontSize: '12px',
                color: badge.earned ? '#cff45e' : '#6b7280',
                fontWeight: '500'
              }}>
                {badge.label}
              </div>
            </div>
          ))}
        </div>

        {/* Second row of badges */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '16px'
        }}>
          {[
            { icon: '🏆', label: 'Leaderboard', earned: false },
            { icon: '🌅', label: 'Morning Bird', earned: false },
            { icon: '📊', label: '10 day Streak', earned: false },
            { icon: '⭐', label: 'Gold Star', earned: false }
          ].map((badge, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                margin: '0 auto 8px auto',
                opacity: 0.3
              }}>
                {badge.icon}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                {badge.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div style={{
        background: 'rgba(45, 46, 55, 0.9)',
        borderRadius: '16px',
        padding: '10px',
        marginBottom: '16px'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#ffffff', 
          margin: '0' 
        }}>
          Leaderboard
        </h3>
      </div>
    </div>
  );
}
function AdminClassesContent() {
  // Place hooks here, at the top of the function
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [errorClasses, setErrorClasses] = useState<string | null>(null);
  const [schedule, setSchedule] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [errorSchedule, setErrorSchedule] = useState<string | null>(null);
  
  // Add other necessary state
  const [currentView, setCurrentView] = useState<'class' | 'schedule'>('class');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [editSessionMode, setEditSessionMode] = useState(false);

  return (
    <div style={{ 
      padding: '20px',
      paddingBottom: '100px',
      minHeight: '100vh',
      background: '#cff45e'
    }}>
      <h2 style={{
        fontSize: '18px',
        fontWeight: '600',
        margin: '0 0 20px 0',
        color: '#000000'
      }}>
        Classes Management
      </h2>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        padding: '16px',
        margin: '16px 0'
      }}>
        <p style={{ color: '#000000', margin: 0 }}>
          Classes management functionality will be implemented here.
        </p>
      </div>
    </div>
  );
}
function BrowseContent({ classes, setCurrentPage, setSelectedClass, getClassStats }: {
  classes: any[];
  setCurrentPage: (page: string) => void;
  setSelectedClass: (cls: any) => void;
  getClassStats: (classId: number, maxCapacity?: number) => any;
}) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState({
    time: 'all',
    difficulty: 'all',
    instructor: 'all'
  });

  // Get unique categories from classes
  const categories = ['all', ...Array.from(new Set(classes.map(cls => cls.category)))];
  
  // Filter classes based on search query and filters
  const filteredClasses = classes.filter(cls => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.instructor_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedFilter === 'all' || cls.category === selectedFilter;
    
    // Time filter (mock implementation - you can enhance this based on actual time data)
    const matchesTime = filterOptions.time === 'all' || true; // Add actual time filtering logic
    
    // Difficulty filter (mock implementation - add difficulty field to classes)
    const matchesDifficulty = filterOptions.difficulty === 'all' || true; // Add actual difficulty filtering
    
    // Instructor filter
    const matchesInstructor = filterOptions.instructor === 'all' || 
      cls.instructor_name.toLowerCase().includes(filterOptions.instructor.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesTime && matchesDifficulty && matchesInstructor;
  });

  // Get featured classes
  const featuredClasses = classes.filter(cls => cls.is_featured);

  // Group classes by category
  const classesByCategory: Record<string, any[]> = categories.reduce((acc, category) => {
    if (category === 'all') return acc;
    acc[category] = classes.filter(cls => cls.category === category);
    return acc;
  }, {} as Record<string, any[]>);

  const renderClassCard = (cls: any, showImage: boolean = false) => {
    const stats = getClassStats(cls.id, cls.maxCapacity);

    return (
      <div
        key={cls.id}
        style={{
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '12px',
          cursor: 'pointer'
        }}
        onClick={() => {
          setSelectedClass(cls);
          setCurrentPage('class-details');
        }}
      >
        <div style={{ display: 'flex', gap: showImage ? '12px' : '0' }}>
          {showImage && (
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, #cff45e, #a3d977)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              flexShrink: 0
            }}>
              {cls.category === 'Yoga' && '🧘‍♀️'}
              {cls.category === 'Fitness' && '💪'}
              {cls.category === 'Meditation' && '🧘'}
              {cls.category === 'Pilates' && '🤸‍♀️'}
            </div>
          )}
          
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#cff45e',
              margin: '0 0 4px 0'
            }}>
              {cls.title}
            </h3>
            
            <p style={{
              fontSize: '14px',
              color: '#9ca3af',
              margin: '0 0 8px 0',
              lineHeight: '1.4'
            }}>
              {cls.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                with {cls.instructor_name}
              </div>
              
              <div style={{
                background: stats.availableSpots > 0 ? '#10b981' : '#ef4444',
                color: '#ffffff',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '600'
              }}>
                {stats.availableSpots > 0 ? `${stats.availableSpots} spots` : 'Full'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '10px', paddingBottom: '100px' }}>
      {/* Page Title */}
      <h1 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#ffffff',
        margin: '20px 0 24px 0',
        textAlign: 'left'
      }}>
        Browse
      </h1>

      {/* Search Bar with Filter Button */}
      <div style={{ 
        position: 'relative', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ 
          position: 'relative', 
          flex: 1,
          background: 'rgba(156, 163, 175, 0.2)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px'
        }}>
          <svg 
            width="20" 
            height="20" 
            fill="none" 
            stroke="#9ca3af" 
            viewBox="0 0 24 24"
            style={{ marginRight: '12px' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search classes, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '16px',
              width: '100%',
              padding: '12px 0'
            }}
          />
        </div>
        
        <button
          onClick={() => setShowFilterModal(true)}
          style={{
            background: 'rgba(45, 46, 55, 0.9)',
            border: '2px solid #cff45e',
            borderRadius: '12px',
            padding: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg 
            width="20" 
            height="20" 
            fill="none" 
            stroke="#cff45e" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
        </button>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'flex-end'
        }}>
          <div style={{
            background: '#1f2937',
            width: '100%',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '20px',
            maxHeight: '75vh',
            overflowY: 'auto'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#ffffff',
                margin: 0
              }}>
                Filter Classes
              </h3>
              <button
                onClick={() => setShowFilterModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#9ca3af',
                  fontSize: '28px',
                  cursor: 'pointer',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* Time Filter */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#cff45e',
                marginBottom: '10px'
              }}>
                Time
              </h4>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['all', 'morning', 'afternoon', 'evening'].map(time => (
                  <button
                    key={time}
                    onClick={() => setFilterOptions(prev => ({ ...prev, time }))}
                    style={{
                      background: filterOptions.time === time ? '#cff45e' : 'transparent',
                      color: filterOptions.time === time ? '#000000' : '#ffffff',
                      border: `2px solid ${filterOptions.time === time ? '#cff45e' : 'rgba(45, 46, 55, 0.9)'}`,
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      minWidth: '70px',
                      textAlign: 'center'
                    }}
                  >
                    {time === 'all' ? 'All Times' : time.charAt(0).toUpperCase() + time.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#cff45e',
                marginBottom: '10px'
              }}>
                Difficulty
              </h4>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['all', 'beginner', 'intermediate', 'advanced'].map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => setFilterOptions(prev => ({ ...prev, difficulty }))}
                    style={{
                      background: filterOptions.difficulty === difficulty ? '#cff45e' : 'transparent',
                      color: filterOptions.difficulty === difficulty ? '#000000' : '#ffffff',
                      border: `2px solid ${filterOptions.difficulty === difficulty ? '#cff45e' : 'rgba(45, 46, 55, 0.9)'}`,
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      minWidth: '70px',
                      textAlign: 'center'
                    }}
                  >
                    {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Instructor Filter */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#cff45e',
                marginBottom: '10px'
              }}>
                Instructor
              </h4>
              <input
                type="text"
                placeholder="Search by instructor name..."
                value={filterOptions.instructor === 'all' ? '' : filterOptions.instructor}
                onChange={(e) => setFilterOptions(prev => ({ 
                  ...prev, 
                  instructor: e.target.value || 'all' 
                }))}
                style={{
                  background: 'rgba(156, 163, 175, 0.2)',
                  border: '2px solid rgba(45, 46, 55, 0.9)',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  fontSize: '14px',
                  color: '#ffffff',
                  width: '100%',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Apply Filters Button */}
            <button
              onClick={() => setShowFilterModal(false)}
              style={{
                background: '#cff45e',
                color: '#000000',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                marginTop: '10px'
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              style={{
                background: selectedFilter === category 
                  ? 'rgba(45, 46, 55, 0.9)' 
                  : 'transparent',
                border: selectedFilter === category 
                  ? '2px solid #cff45e' 
                  : '2px solid rgba(45, 46, 55, 0.9)',
                color: selectedFilter === category ? '#cff45e' : '#ffffff',
                borderRadius: '12px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {category === 'all' ? 'All Classes' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Classes Section */}
      {(selectedFilter === 'all' && featuredClasses.length > 0) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0 0 16px 0'
          }}>
            Featured Classes
          </h2>
          
          <div>
            {featuredClasses.map(cls => renderClassCard(cls, true))}
          </div>
        </div>
      )}

      {/* Category Sections */}
      {selectedFilter === 'all' ? (
        Object.entries(classesByCategory).map(([category, categoryClasses]) => (
          <div key={category} style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#ffffff',
              margin: '0 0 16px 0'
            }}>
              {category}
            </h2>
            
            <div>
              {categoryClasses.map(cls => renderClassCard(cls, false))}
            </div>
          </div>
        ))
      ) : (
        <div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0 0 16px 0'
          }}>
            {selectedFilter} Classes
          </h2>
          
          <div>
            {filteredClasses.map(cls => renderClassCard(cls, false))}
          </div>
        </div>
      )}

      {filteredClasses.length === 0 && (
        <div style={{
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px',
          padding: '40px 20px',
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <p style={{ color: '#9ca3af', fontSize: '16px' }}>
            No classes found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

function ClassDetailsContent({ classData, setCurrentPage, getClassStats, handleBookClass, setSelectedInstructor, findInstructorByName }: {
  classData: any;
  setCurrentPage: (page: string) => void;
  getClassStats: (classId: number, maxCapacity?: number) => any;
  handleBookClass: (classId: number, className: string, maxCapacity: number) => void;
  setSelectedInstructor: (instructor: any) => void;
  findInstructorByName: (name: string) => any;
}) {
  // Get class stats for displaying available spots
  getClassStats(classData.id, classData.maxCapacity);

  const learningOutcomes = [
    'Master fundamental yoga poses and alignment',
    'Learn proper breathing techniques for relaxation',
    'Develop flexibility and core strength',
    'Build a foundation for regular yoga practice'
  ];

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Class Image */}
      <div style={{
        height: '300px',
        margin: '0 10px 20px 10px',
        borderRadius: '16px',
        background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
        backgroundImage: classData.image_url ? `url(${classData.image_url})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('classes')}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: '#000000',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          <span style={{ color: '#cff45e', fontSize: '18px', fontWeight: 'bold' }}>←</span>
        </button>

        {/* Gradient overlay for better text readability */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))'
        }} />
      </div>

      <div style={{ padding: '0 10px' }}>
        {/* Class Details Section */}
        <div style={{
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px',
          padding: '10px',
          marginBottom: '16px'
        }}>
          {/* Class Name */}
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ffffff',
            margin: '0 0 12px 0'
          }}>
            {classData.title}
          </h1>

          {/* Class Description */}
          <p style={{
            fontSize: '16px',
            color: '#d1d5db',
            lineHeight: '1.5',
            margin: '0 0 24px 0'
          }}>
            {classData.description}
          </p>

          {/* Class Highlights Component */}
          <div>
            {/* Top horizontal line */}
            <div style={{
              height: '1px',
              background: '#4b5563',
              margin: '0 0 16px 0'
            }} />

            {/* Highlight content boxes */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0 0 16px 0'
            }}>
              {/* Level */}
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Level
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#cff45e'
                }}>
                  {classData.difficulty?.charAt(0).toUpperCase() + classData.difficulty?.slice(1)}
                </div>
              </div>

              {/* Vertical divider */}
              <div style={{
                width: '1px',
                height: '40px',
                background: '#4b5563',
                margin: '0 20px'
              }} />

              {/* Duration */}
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Duration
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#cff45e'
                }}>
                  {classData.duration_minutes} min
                </div>
              </div>

              {/* Vertical divider */}
              <div style={{
                width: '1px',
                height: '40px',
                background: '#4b5563',
                margin: '0 20px'
              }} />

              {/* Certificate */}
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Certificate
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#cff45e'
                }}>
                  Yes
                </div>
              </div>
            </div>

            {/* Bottom horizontal line */}
            <div style={{
              height: '1px',
              background: '#4b5563'
            }} />
          </div>
        </div>

        {/* Learning Outcomes Section */}
        <div style={{
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px',
          padding: '10px',
          marginBottom: '16px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0 0 16px 0'
          }}>
            Learning Outcomes
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {learningOutcomes.map((outcome, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#cff45e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>+</span>
                </div>
                <span style={{
                  fontSize: '15px',
                  color: '#d1d5db',
                  lineHeight: '1.4'
                }}>
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Section */}
        <div style={{
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px',
          padding: '10px',
          marginBottom: '16px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0 0 24px 0'
          }}>
            Schedule
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Tuesday, Oct 14 */}
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#cff45e',
                marginBottom: '12px'
              }}>
                Tue, Oct 14
              </div>
              
              {/* Class 1 */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 'normal',
                    color: '#ffffff',
                    width: '50px',
                    textAlign: 'right'
                  }}>
                    10:00
                  </span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 'normal',
                    color: '#9ca3af',
                    width: '25px'
                  }}>
                    AM
                  </span>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 'normal',
                    color: '#ffffff',
                    flex: 1
                  }}>
                    Morning Flow
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    width: '45px',
                    textAlign: 'right'
                  }}>
                    60 min
                  </span>
                </div>
                
                <button
                  onClick={() => handleBookClass(classData.id, classData.title, classData.maxCapacity)}
                  style={{
                    background: '#cff45e',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginLeft: '8px'
                  }}
                >
                  Book
                </button>
              </div>

              {/* Class 2 */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 'normal',
                    color: '#ffffff',
                    width: '50px',
                    textAlign: 'right'
                  }}>
                    7:00
                  </span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 'normal',
                    color: '#9ca3af',
                    width: '25px'
                  }}>
                    PM
                  </span>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 'normal',
                    color: '#ffffff',
                    flex: 1
                  }}>
                    Evening Power
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    width: '45px',
                    textAlign: 'right'
                  }}>
                    90 min
                  </span>
                </div>
                
                <button
                  onClick={() => handleBookClass(classData.id, classData.title, classData.maxCapacity)}
                  style={{
                    background: '#cff45e',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginLeft: '8px'
                  }}
                >
                  Book
                </button>
              </div>
            </div>

            {/* Thursday, Oct 16 */}
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#cff45e',
                marginBottom: '12px'
              }}>
                Thu, Oct 16
              </div>
              
              {/* Class 1 */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 'normal',
                    color: '#ffffff',
                    width: '50px',
                    textAlign: 'right'
                  }}>
                    6:00
                  </span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 'normal',
                    color: '#9ca3af',
                    width: '25px'
                  }}>
                    AM
                  </span>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 'normal',
                    color: '#ffffff',
                    flex: 1
                  }}>
                    Sunrise Session
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    width: '45px',
                    textAlign: 'right'
                  }}>
                    60 min
                  </span>
                </div>
                
                <button
                  onClick={() => handleBookClass(classData.id, classData.title, classData.maxCapacity)}
                  style={{
                    background: '#cff45e',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginLeft: '8px'
                  }}
                >
                  Book
                </button>
              </div>

              {/* Class 2 */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 'normal',
                    color: '#ffffff',
                    width: '50px',
                    textAlign: 'right'
                  }}>
                    5:30
                  </span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 'normal',
                    color: '#9ca3af',
                    width: '25px'
                  }}>
                    PM
                  </span>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 'normal',
                    color: '#ffffff',
                    flex: 1
                  }}>
                    Core Strength
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    width: '45px',
                    textAlign: 'right'
                  }}>
                    60 min
                  </span>
                </div>
                
                <button
                  onClick={() => handleBookClass(classData.id, classData.title, classData.maxCapacity)}
                  style={{
                    background: '#cff45e',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginLeft: '8px'
                  }}
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Section */}
        <div style={{
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px',
          padding: '10px',
          marginBottom: '16px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0 0 16px 0'
          }}>
            Instructor
          </h2>

          <div 
            onClick={() => {
              const instructor = findInstructorByName(classData.instructor_name);
              if (instructor) {
                setSelectedInstructor(instructor);
                setCurrentPage('instructor-details');
              }
            }}
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {/* Instructor Image */}
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: '#6b7280',
              flexShrink: 0
            }}>
              👩‍🏫
            </div>

            {/* Instructor Info */}
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff',
                margin: '0 0 4px 0'
              }}>
                {classData.instructor_name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#cff45e',
                margin: '0'
              }}>
                {(() => {
                  const instructor = findInstructorByName(classData.instructor_name);
                  return instructor ? instructor.title : 'Yoga Master Teacher';
                })()}
              </p>
            </div>

            {/* Right arrow indicator */}
            <div style={{
              color: '#9ca3af',
              fontSize: '16px'
            }}>
              →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstructorDetailsContent({ instructorData, setCurrentPage, classes, handleBookClass }: {
  instructorData: any;
  setCurrentPage: (page: string) => void;
  classes: any[];
  handleBookClass: (classId: number) => Promise<void>;
}) {
  // Get classes taught by this instructor
  const instructorClasses = classes.filter(cls => 
    cls.instructor_name === instructorData.name
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      paddingBottom: '100px'
    }}>
      <div style={{
        padding: '10px',
        maxWidth: '430px',
        margin: '0 auto'
      }}>
        {/* Top Section - Instructor Image with Name & Title */}
        <div style={{
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px',
          padding: '0',
          marginBottom: '16px',
          overflow: 'hidden'
        }}>
          {/* Instructor Image */}
          <div style={{
            width: '100%',
            height: '280px',
            backgroundImage: `url(${instructorData.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '16px 16px 0 0',
            position: 'relative'
          }}>
            {/* Back Button */}
            <button
              onClick={() => setCurrentPage('class-details')}
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: '#000000',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}
            >
              <span style={{ color: '#cff45e', fontSize: '18px', fontWeight: 'bold' }}>←</span>
            </button>

            {/* Name and title overlay */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              padding: '40px 20px 20px 20px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#ffffff',
                margin: '0 0 4px 0'
              }}>
                {instructorData.name}
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#cff45e',
                margin: '0'
              }}>
                {instructorData.title}
              </p>
            </div>
          </div>
        </div>

        {/* About Section with Highlights */}
        <div style={{
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px',
          padding: '10px',
          marginBottom: '16px'
        }}>
          {/* About */}
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0 0 16px 0'
          }}>
            About
          </h3>
          
          <p style={{
            fontSize: '16px',
            color: '#ffffff',
            lineHeight: '1.5',
            margin: '0 0 24px 0'
          }}>
            {instructorData.bio}
          </p>

          {/* Highlight Component */}
          <div>
            {/* Top horizontal line */}
            <div style={{
              height: '1px',
              background: 'rgba(255, 255, 255, 0.2)',
              margin: '0 0 16px 0'
            }}></div>

            {/* Three highlight boxes */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {/* Experience */}
              <div style={{
                textAlign: 'center',
                flex: '1'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  margin: '0 0 4px 0'
                }}>
                  Experience
                </p>
                <p style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#cff45e',
                  margin: '0'
                }}>
                  {instructorData.experience_years} years
                </p>
              </div>

              {/* Vertical divider */}
              <div style={{
                width: '1px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.2)',
                margin: '0 16px'
              }}></div>

              {/* Completed Classes */}
              <div style={{
                textAlign: 'center',
                flex: '1'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  margin: '0 0 4px 0'
                }}>
                  Completed
                </p>
                <p style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#cff45e',
                  margin: '0'
                }}>
                  {instructorData.classes_completed}
                </p>
              </div>

              {/* Vertical divider */}
              <div style={{
                width: '1px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.2)',
                margin: '0 16px'
              }}></div>

              {/* Students */}
              <div style={{
                textAlign: 'center',
                flex: '1'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  margin: '0 0 4px 0'
                }}>
                  Students
                </p>
                <p style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#cff45e',
                  margin: '0'
                }}>
                  {instructorData.students_taught}+
                </p>
              </div>
            </div>

            {/* Bottom horizontal line */}
            <div style={{
              height: '1px',
              background: 'rgba(255, 255, 255, 0.2)',
              margin: '16px 0 0 0'
            }}></div>
          </div>

          {/* Classes Section */}
          <div style={{
            marginTop: '24px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#ffffff',
              margin: '0 0 16px 0'
            }}>
              Classes
            </h3>

            {instructorClasses.map((cls) => (
              <div key={cls.id} style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                {/* Class Image */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  backgroundImage: `url(${cls.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexShrink: 0
                }}>
                </div>

                {/* Class Info */}
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                    margin: '0'
                  }}>
                    {cls.title}
                  </h4>
                </div>

                {/* Book Button */}
                <button
                  onClick={() => handleBookClass(cls.id)}
                  style={{
                    background: '#cff45e',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ratings Section */}
        <div style={{
          background: 'rgba(45, 46, 55, 0.9)',
          borderRadius: '16px',
          padding: '10px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '24px',
            marginBottom: '20px'
          }}>
            {/* Total Score */}
            <div style={{
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '700',
                color: '#ffffff',
                lineHeight: '1'
              }}>
                {instructorData.rating}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#9ca3af',
                marginTop: '4px'
              }}>
                {instructorData.total_ratings} Ratings
              </div>
            </div>

            {/* Rating Bars */}
            <div style={{ flex: 1 }}>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <span style={{ color: '#9ca3af', fontSize: '12px', minWidth: '8px' }}>
                    {star}
                  </span>
                  <div style={{
                    flex: 1,
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: star === 5 ? '85%' : star === 4 ? '12%' : star === 3 ? '2%' : star === 2 ? '1%' : '0%',
                      background: '#cff45e',
                      borderRadius: '2px'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Review */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}>
                👤
              </div>
              <div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  Sarah M.
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#cff45e'
                }}>
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#ffffff',
              lineHeight: '1.4',
              margin: '0'
            }}>
              "Amazing instructor! {instructorData.name} creates such a welcoming environment and really helps you improve your technique. Highly recommend!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Admin Page Components
function AdminInstructorsContent() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null);

  // If an instructor is selected, show the detail/edit view
  if (selectedInstructor) {
    return (
      <AdminInstructorDetailsContent 
        instructor={selectedInstructor}
        onBack={() => setSelectedInstructor(null)}
      />
    );
  }

// Demo instructor data with more detailed information
// ...at the top of AdminInstructorsContent


const [instructors, setInstructors] = useState([]);
const [loadingInstructors, setLoadingInstructors] = useState(true);
const [errorInstructors, setErrorInstructors] = useState<string | null>(null);

useEffect(() => {
  async function fetchInstructors() {
    setLoadingInstructors(true);
    setErrorInstructors(null);
    try {
      const data = await getInstructors();
      setInstructors(data);
    } catch (err) {
      setErrorInstructors('Could not load instructors.');
    } finally {
      setLoadingInstructors(false);
    }
  }
  fetchInstructors();
}, []);

  return (
    <div style={{ 
      padding: '0px', 
      paddingBottom: '100px',
      minHeight: '100vh',
      background: '#cff45e' // Lime green background like in the image
    }}>
      {/* Header */}
      <div style={{ 
        padding: '20px 16px 16px 16px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          margin: '0',
          color: '#000000'
        }}>
          Instructor Management
        </h1>
      </div>

      {/* View Toggle and Filter */}
      <div style={{
        padding: '0 16px 16px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* View Toggle */}
        <div style={{
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '25px',
          padding: '4px'
        }}>
          <button
            onClick={() => setViewMode('list')}
            style={{
              background: viewMode === 'list' ? '#000000' : 'transparent',
              color: viewMode === 'list' ? '#ffffff' : '#000000',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              background: viewMode === 'grid' ? '#000000' : 'transparent',
              color: viewMode === 'grid' ? '#ffffff' : '#000000',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Grid View
          </button>
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          style={{
            background: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span style={{ fontSize: '16px' }}>☰</span>
        </button>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#cff45e',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <button
              onClick={() => setShowFilter(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#000000'
              }}
            >
              ✖
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                color: '#000000',
                textDecoration: 'underline'
              }}
            >
              Reset All
            </button>
          </div>

          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 20px 0',
            color: '#000000'
          }}>
            Filter
          </h2>

          <div style={{
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}></div>

          {/* Filter Options */}
          {[
            { label: 'Date', value: 'Oct 3 - Oct 7, 2026' },
            { label: 'Time', value: '' },
            { label: 'Instructors', value: 'Yulia' },
            { label: 'Category', value: '' },
            { label: 'Availability', value: '> 50%' }
          ].map((filter, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 0',
              borderBottom: '1px solid rgba(0,0,0,0.1)'
            }}>
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#000000',
                  marginBottom: '4px'
                }}>
                  {filter.label}
                </div>
                {filter.value && (
                  <div style={{
                    fontSize: '14px',
                    color: 'rgba(0,0,0,0.6)'
                  }}>
                    {filter.value}
                  </div>
                )}
              </div>
              <span style={{ fontSize: '16px', color: '#000000' }}>›</span>
            </div>
          ))}
        </div>
      )}

      {/* Content Container */}
      <div style={{ padding: '0 16px' }}>
        {/* List View */}
        {viewMode === 'list' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {instructors.map((instructor) => (
              <div 
                key={instructor.id} 
                onClick={() => setSelectedInstructor(instructor)}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundImage: `url(${instructor.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexShrink: 0
                }}></div>
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#000000',
                    marginBottom: '4px'
                  }}>
                    {instructor.name}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: 'rgba(0,0,0,0.7)'
                  }}>
                    {instructor.title}
                  </div>
                </div>

                <span style={{ fontSize: '16px', color: '#000000' }}>›</span>
              </div>
            ))}
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            {instructors.map((instructor) => (
              <div 
                key={instructor.id} 
                onClick={() => setSelectedInstructor(instructor)}
                style={{
                  position: 'relative',
                  height: '200px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${instructor.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}></div>
                
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '60%',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '16px'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '4px'
                  }}>
                    {instructor.name}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.8)'
                  }}>
                    {instructor.title}
                  </div>
                  
                  {/* Specialty Tags */}
                  <div style={{
                    display: 'flex',
                    gap: '4px',
                    marginTop: '8px'
                  }}>
                    {instructor.specialties.slice(0, 2).map((specialty, index) => (
                      <span key={index} style={{
                        background: '#cff45e',
                        color: '#000000',
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '8px',
                        fontWeight: '500'
                      }}>
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status indicator */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981'
                }}></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminQuickActionsContent() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [currentForm, setCurrentForm] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [availableInstructors, setAvailableInstructors] = useState<{ id: string; name: string }[]>([]);
  
  // Form data states
  const [classFormData, setClassFormData] = useState({
    title: '',
    instructor_id: '',
    category: 'Yoga' as const,
    difficulty_level: 'All Levels' as const,
    description: '',
    learning_outcomes: '',
    price: 25,
    max_capacity: 20,
    duration_minutes: 60,
    location: '',
    certification_required: false,
    is_active: true,
    xp_reward: 10
  });

  // Load available instructors when component mounts or form opens
  useEffect(() => {
    if (currentForm === 'add-class') {
      loadInstructors();
    }
  }, [currentForm]);

  const loadInstructors = async () => {
    try {
      // For now, use mock data until we have the proper database setup
      const mockInstructors = [
        { id: 'inst-1', name: 'Sarah Johnson' },
        { id: 'inst-2', name: 'Mike Thompson' },
        { id: 'inst-3', name: 'Dr. Lisa Chen' },
        { id: 'inst-4', name: 'Emma Rodriguez' },
        { id: 'inst-5', name: 'Yulia Petrov' }
      ];
      setAvailableInstructors(mockInstructors);
    } catch (error) {
      console.error('Failed to load instructors:', error);
    }
  };

  const handleClassFormSubmit = async () => {
    if (!classFormData.title || !classFormData.instructor_id) {
      setSubmitMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Prepare class data for database
      const newClassData = {
        title: classFormData.title,
        instructor_name: availableInstructors.find(i => i.id === classFormData.instructor_id)?.name || 'Unknown',
        category: classFormData.category,
        difficulty: classFormData.difficulty_level.toLowerCase(),
        start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        duration_minutes: classFormData.duration_minutes,
        maxCapacity: classFormData.max_capacity,
        current_bookings: 0,
        price: classFormData.price,
        location: classFormData.location || 'Studio A',
        description: classFormData.description,
        learning_outcomes: classFormData.learning_outcomes,
        is_featured: false,
        is_active: classFormData.is_active,
        xp_reward: classFormData.xp_reward
      };

      // Use mock database for now (replace with real database later)
      const mockDatabase = (window as any).mockDatabase;
      if (mockDatabase) {
        const result = await mockDatabase.addClass(newClassData);
        if (!result.success) {
          throw new Error(result.error || 'Failed to create class');
        }
        console.log('[Admin] Class created with ID:', result.class_id);
      } else {
        console.log('[Admin] Mock database not available, simulating success');
      }
      
      // Add to classes array (this would normally be handled by real-time database updates)
      // In production, this would trigger a re-fetch of classes or be handled by real-time subscriptions
      
      setSubmitMessage({ type: 'success', text: 'Class created successfully!' });
      
      // Reset form
      setClassFormData({
        title: '',
        instructor_id: '',
        category: 'Yoga',
        difficulty_level: 'All Levels',
        description: '',
        learning_outcomes: '',
        price: 25,
        max_capacity: 20,
        duration_minutes: 60,
        location: '',
        certification_required: false,
        is_active: true,
        xp_reward: 10
      });

      // Close form after 2 seconds
      setTimeout(() => {
        setCurrentForm(null);
        setSubmitMessage(null);
      }, 2000);

    } catch (error) {
      console.error('Failed to create class:', error);
      setSubmitMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to create class' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const showForm = (formType: string) => {
    setCurrentForm(formType);
  };

  const closeForm = () => {
    setCurrentForm(null);
    setSubmitMessage(null);
  };

  const dropdownItemStyle = {
    background: 'transparent',
    color: '#000000',
    border: 'none',
    borderRadius: '0',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '400',
    cursor: 'pointer',
    textAlign: 'left' as const,
    width: '100%',
    transition: 'background-color 0.2s ease',
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  };

  // Form rendering functions
  const renderAddClassForm = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: '430px',
      margin: '0 auto',
      background: '#cff45e',
      zIndex: 1000,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
    }}>
      <div style={{
        padding: '20px',
        paddingBottom: '120px',
        minHeight: '100vh',
        boxSizing: 'border-box'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          position: 'relative'
        }}>
        <button
          onClick={closeForm}
          style={{
            position: 'absolute',
            left: 0,
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#000000'
          }}
        >
          ✕
        </button>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          margin: 0,
          color: '#000000'
        }}>
          Add Class
        </h2>
      </div>

      {/* Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Class Name *
          </label>
          <input
            type="text"
            placeholder="Beginner's Yoga"
            value={classFormData.title}
            onChange={(e) => setClassFormData(prev => ({ ...prev, title: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Instructor *
          </label>
          <select 
            value={classFormData.instructor_id}
            onChange={(e) => setClassFormData(prev => ({ ...prev, instructor_id: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          >
            <option value="">Select an instructor</option>
            {availableInstructors.map(instructor => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Category
          </label>
          <select 
            value={classFormData.category}
            onChange={(e) => setClassFormData(prev => ({ ...prev, category: e.target.value as any }))}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          >
            <option value="Yoga">Yoga</option>
            <option value="Fitness">Fitness</option>
            <option value="Pilates">Pilates</option>
            <option value="Meditation">Meditation</option>
            <option value="Dance">Dance</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Class Description
          </label>
          <textarea
            placeholder="Enter class description..."
            value={classFormData.description}
            onChange={(e) => setClassFormData(prev => ({ ...prev, description: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              minHeight: '80px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Learning Outcomes
          </label>
          <textarea
            placeholder="Enter learning outcomes and goals..."
            value={classFormData.learning_outcomes}
            onChange={(e) => setClassFormData(prev => ({ ...prev, learning_outcomes: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              minHeight: '80px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Level
          </label>
          <select 
            value={classFormData.difficulty_level}
            onChange={(e) => setClassFormData(prev => ({ ...prev, difficulty_level: e.target.value as any }))}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          >
            <option value="All Levels">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
              Duration
            </label>
            <input
              type="number"
              placeholder="60"
              value={classFormData.duration_minutes}
              onChange={(e) => setClassFormData(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) || 60 }))}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.2)',
                background: '#ffffff',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
              Capacity
            </label>
            <input
              type="number"
              placeholder="20"
              value={classFormData.max_capacity}
              onChange={(e) => setClassFormData(prev => ({ ...prev, max_capacity: parseInt(e.target.value) || 20 }))}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.2)',
                background: '#ffffff',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
              Price ($)
            </label>
            <input
              type="number"
              placeholder="25"
              value={classFormData.price}
              onChange={(e) => setClassFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 25 }))}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.2)',
                background: '#ffffff',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
              XP Reward
            </label>
            <input
              type="number"
              placeholder="10"
              value={classFormData.xp_reward}
              onChange={(e) => setClassFormData(prev => ({ ...prev, xp_reward: parseInt(e.target.value) || 10 }))}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.2)',
                background: '#ffffff',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Location
          </label>
          <input
            type="text"
            placeholder="Studio A - Main Floor"
            value={classFormData.location}
            onChange={(e) => setClassFormData(prev => ({ ...prev, location: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="checkbox" 
            id="certification" 
            checked={classFormData.certification_required}
            onChange={(e) => setClassFormData(prev => ({ ...prev, certification_required: e.target.checked }))}
          />
          <label htmlFor="certification" style={{ fontSize: '14px', color: '#000000' }}>
            Certification Required
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="checkbox" 
            id="active" 
            checked={classFormData.is_active}
            onChange={(e) => setClassFormData(prev => ({ ...prev, is_active: e.target.checked }))}
          />
          <label htmlFor="active" style={{ fontSize: '14px', color: '#000000' }}>
            Active (visible to students)
          </label>
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Profile Image
          </label>
          <button style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(0,0,0,0.2)',
            background: '#ffffff',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            Upload Image
          </button>
        </div>

        {/* Success/Error Message */}
        {submitMessage && (
          <div style={{
            padding: '12px',
            borderRadius: '8px',
            background: submitMessage.type === 'success' ? '#10b981' : '#ef4444',
            color: '#ffffff',
            fontSize: '14px',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            {submitMessage.text}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ marginTop: '24px', paddingBottom: '80px' }}>
          <button 
            onClick={handleClassFormSubmit}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '25px',
              border: 'none',
              background: isSubmitting ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.8)',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '500',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginBottom: '8px'
            }}
          >
            {isSubmitting ? 'Creating...' : 'Add Class'}
          </button>
          <button
            onClick={closeForm}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '25px',
              border: 'none',
              background: 'rgba(0, 0, 0, 0.4)',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '500',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </div>
  );

  const renderAddSessionForm = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '430px',
      height: '100vh',
      background: '#cff45e',
      zIndex: 1000,
      padding: '20px',
      boxSizing: 'border-box',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        position: 'relative'
      }}>
        <button
          onClick={closeForm}
          style={{
            position: 'absolute',
            left: 0,
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#000000'
          }}
        >
          ✕
        </button>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          margin: 0,
          color: '#000000'
        }}>
          Add Class Session
        </h2>
      </div>

      {/* Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '20px' }}>
        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Class Name
          </label>
          <select style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid rgba(0,0,0,0.2)',
            background: '#ffffff',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}>
            <option>Beginner's Yoga</option>
            <option>Advanced Yoga</option>
            <option>HIIT Training</option>
            <option>Pilates</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Instructor
          </label>
          <select style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid rgba(0,0,0,0.2)',
            background: '#ffffff',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}>
            <option>Yulia</option>
            <option>Sarah Thompson</option>
            <option>Bert Johnson</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Start Time
          </label>
          <input
            type="text"
            placeholder="Wed, 10 / 3 / 2026, 8:00 AM"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            End Time
          </label>
          <input
            type="text"
            placeholder="Wed, 10 / 3 / 2026, 9:00 AM"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Class Capacity
          </label>
          <input
            type="text"
            placeholder="38"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Class Description
          </label>
          <textarea
            placeholder="This is a class description&#10;This is a class description&#10;This is a class description"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              minHeight: '80px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" id="sessionActive" defaultChecked />
          <label htmlFor="sessionActive" style={{ fontSize: '14px', color: '#000000' }}>
            Active (visible to students)
          </label>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '24px' }}>
          <button style={{
            width: '100%',
            padding: '12px',
            borderRadius: '25px',
            border: 'none',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '8px'
          }}>
            Add Session
          </button>
          <button
            onClick={closeForm}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '25px',
              border: 'none',
              background: 'rgba(0, 0, 0, 0.4)',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderAddInstructorForm = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '430px',
      height: '100vh',
      background: '#cff45e',
      zIndex: 1000,
      padding: '20px',
      boxSizing: 'border-box',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        position: 'relative'
      }}>
        <button
          onClick={closeForm}
          style={{
            position: 'absolute',
            left: 0,
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#000000'
          }}
        >
          ✕
        </button>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          margin: 0,
          color: '#000000'
        }}>
          Add Instructor
        </h2>
      </div>

      {/* Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '20px' }}>
        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Full Name
          </label>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Title
          </label>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Bio
          </label>
          <textarea
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              minHeight: '80px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            List of credentials
          </label>
          <textarea
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              minHeight: '60px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
              Email
            </label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.2)',
                background: '#ffffff',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
              Phone
            </label>
            <input
              type="tel"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.2)',
                background: '#ffffff',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Status
          </label>
          <div style={{ display: 'flex', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#000000' }}>
              <input type="radio" name="status" value="active" defaultChecked />
              Active
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#000000' }}>
              <input type="radio" name="status" value="inactive" />
              Inactive
            </label>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#000000', marginBottom: '4px', display: 'block' }}>
            Profile Image
          </label>
          <button style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(0,0,0,0.2)',
            background: '#ffffff',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            Upload Image
          </button>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '24px' }}>
          <button style={{
            width: '100%',
            padding: '12px',
            borderRadius: '25px',
            border: 'none',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '8px'
          }}>
            Add Instructor
          </button>
          <button
            onClick={closeForm}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '25px',
              border: 'none',
              background: 'rgba(0, 0, 0, 0.4)',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Render forms if one is selected
  if (currentForm === 'addClass') return renderAddClassForm();
  if (currentForm === 'addSession') return renderAddSessionForm();
  if (currentForm === 'addInstructor') return renderAddInstructorForm();

  return (
    <div style={{ 
      padding: '20px 16px', 
      paddingBottom: '100px',
      minHeight: '100vh',
      background: '#cff45e'
    }}>
      <h2 style={{
        fontSize: '18px',
        fontWeight: '600',
        margin: '0 0 20px 0',
        color: '#000000'
      }}>
        Quick Actions
      </h2>

      {/* Functions Section */}
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#000000',
          marginBottom: '12px'
        }}>
          Functions
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Add Section */}
          <div>
            <button
              onClick={() => toggleSection('add')}
              style={{
                background: expandedSection === 'add' ? 'rgba(0,0,0,0.1)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#000000',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <span>Add</span>
              <span style={{ 
                transform: expandedSection === 'add' ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}>
                ▼
              </span>
            </button>
            
            {/* Add dropdown items */}
            {expandedSection === 'add' && (
              <div style={{ 
                marginTop: '4px',
                background: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                marginLeft: '12px'
              }}>
                <button 
                  style={dropdownItemStyle}
                  onClick={() => showForm('addClass')}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Add Class
                </button>
                <button 
                  style={dropdownItemStyle}
                  onClick={() => showForm('addSession')}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Add Session
                </button>
                <button 
                  style={{...dropdownItemStyle, borderBottom: 'none'}}
                  onClick={() => showForm('addInstructor')}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Add Instructor
                </button>
              </div>
            )}
          </div>
          
          {/* Edit Section */}
          <div>
            <button
              onClick={() => toggleSection('edit')}
              style={{
                background: expandedSection === 'edit' ? 'rgba(0,0,0,0.1)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#000000',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <span>Edit</span>
              <span style={{ 
                transform: expandedSection === 'edit' ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}>
                ▼
              </span>
            </button>
            
            {/* Edit dropdown items */}
            {expandedSection === 'edit' && (
              <div style={{ 
                marginTop: '4px',
                background: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                marginLeft: '12px'
              }}>
                <button 
                  style={dropdownItemStyle}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Edit Class
                </button>
                <button 
                  style={dropdownItemStyle}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Edit Session
                </button>
                <button 
                  style={{...dropdownItemStyle, borderBottom: 'none'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Edit Instructor
                </button>
              </div>
            )}
          </div>
          
          {/* Operations Section */}
          <div>
            <button
              onClick={() => toggleSection('operations')}
              style={{
                background: expandedSection === 'operations' ? 'rgba(0,0,0,0.1)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#000000',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <span>Operations</span>
              <span style={{ 
                transform: expandedSection === 'operations' ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}>
                ▼
              </span>
            </button>
            
            {/* Operations dropdown items */}
            {expandedSection === 'operations' && (
              <div style={{ 
                marginTop: '4px',
                background: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                marginLeft: '12px'
              }}>
                <button 
                  style={dropdownItemStyle}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  View All Stats
                </button>
                <button 
                  style={dropdownItemStyle}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Download Report
                </button>
                <button 
                  style={{...dropdownItemStyle, borderBottom: 'none'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Payroll Data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminUserManagementContent({ onSelectUser }: { onSelectUser: (user: any) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'all' | 'student' | 'instructor'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedCategory, setSelectedCategory] = useState('N/A');
  const [selectedXP, setSelectedXP] = useState('1 - XP > 10');
  const [joinDateRange, setJoinDateRange] = useState('2023, July 1 - 31');

// Mock user data
const mockUsers = [
    {
      id: '1',
      name: 'Emily Carlton',
      email: 'emily@wellnesshub.com',
      role: 'student',
      status: 'active',
      joinDate: 'Jul 2022',
      xp: 150,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150'
    }
  ];

const [users, setUsers] = useState([]);
const [loadingUsers, setLoadingUsers] = useState(true);
const [errorUsers, setErrorUsers] = useState<string | null>(null);

useEffect(() => {
  async function fetchUsers() {
    setLoadingUsers(true);
    setErrorUsers(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setErrorUsers('Could not load users.');
    } finally {
      setLoadingUsers(false);
    }
  }
  fetchUsers();
}, []);

  // Filter users based on search and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'instructor': return { bg: '#10b981', text: '#ffffff' };
      case 'student': return { bg: '#8b5cf6', text: '#ffffff' };
      default: return { bg: '#6b7280', text: '#ffffff' };
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return { bg: '#10b981', text: '#ffffff' };
      case 'inactive': return { bg: '#ef4444', text: '#ffffff' };
      default: return { bg: '#6b7280', text: '#ffffff' };
    }
  };

  return (
    <div style={{ 
      padding: '0px', 
      paddingBottom: '100px',
      minHeight: '100vh',
      background: '#cff45e'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '20px 16px 16px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          margin: '0',
          color: '#000000'
        }}>
          User Management
        </h2>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          style={{
            background: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span style={{ fontSize: '16px' }}>☰</span>
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '0 16px 16px 16px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 40px 12px 16px',
              borderRadius: '25px',
              border: '1px solid rgba(0,0,0,0.2)',
              background: '#ffffff',
              fontSize: '14px',
              color: '#000000',
              boxSizing: 'border-box'
            }}
          />
          <div style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(0,0,0,0.5)',
            fontSize: '16px'
          }}>
            🔍
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          height: '100vh',
          background: '#cff45e',
          zIndex: 1000,
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            paddingTop: '20px'
          }}>
            <button
              onClick={() => setShowFilter(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#000000',
                padding: '5px'
              }}
            >
              ✕
            </button>
            <button
              onClick={() => {
                setSelectedRole('all');
                setSelectedStatus('all');
                setSelectedCategory('N/A');
                setSelectedXP('1 - XP > 10');
                setJoinDateRange('2023, July 1 - 31');
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                color: '#000000',
                textDecoration: 'underline',
                fontWeight: '400'
              }}
            >
              Reset All
            </button>
          </div>

          {/* Filter Title */}
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 30px 0',
            color: '#000000'
          }}>
            Filter
          </h2>

          {/* Divider line */}
          <div style={{
            borderBottom: '1px solid rgba(0,0,0,0.2)',
            marginBottom: '20px'
          }}></div>

          {/* Filter Options */}
          {[
            { 
              label: 'Role', 
              value: selectedRole === 'all' ? 'Students' : selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1), 
              hasValue: selectedRole !== 'all' 
            },
            { label: 'Join Date', value: joinDateRange, hasValue: true },
            { 
              label: 'Status', 
              value: selectedStatus === 'all' ? '' : selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1), 
              hasValue: selectedStatus !== 'all' 
            },
            { label: 'Category', value: selectedCategory, hasValue: selectedCategory !== 'N/A' },
            { label: 'XP', value: selectedXP, hasValue: true }
          ].map((filter, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '18px 0',
              borderBottom: index < 4 ? '1px solid rgba(0,0,0,0.1)' : 'none',
              cursor: 'pointer'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#000000',
                  marginBottom: filter.hasValue ? '4px' : '0'
                }}>
                  {filter.label}
                </div>
                {filter.hasValue && filter.value && (
                  <div style={{
                    fontSize: '14px',
                    color: 'rgba(0,0,0,0.6)',
                    fontWeight: '400'
                  }}>
                    {filter.value}
                  </div>
                )}
              </div>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cff45e',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                ›
              </div>
            </div>
          ))}
        </div>
      )}

      {/* User List */}
      <div style={{ padding: '0 16px' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {filteredUsers.map((user) => {
            const roleBadge = getRoleBadgeColor(user.role);
            const statusBadge = getStatusBadgeColor(user.status);
            
            return (
              <div 
                key={user.id}
                onClick={() => onSelectUser(user)}
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  borderRadius: '12px',
                  padding: '0 12px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  minHeight: '72px'
                }}
              >
                {/* User Avatar */}
                <div style={{
                  width: '80px',
                  height: '72px',
                  borderRadius: '12px 0 0 12px',
                  backgroundImage: `url(${user.avatar})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#4a5568',
                  flexShrink: 0
                }}></div>

                {/* User Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '2px'
                  }}>
                    {user.name}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '4px'
                  }}>
                    {user.email}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.5)'
                  }}>
                    {user.joinDate}
                  </div>
                </div>

                {/* Badges and XP */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px'
                }}>
                  {/* Role Badge */}
                  <div style={{
                    background: roleBadge.bg,
                    color: roleBadge.text,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {user.role}
                  </div>
                  
                  {/* Status Badge */}
                  <div style={{
                    background: statusBadge.bg,
                    color: statusBadge.text,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {user.status}
                  </div>

                  {/* XP for students */}
                  {user.role === 'student' && user.xp && (
                    <div style={{
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.7)',
                      fontWeight: '500'
                    }}>
                      {user.xp} XP
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AdminInstructorUserDetailsContent({ user, onBack }: { user: any; onBack: () => void }) {
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [selectedView, setSelectedView] = useState<string>('Statistics');

  // Enhanced instructor data based on your screenshot
  const instructorDetails = {
    ...user,
    firstName: user.name.split(' ')[0] || 'Sara',
    lastName: user.name.split(' ')[1] || 'Thompson',
    fullName: user.name || 'Sara Thompson',
    avatar: user.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    joinedDate: 'Jul 2022',
    phone: '+853 63777685',
    email: user.email || 'sarathompson@email.com',
    birthday: '28/02/1990',
    address: '40 Rainey Street, Austin TX 78701',
    role: user.role || 'Instructor',
    status: user.status || 'Active',
    
    // Instructor-specific statistics from screenshot
    firstJoined: 'Jul 2023 (1 year)',
    activeClasses: 3,
    totalClassesToDate: 5,
    upcomingSessions: 5,
    totalSessionsGiven: 50,
    avgStudentAttendance: '90%',
    avgTuitionPerSession: '$350',
    avgSessionCapacity: '70%'
  };

  // Payroll data based on screenshot
  const payrollData = {
    scheduledSessionsThisMonth: 30,
    classesGivenThisMonth: 15,
    totalClassesToDate: 5,
    upcomingSessions: 5,
    totalSessionsGiven: 50,
    totalMonthlyTuitionByInstructor: '$20,000',
    averageRevenuePerSession: '$350',
    instructorPayout: '50%'
  };

  const handleDeactivateInstructor = () => {
    setIsDeactivating(true);
    // Mock deactivation - in real app, this would call your API
    setTimeout(() => {
      setIsDeactivating(false);
      onBack(); // Return to user list
    }, 1000);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#cff45e',
      paddingBottom: '100px'
    }}>
      {/* Header with Back Button */}
      <div style={{
        padding: '20px 16px 16px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <span style={{ color: '#cff45e', fontSize: '18px', fontWeight: 'bold' }}>←</span>
        </button>
        
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          margin: '0',
          color: '#000000'
        }}>
          View Instructor
        </h2>
      </div>

      {/* Instructor Profile Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 16px 30px 16px'
      }}>
        {/* Profile Picture */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundImage: `url(${instructorDetails.avatar})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#4a5568',
          marginBottom: '16px',
          border: '4px solid rgba(0, 0, 0, 0.1)'
        }}></div>

        {/* Name and Join Date */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#000000',
          margin: '0 0 4px 0',
          textAlign: 'center'
        }}>
          {instructorDetails.fullName}
        </h3>
        
        <p style={{
          fontSize: '14px',
          color: 'rgba(0, 0, 0, 0.6)',
          margin: '0',
          textAlign: 'center'
        }}>
          Joined {instructorDetails.joinedDate}
        </p>
      </div>

      {/* Instructor Info Card */}
      <div style={{
        margin: '0 16px 20px 16px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '16px',
        padding: '20px'
      }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          margin: '0 0 16px 0'
        }}>
          Instructor Info
        </h4>

        {/* Personal Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
              Last Name
            </div>
            <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
              {instructorDetails.lastName}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
              First Name
            </div>
            <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
              {instructorDetails.firstName}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            Phone
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
            {instructorDetails.phone}
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            Email
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
            {instructorDetails.email}
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            Birthday
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
            {instructorDetails.birthday}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            Address
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
            {instructorDetails.address}
          </div>
        </div>
      </div>

      {/* Role Management Card */}
      <div style={{
        margin: '0 16px 20px 16px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '16px',
        padding: '20px'
      }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          margin: '0 0 16px 0'
        }}>
          Role Management
        </h4>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
            Role
          </div>
          <select
            value={instructorDetails.role}
            onChange={() => {}} // Add role change logic
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '14px',
              color: '#ffffff',
              minWidth: '120px'
            }}
          >
            <option value="Instructor">Instructor</option>
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            Status
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
            {instructorDetails.status}
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            Communications
          </div>
        </div>
      </div>

      {/* Statistics Card */}
      <div style={{
        margin: '0 16px 20px 16px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '16px',
        padding: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0'
          }}>
            {selectedView}
          </h4>
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '12px',
              color: '#ffffff'
            }}
          >
            <option value="Statistics">Statistics</option>
            <option value="Payroll Data">Payroll Data</option>
          </select>
        </div>

        {/* Instructor Statistics */}
        {selectedView === 'Statistics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'First joined', value: instructorDetails.firstJoined },
              { label: 'Active # classes', value: instructorDetails.activeClasses },
              { label: 'Total # classes to date', value: instructorDetails.totalClassesToDate },
              { label: 'Upcoming # sessions', value: instructorDetails.upcomingSessions },
              { label: 'Total # sessions given', value: instructorDetails.totalSessionsGiven },
              { label: 'Avg student attendance %', value: instructorDetails.avgStudentAttendance },
              { label: 'Average tuition per session', value: instructorDetails.avgTuitionPerSession },
              { label: 'Avg session capacity %', value: instructorDetails.avgSessionCapacity }
            ].map((stat, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: index < 7 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}
              >
                <div style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  flex: 1
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#ffffff',
                  fontWeight: '500',
                  textAlign: 'right'
                }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payroll Data View */}
        {selectedView === 'Payroll Data' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: '# Scheduled sessions this month', value: payrollData.scheduledSessionsThisMonth },
              { label: '# Classes given this month', value: payrollData.classesGivenThisMonth },
              { label: 'Total # classes to date', value: payrollData.totalClassesToDate },
              { label: 'Upcoming # sessions', value: payrollData.upcomingSessions },
              { label: 'Total # sessions given', value: payrollData.totalSessionsGiven },
              { label: 'Total monthly tuition by instructor', value: payrollData.totalMonthlyTuitionByInstructor },
              { label: 'Average revenue per session', value: payrollData.averageRevenuePerSession },
              { label: 'Instructor payout', value: payrollData.instructorPayout }
            ].map((item, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: index < 7 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}
              >
                <div style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  flex: 1
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#ffffff',
                  fontWeight: '500',
                  textAlign: 'right'
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Deactivate Button */}
      <div style={{
        margin: '0 16px',
        textAlign: 'center'
      }}>
        <button
          onClick={handleDeactivateInstructor}
          disabled={isDeactivating}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#dc2626',
            fontSize: '16px',
            fontWeight: '500',
            cursor: isDeactivating ? 'not-allowed' : 'pointer',
            textDecoration: 'underline',
            opacity: isDeactivating ? 0.6 : 1
          }}
        >
          {isDeactivating ? 'Deactivating...' : 'Deactivate Instructor'}
        </button>
      </div>
    </div>
  );
}

function AdminUserDetailsContent({ user, onBack }: { user: any; onBack: () => void }) {
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [selectedView, setSelectedView] = useState<string>('Statistics');

  // Enhanced user data with detailed statistics based on your screenshot
  const userDetails = {
    ...user,
    firstName: user.name.split(' ')[0] || 'Emily',
    lastName: user.name.split(' ')[1] || 'Carlton',
    fullName: user.name || 'Emily Carlton',
    avatar: user.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b602?w=150&h=150&fit=crop&crop=face',
    joinedDate: 'Jul 2022',
    phone: '+853 63777685',
    email: user.email || 'emilycarlton@email.com',
    birthday: '28/02/1990',
    address: '40 Rainey Street, Austin TX 78701',
    role: user.role || 'Student',
    status: user.status || 'Active',
    
    // Statistics from screenshot
    firstJoined: 'Jul 2022 (2.8 years)',
    totalClassesBooked: 30,
    lastBookedClass: 'Aug 30 (27 days ago)',
    totalClassTypesBooked: 3,
    mostBookedClass: "Beginner's Yoga w/ Yulia",
    attendanceRate: '100%',
    lastActivity: 'Aug 30 (27 days ago)',
    xpPoints: user.xp || 32
  };

  // Mock booking history data based on screenshot
  const bookingHistory = [
    { date: '3/13/2023', className: "Beginner's Yoga w/ Yulia", attended: 'Yes' },
    { date: '3/17/2023', className: "Beginner's Yoga w/ Yulia", attended: 'Yes' },
    { date: '3/20/2023', className: 'Yoga Stretch w/ Sam', attended: 'No' },
    { date: '4/1/2023', className: "Beginner's Yoga w/ Yulia", attended: 'Yes' },
    { date: '4/10/2023', className: 'Yoga Stretch w/ Sam', attended: 'Yes' },
    { date: '4/13/2023', className: "Beginner's Yoga w/ Yulia", attended: 'Yes' },
    { date: '5/20/2023', className: "Beginner's Yoga w/ Yulia", attended: 'Yes' },
    { date: '6/9/2023', className: "Beginner's Yoga w/ Yulia", attended: 'Yes' }
  ];

  // Mock payment history data with improved mobile-friendly structure
  const paymentHistory = [
    {
      date: '3/12/2023',
      description: 'Monthly Subscription Unlimited',
      amount: '$3,500',
      method: 'Credit',
      transactionId: 'tranx_id_001',
      status: 'completed'
    },
    {
      date: '4/12/2023',
      description: 'Monthly Subscription Unlimited',
      amount: '$3,500',
      method: 'Credit',
      transactionId: 'tranx_id_002',
      status: 'completed'
    },
    {
      date: '5/12/2023',
      description: 'Monthly Subscription Unlimited',
      amount: '$3,500',
      method: 'Mpay',
      transactionId: 'tranx_id_003',
      status: 'completed'
    },
    {
      date: '6/20/2023',
      description: 'Course Purchase (Yoga Mastery w/ Yulia)',
      amount: '$6,500',
      method: 'Credit',
      transactionId: 'tranx_id_004',
      status: 'completed'
    }
  ];

  const handleDeactivateUser = () => {
    setIsDeactivating(true);
    // Mock deactivation - in real app, this would call your API
    setTimeout(() => {
      setIsDeactivating(false);
      onBack(); // Return to user list
    }, 1000);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#cff45e',
      paddingBottom: '100px'
    }}>
      {/* Header with Back Button */}
      <div style={{
        padding: '20px 16px 16px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <span style={{ color: '#cff45e', fontSize: '18px', fontWeight: 'bold' }}>←</span>
        </button>
        
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          margin: '0',
          color: '#000000'
        }}>
          View User
        </h2>
      </div>

      {/* User Profile Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 16px 30px 16px'
      }}>
        {/* Profile Picture */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundImage: `url(${userDetails.avatar})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#4a5568',
          marginBottom: '16px',
          border: '4px solid rgba(0, 0, 0, 0.1)'
        }}></div>

        {/* Name and Join Date */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#000000',
          margin: '0 0 4px 0',
          textAlign: 'center'
        }}>
          {userDetails.fullName}
        </h3>
        
        <p style={{
          fontSize: '14px',
          color: 'rgba(0, 0, 0, 0.6)',
          margin: '0',
          textAlign: 'center'
        }}>
          Joined {userDetails.joinedDate}
        </p>
      </div>

      {/* User Info Card */}
      <div style={{
        margin: '0 16px 20px 16px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '16px',
        padding: '20px'
      }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          margin: '0 0 16px 0'
        }}>
          User Info
        </h4>

        {/* Personal Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
              Last Name
            </div>
            <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
              {userDetails.lastName}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
              First Name
            </div>
            <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
              {userDetails.firstName}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            Phone
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
            {userDetails.phone}
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            Email
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
            {userDetails.email}
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            Birthday
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
            {userDetails.birthday}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            Address
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
            {userDetails.address}
          </div>
        </div>
      </div>

      {/* Role Management Card */}
      <div style={{
        margin: '0 16px 20px 16px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '16px',
        padding: '20px'
      }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          margin: '0 0 16px 0'
        }}>
          Role Management
        </h4>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
            Role
          </div>
          <select
            value={userDetails.role}
            onChange={() => {}} // Add role change logic
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '14px',
              color: '#ffffff',
              minWidth: '120px'
            }}
          >
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            Status
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
            {userDetails.status}
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            Communications
          </div>
        </div>
      </div>

      {/* Statistics Card */}
      <div style={{
        margin: '0 16px 20px 16px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '16px',
        padding: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0'
          }}>
            {selectedView}
          </h4>
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '12px',
              color: '#ffffff'
            }}
          >
            <option value="Statistics">Statistics</option>
            <option value="Booking History">Booking History</option>
            <option value="Payment History">Payment History</option>
            <option value="Activity">Activity</option>
            <option value="Classes">Classes</option>
          </select>
        </div>

        {/* Content based on selected view */}
        {selectedView === 'Statistics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'First joined', value: userDetails.firstJoined },
              { label: 'Total # classes booked to date', value: userDetails.totalClassesBooked },
              { label: 'Last booked class', value: userDetails.lastBookedClass },
              { label: 'Total # class types booked', value: userDetails.totalClassTypesBooked },
              { label: 'Most booked class', value: userDetails.mostBookedClass },
              { label: 'Attendance %', value: userDetails.attendanceRate },
              { label: 'Last booked class', value: userDetails.lastActivity },
              { label: 'XP', value: userDetails.xpPoints }
            ].map((stat, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: index < 7 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}
              >
                <div style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  flex: 1
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#ffffff',
                  fontWeight: '500',
                  textAlign: 'right'
                }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedView === 'Booking History' && (
          <div>
            {/* Booking History Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr',
              gap: '16px',
              padding: '8px 0 12px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              marginBottom: '12px'
            }}>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: '500'
              }}>
                Date
              </div>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: '500'
              }}>
                Class
              </div>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: '500',
                textAlign: 'right'
              }}>
                Attended?
              </div>
            </div>

            {/* Booking History List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {bookingHistory.map((booking, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 1fr',
                    gap: '16px',
                    padding: '10px 0',
                    borderBottom: index < bookingHistory.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    alignItems: 'center'
                  }}
                >
                  <div style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    {booking.date}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#ffffff',
                    fontWeight: '400'
                  }}>
                    {booking.className}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: booking.attended === 'Yes' ? '#10b981' : '#ef4444',
                    fontWeight: '500',
                    textAlign: 'right'
                  }}>
                    {booking.attended}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'Payment History' && (
          <div>
            {/* Payment History Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {paymentHistory.map((payment, index) => (
                <div 
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Top row: Date and Amount */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: '500'
                    }}>
                      {payment.date}
                    </div>
                    <div style={{
                      fontSize: '16px',
                      color: '#10b981',
                      fontWeight: '600'
                    }}>
                      {payment.amount}
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{
                    fontSize: '15px',
                    color: '#ffffff',
                    fontWeight: '500',
                    marginBottom: '8px',
                    lineHeight: '1.3'
                  }}>
                    {payment.description}
                  </div>

                  {/* Bottom row: Payment method and Transaction ID */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {/* Payment method badge */}
                      <div style={{
                        background: payment.method === 'Credit' ? '#3b82f6' : '#8b5cf6',
                        color: '#ffffff',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        {payment.method}
                      </div>
                      
                      {/* Status indicator */}
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#10b981'
                      }}></div>
                    </div>

                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontFamily: 'monospace'
                    }}>
                      {payment.transactionId}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Footer */}
            <div style={{
              marginTop: '16px',
              padding: '12px 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                Total: {paymentHistory.length} transactions
              </div>
            </div>
          </div>
        )}

        {selectedView === 'Activity' && (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            Activity view coming soon...
          </div>
        )}

        {selectedView === 'Classes' && (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            Classes view coming soon...
          </div>
        )}
      </div>

      {/* Deactivate Button */}
      <div style={{
        margin: '0 16px',
        textAlign: 'center'
      }}>
        <button
          onClick={handleDeactivateUser}
          disabled={isDeactivating}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#dc2626',
            fontSize: '16px',
            fontWeight: '500',
            cursor: isDeactivating ? 'not-allowed' : 'pointer',
            textDecoration: 'underline',
            opacity: isDeactivating ? 0.6 : 1
          }}
        >
          {isDeactivating ? 'Deactivating...' : 'Deactivate Student'}
        </button>
      </div>
    </div>
  );
}

function AdminInstructorDetailsContent({ instructor, onBack }){
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: instructor.name || 'Unknown Instructor',
    title: instructor.title || 'Wellness Instructor',
    bio: instructor.bio || 'Experienced wellness instructor dedicated to helping students achieve their health and fitness goals.',
    credentials: instructor.credentials || 'Certified fitness professional with specialized training',
    email: instructor.email || 'instructor@wellnesshub.com',
    phone: instructor.phone || '555-0123',
    status: instructor.status || 'Active',
    image: instructor.image,
    specialties: instructor.specialties || ['Wellness'],
    years_experience: instructor.experience ? parseInt(instructor.experience) : 5
  });
  
  // Add all other state variables needed
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [editSessionMode, setEditSessionMode] = useState(false);
  const [currentView, setCurrentView] = useState('class');
  const [showFilter, setShowFilter] = useState(false);
  const [classFormData, setClassFormData] = useState({
    // Class form data initial state
    className: '',
    instructor: '',
    category: '',
    description: '',
    learningOutcomes: '',
    level: '',
    duration: '',
    capacity: '',
    certification: false,
    isActive: true
  });
  const [sessionFormData, setSessionFormData] = useState({
    // Session form data initial state
    className: '',
    instructor: '',
    startTime: '',
    endTime: '',
    capacity: '',
    description: '',
    isActive: true
  });

  // Add missing state variables
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [errorClasses, setErrorClasses] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [errorSchedule, setErrorSchedule] = useState(null);
  const [editMode2, setEditMode2] = useState(false);

  // Add useEffect hooks
  useEffect(() => {
    async function fetchClasses() {
      setLoadingClasses(true);
      setErrorClasses(null);
      try {
        const data = await getClasses();
        setClasses(data);
      } catch (err) {
        setErrorClasses('Could not load classes.');
      } finally {
        setLoadingClasses(false);
      }
    }
    fetchClasses();
  }, []);

  useEffect(() => {
    async function fetchSchedule() {
      setLoadingSchedule(true);
      setErrorSchedule(null);
      try {
        const data = await getSchedule();
        setSchedule(data);
      } catch (err) {
        setErrorSchedule('Could not load schedule.');
      } finally {
        setLoadingSchedule(false);
      }
    }
    if (classes.length > 0) fetchSchedule();
  }, [classes]);
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateInstructor = async () => {
    // Implementation as before
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Mocked implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage({ type: 'success', text: 'Instructor updated successfully!' });
      
      // Update the instructor data
      Object.assign(instructor, {
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        email: formData.email,
        phone: formData.phone,
        status: formData.status
      });

      setTimeout(() => {
        setEditMode(false);
        setSubmitMessage(null);
      }, 2000);
    } catch (error) {
      console.error('Failed to update instructor:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to update instructor' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: instructor.name || 'Unknown Instructor',
      title: instructor.title || 'Wellness Instructor',
      bio: instructor.bio || 'Experienced wellness instructor dedicated to helping students achieve their health and fitness goals.',
      credentials: instructor.credentials || 'Certified fitness professional with specialized training',
      email: instructor.email || 'instructor@wellnesshub.com',
      phone: instructor.phone || '555-0123',
      status: instructor.status || 'Active',
      image: instructor.image,
      specialties: instructor.specialties || ['Wellness'],
      years_experience: instructor.experience ? parseInt(instructor.experience) : 5
    });
    setEditMode(false);
    setSubmitMessage(null);
  };

  // Include all the other functions (renderEditClassForm, renderEditSessionForm, etc.)
  // that were previously outside the component
  
  // Helper function for status colors
  const getCapacityColor = (status) => {
    switch(status) {
      case 'Full': return '#ef4444';
      case 'Limited': return '#f59e0b';
      default: return '#10b981';
    }
  };

  // Mock data for classes and schedule
  const mockClasses = [
    // Your mock class data here
  ];
  
  const mockSchedule = [
    // Your mock schedule data here
  ];
  
  // If in edit mode, show the edit form
  if (editMode) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#cff45e',
        paddingBottom: '100px'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 16px 16px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: '0',
            color: '#000000'
          }}>
            Edit Instructor
          </h1>
        </div>
        
        {/* Form content as before */}
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#cff45e',
      paddingBottom: '100px'
    }}>
      {/* Component content as before */}
    </div>
  );
} // End of AdminInstructorDetailsContent function

  // Mock data for what students see
// ...existing code...




  // ...rest of your AdminClassesContent code...


// ...existing code...
  const handleInputChange = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateInstructor = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitMessage({ type: 'error', text: 'Name and email are required' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Use mock service for now (replace with real service when database is ready)
      const mockInstructorService = (window as any).mockInstructorService;
      
      if (mockInstructorService) {
        const result = await mockInstructorService.updateInstructor(instructor.id, formData);
        if (!result.success) {
          throw new Error(result.error || 'Failed to update instructor');
        }
      } else {
        // Fallback mock simulation
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('[Admin] Mock instructor update:', formData);
      }

      setSubmitMessage({ type: 'success', text: 'Instructor updated successfully!' });
      
      // Update the instructor data in parent component
      Object.assign(instructor, {
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        email: formData.email,
        phone: formData.phone,
        status: formData.status
      });

      // Close edit mode after 2 seconds
      setTimeout(() => {
        setEditMode(false);
        setSubmitMessage(null);
      }, 2000);

    } catch (error) {
      console.error('Failed to update instructor:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to update instructor' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: instructor.name || 'Unknown Instructor',
      title: instructor.title || 'Wellness Instructor',
      bio: instructor.bio || 'Experienced wellness instructor dedicated to helping students achieve their health and fitness goals.',
      credentials: instructor.credentials || 'Certified fitness professional with specialized training',
      email: instructor.email || 'instructor@wellnesshub.com',
      phone: instructor.phone || '555-0123',
      status: instructor.status || 'Active',
      image: instructor.image,
      specialties: instructor.specialties || ['Wellness'],
      years_experience: instructor.experience ? parseInt(instructor.experience) : 5
    });
    setEditMode(false);
    setSubmitMessage(null);
  };

  // Main component render
  return (
    <div style={{
      minHeight: '100vh',
      background: '#cff45e',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '40px',
        borderRadius: '16px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          margin: '0 0 16px 0',
          color: '#000000'
        }}>
          Wellness Hub Admin
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#000000',
          margin: '0'
        }}>
          Class management system loading...
        </p>
      </div>
    </div>
  );
}

export default App;
                  fontSize: '14px',
                  color: '#000000',
                  appearance: 'none'
                }}
              >
                <option value="Yoga">Yoga</option>
                <option value="Fitness">Fitness</option>
                <option value="Pilates">Pilates</option>
                <option value="Meditation">Meditation</option>
                <option value="HIIT">HIIT</option>
              </select>
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cff45e',
                fontSize: '10px'
              }}>
                ›
              </div>
            </div>
          </div>

          {/* Class Description */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '8px'
            }}>
              Class Description
            </label>
            <textarea
              value={classFormData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.2)',
                background: '#ffffff',
                fontSize: '14px',
                color: '#000000',
                resize: 'vertical',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Learning Outcomes */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '8px'
            }}>
              Learning Outcomes
            </label>
            <textarea
              value={classFormData.learningOutcomes}
              onChange={(e) => handleInputChange('learningOutcomes', e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.2)',
                background: '#ffffff',
                fontSize: '14px',
                color: '#000000',
                resize: 'vertical',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Level */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '8px'
            }}>
              Level
            </label>
            <input
              type="text"
              value={classFormData.level}
              onChange={(e) => handleInputChange('level', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.2)',
                background: '#ffffff',
                fontSize: '14px',
                color: '#000000',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Duration and Capacity - Side by Side */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            {/* Duration */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#000000',
                marginBottom: '8px'
              }}>
                Duration
              </label>
              <input
                type="text"
                value={classFormData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.2)',
                  background: '#ffffff',
                  fontSize: '14px',
                  color: '#000000',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Capacity */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#000000',
                marginBottom: '8px'
              }}>
                Capacity
              </label>
              <input
                type="text"
                value={classFormData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.2)',
                  background: '#ffffff',
                  fontSize: '14px',
                  color: '#000000',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Certification Checkbox */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '8px'
          }}>
            <div
              onClick={() => handleInputChange('certification', !classFormData.certification)}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                border: '2px solid #000000',
                background: classFormData.certification ? '#000000' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {classFormData.certification && (
                <span style={{
                  color: '#cff45e',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </span>
              )}
            </div>
            <label
              onClick={() => handleInputChange('certification', !classFormData.certification)}
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#000000',
                cursor: 'pointer'
              }}
            >
              Certification
            </label>
          </div>

          {/* Active Checkbox */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '8px'
          }}>
            <div
              onClick={() => handleInputChange('isActive', !classFormData.isActive)}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                border: '2px solid #000000',
                background: classFormData.isActive ? '#000000' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {classFormData.isActive && (
                <span style={{
                  color: '#cff45e',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </span>
              )}
            </div>
            <label
              onClick={() => handleInputChange('isActive', !classFormData.isActive)}
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#000000',
                cursor: 'pointer'
              }}
            >
              Active (visible to students)
            </label>
          </div>

          {/* Profile Image */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '8px'
            }}>
              Profile Image
            </label>
            <button
              style={{
                background: 'rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0,0,0,0.2)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                color: '#000000',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Upload Image
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginTop: '32px',
          paddingBottom: '80px'
        }}>
          <button
            onClick={handleUpdateClass}
            style={{
              width: '100%',
              padding: '16px',
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#cff45e',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Update Class
          </button>
          <button
            onClick={handleCancel}
            style={{
              width: '100%',
              padding: '16px',
              background: 'rgba(0, 0, 0, 0.3)',
              color: '#000000',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // Edit Session Form Component
  const renderEditSessionForm = () => {
    const handleSessionInputChange = (field: string, value: string | boolean) => {
      setSessionFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };

    const handleUpdateSchedule = () => {
      console.log('Updating schedule with:', sessionFormData);
      setEditSessionMode(false);
      setSelectedSession(null);
    };

    const handleCancel = () => {
      setEditSessionMode(false);
      setSelectedSession(null);
    };

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        height: '100vh',
        background: '#cff45e',
        zIndex: 1000,
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
          paddingTop: '20px'
        }}>
          <button
            onClick={handleCancel}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#000000',
              padding: '5px',
              marginRight: '12px'
            }}
          >
            ←
          </button>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: '0',
            color: '#000000'
          }}>
            Edit Class Schedule
          </h2>
        </div>

        {/* Current Enrollment Status */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '4px'
          }}>
            Current Enrollment
          </div>
          <div style={{
            color: '#ffffff',
            fontSize: '14px',
            opacity: 0.8
          }}>
            38 of 38 spots filled
          </div>
        </div>

        {/* Form Fields */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Class Name */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '8px'
            }}>
              Class Name
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={sessionFormData.className}
                onChange={(e) => handleSessionInputChange('className', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.2)',
                  background: '#ffffff',
                  fontSize: '14px',
                  color: '#000000',
                  appearance: 'none'
                }}
              >
                <option value="Beginner's Yoga">Beginner's Yoga</option>
                <option value="Intermediate Yoga">Intermediate Yoga</option>
                <option value="Advanced Yoga">Advanced Yoga</option>
                <option value="Vinyasa Flow">Vinyasa Flow</option>
              </select>
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cff45e',
                fontSize: '10px'
              }}>
                ›
              </div>
            </div>
          </div>

          {/* Instructor */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '8px'
            }}>
              Instructor
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={sessionFormData.instructor}
                onChange={(e) => handleSessionInputChange('instructor', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.2)',
                  background: '#ffffff',
                  fontSize: '14px',
                  color: '#000000',
                  appearance: 'none'
                }}
              >
                <option value="Yulia">Yulia</option>
                <option value="Sarah">Sarah</option>
                <option value="Mike">Mike</option>
                <option value="Emma">Emma</option>
              </select>
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cff45e',
                fontSize: '10px'
              }}>
                ›
              </div>
            </div>
          </div>

          {/* Start Time */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '8px'
            }}>
              Start Time
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={sessionFormData.startTime}
                onChange={(e) => handleSessionInputChange('startTime', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.2)',
                  background: '#ffffff',
                  fontSize: '14px',
                  color: '#000000',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                fontSize: '16px',
                color: 'rgba(0,0,0,0.6)'
              }}>
                📅
              </div>
            </div>
          </div>

          {/* End Time */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '8px'
            }}>
              End Time
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={sessionFormData.endTime}
                onChange={(e) => handleSessionInputChange('endTime', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.2)',
                  background: '#ffffff',
                  fontSize: '14px',
                  color: '#000000',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                fontSize: '16px',
                color: 'rgba(0,0,0,0.6)'
              }}>
                📅
              </div>
            </div>
          </div>

          {/* Class Capacity */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '8px'
            }}>
              Class Capacity
            </label>
            <input
              type="number"
              value={sessionFormData.capacity}
              onChange={(e) => handleSessionInputChange('capacity', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.2)',
                background: '#ffffff',
                fontSize: '14px',
                color: '#000000',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Class Description */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '8px'
            }}>
              Class Description
            </label>
            <textarea
              value={sessionFormData.description}
              onChange={(e) => handleSessionInputChange('description', e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.2)',
                background: '#ffffff',
                fontSize: '14px',
                color: '#000000',
                resize: 'vertical',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Active Checkbox */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '8px'
          }}>
            <div
              onClick={() => handleSessionInputChange('isActive', !sessionFormData.isActive)}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                border: '2px solid #000000',
                background: sessionFormData.isActive ? '#000000' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {sessionFormData.isActive && (
                <span style={{
                  color: '#cff45e',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </span>
              )}
            </div>
            <label
              onClick={() => handleSessionInputChange('isActive', !sessionFormData.isActive)}
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#000000',
                cursor: 'pointer'
              }}
            >
              Active (visible to students)
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginTop: '32px',
          paddingBottom: '80px'
        }}>
          <button
            onClick={handleUpdateSchedule}
            style={{
              width: '100%',
              padding: '16px',
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#cff45e',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Update Schedule
          </button>
          <button
            onClick={handleCancel}
            style={{
              width: '100%',
              padding: '16px',
              background: 'rgba(0, 0, 0, 0.3)',
              color: '#000000',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const renderClassView = () => (
    <div style={{ padding: '0 16px' }}>
      {/* Classes Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }}>
        {mockClasses.map((cls) => (
          <div 
            key={cls.id}
            onClick={() => {
              setSelectedClass(cls);
              setEditMode(true);
            }}
            style={{
              position: 'relative',
              height: '180px',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${cls.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            
            {/* Status Badge */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: '#10b981',
              color: '#ffffff',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: '600'
            }}>
              {cls.status}
            </div>

            {/* Edit Icon */}
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(0,0,0,0.5)',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px'
            }}>
              ✏️
            </div>
            
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '12px'
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '2px'
              }}>
                {cls.name}
              </div>
              <div style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.8)'
              }}>
                {cls.duration} • {cls.capacity} spots
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScheduleView = () => (
    <div style={{ padding: '0 16px' }}>
      {/* Calendar Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '8px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        {['S', 'M', 'T', 'W', 'Th', 'F', 'S'].map((day, index) => (
          <div key={index} style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#000000',
            padding: '8px 4px'
          }}>
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {[1, 2, 3, 4, 5, 6, 7].map((day, index) => (
          <div key={index} style={{
            fontSize: '14px',
            padding: '8px',
            background: day === 3 ? '#000000' : 'transparent',
            color: day === 3 ? '#ffffff' : '#000000',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto'
          }}>
            {day}
          </div>
        ))}
      </div>

      {/* Schedule List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {mockSchedule.map((day, dayIndex) => (
          <div key={dayIndex}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#000000',
              margin: '0 0 12px 0'
            }}>
              {day.date}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {day.sessions.map((session) => (
                <div 
                  key={session.id}
                  onClick={() => {
                    setSelectedSession(session);
                    setEditSessionMode(true);
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#000000',
                      marginBottom: '4px'
                    }}>
                      {session.time} &nbsp;&nbsp; {session.class}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(0,0,0,0.6)'
                    }}>
                      {session.duration}
                    </div>
                  </div>
                  
                  <div style={{
                    background: getCapacityColor(session.status),
                    color: '#ffffff',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    {session.capacity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Show edit class form if a class is selected for editing
  if (editMode && selectedClass) {
    return renderEditClassForm();
  }

  // Show edit session form if a session is selected for editing
  if (editSessionMode && selectedSession) {
    return renderEditSessionForm();
  }
if (editSessionMode && selectedSession) {
    return (
    <div style={{ 
      padding: '0px', 
      paddingBottom: '100px',
      minHeight: '100vh',
      background: '#cff45e'
    }}>
      {/* Header with View Toggle */}
      <div style={{ 
        padding: '20px 16px 16px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* View Toggle */}
        <div style={{
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '25px',
          padding: '4px',
          flex: 1,
          maxWidth: '280px'
        }}>
          <button
            onClick={() => setCurrentView('class')}
            style={{
              background: currentView === 'class' ? '#000000' : 'transparent',
              color: currentView === 'class' ? '#ffffff' : '#000000',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flex: 1
            }}
          >
            Class View
          </button>
          <button
            onClick={() => setCurrentView('schedule')}
            style={{
              background: currentView === 'schedule' ? '#000000' : 'transparent',
              color: currentView === 'schedule' ? '#ffffff' : '#000000',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flex: 1
            }}
          >
            Schedule View
          </button>
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          style={{
            background: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginLeft: '12px'
          }}
        >
          <span style={{ fontSize: '16px' }}>☰</span>
        </button>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          height: '100vh',
          background: '#cff45e',
          zIndex: 1000,
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            paddingTop: '20px'
          }}>
            <button
              onClick={() => setShowFilter(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#000000',
                padding: '5px'
              }}
            >
              ✕
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                color: '#000000',
                textDecoration: 'underline',
                fontWeight: '400'
              }}
            >
              Reset All
            </button>
          </div>

          {/* Filter Title */}
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 30px 0',
            color: '#000000'
          }}>
            Filter
          </h2>

          {/* Divider line */}
          <div style={{
            borderBottom: '1px solid rgba(0,0,0,0.2)',
            marginBottom: '20px'
          }}></div>

          {/* Filter Options */}
          {[
            { label: 'Date', value: 'Oct 3 - Oct 7, 2026', hasValue: true },
            { label: 'Time', value: '', hasValue: false },
            { label: 'Instructors', value: 'Yulia', hasValue: true },
            { label: 'Category', value: '', hasValue: false },
            { label: 'Availability', value: '> 50%', hasValue: true }
          ].map((filter, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '18px 0',
              borderBottom: index < 4 ? '1px solid rgba(0,0,0,0.1)' : 'none',
              cursor: 'pointer'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#000000',
                  marginBottom: filter.hasValue ? '4px' : '0'
                }}>
                  {filter.label}
                </div>
                {filter.hasValue && filter.value && (
                  <div style={{
                    fontSize: '14px',
                    color: 'rgba(0,0,0,0.6)',
                    fontWeight: '400'
                  }}>
                    {filter.value}
                  </div>
                )}
              </div>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cff45e',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                ›
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      {currentView === 'class' ? renderClassView() : renderScheduleView()}
    </div>
  );
}
