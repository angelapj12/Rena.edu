// Temporary mock database service until Supabase is fully set up
// This simulates the database operations for testing the Add Class functionality

interface MockClass {
  id: number;
  title: string;
  instructor_name: string;
  category: string;
  difficulty: string;
  start_time: string;
  duration_minutes: number;
  maxCapacity: number;
  current_bookings: number;
  price: number;
  location: string;
  description: string;
  learning_outcomes?: string;
  is_featured: boolean;
  is_active: boolean;
  xp_reward: number;
  image_url: string;
  created_at: string;
}

class MockDatabaseService {
  private classes: MockClass[] = [];
  private nextId = 1000;

  constructor() {
    // Initialize with some mock data
    this.classes = [
      {
        id: 1,
        title: 'Morning Yoga Flow',
        instructor_name: 'Sarah Johnson',
        category: 'Yoga',
        difficulty: 'beginner',
        start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        duration_minutes: 60,
        maxCapacity: 20,
        current_bookings: 8,
        price: 25,
        location: 'Studio A - Main Floor',
        description: 'Start your day with energizing yoga poses and mindful breathing.',
        is_featured: true,
        is_active: true,
        xp_reward: 10,
        image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
        created_at: new Date().toISOString()
      }
    ];
  }

  async addClass(classData: Partial<MockClass>): Promise<{ success: boolean; class_id?: number; error?: string }> {
    console.log('[MockDB] Adding new class:', classData);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const newClass: MockClass = {
        id: this.nextId++,
        title: classData.title || 'Untitled Class',
        instructor_name: classData.instructor_name || 'Unknown Instructor',
        category: classData.category || 'Other',
        difficulty: classData.difficulty || 'beginner',
        start_time: classData.start_time || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        duration_minutes: classData.duration_minutes || 60,
        maxCapacity: classData.maxCapacity || 20,
        current_bookings: 0,
        price: classData.price || 25,
        location: classData.location || 'Studio A',
        description: classData.description || '',
        learning_outcomes: classData.learning_outcomes,
        is_featured: false,
        is_active: classData.is_active !== false,
        xp_reward: classData.xp_reward || 10,
        image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
        created_at: new Date().toISOString()
      };

      this.classes.push(newClass);
      
      console.log('[MockDB] Class added successfully:', newClass);
      console.log('[MockDB] Total classes now:', this.classes.length);
      
      // Trigger a custom event to notify components about the new class
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('class-added', {
          detail: { class: newClass }
        }));
      }
      
      return { success: true, class_id: newClass.id };
    } catch (error) {
      console.error('[MockDB] Failed to add class:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getAllClasses(): Promise<MockClass[]> {
    console.log('[MockDB] Fetching all classes:', this.classes.length);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.classes];
  }

  async getClassById(id: number): Promise<MockClass | null> {
    const foundClass = this.classes.find(c => c.id === id);
    console.log('[MockDB] Finding class by ID:', id, foundClass ? 'found' : 'not found');
    return foundClass || null;
  }

  async updateClass(id: number, updates: Partial<MockClass>): Promise<{ success: boolean; error?: string }> {
    console.log('[MockDB] Updating class:', id, updates);
    
    const classIndex = this.classes.findIndex(c => c.id === id);
    if (classIndex === -1) {
      return { success: false, error: 'Class not found' };
    }

    this.classes[classIndex] = { ...this.classes[classIndex], ...updates };
    
    // Trigger update event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('class-updated', {
        detail: { class: this.classes[classIndex] }
      }));
    }
    
    return { success: true };
  }

  async deleteClass(id: number): Promise<{ success: boolean; error?: string }> {
    console.log('[MockDB] Deleting class:', id);
    
    const classIndex = this.classes.findIndex(c => c.id === id);
    if (classIndex === -1) {
      return { success: false, error: 'Class not found' };
    }

    const deletedClass = this.classes[classIndex];
    this.classes.splice(classIndex, 1);
    
    // Trigger delete event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('class-deleted', {
        detail: { class: deletedClass }
      }));
    }
    
    return { success: true };
  }

  // Get classes statistics for admin dashboard
  getClassStats() {
    const total = this.classes.length;
    const active = this.classes.filter(c => c.is_active).length;
    const totalBookings = this.classes.reduce((sum, c) => sum + c.current_bookings, 0);
    const totalCapacity = this.classes.reduce((sum, c) => sum + c.maxCapacity, 0);
    const avgOccupancy = totalCapacity > 0 ? (totalBookings / totalCapacity * 100).toFixed(1) : '0';

    return {
      totalClasses: total,
      activeClasses: active,
      totalBookings,
      totalCapacity,
      avgOccupancy: `${avgOccupancy}%`
    };
  }
}

// Export singleton instance
export const mockDatabase = new MockDatabaseService();

// Make it available globally for testing
if (typeof window !== 'undefined') {
  (window as any).mockDatabase = mockDatabase;
}
