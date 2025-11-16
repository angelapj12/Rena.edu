import { supabase } from './database'

// =====================================================
// TEST DATA INSERTION SERVICE
// =====================================================

export const testDataService = {
  // Insert test users
  async insertTestUsers() {
    try {
      console.log('[TestData] Inserting test users...')
      
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
      ]

      const { data, error } = await supabase
        .from('users')
        .upsert(testUsers, { onConflict: 'firebase_uid' })
        .select()

      if (error) throw error
      console.log('[TestData] ✅ Test users inserted:', data?.length)
      return data
    } catch (error) {
      console.error('[TestData] ❌ Error inserting users:', error)
      throw error
    }
  },

  // Insert test classes (create table if needed)
  async insertTestClasses() {
    try {
      console.log('[TestData] Inserting test classes...')
      
      // Try to insert classes - if table doesn't exist, we'll catch the error
      const testClasses = [
        {
          class_id: 'class001',
          class_name: 'Creative Dance for Beginners',
          class_category: 'Dance',
          class_description: 'An introductory dance class focusing on rhythm, body movement, and creativity.',
          learning_outcomes: ['Basic dance steps', 'Improved coordination', 'Increased confidence in movement'],
          level: 'beginner',
          duration: '1h 30m',
          capacity: 20,
          certification: false,
          active: true,
          image: 'dance_beginners.jpg',
          price: 25.00,
          xp_reward: 100
        },
        {
          class_id: 'class002',
          class_name: 'Leadership Lab',
          class_category: 'Leadership',
          class_description: 'Hands-on leadership training through role-play, group exercises, and reflection.',
          learning_outcomes: ['Team collaboration', 'Conflict resolution', 'Public speaking'],
          level: 'intermediate',
          duration: '3h',
          capacity: 25,
          certification: true,
          active: true,
          image: 'leadership_lab.jpg',
          price: 40.00,
          xp_reward: 200
        },
        {
          class_id: 'class003',
          class_name: 'Entrepreneurship Bootcamp',
          class_category: 'Business',
          class_description: 'A fast-paced course on idea validation, pitching, and startup basics.',
          learning_outcomes: ['Business model creation', 'Pitching skills', 'Market analysis'],
          level: 'all levels',
          duration: '3h',
          capacity: 30,
          certification: true,
          active: true,
          image: 'entrepreneurship_bootcamp.jpg',
          price: 50.00,
          xp_reward: 250
        },
        {
          class_id: 'class004',
          class_name: 'Mindfulness & Meditation',
          class_category: 'Wellness',
          class_description: 'Guided mindfulness and meditation practice to improve focus and reduce stress.',
          learning_outcomes: ['Daily meditation routine', 'Stress management', 'Improved focus'],
          level: 'all levels',
          duration: '1h',
          capacity: 40,
          certification: false,
          active: true,
          image: 'mindfulness.jpg',
          price: 15.00,
          xp_reward: 80
        },
        {
          class_id: 'class005',
          class_name: 'Acting & Stage Performance',
          class_category: 'Theatre',
          class_description: 'Develop stage presence, acting skills, and storytelling ability.',
          learning_outcomes: ['Improved acting skills', 'Stage confidence', 'Voice projection'],
          level: 'advanced',
          duration: '3h',
          capacity: 15,
          certification: true,
          active: true,
          image: 'acting_stage.jpg',
          price: 45.00,
          xp_reward: 220
        }
      ]

      try {
        const { data, error } = await supabase
          .from('classes')
          .upsert(testClasses, { onConflict: 'class_id' })
          .select()

        if (error) throw error
        console.log('[TestData] ✅ Test classes inserted:', data?.length)
        return data
      } catch (tableError: any) {
        if (tableError.code === '42P01') { // Table doesn't exist
          console.log('[TestData] ⚠️ Classes table does not exist - skipping class insertion')
          console.log('[TestData] You can create the table manually or this data will be inserted when the table is available')
          return []
        }
        throw tableError
      }
    } catch (error) {
      console.error('[TestData] ❌ Error inserting classes:', error)
      throw error
    }
  },

  // Insert test instructors
  async insertTestInstructors() {
    try {
      console.log('[TestData] Inserting test instructors...')
      
      const testInstructors = [
        {
          instructor_id: 'instructor001',
          firebase_uid: 'firebase_instructor_001',
          name: 'Sarah Johnson',
          specialization: 'Dance & Movement',
          experience_years: 8,
          bio: 'Professional dancer with 8 years of teaching experience specializing in contemporary and creative movement.',
          achievements: ['Certified Dance Movement Therapist', 'Winner of Regional Dance Competition 2020', 'Master Trainer Certification'],
          rating: 4.9,
          total_classes: 85,
          total_students: 450,
          active: true,
          profile_image: 'sarah_johnson.jpg',
          contact_email: 'sarah.johnson@wellness.com',
          contact_phone: '+1-555-0101'
        },
        {
          instructor_id: 'instructor002',
          firebase_uid: 'firebase_instructor_002',
          name: 'Michael Chen',
          specialization: 'Leadership & Communication',
          experience_years: 12,
          bio: 'Executive coach and leadership consultant with extensive corporate training background.',
          achievements: ['Certified Executive Coach (ICF)', 'MBA from Stanford University', 'TEDx Speaker'],
          rating: 4.8,
          total_classes: 120,
          total_students: 680,
          active: true,
          profile_image: 'michael_chen.jpg',
          contact_email: 'michael.chen@wellness.com',
          contact_phone: '+1-555-0102'
        },
        {
          instructor_id: 'instructor003',
          firebase_uid: 'firebase_instructor_003',
          name: 'Emily Rodriguez',
          specialization: 'Business & Entrepreneurship',
          experience_years: 6,
          bio: 'Serial entrepreneur and startup mentor with multiple successful exits.',
          achievements: ['Founded 3 successful startups', 'Mentor at TechStars Accelerator', 'Forbes 30 Under 30'],
          rating: 4.7,
          total_classes: 65,
          total_students: 320,
          active: true,
          profile_image: 'emily_rodriguez.jpg',
          contact_email: 'emily.rodriguez@wellness.com',
          contact_phone: '+1-555-0103'
        },
        {
          instructor_id: 'instructor004',
          firebase_uid: 'firebase_instructor_004',
          name: 'David Park',
          specialization: 'Mindfulness & Wellness',
          experience_years: 10,
          bio: 'Certified mindfulness instructor and wellness coach with background in psychology.',
          achievements: ['Certified Mindfulness-Based Stress Reduction Instructor', 'Licensed Clinical Therapist', '500-hour Yoga Teacher Training'],
          rating: 4.9,
          total_classes: 200,
          total_students: 1200,
          active: true,
          profile_image: 'david_park.jpg',
          contact_email: 'david.park@wellness.com',
          contact_phone: '+1-555-0104'
        },
        {
          instructor_id: 'instructor005',
          firebase_uid: 'firebase_instructor_005',
          name: 'Jessica Williams',
          specialization: 'Theatre & Performance',
          experience_years: 15,
          bio: 'Professional actress and theatre director with Broadway and film experience.',
          achievements: ['Broadway performer for 8 years', 'Directing degree from Juilliard', 'Tony Award nomination'],
          rating: 4.8,
          total_classes: 95,
          total_students: 380,
          active: true,
          profile_image: 'jessica_williams.jpg',
          contact_email: 'jessica.williams@wellness.com',
          contact_phone: '+1-555-0105'
        }
      ]

      try {
        const { data, error } = await supabase
          .from('instructors')
          .upsert(testInstructors, { onConflict: 'instructor_id' })
          .select()

        if (error) throw error
        console.log('[TestData] ✅ Test instructors inserted:', data?.length)
        return data
      } catch (tableError: any) {
        if (tableError.code === '42P01') { // Table doesn't exist
          console.log('[TestData] ⚠️ Instructors table does not exist - skipping instructor insertion')
          console.log('[TestData] You can create the table manually or this data will be inserted when the table is available')
          return []
        }
        throw tableError
      }
    } catch (error) {
      console.error('[TestData] ❌ Error inserting instructors:', error)
      throw error
    }
  },

  // Insert all test data in correct order
  async insertAllTestData() {
    try {
      console.log('[TestData] 🚀 Starting comprehensive test data insertion...')
      
      const results = {
        users: await this.insertTestUsers(),
        instructors: await this.insertTestInstructors(),
        classes: await this.insertTestClasses(),
      }
      
      console.log('[TestData] ✅ All test data inserted successfully!')
      return results
    } catch (error) {
      console.error('[TestData] ❌ Error inserting test data:', error)
      throw error
    }
  },

  // Verify test data was inserted
  async verifyTestData() {
    try {
      const counts = { users: 0, classes: 0, instructors: 0, bookings: 0 }

      // Check users count
      const usersResult = await supabase.from('users').select('count', { count: 'exact' })
      counts.users = usersResult.count || 0

      // Check classes count (table may not exist)
      try {
        const classesResult = await supabase.from('classes').select('count', { count: 'exact' })
        counts.classes = classesResult.count || 0
      } catch (error) {
        console.log('[TestData] Classes table not found')
      }

      // Check instructors count (table may not exist)
      try {
        const instructorsResult = await supabase.from('instructors').select('count', { count: 'exact' })
        counts.instructors = instructorsResult.count || 0
      } catch (error) {
        console.log('[TestData] Instructors table not found')
      }

      // Check bookings count (existing table)
      try {
        const bookingsResult = await supabase.from('bookings').select('count', { count: 'exact' })
        counts.bookings = bookingsResult.count || 0
      } catch (error) {
        console.log('[TestData] Bookings table not found')
      }

      console.log('[TestData] Current database counts:', counts)
      return counts
    } catch (error) {
      console.error('[TestData] Error verifying data:', error)
      return { users: 0, classes: 0, instructors: 0, bookings: 0 }
    }
  }
}
