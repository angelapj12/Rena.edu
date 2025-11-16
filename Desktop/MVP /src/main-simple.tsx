import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Simple test component
const SimpleApp = () => {
  console.log('SimpleApp rendering...')
  
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f9ff',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#1e40af' }}>🎉 App is Working!</h1>
      
      <div style={{ 
        backgroundColor: '#dcfce7', 
        padding: '15px', 
        borderRadius: '8px',
        border: '1px solid #bbf7d0',
        marginBottom: '20px'
      }}>
        <strong style={{ color: '#166534' }}>✅ Success!</strong> The development server and React app are loading correctly.
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2>🧪 Route Testing</h2>
        <p>Current path: <code>{window.location.pathname}</code></p>
        
        <div style={{ marginTop: '15px' }}>
          <h3>Test Links:</h3>
          <ul>
            <li><a href="/" style={{ color: '#2563eb' }}>Home</a></li>
            <li><a href="/db-explorer" style={{ color: '#2563eb' }}>Database Explorer</a></li>
            <li><a href="/db-test" style={{ color: '#2563eb' }}>Database Test</a></li>
          </ul>
        </div>

        {window.location.pathname === '/db-explorer' && (
          <div style={{ 
            backgroundColor: '#fef3c7', 
            padding: '15px', 
            borderRadius: '8px',
            marginTop: '15px',
            border: '1px solid #fbbf24'
          }}>
            <strong style={{ color: '#92400e' }}>🔍 Database Explorer Route Active!</strong>
            <p>This confirms the routing is working. Next step: Connect to database.</p>
          </div>
        )}
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimpleApp />
  </StrictMode>,
)
