export default function AdminAnalytics() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Placeholder metrics cards */}
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">0</div>
          <div className="text-sm text-gray-600">Total Classes</div>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-success-600 mb-2">0</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">0%</div>
          <div className="text-sm text-gray-600">Attendance Rate</div>
        </div>
      </div>

      <div className="card p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Advanced Analytics
        </h2>
        <p className="text-gray-600 mb-6">
          This dashboard will provide comprehensive analytics including capacity trends, 
          instructor performance, revenue projections from promotions, and user engagement metrics.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-800 text-sm">
            📊 Advanced analytics with Chart.js integration coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}
