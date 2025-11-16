import { testDataService } from '../services/testDataService';

// Simple function to insert all test data
export async function insertAllTestData() {
  console.log('🚀 Starting comprehensive test data insertion...');
  
  try {
    // Step 1: Insert users
    console.log('📝 Inserting test users...');
    const users = await testDataService.insertTestUsers();
    console.log(`✅ Inserted ${users?.length || 0} users`);
    
    // Step 2: Insert instructors
    console.log('👨‍🏫 Inserting test instructors...');
    const instructors = await testDataService.insertTestInstructors();
    console.log(`✅ Inserted ${instructors?.length || 0} instructors`);
    
    // Step 3: Insert classes
    console.log('📚 Inserting test classes...');
    const classes = await testDataService.insertTestClasses();
    console.log(`✅ Inserted ${classes?.length || 0} classes`);
    
    // Verify final counts
    console.log('🔍 Verifying inserted data...');
    const counts = await testDataService.verifyTestData();
    console.log('📊 Final database counts:', counts);
    
    console.log('✅ All test data inserted successfully!');
    return counts;
    
  } catch (error: any) {
    console.error('❌ Error inserting test data:', error);
    throw error;
  }
}

// Export for direct browser console usage
(window as any).insertTestData = insertAllTestData;
