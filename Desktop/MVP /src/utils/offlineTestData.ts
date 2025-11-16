// Offline test data system for testing without database connection
const STORAGE_KEY = 'wellness_app_test_data';

export class OfflineTestDataManager {
  // Get data from localStorage
  private getData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {
      users: [],
      classes: [],
      instructors: [],
      sessions: [],
      bookings: [],
      achievements: []
    };
  }

  // Save data to localStorage
  private saveData(data: any) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // Insert test users
  async insertTestUsers() {
    console.log('[OfflineTestData] 📝 Inserting test users...');
    
    const testUsers = [
      { firebase_uid: 'firebase_user_001', email: 'alice.thompson@email.com', display_name: 'Alice Thompson', role: 'student', photo_url: 'alice_profile.jpg' },
      { firebase_uid: 'firebase_user_002', email: 'bob.martinez@email.com', display_name: 'Bob Martinez', role: 'student', photo_url: 'bob_profile.jpg' },
      { firebase_uid: 'firebase_user_003', email: 'charlie.wong@email.com', display_name: 'Charlie Wong', role: 'student', photo_url: 'charlie_profile.jpg' },
      { firebase_uid: 'firebase_user_004', email: 'diana.patel@email.com', display_name: 'Diana Patel', role: 'student', photo_url: 'diana_profile.jpg' },
      { firebase_uid: 'firebase_user_005', email: 'evan.lee@email.com', display_name: 'Evan Lee', role: 'student', photo_url: 'evan_profile.jpg' },
      { firebase_uid: 'firebase_user_006', email: 'fiona.clark@email.com', display_name: 'Fiona Clark', role: 'student', photo_url: 'fiona_profile.jpg' },
      { firebase_uid: 'firebase_user_007', email: 'george.adams@email.com', display_name: 'George Adams', role: 'student', photo_url: 'george_profile.jpg' },
      { firebase_uid: 'firebase_user_008', email: 'hannah.baker@email.com', display_name: 'Hannah Baker', role: 'student', photo_url: 'hannah_profile.jpg' },
      { firebase_uid: 'firebase_admin_009', email: 'admin.user@wellness.com', display_name: 'Admin User', role: 'admin', photo_url: 'admin_profile.jpg' },
      { firebase_uid: 'firebase_admin_010', email: 'super.admin@wellness.com', display_name: 'Super Admin', role: 'admin', photo_url: 'super_admin_profile.jpg' }
    ];

    const data = this.getData();
    data.users = testUsers;
    this.saveData(data);
    
    console.log('[OfflineTestData] ✅ Inserted', testUsers.length, 'users');
    return testUsers;
  }

  // Insert test classes
  async insertTestClasses() {
    console.log('[OfflineTestData] 📚 Inserting test classes...');
    
    const testClasses = [
      {
        class_id: 'class001',
        class_name: 'Creative Dance for Beginners',
        class_category: 'Dance',
        class_description: 'An introductory dance class focusing on rhythm, body movement, and creativity.',
        level: 'beginner',
        duration: '1h 30m',
        capacity: 20,
        price: 25.00,
        xp_reward: 100
      },
      {
        class_id: 'class002',
        class_name: 'Leadership Lab',
        class_category: 'Leadership',
        class_description: 'Hands-on leadership training through role-play, group exercises, and reflection.',
        level: 'intermediate',
        duration: '3h',
        capacity: 25,
        price: 40.00,
        xp_reward: 200
      },
      {
        class_id: 'class003',
        class_name: 'Entrepreneurship Bootcamp',
        class_category: 'Business',
        class_description: 'A fast-paced course on idea validation, pitching, and startup basics.',
        level: 'all levels',
        duration: '3h',
        capacity: 30,
        price: 50.00,
        xp_reward: 250
      },
      {
        class_id: 'class004',
        class_name: 'Mindfulness & Meditation',
        class_category: 'Wellness',
        class_description: 'Guided mindfulness and meditation practice to improve focus and reduce stress.',
        level: 'all levels',
        duration: '1h',
        capacity: 40,
        price: 15.00,
        xp_reward: 80
      },
      {
        class_id: 'class005',
        class_name: 'Acting & Stage Performance',
        class_category: 'Theatre',
        class_description: 'Develop stage presence, acting skills, and storytelling ability.',
        level: 'advanced',
        duration: '3h',
        capacity: 15,
        price: 45.00,
        xp_reward: 220
      }
    ];

    const data = this.getData();
    data.classes = testClasses;
    this.saveData(data);
    
    console.log('[OfflineTestData] ✅ Inserted', testClasses.length, 'classes');
    return testClasses;
  }

  // Insert test instructors
  async insertTestInstructors() {
    console.log('[OfflineTestData] 👨‍🏫 Inserting test instructors...');
    
    const testInstructors = [
      {
        instructor_id: 'instructor001',
        firebase_uid: 'firebase_instructor_001',
        name: 'Sarah Johnson',
        specialization: 'Dance & Movement',
        experience_years: 8,
        bio: 'Professional dancer with 8 years of teaching experience.',
        rating: 4.9,
        total_classes: 85,
        total_students: 450
      },
      {
        instructor_id: 'instructor002',
        firebase_uid: 'firebase_instructor_002',
        name: 'Michael Chen',
        specialization: 'Leadership & Communication',
        experience_years: 12,
        bio: 'Executive coach and leadership consultant.',
        rating: 4.8,
        total_classes: 120,
        total_students: 680
      },
      {
        instructor_id: 'instructor003',
        firebase_uid: 'firebase_instructor_003',
        name: 'Emily Rodriguez',
        specialization: 'Business & Entrepreneurship',
        experience_years: 6,
        bio: 'Serial entrepreneur and startup mentor.',
        rating: 4.7,
        total_classes: 65,
        total_students: 320
      },
      {
        instructor_id: 'instructor004',
        firebase_uid: 'firebase_instructor_004',
        name: 'David Park',
        specialization: 'Mindfulness & Wellness',
        experience_years: 10,
        bio: 'Certified mindfulness instructor and wellness coach.',
        rating: 4.9,
        total_classes: 200,
        total_students: 1200
      },
      {
        instructor_id: 'instructor005',
        firebase_uid: 'firebase_instructor_005',
        name: 'Jessica Williams',
        specialization: 'Theatre & Performance',
        experience_years: 15,
        bio: 'Professional actress and theatre director.',
        rating: 4.8,
        total_classes: 95,
        total_students: 380
      }
    ];

    const data = this.getData();
    data.instructors = testInstructors;
    this.saveData(data);
    
    console.log('[OfflineTestData] ✅ Inserted', testInstructors.length, 'instructors');
    return testInstructors;
  }

  // Insert all test data
  async insertAllTestData() {
    console.log('[OfflineTestData] 🚀 Starting offline test data insertion...');
    
    try {
      const users = await this.insertTestUsers();
      const classes = await this.insertTestClasses();
      const instructors = await this.insertTestInstructors();
      
      console.log('[OfflineTestData] ✅ All test data inserted successfully!');
      console.log('[OfflineTestData] 📊 Summary:');
      console.log(`- Users: ${users.length}`);
      console.log(`- Classes: ${classes.length}`);
      console.log(`- Instructors: ${instructors.length}`);
      
      return { users, classes, instructors };
    } catch (error) {
      console.error('[OfflineTestData] ❌ Error:', error);
      throw error;
    }
  }

  // Get current data counts
  getDataCounts() {
    const data = this.getData();
    return {
      users: data.users.length,
      classes: data.classes.length,
      instructors: data.instructors.length,
      sessions: data.sessions.length,
      bookings: data.bookings.length,
      achievements: data.achievements.length
    };
  }

  // Clear all data
  clearAllData() {
    localStorage.removeItem(STORAGE_KEY);
    console.log('[OfflineTestData] 🗑️ All test data cleared');
  }

  // Get all data
  getAllData() {
    return this.getData();
  }
}

// Create instance and make it globally available
const offlineTestData = new OfflineTestDataManager();

export { offlineTestData };

// Make functions available in browser console
(window as any).offlineTestData = offlineTestData;
(window as any).insertOfflineTestData = () => offlineTestData.insertAllTestData();
(window as any).getOfflineDataCounts = () => offlineTestData.getDataCounts();
(window as any).clearOfflineTestData = () => offlineTestData.clearAllData();
