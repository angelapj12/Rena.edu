import { useState, useEffect } from 'react';
import { supabase } from '../services/db';

interface ClassWithCapacity {
  id: string;
  title: string;
  current_bookings: number;
  max_capacity: number;
  remaining_capacity: number;
}

export function useRealtimeClass(classId: string) {
  const [classData, setClassData] = useState<ClassWithCapacity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!classId) return;

    // Initial fetch
    fetchClassData();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`class:${classId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'classes',
          filter: `id=eq.${classId}`
        },
        (payload) => {
          console.log('[Realtime] Class updated:', payload);
          setClassData(prev => prev ? {
            ...prev,
            current_bookings: payload.new.current_bookings,
            remaining_capacity: payload.new.max_capacity - payload.new.current_bookings
          } : null);
        }
      )
      .subscribe();

    // Also listen for booking changes that affect this class
    const bookingChannel = supabase
      .channel(`bookings:${classId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `class_id=eq.${classId}`
        },
        (payload) => {
          console.log('[Realtime] Booking changed for class:', payload);
          // Refresh class data to get updated capacity
          fetchClassData();
        }
      )
      .subscribe();

    async function fetchClassData() {
      try {
        const { data, error } = await supabase
          .from('classes')
          .select(`
            id,
            title,
            current_bookings,
            max_capacity
          `)
          .eq('id', classId)
          .single();

        if (error) throw error;

        setClassData({
          ...data,
          remaining_capacity: data.max_capacity - data.current_bookings
        });
      } catch (error) {
        console.error('Failed to fetch class data:', error);
      } finally {
        setLoading(false);
      }
    }

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(bookingChannel);
    };
  }, [classId]);

  return { classData, loading };
}
