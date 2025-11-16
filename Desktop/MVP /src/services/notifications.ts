import { initFCM, messaging } from './authFirebase';
import { supabase } from './db';

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  data?: Record<string, any>;
}

export class NotificationService {
  private fcmToken: string | null = null;

  async initialize(vapidKey: string, userUid: string): Promise<boolean> {
    console.log('[FCM] Initializing notification service', userUid);

    try {
      const token = await initFCM(vapidKey);
      
      if (token) {
        this.fcmToken = token;
        await this.registerToken(userUid, token);
        console.log('[FCM] Notification service initialized successfully');
        return true;
      }

      console.warn('[FCM] Failed to get FCM token');
      return false;
    } catch (error) {
      console.error('[FCM] Failed to initialize notifications', error);
      return false;
    }
  }

  private async registerToken(userUid: string, token: string): Promise<void> {
    console.log('[FCM] Registering FCM token for user', userUid);

    try {
      const { error } = await supabase
        .from('user_devices')
        .upsert({
          user_uid: userUid,
          fcm_token: token,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_uid,fcm_token'
        });

      if (error) {
        console.error('[FCM] Failed to register token', error);
      } else {
        console.log('[FCM] Token registered successfully');
      }
    } catch (error) {
      console.error('[FCM] Unexpected error registering token', error);
    }
  }

  async unregisterToken(userUid: string): Promise<void> {
    console.log('[FCM] Unregistering FCM tokens for user', userUid);

    try {
      const { error } = await supabase
        .from('user_devices')
        .delete()
        .eq('user_uid', userUid);

      if (error) {
        console.error('[FCM] Failed to unregister tokens', error);
      } else {
        console.log('[FCM] Tokens unregistered successfully');
      }
    } catch (error) {
      console.error('[FCM] Unexpected error unregistering tokens', error);
    }
  }

  showLocalNotification(payload: NotificationPayload): void {
    if (!('Notification' in window)) {
      console.warn('[FCM] This browser does not support notifications');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/icon-192x192.png',
        badge: '/badge-72x72.png',
        tag: 'wellness-app',
        requireInteraction: false,
      });
    }
  }

  // Predefined notification templates
  static createBookingConfirmation(className: string, startTime: string): NotificationPayload {
    return {
      title: 'Booking Confirmed! 🎉',
      body: `You're all set for ${className} on ${new Date(startTime).toLocaleDateString()}`,
      data: { type: 'booking_confirmation' }
    };
  }

  static createClassReminder(className: string, minutesUntil: number): NotificationPayload {
    return {
      title: 'Class Starting Soon! ⏰',
      body: `${className} starts in ${minutesUntil} minutes. Don't be late!`,
      data: { type: 'class_reminder' }
    };
  }

  static createLevelUp(newLevel: number, xpGained: number): NotificationPayload {
    return {
      title: 'Level Up! 🚀',
      body: `Congratulations! You've reached level ${newLevel} and earned ${xpGained} XP!`,
      data: { type: 'level_up', level: newLevel }
    };
  }

  static createStreakMilestone(streakCount: number): NotificationPayload {
    const emoji = streakCount >= 30 ? '🔥🔥' : streakCount >= 7 ? '🔥' : '✨';
    return {
      title: `${streakCount}-Day Streak! ${emoji}`,
      body: `Amazing! You've maintained a ${streakCount}-day attendance streak!`,
      data: { type: 'streak_milestone', streak: streakCount }
    };
  }

  static createClassCancellation(className: string, reason?: string): NotificationPayload {
    return {
      title: 'Class Cancelled 😞',
      body: reason 
        ? `${className} has been cancelled: ${reason}`
        : `${className} has been cancelled. We'll notify you when it's rescheduled.`,
      data: { type: 'class_cancellation' }
    };
  }

  static createPromotionalOffer(title: string, description: string): NotificationPayload {
    return {
      title: `Special Offer! 💫 ${title}`,
      body: description,
      data: { type: 'promotional_offer' }
    };
  }
}

// Helper functions for server-side notifications (Edge Functions)
export const NotificationTemplates = {
  // These would be used in Supabase Edge Functions for server-sent notifications
  
  scheduleClassReminder: async (
    classId: string, 
    reminderTime: string
  ): Promise<void> => {
    console.log('[FCM] Scheduling class reminder', { classId, reminderTime });
    
    // This would typically be handled by a Supabase Edge Function
    // that schedules the notification to be sent at the specified time
    const { error } = await supabase
      .from('scheduled_notifications')
      .insert({
        class_id: classId,
        notification_type: 'class_reminder',
        scheduled_for: reminderTime,
        status: 'pending'
      });

    if (error) {
      console.error('[FCM] Failed to schedule reminder', error);
    }
  },

  sendLevelUpNotification: async (
    userUid: string, 
    level: number, 
    xp: number
  ): Promise<void> => {
    console.log('[FCM] Sending level up notification', { userUid, level, xp });
    
    // This would be handled by an Edge Function that sends push notifications
    const { error } = await supabase.rpc('send_push_notification', {
      p_user_uid: userUid,
      p_title: 'Level Up! 🚀',
      p_body: `Congratulations! You've reached level ${level}!`,
      p_data: JSON.stringify({ type: 'level_up', level, xp })
    });

    if (error) {
      console.error('[FCM] Failed to send level up notification', error);
    }
  },

  broadcastClassUpdate: async (
    classId: string, 
    updateType: 'cancelled' | 'rescheduled' | 'location_changed',
    message: string
  ): Promise<void> => {
    console.log('[FCM] Broadcasting class update', { classId, updateType, message });
    
    const { error } = await supabase.rpc('broadcast_to_class_attendees', {
      p_class_id: classId,
      p_title: `Class Update: ${updateType.replace('_', ' ')}`,
      p_body: message,
      p_data: JSON.stringify({ type: 'class_update', updateType, classId })
    });

    if (error) {
      console.error('[FCM] Failed to broadcast class update', error);
    }
  }
};

// Service Worker registration for FCM
export async function registerServiceWorker(): Promise<void> {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('[FCM] Service Worker registered successfully', registration);
    } catch (error) {
      console.error('[FCM] Service Worker registration failed', error);
    }
  }
}

export default NotificationService;
