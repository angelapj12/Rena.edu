import { useState, useEffect } from 'react';
import { testDataService } from '../services/testDataService';
import { discoveryService } from '../services/db-existing';

const TestDataInserter = () => {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentCounts, setCurrentCounts] = useState({ users: 0, classes: 0, instructors: 0, bookings: 0 });
  const [existingTables, setExistingTables] = useState<string[]>([]);

  useEffect(() => {
    loadCurrentState();
  }, []);

  const loadCurrentState = async () => {
    try {
      setStatus('Loading current database state...');
      
      // Discover existing tables
      const tables = await discoveryService.getTables();
      setExistingTables(tables);
      
      // Get current counts
      const counts = await testDataService.verifyTestData();
      setCurrentCounts(counts);
      
      setStatus('✅ Database state loaded');
    } catch (error: any) {
      setStatus(`❌ Error loading state: ${error?.message || 'Unknown error'}`);
    }
  };

  const insertTestData = async () => {
    setIsLoading(true);
    setStatus('🚀 Starting comprehensive test data insertion...');
    
    try {
      // Step 1: Insert users
      setStatus('📝 Inserting test users...');
      await testDataService.insertTestUsers();
      
      // Step 2: Insert instructors
      setStatus('👨‍🏫 Inserting test instructors...');
      await testDataService.insertTestInstructors();
      
      // Step 3: Insert classes
      setStatus('📚 Inserting test classes...');
      await testDataService.insertTestClasses();
      
      // Verify final counts
      setStatus('🔍 Verifying inserted data...');
      const newCounts = await testDataService.verifyTestData();
      setCurrentCounts(newCounts);
      
      setStatus('✅ All test data inserted successfully! You can now test the app with real data.');
      
    } catch (error: any) {
      setStatus(`❌ Error: ${error?.message || 'Unknown error'}`);
      console.error('Test data insertion error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>🧪 Test Data Management</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Insert comprehensive test data to replace placeholders and enable real-time functionality testing.
      </p>
      
      <div style={{ 
        margin: '20px 0', 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>Current Database State:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <div>👥 Users: <strong>{currentCounts.users}</strong></div>
          <div>📚 Classes: <strong>{currentCounts.classes}</strong></div>
          <div>👨‍🏫 Instructors: <strong>{currentCounts.instructors}</strong></div>
          <div>📝 Bookings: <strong>{currentCounts.bookings}</strong></div>
        </div>
        
        <div style={{ marginTop: '15px' }}>
          <strong>Existing Tables:</strong> {existingTables.join(', ')}
        </div>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h3 style={{ color: '#495057' }}>Test Data Package:</h3>
        <ul style={{ color: '#6c757d', lineHeight: '1.6' }}>
          <li>✨ <strong>10 users</strong> (8 students + 2 admins) with realistic profiles</li>
          <li>🎭 <strong>5 classes</strong> (Dance, Leadership, Business, Wellness, Theatre)</li>
          <li>👨‍🏫 <strong>5 instructors</strong> with expertise, ratings, and contact info</li>
          <li>📅 <strong>10 sessions</strong> scheduled for upcoming dates</li>
          <li>📝 <strong>10 bookings</strong> with various statuses (confirmed, pending, waitlist)</li>
          <li>🏆 <strong>10 achievements</strong> for gamification testing</li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={insertTestData}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? '#6c757d' : '#007bff',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            flex: 1
          }}
        >
          {isLoading ? '⏳ Inserting...' : '🚀 Insert Test Data'}
        </button>
        
        <button 
          onClick={loadCurrentState}
          disabled={isLoading}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {status && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: status.includes('❌') ? '#f8d7da' : 
                          status.includes('✅') ? '#d4edda' : '#d1ecf1',
          border: `1px solid ${status.includes('❌') ? '#f5c6cb' : 
                              status.includes('✅') ? '#c3e6cb' : '#bee5eb'}`,
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          {status}
        </div>
      )}

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#e7f3ff', 
        borderRadius: '8px',
        borderLeft: '4px solid #007bff'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>🎯 Next Steps After Insertion:</h3>
        <ol style={{ margin: 0, paddingLeft: '20px', color: '#6c757d', lineHeight: '1.6' }}>
          <li>Navigate to the main app to see real data instead of placeholders</li>
          <li>Test user authentication and profile editing</li>
          <li>Browse classes with real session data and availability</li>
          <li>Test the booking system with real capacity management</li>
          <li>Verify admin functions work with real instructor data</li>
          <li>Check gamification features with real achievements and XP</li>
        </ol>
      </div>
    </div>
  );
};

export default TestDataInserter;
