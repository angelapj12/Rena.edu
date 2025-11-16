import { supabase } from './db';

export interface InstructorFormData {
  name: string;
  title: string;
  bio: string;
  credentials: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  specialties?: string[];
  years_experience?: number;
  hourly_rate?: number;
  avatar_url?: string;
  certifications?: string[];
}

export interface InstructorProfileData {
  instructor_id: string;
  user_id: string;
  firebase_uid: string;
  display_name: string;
  email: string;
  phone?: string;
  bio?: string;
  specialties: string[];
  certifications: string[];
  years_experience: number;
  hourly_rate?: number;
  payout_percentage: number;
  rating: number;
  total_reviews: number;
  total_classes_taught: number;
  avg_attendance_rate: number;
  is_featured: boolean;
  featured_until?: string;
  status: 'Active' | 'Inactive';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export class InstructorManagementService {
  
  async updateInstructor(instructorId: string, updateData: Partial<InstructorFormData>): Promise<{ success: boolean; error?: string }> {
    console.log('[InstructorMgmt] Updating instructor:', instructorId, updateData);
    
    try {
      // First, update the instructors table
      const instructorUpdate: any = {};
      
      if (updateData.bio) instructorUpdate.bio = updateData.bio;
      if (updateData.specialties) instructorUpdate.specialties = updateData.specialties;
      if (updateData.years_experience) instructorUpdate.years_experience = updateData.years_experience;
      if (updateData.hourly_rate) instructorUpdate.hourly_rate = updateData.hourly_rate;
      if (updateData.avatar_url) instructorUpdate.avatar_url = updateData.avatar_url;
      if (updateData.credentials) {
        // Parse credentials string into certifications array
        instructorUpdate.certifications = updateData.credentials.split(',').map(c => c.trim()).filter(c => c);
      }

      // Update instructor profile
      const { error: instructorError } = await supabase
        .from('instructors')
        .update({
          ...instructorUpdate,
          updated_at: new Date().toISOString()
        })
        .eq('id', instructorId);

      if (instructorError) {
        console.error('[InstructorMgmt] Instructor update error:', instructorError);
        throw new Error(`Failed to update instructor profile: ${instructorError.message}`);
      }

      // Get the instructor's user_id to update user table
      const { data: instructorData, error: fetchError } = await supabase
        .from('instructors')
        .select('user_id')
        .eq('id', instructorId)
        .single();

      if (fetchError) {
        console.error('[InstructorMgmt] Failed to fetch instructor user_id:', fetchError);
        throw new Error('Failed to get instructor user data');
      }

      // Update the users table with basic info
      const userUpdate: any = {};
      if (updateData.name) userUpdate.display_name = updateData.name;
      if (updateData.email) userUpdate.email = updateData.email;
      if (updateData.phone) userUpdate.phone = updateData.phone;
      if (updateData.bio) userUpdate.bio = updateData.bio;
      if (updateData.avatar_url) userUpdate.avatar_url = updateData.avatar_url;

      if (Object.keys(userUpdate).length > 0) {
        const { error: userError } = await supabase
          .from('users')
          .update({
            ...userUpdate,
            updated_at: new Date().toISOString()
          })
          .eq('id', instructorData.user_id);

        if (userError) {
          console.error('[InstructorMgmt] User update error:', userError);
          throw new Error(`Failed to update user profile: ${userError.message}`);
        }
      }

      console.log('[InstructorMgmt] Instructor updated successfully');
      return { success: true };

    } catch (error) {
      console.error('[InstructorMgmt] Failed to update instructor:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  async getInstructorById(instructorId: string): Promise<{ success: boolean; data?: InstructorProfileData; error?: string }> {
    console.log('[InstructorMgmt] Fetching instructor:', instructorId);
    
    try {
      const { data, error } = await supabase
        .from('instructors')
        .select(`
          id,
          bio,
          specialties,
          certifications,
          years_experience,
          hourly_rate,
          payout_percentage,
          rating,
          total_reviews,
          total_classes_taught,
          avg_attendance_rate,
          is_featured,
          featured_until,
          created_at,
          updated_at,
          users!inner (
            id,
            firebase_uid,
            email,
            display_name,
            phone,
            bio,
            avatar_url,
            role
          )
        `)
        .eq('id', instructorId)
        .single();

      if (error) {
        console.error('[InstructorMgmt] Failed to fetch instructor:', error);
        throw new Error(`Failed to fetch instructor: ${error.message}`);
      }

      const user = Array.isArray(data.users) ? data.users[0] : data.users;
      
      const instructorProfile: InstructorProfileData = {
        instructor_id: data.id,
        user_id: user.id,
        firebase_uid: user.firebase_uid,
        display_name: user.display_name,
        email: user.email,
        phone: user.phone,
        bio: data.bio || user.bio,
        specialties: data.specialties || [],
        certifications: data.certifications || [],
        years_experience: data.years_experience || 0,
        hourly_rate: data.hourly_rate,
        payout_percentage: data.payout_percentage || 0.5,
        rating: data.rating || 0,
        total_reviews: data.total_reviews || 0,
        total_classes_taught: data.total_classes_taught || 0,
        avg_attendance_rate: data.avg_attendance_rate || 0,
        is_featured: data.is_featured || false,
        featured_until: data.featured_until,
        status: user.role === 'instructor' ? 'Active' : 'Inactive',
        avatar_url: user.avatar_url,
        created_at: data.created_at,
        updated_at: data.updated_at
      };

      return { success: true, data: instructorProfile };

    } catch (error) {
      console.error('[InstructorMgmt] Error fetching instructor:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  async getAllInstructors(): Promise<InstructorProfileData[]> {
    try {
      const { data, error } = await supabase
        .from('instructors')
        .select(`
          id,
          bio,
          specialties,
          certifications,
          years_experience,
          rating,
          total_reviews,
          total_classes_taught,
          is_featured,
          users!inner (
            id,
            firebase_uid,
            email,
            display_name,
            phone,
            avatar_url,
            role
          )
        `)
        .eq('users.role', 'instructor')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[InstructorMgmt] Failed to fetch instructors:', error);
        return [];
      }

      return (data || []).map((instructor: any) => ({
        instructor_id: instructor.id,
        user_id: instructor.users.id,
        firebase_uid: instructor.users.firebase_uid,
        display_name: instructor.users.display_name,
        email: instructor.users.email,
        phone: instructor.users.phone,
        bio: instructor.bio,
        specialties: instructor.specialties || [],
        certifications: instructor.certifications || [],
        years_experience: instructor.years_experience || 0,
        rating: instructor.rating || 0,
        total_reviews: instructor.total_reviews || 0,
        total_classes_taught: instructor.total_classes_taught || 0,
        avg_attendance_rate: 0,
        payout_percentage: 0.5,
        is_featured: instructor.is_featured || false,
        status: 'Active' as const,
        avatar_url: instructor.users.avatar_url,
        created_at: instructor.created_at || new Date().toISOString(),
        updated_at: instructor.updated_at || new Date().toISOString()
      }));

    } catch (error) {
      console.error('[InstructorMgmt] Error fetching instructors:', error);
      return [];
    }
  }

  // Create mock service for testing
  async updateInstructorMock(instructorId: string, updateData: Partial<InstructorFormData>): Promise<{ success: boolean; error?: string }> {
    console.log('[InstructorMgmt] Mock updating instructor:', instructorId, updateData);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Simulate validation
      if (!updateData.name?.trim()) {
        throw new Error('Name is required');
      }
      if (!updateData.email?.trim() || !updateData.email.includes('@')) {
        throw new Error('Valid email is required');
      }

      // Mock successful update
      console.log('[InstructorMgmt] Mock update successful');
      
      // Trigger custom event for UI updates
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('instructor-updated', {
          detail: { instructorId, updateData, timestamp: Date.now() }
        }));
      }
      
      return { success: true };

    } catch (error) {
      console.error('[InstructorMgmt] Mock update failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Update failed' 
      };
    }
  }
}

export const instructorManagementService = new InstructorManagementService();
