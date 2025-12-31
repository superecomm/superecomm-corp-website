import { useState, useEffect } from 'react';

/**
 * Hook to detect online/offline status
 * @returns boolean indicating if the user is currently online
 */
export const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => {
      console.log('[Network] Connection restored - Online');
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log('[Network] Connection lost - Offline');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

/**
 * Hook to get detailed connection information
 * @returns object with connection details
 */
export const useConnectionInfo = () => {
  const [connectionInfo, setConnectionInfo] = useState({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    effectiveType: 'unknown',
    downlink: 0,
    rtt: 0,
    saveData: false,
  });

  useEffect(() => {
    const updateConnectionInfo = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;

      setConnectionInfo({
        isOnline: navigator.onLine,
        effectiveType: connection?.effectiveType || 'unknown',
        downlink: connection?.downlink || 0,
        rtt: connection?.rtt || 0,
        saveData: connection?.saveData || false,
      });
    };

    // Initial check
    updateConnectionInfo();

    // Listen for online/offline events
    window.addEventListener('online', updateConnectionInfo);
    window.addEventListener('offline', updateConnectionInfo);

    // Listen for connection changes
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      connection.addEventListener('change', updateConnectionInfo);
    }

    return () => {
      window.removeEventListener('online', updateConnectionInfo);
      window.removeEventListener('offline', updateConnectionInfo);
      
      if (connection) {
        connection.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, []);

  return connectionInfo;
};

export default useOnlineStatus;

