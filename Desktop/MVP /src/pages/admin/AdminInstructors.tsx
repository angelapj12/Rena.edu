export default function AdminInstructors() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Instructors</h1>
        <button className="btn-primary">
          Add New Instructor
        </button>
      </div>

      {/* Instructors List */}
      <div className="card p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👨‍🏫</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Instructor Management System
          </h3>
          <p className="text-gray-600 mb-6">
            Manage instructor profiles, specialties, schedules, and performance metrics. 
            Promote users to instructor status and track their class success.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-800 text-sm">
              🚧 Instructor management features coming soon! This will include instructor 
              profiles, certifications, ratings, and promotion system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
