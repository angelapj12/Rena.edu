import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function ProfilePage() {
  const { user, userProfile, signOut, loading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: userProfile?.display_name || '',
    email: user?.email || '',
  });

  const handleSave = async () => {
    // TODO: Implement profile update
    console.log('Saving profile:', formData);
    setEditing(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

      {/* Profile Header */}
      <div className="card p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-semibold">
              {userProfile?.display_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {userProfile?.display_name || 'Wellness Student'}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
              {userProfile?.role || 'Student'}
            </span>
          </div>
        </div>

        {!editing ? (
          <button 
            onClick={() => setEditing(true)}
            className="btn-outline"
          >
            Edit Profile
          </button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="input-field"
                placeholder="Enter your display name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="input-field bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed here
              </p>
            </div>

            <div className="flex space-x-3">
              <button onClick={handleSave} className="btn-primary">
                Save Changes
              </button>
              <button 
                onClick={() => setEditing(false)}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Account Stats */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">0</div>
            <div className="text-sm text-gray-600">Classes Attended</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600 mb-1">0</div>
            <div className="text-sm text-gray-600">Current Streak</div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Push Notifications</div>
              <div className="text-sm text-gray-600">Get notified about upcoming classes</div>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Email Updates</div>
              <div className="text-sm text-gray-600">Receive weekly wellness tips</div>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="space-y-4">
        <button className="w-full btn-outline text-left p-4">
          <div className="font-medium">Change Password</div>
          <div className="text-sm text-gray-600">Update your account password</div>
        </button>

        <button className="w-full btn-outline text-left p-4">
          <div className="font-medium">Download My Data</div>
          <div className="text-sm text-gray-600">Export your account data</div>
        </button>

        <button 
          onClick={handleSignOut}
          className="w-full bg-red-50 text-red-600 border border-red-200 rounded-lg p-4 text-left hover:bg-red-100 transition-colors"
        >
          <div className="font-medium">Sign Out</div>
          <div className="text-sm text-red-500">Sign out of your account</div>
        </button>
      </div>
    </div>
  );
}
