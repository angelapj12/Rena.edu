import React from 'react';

function App() {
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
          Wellness Hub
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#000000',
          margin: '0'
        }}>
          Welcome to your class management system
        </p>
      </div>
    </div>
  );
}

export default App;
