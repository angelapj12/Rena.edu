import { supabase } from './database'
import type { User, Booking } from './database'

// =====================================================
// USER OPERATIONS (for your actual schema)
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
// BOOKING OPERATIONS (for your actual schema)
// =====================================================

export const bookingService = {
  // Get user's bookings
  async getUserBookings(userFirebaseUid: string): Promise<Booking[]> {
    try {
      console.log('[DB] Getting user bookings:', userFirebaseUid)
      
      // First get the user to get their ID or student_uid
      const user = await userService.getUserByFirebaseUid(userFirebaseUid)
      if (!user) {
        console.log('[DB] User not found for bookings')
        return []
      }

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .or(`student_uid.eq.${userFirebaseUid},user_id.eq.${user.firebase_uid}`)
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
// GENERAL TABLE OPERATIONS
// =====================================================

export const tableService = {
  // Get all tables in the database
  async getAllTables(): Promise<string[]> {
    try {
      console.log('[DB] Getting all tables')
      const { data, error } = await supabase
        .rpc('get_table_names') // This might not work, depends on your setup
      
      if (error) {
        // Fallback: try to query information_schema
        const { data: schemaData, error: schemaError } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', 'public')
          .eq('table_type', 'BASE TABLE')
        
        if (schemaError) throw schemaError
        return schemaData?.map(t => t.table_name) || []
      }
      
      return data || []
    } catch (error) {
      console.error('[DB] Error getting tables:', error)
      return []
    }
  }
}

// Real-time subscriptions for live updates
export function subscribeToTable(
  tableName: string,
  callback: (payload: any) => void
) {
  console.log('[DB] Subscribing to table:', tableName)

  return supabase
    .channel(`table-${tableName}`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: tableName
      },
      callback
    )
    .subscribe()
}

export { supabase as default }

// User Management
export async function upsertUserProfile(user: Partial<User>) {
  console.log('[DB] upsertUserProfile', user.firebase_uid);
  
  const { data, error } = await supabase
    .from('users')
    .upsert(user, { 
      onConflict: 'firebase_uid',
      ignoreDuplicates: false 
    })
    .select()
    .single();

  if (error) {
    console.error('[DB] upsertUserProfile error', error);
    throw error;
  }

  return data;
}

export async function getUserProfile(firebase_uid: string): Promise<User | null> {
  console.log('[DB] getUserProfile', firebase_uid);
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('firebase_uid', firebase_uid)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // User not found
      return null;
    }
    console.error('[DB] getUserProfile error', error);
    throw error;
  }

  return data;
}

// Class Management
export async function listUpcomingClasses({
  from,
  to,
  category,
  promotedFirst = false,
}: {
  from?: string;
  to?: string;
  category?: string;
  promotedFirst?: boolean;
} = {}): Promise<ClassCard[]> {
  console.log('[DB] listUpcomingClasses', { from, to, category, promotedFirst });

  let query = supabase
    .from('classes')
    .select(`
      *,
      instructor:instructors(*)
    `);

  // Apply filters
  if (from) {
    query = query.gte('start_at', from);
  } else {
    query = query.gte('start_at', new Date().toISOString());
  }

  if (to) {
    query = query.lte('start_at', to);
  }

  if (category) {
    query = query.eq('category', category);
  }

  // Apply ordering
  if (promotedFirst) {
    query = query.order('promoted', { ascending: false });
    query = query.order('start_at', { ascending: true });
  } else {
    query = query.order('start_at', { ascending: true });
  }

  const { data: classes, error } = await query;

  if (error) {
    console.error('[DB] listUpcomingClasses error', error);
    throw error;
  }

  // Get capacity information for each class
  const classIds = classes?.map(c => c.id) || [];
  const capacities = await getClassCapacities(classIds);
  const capacityMap = new Map(capacities.map(c => [c.class_id, c]));

  // Combine class data with capacity
  const result: ClassCard[] = (classes || []).map(cls => ({
    ...cls,
    remaining_capacity: capacityMap.get(cls.id)?.remaining || cls.max_capacity,
  }));

  return result;
}

