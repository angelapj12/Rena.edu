import { supabase } from './db';

export interface ClassFormData {
  title: string;
  instructor_id: string;
  category: 'Yoga' | 'Fitness' | 'Meditation' | 'Pilates' | 'Dance' | 'Nutrition' | 'Other';
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  description: string;
  learning_outcomes?: string;
  price: number;
  max_capacity: number;
  duration_minutes: number;
  location?: string;
  is_virtual: boolean;
  meeting_link?: string;
  certification_required: boolean;
  is_active: boolean;
  xp_reward: number;
  created_by: string; // Firebase UID of admin who created
}

export interface ClassSession {
  class_id: string;
  start_time: string;
  end_time: string;
  max_capacity?: number; // Override class capacity if needed
  location?: string; // Override class location if needed
  notes?: string;
}

export class ClassManagementService {
  
  async createClass(classData: ClassFormData): Promise<{ success: boolean; class_id?: string; error?: string }> {
    console.log('[ClassMgmt] Creating new class:', classData);
    
    try {
      // Validate required fields
      if (!classData.title || !classData.instructor_id || !classData.category) {
        throw new Error('Missing required fields: title, instructor, or category');
      }

      // Insert class into database
      const { data, error } = await supabase
        .from('classes')
        .insert({
          title: classData.title,
          instructor_id: classData.instructor_id,
          category: classData.category,
          difficulty_level: classData.difficulty_level,
          description: classData.description,
          price: classData.price,
          max_capacity: classData.max_capacity,
          duration_minutes: classData.duration_minutes,
          location: classData.location,
          is_virtual: classData.is_virtual,
          meeting_link: classData.meeting_link,
          xp_reward: classData.xp_reward,
          status: classData.is_active ? 'scheduled' : 'draft',
          created_by: classData.created_by,
        })
        .select('id')
        .single();

      if (error) {
        console.error('[ClassMgmt] Database error:', error);
        throw new Error(`Failed to create class: ${error.message}`);
      }

      console.log('[ClassMgmt] Class created successfully:', data);
      return { success: true, class_id: data.id };

    } catch (error) {
      console.error('[ClassMgmt] Failed to create class:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  async createClassSession(sessionData: ClassSession): Promise<{ success: boolean; session_id?: string; error?: string }> {
    console.log('[ClassMgmt] Creating class session:', sessionData);
    
    try {
      // Get the base class data
      const { data: classData, error: classError } = await supabase
        .from('classes')
        .select('*')
        .eq('id', sessionData.class_id)
        .single();

      if (classError) {
        throw new Error(`Failed to find class: ${classError.message}`);
      }

      // Calculate end time if not provided
      let endTime = sessionData.end_time;
      if (!endTime && classData.duration_minutes) {
        const startDate = new Date(sessionData.start_time);
        startDate.setMinutes(startDate.getMinutes() + classData.duration_minutes);
        endTime = startDate.toISOString();
      }

      // Create class session (this could be a separate sessions table or update the main class)
      // For now, let's create a new class entry for each session
      const { data, error } = await supabase
        .from('classes')
        .insert({
          // Copy all fields from the template class
          title: `${classData.title} - ${new Date(sessionData.start_time).toLocaleDateString()}`,
          instructor_id: classData.instructor_id,
          category: classData.category,
          difficulty_level: classData.difficulty_level,
          description: classData.description,
          price: classData.price,
          max_capacity: sessionData.max_capacity || classData.max_capacity,
          duration_minutes: classData.duration_minutes,
          location: sessionData.location || classData.location,
          start_time: sessionData.start_time,
          end_time: endTime,
          xp_reward: classData.xp_reward || 10,
          status: 'scheduled',
          created_by: classData.created_by,
        })
        .select('id')
        .single();

      if (error) {
        console.error('[ClassMgmt] Session creation error:', error);
        throw new Error(`Failed to create session: ${error.message}`);
      }

      console.log('[ClassMgmt] Session created successfully:', data);
      return { success: true, session_id: data.id };

    } catch (error) {
      console.error('[ClassMgmt] Failed to create session:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Get all instructors for the form dropdown
  async getInstructors(): Promise<{ id: string; name: string; specialties: string[] }[]> {
    try {
      const { data, error } = await supabase
        .from('instructors')
        .select(`
          id,
          specialties,
          users!inner (
            display_name,
            role
          )
        `)
        .eq('users.role', 'instructor'); // Only get active instructors

      if (error) {
        console.error('[ClassMgmt] Failed to fetch instructors:', error);
        return [];
      }

      return (data || []).map((instructor: any) => ({
        id: instructor.id,
        name: instructor.users.display_name || 'Unknown Instructor',
        specialties: instructor.specialties || []
      }));

    } catch (error) {
      console.error('[ClassMgmt] Error fetching instructors:', error);
      return [];
    }
  }

  // Get all classes for admin management
  async getAllClasses(filters?: { category?: string; instructor?: string; status?: string }) {
    try {
      let query = supabase
        .from('classes')
        .select(`
          id,
          title,
          category,
          difficulty_level,
          start_time,
          end_time,
          max_capacity,
          current_bookings,
          price,
          location,
          status,
          is_featured,
          instructors:instructor_id (
            id,
            users:user_id (
              display_name
            )
          )
        `)
        .order('start_time', { ascending: true });

      // Apply filters
      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }
      if (filters?.instructor && filters.instructor !== 'all') {
        query = query.eq('instructor_id', filters.instructor);
      }
      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;

      if (error) {
        console.error('[ClassMgmt] Failed to fetch classes:', error);
        return [];
      }

      return data || [];

    } catch (error) {
      console.error('[ClassMgmt] Error fetching classes:', error);
      return [];
    }
  }

  // Update class
  async updateClass(classId: string, updates: Partial<ClassFormData>): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('classes')
        .update(updates)
        .eq('id', classId);

      if (error) {
        console.error('[ClassMgmt] Update error:', error);
        throw new Error(`Failed to update class: ${error.message}`);
      }

      console.log('[ClassMgmt] Class updated successfully');
      return { success: true };

    } catch (error) {
      console.error('[ClassMgmt] Failed to update class:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Delete class
  async deleteClass(classId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Check if class has bookings
      const { data: bookings, error: bookingError } = await supabase
        .from('bookings')
        .select('id')
        .eq('class_id', classId)
        .eq('status', 'booked');

      if (bookingError) {
        throw new Error(`Failed to check bookings: ${bookingError.message}`);
      }

      if (bookings && bookings.length > 0) {
        throw new Error('Cannot delete class with active bookings. Cancel all bookings first.');
      }

      // Delete the class
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', classId);

      if (error) {
        console.error('[ClassMgmt] Delete error:', error);
        throw new Error(`Failed to delete class: ${error.message}`);
      }

      console.log('[ClassMgmt] Class deleted successfully');
      return { success: true };

    } catch (error) {
      console.error('[ClassMgmt] Failed to delete class:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }
}

export const classManagementService = new ClassManagementService();
