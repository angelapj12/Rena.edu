import React from 'react';

function TestApp() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ marginBottom: '20px', fontSize: '32px' }}>
        ✅ WellnessHub
      </div>
      <div style={{ marginBottom: '10px' }}>
        Server is running properly!
      </div>
      <div style={{ fontSize: '16px', opacity: 0.8 }}>
        Ready to load the full application
      </div>
    </div>
  );
}

export default TestApp;
