// Simple test function to check database connection and existing tables
import { supabase } from '../services/database';

export async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  
  try {
    // Test 1: Check if we can connect
    const { data: connectionTest, error: connectionError } = await supabase
      .from('users')
      .select('count', { count: 'exact' });
    
    if (connectionError) {
      console.error('❌ Database connection failed:', connectionError);
      return false;
    }
    
    console.log('✅ Database connected! Current users count:', connectionTest.count);
    
    // Test 2: Discover existing tables
    console.log('🔍 Discovering existing tables...');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_type', 'BASE TABLE');
    
    if (tablesError) {
      console.error('❌ Error discovering tables:', tablesError);
    } else {
      const tableNames = tables?.map((t: any) => t.table_name) || [];
      console.log('📋 Existing tables:', tableNames);
    }
    
    // Test 3: Try inserting a simple user
    console.log('🧪 Testing user insertion...');
    const testUser = {
      firebase_uid: 'test_connection_' + Date.now(),
      email: 'test@connection.com',
      display_name: 'Test User',
      role: 'student' as const,
      photo_url: 'test.jpg'
    };
    
    const { data: insertResult, error: insertError } = await supabase
      .from('users')
      .insert([testUser])
      .select();
    
    if (insertError) {
      console.error('❌ Insert test failed:', insertError);
      return false;
    }
    
    console.log('✅ Insert test successful:', insertResult);
    
    // Clean up test user
    await supabase
      .from('users')
      .delete()
      .eq('firebase_uid', testUser.firebase_uid);
    
    console.log('✅ Database connection and basic operations working!');
    return true;
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return false;
  }
}

// Make it available globally
(window as any).testDatabaseConnection = testDatabaseConnection;
