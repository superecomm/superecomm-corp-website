import { useState, useEffect, useCallback } from 'react';
import { queueRequest, getQueueStatus, syncQueue } from '../utils/backgroundSync';
import { useOnlineStatus } from './useOnlineStatus';

interface BackgroundSyncState {
  queueCount: number;
  isSyncing: boolean;
  lastSyncTime: number | null;
}

interface UseBackgroundSyncReturn extends BackgroundSyncState {
  submitRequest: (url: string, method?: string, body?: any, headers?: Record<string, string>) => Promise<string>;
  triggerSync: () => Promise<void>;
  refreshStatus: () => Promise<void>;
}

/**
 * Hook to manage background sync for offline form submissions
 * @returns Object with sync state and methods
 */
export const useBackgroundSync = (): UseBackgroundSyncReturn => {
  const isOnline = useOnlineStatus();
  const [state, setState] = useState<BackgroundSyncState>({
    queueCount: 0,
    isSyncing: false,
    lastSyncTime: null,
  });

  // Refresh queue status
  const refreshStatus = useCallback(async () => {
    try {
      const status = await getQueueStatus();
      setState((prev) => ({
        ...prev,
        queueCount: status.count,
      }));
    } catch (error) {
      console.error('[useBackgroundSync] Error refreshing status:', error);
    }
  }, []);

  // Submit a request (queue if offline, send immediately if online)
  const submitRequest = useCallback(
    async (
      url: string,
      method: string = 'POST',
      body: any = null,
      headers: Record<string, string> = {}
    ): Promise<string> => {
      try {
        if (isOnline) {
          // If online, try to send immediately
          try {
            const response = await fetch(url, {
              method,
              headers: {
                'Content-Type': 'application/json',
                ...headers,
              },
              body: body ? JSON.stringify(body) : undefined,
            });

            if (response.ok) {
              console.log('[useBackgroundSync] Request sent successfully');
              return 'sent';
            } else {
              // If failed, queue it
              console.warn('[useBackgroundSync] Request failed, queuing for retry');
              const id = await queueRequest(url, method, body, headers);
              await refreshStatus();
              return id;
            }
          } catch (error) {
            // Network error, queue it
            console.warn('[useBackgroundSync] Network error, queuing request');
            const id = await queueRequest(url, method, body, headers);
            await refreshStatus();
            return id;
          }
        } else {
          // If offline, queue immediately
          console.log('[useBackgroundSync] Offline, queuing request');
          const id = await queueRequest(url, method, body, headers);
          await refreshStatus();
          return id;
        }
      } catch (error) {
        console.error('[useBackgroundSync] Error submitting request:', error);
        throw error;
      }
    },
    [isOnline, refreshStatus]
  );

  // Manually trigger sync
  const triggerSync = useCallback(async () => {
    if (!isOnline) {
      console.log('[useBackgroundSync] Cannot sync while offline');
      return;
    }

    setState((prev) => ({ ...prev, isSyncing: true }));

    try {
      await syncQueue();
      await refreshStatus();
      setState((prev) => ({
        ...prev,
        isSyncing: false,
        lastSyncTime: Date.now(),
      }));
    } catch (error) {
      console.error('[useBackgroundSync] Error syncing:', error);
      setState((prev) => ({ ...prev, isSyncing: false }));
    }
  }, [isOnline, refreshStatus]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && state.queueCount > 0) {
      console.log('[useBackgroundSync] Back online, triggering sync');
      triggerSync();
    }
  }, [isOnline, state.queueCount, triggerSync]);

  // Initial status check
  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  // Periodic status refresh (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      refreshStatus();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshStatus]);

  return {
    ...state,
    submitRequest,
    triggerSync,
    refreshStatus,
  };
};

/**
 * Hook for simple form submission with background sync
 */
export const useFormSubmit = <T = any>(
  url: string,
  onSuccess?: (data: T) => void,
  onError?: (error: Error) => void
) => {
  const { submitRequest } = useBackgroundSync();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submit = useCallback(
    async (data: T) => {
      setIsSubmitting(true);
      setError(null);

      try {
        const result = await submitRequest(url, 'POST', data);

        if (result === 'sent') {
          // Successfully sent
          onSuccess?.(data);
        } else {
          // Queued for later
          console.log('[useFormSubmit] Form queued for background sync');
          onSuccess?.(data);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Submission failed');
        setError(error);
        onError?.(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [url, submitRequest, onSuccess, onError]
  );

  return {
    submit,
    isSubmitting,
    error,
  };
};

export default useBackgroundSync;

