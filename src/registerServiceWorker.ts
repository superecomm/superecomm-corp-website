// Service Worker Registration and Lifecycle Management
import { registerSW } from 'virtual:pwa-register';

// Interface for update notification
export interface UpdateAvailableCallback {
  (registration: ServiceWorkerRegistration): void;
}

// Register service worker with auto-update
export const registerServiceWorker = (_onUpdateAvailable?: UpdateAvailableCallback) => {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      console.log('[SW] New content available, updating...');
      // With silent updates, this automatically triggers skipWaiting
      // The page will reload when the new SW takes control
    },
    onOfflineReady() {
      console.log('[SW] App ready to work offline');
      showNotification('App is ready to work offline', 'success');
    },
    onRegistered(registration: ServiceWorkerRegistration | undefined) {
      console.log('[SW] Service Worker registered:', registration);
      
      // Check for updates periodically (every hour)
      if (registration) {
        setInterval(() => {
          registration.update().catch((error: Error) => {
            console.error('[SW] Failed to check for updates:', error);
          });
        }, 60 * 60 * 1000); // Check every hour
      }
    },
    onRegisterError(error: Error) {
      console.error('[SW] Service Worker registration failed:', error);
    }
  });

  // Handle service worker updates
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW] New service worker activated, reloading page...');
      // Auto-reload when new service worker takes control (silent update)
      window.location.reload();
    });

    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('[SW] Message from service worker:', event.data);
      
      if (event.data && event.data.type === 'CACHE_UPDATED') {
        console.log('[SW] Cache updated:', event.data.url);
      }
    });
  }

  return updateSW;
};

// Helper function to show notifications to users
function showNotification(message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') {
  // This can be replaced with your toast notification system
  console.log(`[${type.toUpperCase()}] ${message}`);
  
  // Simple browser notification as fallback
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Superecomm', {
      body: message,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      tag: 'sw-notification'
    });
  }
}

// Check if service worker is supported
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};

// Unregister service worker (for development/testing)
export const unregisterServiceWorker = async (): Promise<boolean> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const success = await registration.unregister();
      console.log('[SW] Service worker unregistered:', success);
      return success;
    } catch (error) {
      console.error('[SW] Failed to unregister service worker:', error);
      return false;
    }
  }
  return false;
};

// Get current service worker state
export const getServiceWorkerState = async (): Promise<string | null> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      if (registration.active) {
        return registration.active.state;
      }
    } catch (error) {
      console.error('[SW] Failed to get service worker state:', error);
    }
  }
  return null;
};

// Force service worker update check
export const checkForUpdates = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
      console.log('[SW] Update check completed');
    } catch (error) {
      console.error('[SW] Failed to check for updates:', error);
    }
  }
};

export default registerServiceWorker;

