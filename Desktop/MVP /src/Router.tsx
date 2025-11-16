import React from 'react';

// Simple inline components to avoid import issues
const DatabaseTest = () => (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h1>🧪 Database Test</h1>
    <div style={{ backgroundColor: '#d1ecf1', padding: '15px', borderRadius: '5px', color: '#0c5460' }}>
      <strong>✅ Success!</strong> Database test route is working.
    </div>
  </div>
);

const DatabaseExplorer = () => (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h1>🔍 Database Explorer</h1>
    <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '5px', color: '#155724', marginBottom: '20px' }}>
      <strong>✅ Success!</strong> Database explorer route is working correctly!
    </div>
    
    <h2>🎯 What's Next:</h2>
    <ol>
      <li>Connect to Supabase database</li>
      <li>Discover existing tables</li>
      <li>View table schemas and data</li>
      <li>Insert test data</li>
    </ol>

    <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
      <strong>Current Path:</strong> {window.location.pathname}
    </div>
  </div>
);

const MainApp = () => (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h1>🏃‍♀️ Wellness Hub</h1>
    <p>Welcome to the wellness class management app!</p>
    
    <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', margin: '20px 0' }}>
      <h2>🧪 Test Navigation:</h2>
      <ul>
        <li><a href="/db-explorer" style={{ color: '#007bff', textDecoration: 'none' }}>🔍 Database Explorer</a></li>
        <li><a href="/db-test" style={{ color: '#007bff', textDecoration: 'none' }}>🧪 Database Test</a></li>
        <li><a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>🏠 Home</a></li>
      </ul>
    </div>
  </div>
);

const Router: React.FC = () => {
  const pathname = window.location.pathname;

  console.log('Router loading, current path:', pathname);

  // Handle special routes
  if (pathname === '/db-test') {
    return <DatabaseTest />;
  }
  
  if (pathname === '/db-explorer') {
    return <DatabaseExplorer />;
  }

  // Default to main app
  return <MainApp />;
};

export default Router;
