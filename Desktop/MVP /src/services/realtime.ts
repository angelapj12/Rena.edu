import { supabase } from './db';
import { RealtimeChannel } from '@supabase/supabase-js';

export class RealtimeService {
  private channels: Map<string, RealtimeChannel> = new Map();

  // Subscribe to booking changes for live capacity updates
  subscribeToBookings(classId: string, callback: (payload: any) => void) {
    const channelName = `bookings:${classId}`;
    
    if (this.channels.has(channelName)) {
      return this.channels.get(channelName)!;
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'bookings',
          filter: `class_id=eq.${classId}`
        },
        (payload) => {
          console.log('[Realtime] Booking change:', payload);
          callback(payload);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);
    return channel;
  }

  // Subscribe to class capacity changes
  subscribeToClasses(callback: (payload: any) => void) {
    const channelName = 'classes';
    
    if (this.channels.has(channelName)) {
      return this.channels.get(channelName)!;
    }
    
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'classes'
        },
        (payload) => {
          console.log('[Realtime] Class capacity change:', payload);
          callback(payload);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);
    return channel;
  }

  // Subscribe to user XP changes for gamification
  subscribeToUserXP(userUid: string, callback: (payload: any) => void) {
    const channelName = `xp:${userUid}`;
    
    if (this.channels.has(channelName)) {
      return this.channels.get(channelName)!;
    }
    
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'xp_ledger',
          filter: `student_uid=eq.${userUid}`
        },
        (payload) => {
          console.log('[Realtime] XP change:', payload);
          callback(payload);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);
    return channel;
  }

  // Subscribe to notifications
  subscribeToNotifications(userUid: string, callback: (payload: any) => void) {
    const channelName = `notifications:${userUid}`;
    
    if (this.channels.has(channelName)) {
      return this.channels.get(channelName)!;
    }
    
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_uid=eq.${userUid}`
        },
        (payload) => {
          console.log('[Realtime] New notification:', payload);
          callback(payload);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);
    return channel;
  }

  // Clean up subscriptions
  unsubscribe(channelName: string) {
    const channel = this.channels.get(channelName);
    if (channel) {
      supabase.removeChannel(channel);
      this.channels.delete(channelName);
    }
  }

  unsubscribeAll() {
    this.channels.forEach((channel) => {
      supabase.removeChannel(channel);
    });
    this.channels.clear();
  }
}

export const realtimeService = new RealtimeService();
