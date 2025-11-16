import { supabase } from './db';

interface BookingResult {
  success: boolean;
  booking_id?: string;
  status?: 'booked' | 'waitlisted';
  message?: string;
  error?: string;
}

export class OptimisticBookingService {
  private optimisticUpdates = new Map<string, any>();

  async bookClass(classId: string, userId: string): Promise<BookingResult> {
    console.log('[Booking] Starting optimistic booking', { classId, userId });
    
    // 1. Optimistically update UI immediately
    this.updateUIOptimistically(classId, userId, 'booking');
    
    try {
      // 2. Make actual database call using the PostgreSQL function
      const { data, error } = await supabase.rpc('book_class', {
        p_user_uid: userId,
        p_class_id: classId,
        p_amount_paid: 0 // For free classes, adjust as needed
      });

      if (error) {
        console.error('[Booking] Database error:', error);
        throw new Error(error.message);
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Booking failed');
      }

      // 3. Confirm optimistic update was correct
      this.confirmOptimisticUpdate(classId, data);
      
      console.log('[Booking] Successfully booked:', data);
      return data;
    } catch (error) {
      console.error('[Booking] Failed to book class:', error);
      
      // 4. Rollback optimistic update on failure
      this.rollbackOptimisticUpdate(classId, 'booking');
      
      throw error;
    }
  }

  async cancelBooking(bookingId: string, classId: string): Promise<void> {
    console.log('[Booking] Starting optimistic cancellation', { bookingId, classId });
    
    // 1. Optimistically update UI
    this.updateUIOptimistically(classId, bookingId, 'cancelling');
    
    try {
      // 2. Update booking status to cancelled
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          cancelled_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) {
        console.error('[Booking] Cancellation error:', error);
        throw new Error(error.message);
      }

      // 3. Confirm optimistic update
      this.confirmOptimisticUpdate(classId, { 
        success: true, 
        booking_id: bookingId, 
        status: 'cancelled' 
      });
      
      console.log('[Booking] Successfully cancelled booking');
    } catch (error) {
      console.error('[Booking] Failed to cancel booking:', error);
      
      // 4. Rollback optimistic update
      this.rollbackOptimisticUpdate(classId, 'cancelling');
      
      throw error;
    }
  }

  private updateUIOptimistically(classId: string, identifier: string, action: 'booking' | 'cancelling') {
    const updateKey = `${classId}-${action}`;
    const updateData = {
      classId,
      identifier,
      action,
      timestamp: Date.now(),
      status: 'pending'
    };
    
    this.optimisticUpdates.set(updateKey, updateData);
    
    // Emit event to update UI components
    window.dispatchEvent(new CustomEvent('optimistic-update', {
      detail: updateData
    }));
    
    console.log('[Booking] Optimistic update applied:', updateData);
  }

  private confirmOptimisticUpdate(classId: string, result: any) {
    // Find and confirm the pending update
    for (const [key, update] of this.optimisticUpdates.entries()) {
      if (update.classId === classId && update.status === 'pending') {
        this.optimisticUpdates.set(key, { ...update, status: 'confirmed', result });
        
        window.dispatchEvent(new CustomEvent('optimistic-confirm', {
          detail: { ...update, result, timestamp: Date.now() }
        }));
        
        console.log('[Booking] Optimistic update confirmed:', { update, result });
        
        // Clean up confirmed update after a delay
        setTimeout(() => {
          this.optimisticUpdates.delete(key);
        }, 5000);
        
        break;
      }
    }
  }

  private rollbackOptimisticUpdate(classId: string, action: string) {
    const updateKey = `${classId}-${action}`;
    const update = this.optimisticUpdates.get(updateKey);
    
    if (update) {
      this.optimisticUpdates.set(updateKey, { ...update, status: 'failed' });
      
      window.dispatchEvent(new CustomEvent('optimistic-rollback', {
        detail: { ...update, timestamp: Date.now() }
      }));
      
      console.log('[Booking] Optimistic update rolled back:', update);
      
      // Clean up failed update after a delay
      setTimeout(() => {
        this.optimisticUpdates.delete(updateKey);
      }, 3000);
    }
  }

  // Get current optimistic updates for a class
  getOptimisticUpdates(classId: string) {
    const updates = [];
    for (const update of this.optimisticUpdates.values()) {
      if (update.classId === classId) {
        updates.push(update);
      }
    }
    return updates;
  }

  // Check if a class has pending optimistic updates
  hasPendingUpdates(classId: string): boolean {
    for (const update of this.optimisticUpdates.values()) {
      if (update.classId === classId && update.status === 'pending') {
        return true;
      }
    }
    return false;
  }
}

export const optimisticBookingService = new OptimisticBookingService();
