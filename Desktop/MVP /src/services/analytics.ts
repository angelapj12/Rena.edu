import { supabase } from './db';
import type { CapacitySnapshot, AttendanceStats } from '../types';

export class AnalyticsError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AnalyticsError';
  }
}

export interface AnalyticsFilters {
  dateFrom?: string;
  dateTo?: string;
  instructorId?: string;
  classId?: string;
  category?: string;
}

export interface RevenueMetrics {
  totalRevenue: number;
  averageClassRevenue: number;
  topPerformingClasses: Array<{
    classId: string;
    title: string;
    revenue: number;
    attendees: number;
  }>;
}

export interface UserEngagementMetrics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  averageClassesPerUser: number;
  topUsers: Array<{
    userUid: string;
    displayName: string;
    totalXP: number;
    level: number;
    classesAttended: number;
  }>;
}

export async function getCapacitySnapshot(filters: AnalyticsFilters = {}): Promise<CapacitySnapshot[]> {
  console.log('[Analytics] getCapacitySnapshot', filters);

  try {
    let query = supabase
      .from('classes')
      .select(`
        id,
        title,
        start_at,
        max_capacity,
        bookings!inner(status)
      `);

    // Apply filters
    if (filters.dateFrom) {
      query = query.gte('start_at', filters.dateFrom);
    }

    if (filters.dateTo) {
      query = query.lte('start_at', filters.dateTo);
    }

    if (filters.instructorId) {
      query = query.eq('instructor_id', filters.instructorId);
    }

    if (filters.classId) {
      query = query.eq('id', filters.classId);
    }

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    query = query.order('start_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('[Analytics] getCapacitySnapshot error', error);
      throw new AnalyticsError('Failed to fetch capacity data');
    }

    // Process the data to calculate booked and remaining capacity
    const result: CapacitySnapshot[] = (data || []).map(classData => {
      const bookedCount = classData.bookings?.filter(
        (booking: any) => booking.status === 'booked' || booking.status === 'attended'
      ).length || 0;

      return {
        classId: classData.id,
        title: classData.title,
        start_at: classData.start_at,
        max_capacity: classData.max_capacity,
        booked: bookedCount,
        remaining: classData.max_capacity - bookedCount,
      };
    });

    return result;
  } catch (error) {
    if (error instanceof AnalyticsError) {
      throw error;
    }
    console.error('[Analytics] Unexpected error in getCapacitySnapshot', error);
    throw new AnalyticsError('Failed to fetch capacity analytics');
  }
}

