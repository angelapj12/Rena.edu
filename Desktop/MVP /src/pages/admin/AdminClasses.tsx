export default function AdminClasses() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Classes</h1>
        <button className="btn-primary">
          Add New Class
        </button>
      </div>

      {/* Classes List */}
      <div className="card p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏃‍♀️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Class Management System
          </h3>
          <p className="text-gray-600 mb-6">
            Create, edit, and manage all wellness classes from here. Set schedules, 
            assign instructors, and track attendance.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-blue-800 text-sm">
              🚧 Class management features coming soon! This will include class creation, 
              editing, scheduling, and instructor assignments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
