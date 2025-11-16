// Environment and connection diagnostics
export function checkEnvironment() {
  console.log('🔍 Checking environment variables...');
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('📝 Environment Status:');
  console.log('- VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('- VITE_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
  
  if (supabaseUrl) {
    console.log('🌐 Supabase URL:', supabaseUrl);
    
    // Test if URL is reachable
    console.log('🔍 Testing URL accessibility...');
    fetch(supabaseUrl + '/rest/v1/')
      .then(response => {
        console.log('✅ URL is reachable:', response.status);
      })
      .catch(error => {
        console.error('❌ URL not reachable:', error.message);
        console.log('💡 This might be a demo URL or the project might not exist');
      });
  }
  
  return { supabaseUrl, supabaseKey };
}

// Alternative: Set up with a working Supabase project
export function setupWithDemoSupabase() {
  console.log('🔧 Setting up with demo Supabase configuration...');
  console.log('💡 For a real implementation, you would:');
  console.log('1. Go to https://supabase.com');
  console.log('2. Create a new project');
  console.log('3. Copy the URL and anon key to .env file');
  console.log('4. Set up your database tables');
  
  // For now, we'll create a mock service that works without Supabase
  return {
    mockInsertUsers: () => {
      console.log('🧪 Mock: Inserting 10 test users...');
      console.log('✅ Mock: Successfully "inserted" test users');
      return Promise.resolve([
        { firebase_uid: 'firebase_user_001', display_name: 'Alice Thompson', role: 'student' },
        { firebase_uid: 'firebase_user_002', display_name: 'Bob Martinez', role: 'student' },
        // ... more mock users
      ]);
    }
  };
}

// Make functions available globally
(window as any).checkEnvironment = checkEnvironment;
(window as any).setupWithDemoSupabase = setupWithDemoSupabase;