export async function getClassDetails(classId: string, studentUid?: string): Promise<ClassDetails | null> {
  console.log('[DB] getClassDetails', { classId, studentUid });

  const { data: classData, error } = await supabase
    .from('classes')
    .select(`
      *,
      instructor:instructors(*)
    `)
    .eq('id', classId)
    .single();

  if (error) {
    console.error('[DB] getClassDetails error', error);
    throw error;
  }

  if (!classData) return null;

  // Get capacity
  const [capacity] = await getClassCapacities([classId]);

  // Check if student has booked this class
  let isBooked = false;
  let bookingId: string | undefined;

  if (studentUid) {
    const { data: booking } = await supabase
      .from('bookings')
      .select('id')
      .eq('class_id', classId)
      .eq('student_uid', studentUid)
      .eq('status', 'booked')
      .single();

    isBooked = !!booking;
    bookingId = booking?.id;
  }

  return {
    ...classData,
    remaining_capacity: capacity?.remaining || classData.max_capacity,
    is_booked: isBooked,
    booking_id: bookingId,
  };
}

export async function createOrUpdateClass(classData: ClassUpsert): Promise<{ id: string }> {
  console.log('[DB] createOrUpdateClass', classData);

  if (classData.id) {
    // Update existing class
    const { data, error } = await supabase
      .from('classes')
      .update(classData)
      .eq('id', classData.id)
      .select('id')
      .single();

    if (error) {
      console.error('[DB] updateClass error', error);
      throw error;
    }

    return { id: data.id };
  } else {
    // Create new class
    const { data, error } = await supabase
      .from('classes')
      .insert(classData)
      .select('id')
      .single();

    if (error) {
      console.error('[DB] createClass error', error);
      throw error;
    }

    return { id: data.id };
  }
}

export async function togglePromotion(
  classId: string, 
  promoted: boolean, 
  promoted_until?: string
): Promise<void> {
  console.log('[DB] togglePromotion', { classId, promoted, promoted_until });

  const updateData: any = { promoted };
  if (promoted && promoted_until) {
    updateData.promoted_until = promoted_until;
  } else if (!promoted) {
    updateData.promoted_until = null;
  }

  const { error } = await supabase
    .from('classes')
    .update(updateData)
    .eq('id', classId);

  if (error) {
    console.error('[DB] togglePromotion error', error);
    throw error;
  }
}

// Helper function to get class capacities
async function getClassCapacities(classIds: string[]): Promise<ClassCapacity[]> {
  if (classIds.length === 0) return [];

  const { data, error } = await supabase
    .rpc('get_class_capacities', { class_ids: classIds });

  if (error) {
    console.error('[DB] getClassCapacities error', error);
    // Fallback: return max capacity for each class
    const { data: classes } = await supabase
      .from('classes')
      .select('id, max_capacity')
      .in('id', classIds);

    return (classes || []).map(c => ({
      class_id: c.id,
      max_capacity: c.max_capacity,
      booked_count: 0,
      remaining: c.max_capacity,
    }));
  }

  return data || [];
}

// Instructor Management
export async function listInstructors(): Promise<Instructor[]> {
  console.log('[DB] listInstructors');

  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .order('name');

  if (error) {
    console.error('[DB] listInstructors error', error);
    throw error;
  }

  return data || [];
}

export async function createOrUpdateInstructor(instructor: Partial<Instructor>): Promise<{ id: string }> {
  console.log('[DB] createOrUpdateInstructor', instructor);

  if (instructor.id) {
    // Update existing instructor
    const { data, error } = await supabase
      .from('instructors')
      .update(instructor)
      .eq('id', instructor.id)
      .select('id')
      .single();

    if (error) {
      console.error('[DB] updateInstructor error', error);
      throw error;
    }

    return { id: data.id };
  } else {
    // Create new instructor
    const { data, error } = await supabase
      .from('instructors')
      .insert(instructor)
      .select('id')
      .single();

    if (error) {
      console.error('[DB] createInstructor error', error);
      throw error;
    }

    return { id: data.id };
  }
}

// Real-time subscriptions
export function subscribeToClassCapacity(
  classId: string,
  callback: (capacity: ClassCapacity) => void
) {
  console.log('[DB] subscribeToClassCapacity', classId);

  return supabase
    .channel(`class-${classId}`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'bookings',
        filter: `class_id=eq.${classId}`
      },
      async () => {
        // Refresh capacity when bookings change
        const [capacity] = await getClassCapacities([classId]);
        if (capacity) {
          callback(capacity);
        }
      }
    )
    .subscribe();
}

export { supabase as default };
