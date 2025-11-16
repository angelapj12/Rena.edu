// Admin Dashboard Component

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">0</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-success-600 mb-2">0</div>
          <div className="text-sm text-gray-600">Active Classes</div>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">0%</div>
          <div className="text-sm text-gray-600">Attendance Rate</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Classes</h3>
          <div className="space-y-3">
            <button className="w-full btn-primary text-left">
              Add New Class
            </button>
            <button className="w-full btn-outline text-left">
              Manage Classes
            </button>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructors</h3>
          <div className="space-y-3">
            <button className="w-full btn-primary text-left">
              Add Instructor
            </button>
            <button className="w-full btn-outline text-left">
              Manage Instructors
            </button>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
          <div className="space-y-3">
            <button className="w-full btn-primary text-left">
              View Reports
            </button>
            <button className="w-full btn-outline text-left">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="text-center py-8 text-gray-500">
            No recent activity to display
          </div>
        </div>
      </div>
    </div>
  );
}
