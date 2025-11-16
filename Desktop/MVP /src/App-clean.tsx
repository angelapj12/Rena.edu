import { useState } from 'react';

// Define types
interface Instructor {
  id: number;
  name: string;
  title: string;
  bio: string;
  credentials: string;
  email: string;
  phone: string;
  status: string;
  specialties: string[];
  experience: number;
}

interface ClassInfo {
  id: number;
  name: string;
  instructor: string;
  category: string;
  description: string;
  capacity: number;
  enrolled: number;
}
const mockInstructors = [
  {
    id: 1,
    name: 'Yulia Kozlova',
    title: 'Senior Yoga Instructor',
    bio: 'Experienced wellness instructor dedicated to helping students achieve their health and fitness goals.',
    credentials: 'Certified Yoga Alliance RYT-500, Meditation Specialist',
    email: 'yulia@wellnesshub.com',
    phone: '555-0123',
    status: 'Active',
    specialties: ['Yoga', 'Meditation'],
    experience: 8
  }
];

const mockClasses = [
  {
    id: 1,
    name: "Beginner's Yoga",
    instructor: 'Yulia Kozlova',
    category: 'Yoga',
    description: 'Perfect for those new to yoga practice.',
    capacity: 20,
    enrolled: 15
  }
];

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

  // Main navigation component
  const renderNavigation = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '16px',
      borderRadius: '12px',
      margin: '16px',
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    }}>
      <button
        onClick={() => setCurrentView('dashboard')}
        style={{
          padding: '12px 20px',
          borderRadius: '8px',
          border: 'none',
          background: currentView === 'dashboard' ? '#000000' : 'rgba(0,0,0,0.1)',
          color: currentView === 'dashboard' ? '#cff45e' : '#000000',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Dashboard
      </button>
      <button
        onClick={() => setCurrentView('instructors')}
        style={{
          padding: '12px 20px',
          borderRadius: '8px',
          border: 'none',
          background: currentView === 'instructors' ? '#000000' : 'rgba(0,0,0,0.1)',
          color: currentView === 'instructors' ? '#cff45e' : '#000000',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Instructors
      </button>
      <button
        onClick={() => setCurrentView('classes')}
        style={{
          padding: '12px 20px',
          borderRadius: '8px',
          border: 'none',
          background: currentView === 'classes' ? '#000000' : 'rgba(0,0,0,0.1)',
          color: currentView === 'classes' ? '#cff45e' : '#000000',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Classes
      </button>
    </div>
  );

  // Dashboard view
  const renderDashboard = () => (
    <div style={{ padding: '16px' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '24px',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: '600' }}>
          Wellness Hub Admin
        </h2>
        <p style={{ margin: '0', fontSize: '16px', color: '#666' }}>
          Manage your wellness classes, instructors, and students
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginTop: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>
            {mockInstructors.length}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Active Instructors</div>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>
            {mockClasses.length}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Total Classes</div>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>
            15
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Students Enrolled</div>
        </div>
      </div>
    </div>
  );

  // Instructors list view
  const renderInstructors = () => (
    <div style={{ padding: '16px' }}>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600' }}>
        Instructors
      </h2>
      {mockInstructors.map(instructor => (
        <div
          key={instructor.id}
          onClick={() => setSelectedInstructor(instructor)}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '12px',
            cursor: 'pointer',
            border: '1px solid rgba(0,0,0,0.1)'
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
            {instructor.name}
          </h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
            {instructor.title}
          </p>
          <div style={{ fontSize: '12px', color: '#888' }}>
            {instructor.specialties.join(', ')} • {instructor.experience} years experience
          </div>
        </div>
      ))}
    </div>
  );

  // Classes list view
  const renderClasses = () => (
    <div style={{ padding: '16px' }}>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600' }}>
        Classes
      </h2>
      {mockClasses.map(cls => (
        <div
          key={cls.id}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '12px',
            border: '1px solid rgba(0,0,0,0.1)'
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
            {cls.name}
          </h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
            Instructor: {cls.instructor}
          </p>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
            {cls.description}
          </p>
          <div style={{ fontSize: '12px', color: '#888' }}>
            {cls.enrolled}/{cls.capacity} enrolled • {cls.category}
          </div>
        </div>
      ))}
    </div>
  );

  // Instructor detail view
  const renderInstructorDetail = () => {
    if (!selectedInstructor) return null;

    return (
      <div style={{ padding: '16px' }}>
        <button
          onClick={() => setSelectedInstructor(null)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            marginBottom: '16px',
            color: '#000000'
          }}
        >
          ← Back to Instructors
        </button>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '24px',
          borderRadius: '12px'
        }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '600' }}>
            {selectedInstructor.name}
          </h2>
          <p style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#666' }}>
            {selectedInstructor.title}
          </p>
          
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Bio</h3>
            <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.5' }}>
              {selectedInstructor.bio}
            </p>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Credentials</h3>
            <p style={{ margin: '0', fontSize: '14px' }}>
              {selectedInstructor.credentials}
            </p>
          </div>
          
          <div style={{ fontSize: '14px', color: '#666' }}>
            <div>Email: {selectedInstructor.email}</div>
            <div>Phone: {selectedInstructor.phone}</div>
            <div>Status: {selectedInstructor.status}</div>
            <div>Experience: {selectedInstructor.experience} years</div>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div style={{
      minHeight: '100vh',
      background: '#cff45e',
      paddingBottom: '100px'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 16px 16px 16px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          margin: '0',
          color: '#000000'
        }}>
          Wellness Hub
        </h1>
      </div>

      {/* Content */}
      {selectedInstructor ? (
        renderInstructorDetail()
      ) : (
        <>
          {renderNavigation()}
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'instructors' && renderInstructors()}
          {currentView === 'classes' && renderClasses()}
        </>
      )}
    </div>
  );
}

export default App;
