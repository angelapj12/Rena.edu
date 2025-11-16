import { supabase } from './db';
import type { Booking } from '../types';

export class BookingError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'BookingError';
  }
}

export async function bookClass(
  classId: string, 
  studentUid: string
): Promise<{ bookingId: string; remaining: number }> {
  console.log('[Booking] bookClass', { classId, studentUid });

  try {
    const { data, error } = await supabase.rpc('book_class', {
      p_class: classId,
      p_student_uid: studentUid,
    });

    if (error) {
      console.error('[Booking] book_class error', error);
      
      if (error.message?.includes('CLASS_NOT_FOUND')) {
        throw new BookingError('Class not found', 'CLASS_NOT_FOUND');
      }
      if (error.message?.includes('CLASS_FULL')) {
        throw new BookingError('This class is full', 'CLASS_FULL');
      }
      if (error.message?.includes('ALREADY_BOOKED')) {
        throw new BookingError('You have already booked this class', 'ALREADY_BOOKED');
      }
      if (error.message?.includes('CLASS_STARTED')) {
        throw new BookingError('Cannot book a class that has already started', 'CLASS_STARTED');
      }
      
      throw new BookingError('Failed to book class', 'UNKNOWN_ERROR', error);
    }

    if (!data || data.length === 0) {
      throw new BookingError('No booking data returned', 'INVALID_RESPONSE');
    }

    const result = data[0];
    console.log('[Booking] Successfully booked', result);

    return {
      bookingId: result.booking_id,
      remaining: result.remaining,
    };
  } catch (error) {
    if (error instanceof BookingError) {
      throw error;
    }
    
    console.error('[Booking] Unexpected error', error);
    throw new BookingError('An unexpected error occurred while booking');
  }
}

export async function cancelBooking(
  bookingId: string, 
  studentUid: string
): Promise<{ ok: boolean }> {
  console.log('[Booking] cancelBooking', { bookingId, studentUid });

  try {
    const { error } = await supabase.rpc('cancel_booking', {
      p_booking: bookingId,
      p_student_uid: studentUid,
    });

    if (error) {
      console.error('[Booking] cancel_booking error', error);
      
      if (error.message?.includes('NOT_FOUND_OR_FORBIDDEN')) {
        throw new BookingError('Booking not found or access denied', 'NOT_FOUND');
      }
      if (error.message?.includes('CANCEL_WINDOW_PASSED')) {
        throw new BookingError(
          'Cancellation window has passed. You can only cancel up to 2 hours before the class starts.',
          'CANCEL_WINDOW_PASSED'
        );
      }
      if (error.message?.includes('ALREADY_CANCELLED')) {
        throw new BookingError('This booking has already been cancelled', 'ALREADY_CANCELLED');
      }
      
      throw new BookingError('Failed to cancel booking', 'UNKNOWN_ERROR', error);
    }

    console.log('[Booking] Successfully cancelled');
    return { ok: true };
  } catch (error) {
    if (error instanceof BookingError) {
      throw error;
    }
    
    console.error('[Booking] Unexpected error', error);
    throw new BookingError('An unexpected error occurred while cancelling');
  }
}

export async function markAttendance(
  bookingId: string,
  attended: boolean,
  attendedAt?: string
): Promise<{ ok: boolean }> {
  console.log('[Booking] markAttendance', { bookingId, attended, attendedAt });

  try {
    const { error } = await supabase.rpc('mark_attendance', {
      p_booking: bookingId,
      p_attended: attended,
      p_attended_at: attendedAt || new Date().toISOString(),
    });

    if (error) {
      console.error('[Booking] mark_attendance error', error);
      throw new BookingError('Failed to mark attendance', 'ATTENDANCE_ERROR', error);
    }

    console.log('[Booking] Attendance marked successfully');
    return { ok: true };
  } catch (error) {
    if (error instanceof BookingError) {
      throw error;
    }
    
    console.error('[Booking] Unexpected error', error);
    throw new BookingError('An unexpected error occurred while marking attendance');
  }
}

export async function getMyBookings(
  studentUid: string,
  status?: 'booked' | 'attended' | 'cancelled' | 'no_show'
): Promise<Booking[]> {
  console.log('[Booking] getMyBookings', { studentUid, status });

  let query = supabase
    .from('bookings')
    .select(`
      *,
      class:classes(
        *,
        instructor:instructors(*)
      )
    `)
    .eq('student_uid', studentUid)
    .order('booked_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[Booking] getMyBookings error', error);
    throw new BookingError('Failed to fetch bookings', 'FETCH_ERROR', error);
  }

  return data || [];
}

export async function getUpcomingBookings(studentUid: string): Promise<Booking[]> {
  console.log('[Booking] getUpcomingBookings', studentUid);

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      class:classes(
        *,
        instructor:instructors(*)
      )
    `)
    .eq('student_uid', studentUid)
    .eq('status', 'booked')
    .gte('classes.start_at', now)
    .order('classes.start_at', { ascending: true });

  if (error) {
    console.error('[Booking] getUpcomingBookings error', error);
    throw new BookingError('Failed to fetch upcoming bookings', 'FETCH_ERROR', error);
  }

  return data || [];
}

export async function getClassAttendees(classId: string): Promise<Booking[]> {
  console.log('[Booking] getClassAttendees', classId);

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      student:users!student_uid(display_name, email)
    `)
    .eq('class_id', classId)
    .in('status', ['booked', 'attended'])
    .order('booked_at');

  if (error) {
    console.error('[Booking] getClassAttendees error', error);
    throw new BookingError('Failed to fetch class attendees', 'FETCH_ERROR', error);
  }

  return data || [];
}

// Real-time booking updates
export function subscribeToMyBookings(
  studentUid: string,
  callback: (booking: Booking) => void
) {
  console.log('[Booking] subscribeToMyBookings', studentUid);

  return supabase
    .channel(`user-bookings-${studentUid}`)
    .on('postgres_changes', 
      {
        event: '*',
        schema: 'public',
        table: 'bookings',
        filter: `student_uid=eq.${studentUid}`
      },
      (payload) => {
        console.log('[Booking] Booking update', payload);
        // You might want to fetch the full booking data here
        callback(payload.new as Booking);
      }
    )
    .subscribe();
}
