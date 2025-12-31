// Background Sync Utility for Offline Form Submissions
// Uses IndexedDB to queue requests when offline and sync when connection is restored

interface QueuedRequest {
  id: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body: any;
  timestamp: number;
  retryCount: number;
}

const DB_NAME = 'superecomm-sync-db';
const DB_VERSION = 1;
const STORE_NAME = 'sync-queue';
const MAX_RETRIES = 3;

/**
 * Initialize IndexedDB for background sync
 */
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('[BackgroundSync] Error opening database');
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        objectStore.createIndex('timestamp', 'timestamp', { unique: false });
        console.log('[BackgroundSync] Database initialized');
      }
    };
  });
};

/**
 * Generate unique ID for queued requests
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Add request to sync queue
 */
export const queueRequest = async (
  url: string,
  method: string = 'POST',
  body: any = null,
  headers: Record<string, string> = {}
): Promise<string> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request: QueuedRequest = {
      id: generateId(),
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
      timestamp: Date.now(),
      retryCount: 0,
    };

    await new Promise<void>((resolve, reject) => {
      const addRequest = store.add(request);
      addRequest.onsuccess = () => {
        console.log('[BackgroundSync] Request queued:', request.id);
        resolve();
      };
      addRequest.onerror = () => reject(addRequest.error);
    });

    db.close();

    // Register background sync if supported
    if ('serviceWorker' in navigator && 'sync' in (window as any).ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready;
      await (registration as any).sync.register('sync-queue');
      console.log('[BackgroundSync] Background sync registered');
    } else {
      // Fallback: try to sync immediately
      console.log('[BackgroundSync] Background sync not supported, attempting immediate sync');
      await syncQueue();
    }

    return request.id;
  } catch (error) {
    console.error('[BackgroundSync] Error queuing request:', error);
    throw error;
  }
};

/**
 * Get all queued requests
 */
export const getQueuedRequests = async (): Promise<QueuedRequest[]> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        db.close();
        resolve(request.result);
      };
      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('[BackgroundSync] Error getting queued requests:', error);
    return [];
  }
};

/**
 * Remove request from queue
 */
const removeRequest = async (id: string): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => {
        console.log('[BackgroundSync] Request removed from queue:', id);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });

    db.close();
  } catch (error) {
    console.error('[BackgroundSync] Error removing request:', error);
  }
};

/**
 * Update retry count for a request
 */
const updateRetryCount = async (id: string, retryCount: number): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const getRequest = store.get(id);
    
    await new Promise<void>((resolve, reject) => {
      getRequest.onsuccess = () => {
        const request = getRequest.result;
        if (request) {
          request.retryCount = retryCount;
          const updateRequest = store.put(request);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          resolve();
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });

    db.close();
  } catch (error) {
    console.error('[BackgroundSync] Error updating retry count:', error);
  }
};

/**
 * Sync all queued requests
 */
export const syncQueue = async (): Promise<void> => {
  if (!navigator.onLine) {
    console.log('[BackgroundSync] Offline, skipping sync');
    return;
  }

  console.log('[BackgroundSync] Starting sync...');
  const requests = await getQueuedRequests();

  if (requests.length === 0) {
    console.log('[BackgroundSync] No requests to sync');
    return;
  }

  console.log(`[BackgroundSync] Syncing ${requests.length} requests`);

  for (const request of requests) {
    try {
      // Check if max retries exceeded
      if (request.retryCount >= MAX_RETRIES) {
        console.warn(`[BackgroundSync] Max retries exceeded for request ${request.id}`);
        await removeRequest(request.id);
        continue;
      }

      // Attempt to send request
      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
      });

      if (response.ok) {
        console.log(`[BackgroundSync] Request ${request.id} synced successfully`);
        await removeRequest(request.id);
      } else {
        console.error(`[BackgroundSync] Request ${request.id} failed with status ${response.status}`);
        await updateRetryCount(request.id, request.retryCount + 1);
      }
    } catch (error) {
      console.error(`[BackgroundSync] Error syncing request ${request.id}:`, error);
      await updateRetryCount(request.id, request.retryCount + 1);
    }
  }

  console.log('[BackgroundSync] Sync complete');
};

/**
 * Get queue status
 */
export const getQueueStatus = async () => {
  const requests = await getQueuedRequests();
  return {
    count: requests.length,
    oldestTimestamp: requests.length > 0 ? Math.min(...requests.map(r => r.timestamp)) : null,
    newestTimestamp: requests.length > 0 ? Math.max(...requests.map(r => r.timestamp)) : null,
  };
};

/**
 * Clear entire queue (use with caution)
 */
export const clearQueue = async (): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => {
        console.log('[BackgroundSync] Queue cleared');
        resolve();
      };
      request.onerror = () => reject(request.error);
    });

    db.close();
  } catch (error) {
    console.error('[BackgroundSync] Error clearing queue:', error);
  }
};

// Initialize sync on page load
if (typeof window !== 'undefined') {
  // Listen for online event to trigger sync
  window.addEventListener('online', () => {
    console.log('[BackgroundSync] Connection restored, syncing queue...');
    syncQueue();
  });

  // Try to sync on page load if online
  if (navigator.onLine) {
    syncQueue();
  }
}

export default {
  queueRequest,
  getQueuedRequests,
  syncQueue,
  getQueueStatus,
  clearQueue,
};

