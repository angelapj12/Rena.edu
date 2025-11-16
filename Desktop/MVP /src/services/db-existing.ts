import { supabase } from './database'
import type { User, Booking } from './database'

// =====================================================
// USER OPERATIONS (for your existing schema)
// =====================================================

export const userService = {
  // Get user by Firebase UID
  async getUserByFirebaseUid(firebaseUid: string): Promise<User | null> {
    try {
      console.log('[DB] Getting user by Firebase UID:', firebaseUid)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('firebase_uid', firebaseUid)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') return null // Not found
        throw error
      }
      
      console.log('[DB] User found:', data)
      return data
    } catch (error) {
      console.error('[DB] Error getting user:', error)
      throw new Error('Failed to fetch user')
    }
  },

  // Create new user
  async createUser(userData: Partial<User>): Promise<User> {
    try {
      console.log('[DB] Creating user:', userData)
      const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single()
      
      if (error) throw error
      
      console.log('[DB] User created:', data)
      return data
    } catch (error) {
      console.error('[DB] Error creating user:', error)
      throw new Error('Failed to create user')
    }
  },

  // Update user profile
  async updateUser(firebaseUid: string, updates: Partial<User>): Promise<User> {
    try {
      console.log('[DB] Updating user:', firebaseUid, updates)
      const { data, error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('firebase_uid', firebaseUid)
        .select()
        .single()
      
      if (error) throw error
      
      console.log('[DB] User updated:', data)
      return data
    } catch (error) {
      console.error('[DB] Error updating user:', error)
      throw new Error('Failed to update user')
    }
  },

  // Get all users (admin only)
  async getAllUsers(): Promise<User[]> {
    try {
      console.log('[DB] Getting all users')
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      console.log('[DB] Users found:', data?.length)
      return data || []
    } catch (error) {
      console.error('[DB] Error getting users:', error)
      throw new Error('Failed to fetch users')
    }
  }
}

// =====================================================
// BOOKING OPERATIONS (for your existing schema)
// =====================================================

export const bookingService = {
  // Get user's bookings
  async getUserBookings(userFirebaseUid: string): Promise<Booking[]> {
    try {
      console.log('[DB] Getting user bookings by firebase_uid:', userFirebaseUid)
      
      // First get the user to find their internal ID
      const user = await userService.getUserByFirebaseUid(userFirebaseUid)
      if (!user) {
        console.log('[DB] User not found')
        return []
      }

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('student_uid', userFirebaseUid) // Your schema might use student_uid
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      console.log('[DB] User bookings found:', data?.length)
      return data || []
    } catch (error) {
      console.error('[DB] Error getting user bookings:', error)
      throw new Error('Failed to fetch user bookings')
    }
  },

  // Get all bookings (admin only)
  async getAllBookings(): Promise<Booking[]> {
    try {
      console.log('[DB] Getting all bookings')
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
      
      if (error) throw error
      
      console.log('[DB] All bookings found:', data?.length)
      return data || []
    } catch (error) {
      console.error('[DB] Error getting all bookings:', error)
      throw new Error('Failed to fetch all bookings')
    }
  }
}

// =====================================================
// TABLE DISCOVERY SERVICE
// =====================================================

export const discoveryService = {
  // Discover what tables exist
  async getTables(): Promise<string[]> {
    try {
      console.log('[DB] Discovering tables')
      const { data, error } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_type', 'BASE TABLE')
      
      if (error) throw error
      
      const tableNames = data?.map(row => row.table_name) || []
      console.log('[DB] Tables found:', tableNames)
      return tableNames
    } catch (error) {
      console.error('[DB] Error discovering tables:', error)
      return []
    }
  },

  // Get columns for a specific table
  async getTableColumns(tableName: string): Promise<any[]> {
    try {
      console.log('[DB] Getting columns for table:', tableName)
      const { data, error } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable, column_default')
        .eq('table_name', tableName)
        .eq('table_schema', 'public')
        .order('ordinal_position', { ascending: true })
      
      if (error) throw error
      
      console.log('[DB] Columns found for', tableName, ':', data?.length)
      return data || []
    } catch (error) {
      console.error('[DB] Error getting columns:', error)
      return []
    }
  }
}

// =====================================================
// GENERIC DATA SERVICE
// =====================================================

export const dataService = {
  // Get data from any table (for discovery)
  async getTableData(tableName: string, limit: number = 10): Promise<any[]> {
    try {
      console.log('[DB] Getting sample data from table:', tableName)
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(limit)
      
      if (error) throw error
      
      console.log('[DB] Sample data found for', tableName, ':', data?.length)
      return data || []
    } catch (error) {
      console.error('[DB] Error getting table data:', error)
      return []
    }
  }
}