export async function getAttendanceStats(filters: AnalyticsFilters = {}): Promise<AttendanceStats> {
  console.log('[Analytics] getAttendanceStats', filters);

  try {
    let query = supabase
      .from('bookings')
      .select(`
        status,
        class:classes!inner(start_at, category, instructor_id)
      `);

    // Apply filters through the class relationship
    if (filters.dateFrom) {
      query = query.gte('class.start_at', filters.dateFrom);
    }

    if (filters.dateTo) {
      query = query.lte('class.start_at', filters.dateTo);
    }

    if (filters.instructorId) {
      query = query.eq('class.instructor_id', filters.instructorId);
    }

    if (filters.category) {
      query = query.eq('class.category', filters.category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[Analytics] getAttendanceStats error', error);
      throw new AnalyticsError('Failed to fetch attendance data');
    }

    // Calculate statistics
    const totalBookings = data?.length || 0;
    const attended = data?.filter(b => b.status === 'attended').length || 0;
    const noShow = data?.filter(b => b.status === 'no_show').length || 0;
    const cancelled = data?.filter(b => b.status === 'cancelled').length || 0;
    const booked = data?.filter(b => b.status === 'booked').length || 0;

    const attendanceRate = totalBookings > 0 ? (attended / (attended + noShow)) * 100 : 0;

    return {
      booked: booked + attended + noShow, // Total confirmed bookings
      attended,
      no_show: noShow,
      attendance_rate: Math.round(attendanceRate * 100) / 100, // Round to 2 decimals
    };
  } catch (error) {
    if (error instanceof AnalyticsError) {
      throw error;
    }
    console.error('[Analytics] Unexpected error in getAttendanceStats', error);
    throw new AnalyticsError('Failed to fetch attendance statistics');
  }
}

export async function getRevenueMetrics(filters: AnalyticsFilters = {}): Promise<RevenueMetrics> {
  console.log('[Analytics] getRevenueMetrics', filters);

  try {
    // This is a simplified version - in a real app you'd have pricing data
    const { data, error } = await supabase.rpc('get_revenue_analytics', {
      date_from: filters.dateFrom,
      date_to: filters.dateTo,
      instructor_id: filters.instructorId,
      category: filters.category,
    });

    if (error) {
      console.error('[Analytics] getRevenueMetrics error', error);
      throw new AnalyticsError('Failed to fetch revenue data');
    }

    return data || {
      totalRevenue: 0,
      averageClassRevenue: 0,
      topPerformingClasses: [],
    };
  } catch (error) {
    if (error instanceof AnalyticsError) {
      throw error;
    }
    console.error('[Analytics] Unexpected error in getRevenueMetrics', error);
    throw new AnalyticsError('Failed to fetch revenue metrics');
  }
}

export async function getUserEngagementMetrics(filters: AnalyticsFilters = {}): Promise<UserEngagementMetrics> {
  console.log('[Analytics] getUserEngagementMetrics', filters);

  try {
    const { data, error } = await supabase.rpc('get_engagement_analytics', {
      date_from: filters.dateFrom,
      date_to: filters.dateTo,
    });

    if (error) {
      console.error('[Analytics] getUserEngagementMetrics error', error);
      throw new AnalyticsError('Failed to fetch engagement data');
    }

    return data || {
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
      averageClassesPerUser: 0,
      topUsers: [],
    };
  } catch (error) {
    if (error instanceof AnalyticsError) {
      throw error;
    }
    console.error('[Analytics] Unexpected error in getUserEngagementMetrics', error);
    throw new AnalyticsError('Failed to fetch engagement metrics');
  }
}

export async function getClassPerformanceData(
  period: 'week' | 'month' | 'quarter' = 'month'
): Promise<Array<{
  date: string;
  totalClasses: number;
  totalBookings: number;
  attendanceRate: number;
}>> {
  console.log('[Analytics] getClassPerformanceData', period);

  try {
    const { data, error } = await supabase.rpc('get_class_performance_timeline', {
      period_type: period
    });

    if (error) {
      console.error('[Analytics] getClassPerformanceData error', error);
      throw new AnalyticsError('Failed to fetch performance timeline');
    }

    return data || [];
  } catch (error) {
    if (error instanceof AnalyticsError) {
      throw error;
    }
    console.error('[Analytics] Unexpected error in getClassPerformanceData', error);
    throw new AnalyticsError('Failed to fetch class performance data');
  }
}

export async function getInstructorPerformance(): Promise<Array<{
  instructorId: string;
  name: string;
  totalClasses: number;
  averageCapacity: number;
  attendanceRate: number;
  totalStudents: number;
}>> {
  console.log('[Analytics] getInstructorPerformance');

  try {
    const { data, error } = await supabase.rpc('get_instructor_performance');

    if (error) {
      console.error('[Analytics] getInstructorPerformance error', error);
      throw new AnalyticsError('Failed to fetch instructor performance');
    }

    return data || [];
  } catch (error) {
    if (error instanceof AnalyticsError) {
      throw error;
    }
    console.error('[Analytics] Unexpected error in getInstructorPerformance', error);
    throw new AnalyticsError('Failed to fetch instructor performance data');
  }
}

export async function getCategoryBreakdown(): Promise<Array<{
  category: string;
  classCount: number;
  totalBookings: number;
  averageAttendance: number;
}>> {
  console.log('[Analytics] getCategoryBreakdown');

  try {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        category,
        bookings(status)
      `);

    if (error) {
      console.error('[Analytics] getCategoryBreakdown error', error);
      throw new AnalyticsError('Failed to fetch category data');
    }

    // Process data to get breakdown by category
    const categoryMap = new Map();

    (data || []).forEach(classItem => {
      const category = classItem.category;
      const bookings = classItem.bookings || [];
      const attended = bookings.filter((b: any) => b.status === 'attended').length;
      const totalBookings = bookings.filter((b: any) => 
        b.status === 'attended' || b.status === 'no_show'
      ).length;

      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          category,
          classCount: 0,
          totalBookings: 0,
          totalAttended: 0,
        });
      }

      const categoryData = categoryMap.get(category);
      categoryData.classCount++;
      categoryData.totalBookings += totalBookings;
      categoryData.totalAttended += attended;
    });

    // Convert to final format
    const result = Array.from(categoryMap.values()).map(item => ({
      category: item.category,
      classCount: item.classCount,
      totalBookings: item.totalBookings,
      averageAttendance: item.totalBookings > 0 
        ? Math.round((item.totalAttended / item.totalBookings) * 100 * 100) / 100
        : 0,
    }));

    return result;
  } catch (error) {
    console.error('[Analytics] Unexpected error in getCategoryBreakdown', error);
    throw new AnalyticsError('Failed to fetch category breakdown');
  }
}

// Real-time analytics subscriptions
export function subscribeToAnalytics(callback: () => void) {
  console.log('[Analytics] Setting up real-time analytics subscription');

  const channels = [
    // Listen for booking changes
    supabase
      .channel('analytics-bookings')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bookings'
      }, () => {
        console.log('[Analytics] Booking data changed, refreshing analytics');
        callback();
      }),

    // Listen for class changes
    supabase
      .channel('analytics-classes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'classes'
      }, () => {
        console.log('[Analytics] Class data changed, refreshing analytics');
        callback();
      })
  ];

  // Subscribe to all channels
  channels.forEach(channel => channel.subscribe());

  // Return unsubscribe function
  return () => {
    channels.forEach(channel => channel.unsubscribe());
  };
}
