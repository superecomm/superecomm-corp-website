// Notification Service for Push Notifications
import { 
  requestNotificationPermission, 
  onMessageListener,
  initializeMessaging 
} from '../config/firebase';

export type NotificationPermission = 'default' | 'granted' | 'denied';

/**
 * Check if notifications are supported
 */
export const isNotificationSupported = (): boolean => {
  return 'Notification' in window && 'serviceWorker' in navigator;
};

/**
 * Get current notification permission status
 */
export const getNotificationPermission = (): NotificationPermission => {
  if (!isNotificationSupported()) {
    return 'denied';
  }
  return Notification.permission as NotificationPermission;
};

/**
 * Request notification permission from user
 */
export const requestPermission = async (): Promise<NotificationPermission> => {
  if (!isNotificationSupported()) {
    console.warn('[Notifications] Not supported in this browser');
    return 'denied';
  }

  try {
    const token = await requestNotificationPermission();
    
    if (token) {
      console.log('[Notifications] Permission granted, token:', token);
      
      // Store token and send to backend if needed
      await storeNotificationToken(token);
      
      return 'granted';
    } else {
      console.log('[Notifications] Permission denied or not available');
      return Notification.permission as NotificationPermission;
    }
  } catch (error) {
    console.error('[Notifications] Error requesting permission:', error);
    return 'denied';
  }
};

/**
 * Store notification token (send to backend or localStorage)
 */
const storeNotificationToken = async (token: string): Promise<void> => {
  try {
    // Store in localStorage
    localStorage.setItem('fcm_token', token);
    localStorage.setItem('fcm_token_timestamp', Date.now().toString());
    
    // TODO: Send token to your backend API
    // await fetch('/api/notifications/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token })
    // });
    
    console.log('[Notifications] Token stored successfully');
  } catch (error) {
    console.error('[Notifications] Error storing token:', error);
  }
};

/**
 * Get stored FCM token
 */
export const getStoredToken = (): string | null => {
  return localStorage.getItem('fcm_token');
};

/**
 * Check if token needs refresh (older than 7 days)
 */
export const shouldRefreshToken = (): boolean => {
  const timestamp = localStorage.getItem('fcm_token_timestamp');
  if (!timestamp) return true;
  
  const tokenAge = Date.now() - parseInt(timestamp);
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  
  return tokenAge > sevenDays;
};

/**
 * Initialize notification listeners
 */
export const initializeNotificationListeners = async (): Promise<void> => {
  if (!isNotificationSupported()) {
    console.warn('[Notifications] Not supported');
    return;
  }

  try {
    // Initialize Firebase Messaging
    await initializeMessaging();
    
    // Listen for foreground messages
    onMessageListener()
      .then((payload) => {
        console.log('[Notifications] Foreground message received:', payload);
        
        // Show notification
        if (payload.notification) {
          showNotification(
            payload.notification.title || 'Superecomm',
            {
              body: payload.notification.body || '',
              icon: payload.notification.icon || '/icons/icon-192x192.png',
              badge: '/icons/icon-72x72.png',
              data: payload.data,
              tag: payload.data?.tag || 'default',
            }
          );
        }
      })
      .catch((error) => {
        console.error('[Notifications] Error listening for messages:', error);
      });
  } catch (error) {
    console.error('[Notifications] Error initializing listeners:', error);
  }
};

/**
 * Show a notification
 */
export const showNotification = async (
  title: string,
  options?: NotificationOptions
): Promise<void> => {
  if (!isNotificationSupported()) {
    console.warn('[Notifications] Not supported');
    return;
  }

  if (Notification.permission !== 'granted') {
    console.warn('[Notifications] Permission not granted');
    return;
  }

  try {
    // If service worker is available, use it to show notification
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        ...options,
      });
    } else {
      // Fallback to regular notification
      new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        ...options,
      });
    }
  } catch (error) {
    console.error('[Notifications] Error showing notification:', error);
  }
};

/**
 * Clear all notifications
 */
export const clearAllNotifications = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const notifications = await registration.getNotifications();
      
      notifications.forEach((notification) => {
        notification.close();
      });
      
      console.log(`[Notifications] Cleared ${notifications.length} notifications`);
    } catch (error) {
      console.error('[Notifications] Error clearing notifications:', error);
    }
  }
};

/**
 * Get notification preferences from localStorage
 */
export const getNotificationPreferences = () => {
  const preferences = localStorage.getItem('notification_preferences');
  return preferences ? JSON.parse(preferences) : {
    enabled: true,
    sound: true,
    vibrate: true,
    showPreview: true,
  };
};

/**
 * Save notification preferences
 */
export const saveNotificationPreferences = (preferences: any): void => {
  localStorage.setItem('notification_preferences', JSON.stringify(preferences));
  console.log('[Notifications] Preferences saved:', preferences);
};

/**
 * Subscribe to notification topic (for Firebase)
 */
export const subscribeToTopic = async (topic: string): Promise<void> => {
  const token = getStoredToken();
  
  if (!token) {
    console.warn('[Notifications] No token available for topic subscription');
    return;
  }

  try {
    // TODO: Call your backend to subscribe to topic
    // await fetch('/api/notifications/subscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token, topic })
    // });
    
    console.log(`[Notifications] Subscribed to topic: ${topic}`);
  } catch (error) {
    console.error('[Notifications] Error subscribing to topic:', error);
  }
};

/**
 * Unsubscribe from notification topic
 */
export const unsubscribeFromTopic = async (topic: string): Promise<void> => {
  const token = getStoredToken();
  
  if (!token) {
    console.warn('[Notifications] No token available for topic unsubscription');
    return;
  }

  try {
    // TODO: Call your backend to unsubscribe from topic
    // await fetch('/api/notifications/unsubscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token, topic })
    // });
    
    console.log(`[Notifications] Unsubscribed from topic: ${topic}`);
  } catch (error) {
    console.error('[Notifications] Error unsubscribing from topic:', error);
  }
};

export default {
  isNotificationSupported,
  getNotificationPermission,
  requestPermission,
  getStoredToken,
  shouldRefreshToken,
  initializeNotificationListeners,
  showNotification,
  clearAllNotifications,
  getNotificationPreferences,
  saveNotificationPreferences,
  subscribeToTopic,
  unsubscribeFromTopic,
};

