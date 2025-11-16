// Mock instructor management service for testing
// This simulates the database operations until Supabase is fully integrated

interface MockInstructorData {
  id: string | number;
  name: string;
  title: string;
  bio: string;
  credentials: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  image?: string;
  specialties: string[];
  years_experience: number;
  rating?: number;
  students?: number;
  updated_at: string;
}

class MockInstructorService {
  private instructors: Map<string | number, MockInstructorData> = new Map();

  constructor() {
    // Initialize with some mock instructor data
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockInstructors: MockInstructorData[] = [
      {
        id: 1,
        name: 'Sarah Thompson',
        title: 'Master Yoga Teacher',
        bio: 'Experienced yoga instructor with over 8 years of teaching experience. Specializes in Hatha, Vinyasa, and restorative yoga practices.',
        credentials: 'RYT-500, Yoga Alliance Certified, Advanced Meditation Training',
        email: 'sarah.thompson@wellnesshub.com',
        phone: '555-0101',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1594824720743-7ad6b0772319?w=400&h=400&fit=crop&crop=face',
        specialties: ['Yoga', 'Meditation', 'Mindfulness'],
        years_experience: 8,
        rating: 4.9,
        students: 245,
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Bert Johnson',
        title: 'HIIT Specialist',
        bio: 'High-intensity interval training expert focused on building strength, endurance, and cardiovascular health.',
        credentials: 'NASM-CPT, HIIT Certification, Sports Performance Specialist',
        email: 'bert.johnson@wellnesshub.com',
        phone: '555-0102',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        specialties: ['HIIT', 'Cardio', 'Strength Training'],
        years_experience: 6,
        rating: 4.8,
        students: 189,
        updated_at: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Dr. Lisa Chen',
        title: 'Meditation Expert',
        bio: 'Licensed clinical psychologist and meditation teacher with expertise in mindfulness-based stress reduction.',
        credentials: 'Ph.D. Clinical Psychology, MBSR Certified, Mindfulness Teacher Training',
        email: 'lisa.chen@wellnesshub.com',
        phone: '555-0103',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        specialties: ['Meditation', 'Mindfulness', 'Stress Reduction'],
        years_experience: 12,
        rating: 4.9,
        students: 156,
        updated_at: new Date().toISOString()
      }
    ];

    mockInstructors.forEach(instructor => {
      this.instructors.set(instructor.id, instructor);
    });

    console.log('[MockInstructorService] Initialized with', mockInstructors.length, 'instructors');
  }

  async updateInstructor(instructorId: string | number, updateData: Partial<MockInstructorData>): Promise<{ success: boolean; error?: string }> {
    console.log('[MockInstructorService] Updating instructor:', instructorId, updateData);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const instructor = this.instructors.get(instructorId);
      if (!instructor) {
        throw new Error(`Instructor with ID ${instructorId} not found`);
      }

      // Validate required fields
      if (updateData.name && !updateData.name.trim()) {
        throw new Error('Name cannot be empty');
      }
      if (updateData.email && (!updateData.email.trim() || !updateData.email.includes('@'))) {
        throw new Error('Valid email is required');
      }
      if (updateData.phone && updateData.phone.trim().length < 10) {
        throw new Error('Valid phone number is required');
      }

      // Update instructor data
      const updatedInstructor: MockInstructorData = {
        ...instructor,
        ...updateData,
        updated_at: new Date().toISOString()
      };

      this.instructors.set(instructorId, updatedInstructor);

      console.log('[MockInstructorService] Instructor updated successfully:', updatedInstructor);

      // Trigger custom event for UI updates
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('instructor-updated', {
          detail: { 
            instructorId, 
            updatedData: updatedInstructor, 
            timestamp: Date.now() 
          }
        }));
      }

      return { success: true };

    } catch (error) {
      console.error('[MockInstructorService] Update failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Update failed' 
      };
    }
  }

  async getInstructor(instructorId: string | number): Promise<{ success: boolean; data?: MockInstructorData; error?: string }> {
    console.log('[MockInstructorService] Fetching instructor:', instructorId);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const instructor = this.instructors.get(instructorId);
    if (!instructor) {
      return { success: false, error: `Instructor with ID ${instructorId} not found` };
    }

    return { success: true, data: instructor };
  }

  async getAllInstructors(): Promise<MockInstructorData[]> {
    console.log('[MockInstructorService] Fetching all instructors');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return Array.from(this.instructors.values());
  }

  // Delete instructor
  async deleteInstructor(instructorId: string | number): Promise<{ success: boolean; error?: string }> {
    console.log('[MockInstructorService] Deleting instructor:', instructorId);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const instructor = this.instructors.get(instructorId);
    if (!instructor) {
      return { success: false, error: `Instructor with ID ${instructorId} not found` };
    }

    this.instructors.delete(instructorId);

    // Trigger custom event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('instructor-deleted', {
        detail: { instructorId, timestamp: Date.now() }
      }));
    }

    return { success: true };
  }

  // Get instructor statistics
  getInstructorStats() {
    const instructors = Array.from(this.instructors.values());
    const total = instructors.length;
    const active = instructors.filter(i => i.status === 'Active').length;
    const avgRating = instructors.reduce((sum, i) => sum + (i.rating || 0), 0) / total;
    const totalStudents = instructors.reduce((sum, i) => sum + (i.students || 0), 0);

    return {
      totalInstructors: total,
      activeInstructors: active,
      averageRating: avgRating.toFixed(1),
      totalStudents
    };
  }
}

// Export singleton instance
export const mockInstructorService = new MockInstructorService();

// Make it available globally for testing
if (typeof window !== 'undefined') {
  (window as any).mockInstructorService = mockInstructorService;
}
