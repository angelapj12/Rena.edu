import React, { useState, useEffect } from 'react'
import { userService, classService, instructorService } from '../services/db'

const DatabaseTest: React.FC = () => {
  const [testResults, setTestResults] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    const results: any = {}

    try {
      // Test 1: Get all users
      console.log('Testing user service...')
      const users = await userService.getAllUsers()
      results.users = { success: true, count: users.length, data: users.slice(0, 3) }
    } catch (error) {
      results.users = { success: false, error: error.message }
    }

    try {
      // Test 2: Get class sessions
      console.log('Testing class service...')
      const sessions = await classService.getClassSessions()
      results.sessions = { success: true, count: sessions.length, data: sessions.slice(0, 3) }
    } catch (error) {
      results.sessions = { success: false, error: error.message }
    }

    try {
      // Test 3: Get instructors
      console.log('Testing instructor service...')
      const instructors = await instructorService.getActiveInstructors()
      results.instructors = { success: true, count: instructors.length, data: instructors.slice(0, 3) }
    } catch (error) {
      results.instructors = { success: false, error: error.message }
    }

    setTestResults(results)
    setLoading(false)
  }

  useEffect(() => {
    runTests()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Database Connection Test</h1>
            <button
              onClick={runTests}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Refresh Tests'}
            </button>
          </div>
          
          <div className="grid gap-6">
            {/* Users Test */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <span className="mr-2">👥</span>
                Users Test
                {testResults.users && (
                  <span className={`ml-2 px-2 py-1 rounded text-sm ${
                    testResults.users.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {testResults.users.success ? '✅ Success' : '❌ Failed'}
                  </span>
                )}
              </h2>
              {testResults.users && (
                <div className="mt-2">
                  {testResults.users.success ? (
                    <div>
                      <p className="text-gray-600 mb-2">Found {testResults.users.count} users</p>
                      <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                        {JSON.stringify(testResults.users.data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-red-600">Error: {testResults.users.error}</p>
                  )}
                </div>
              )}
            </div>

            {/* Sessions Test */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <span className="mr-2">📅</span>
                Class Sessions Test
                {testResults.sessions && (
                  <span className={`ml-2 px-2 py-1 rounded text-sm ${
                    testResults.sessions.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {testResults.sessions.success ? '✅ Success' : '❌ Failed'}
                  </span>
                )}
              </h2>
              {testResults.sessions && (
                <div className="mt-2">
                  {testResults.sessions.success ? (
                    <div>
                      <p className="text-gray-600 mb-2">Found {testResults.sessions.count} sessions</p>
                      <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                        {JSON.stringify(testResults.sessions.data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-red-600">Error: {testResults.sessions.error}</p>
                  )}
                </div>
              )}
            </div>

            {/* Instructors Test */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <span className="mr-2">👨‍🏫</span>
                Instructors Test
                {testResults.instructors && (
                  <span className={`ml-2 px-2 py-1 rounded text-sm ${
                    testResults.instructors.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {testResults.instructors.success ? '✅ Success' : '❌ Failed'}
                  </span>
                )}
              </h2>
              {testResults.instructors && (
                <div className="mt-2">
                  {testResults.instructors.success ? (
                    <div>
                      <p className="text-gray-600 mb-2">Found {testResults.instructors.count} instructors</p>
                      <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                        {JSON.stringify(testResults.instructors.data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-red-600">Error: {testResults.instructors.error}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>✅ Database schema deployed successfully</li>
            <li>✅ Supabase services connected</li>
            <li>📝 Insert test data using test-data-updated.sql</li>
            <li>🔗 Update App-working.tsx to use new services</li>
            <li>🚀 Test frontend integration with live data</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DatabaseTest
