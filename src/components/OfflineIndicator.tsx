import { type FC, useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface OfflineIndicatorProps {
  position?: 'top' | 'bottom';
  showOnlineMessage?: boolean;
}

export const OfflineIndicator: FC<OfflineIndicatorProps> = ({ 
  position = 'top',
  showOnlineMessage = true 
}) => {
  const isOnline = useOnlineStatus();
  const [showOnline, setShowOnline] = useState(false);
  const [previousOnlineState, setPreviousOnlineState] = useState(isOnline);

  useEffect(() => {
    // Show online message briefly when connection is restored
    if (isOnline && !previousOnlineState && showOnlineMessage) {
      setShowOnline(true);
      const timer = setTimeout(() => {
        setShowOnline(false);
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer);
    }

    setPreviousOnlineState(isOnline);
  }, [isOnline, previousOnlineState, showOnlineMessage]);

  // Don't show anything if online and not showing the "back online" message
  if (isOnline && !showOnline) {
    return null;
  }

  const positionClasses = position === 'top' 
    ? 'top-0 rounded-b-lg' 
    : 'bottom-0 rounded-t-lg';

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 z-50 ${positionClasses} 
        transition-all duration-300 ease-in-out shadow-lg px-4 py-2 min-w-[280px] max-w-md`}
      style={{
        backgroundColor: isOnline ? '#10B981' : '#EF4444',
      }}
    >
      <div className="flex items-center justify-center gap-2 text-white">
        {isOnline ? (
          <>
            <Wifi className="w-5 h-5" />
            <span className="font-medium">Back Online</span>
          </>
        ) : (
          <>
            <WifiOff className="w-5 h-5" />
            <span className="font-medium">You're Offline</span>
          </>
        )}
      </div>
      
      {!isOnline && (
        <p className="text-xs text-white text-center mt-1 opacity-90">
          Some features may be limited
        </p>
      )}
    </div>
  );
};

/**
 * Banner version - takes full width
 */
export const OfflineBanner: FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div className="w-full bg-yellow-500 dark:bg-yellow-600 text-white py-2 px-4 text-center">
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="w-4 h-4" />
        <span className="text-sm font-medium">
          You're currently offline. Some features may not be available.
        </span>
      </div>
    </div>
  );
};

/**
 * Toast notification version
 */
export const OfflineToast: FC = () => {
  const isOnline = useOnlineStatus();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isOnline) {
      setMessage('Connection lost - Working offline');
      setVisible(true);
    } else if (visible) {
      setMessage('Connection restored');
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [isOnline, visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 bg-gray-900 dark:bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg 
        transform transition-all duration-300 ease-in-out animate-slide-up"
    >
      <div className="flex items-center gap-3">
        {isOnline ? (
          <Wifi className="w-5 h-5 text-green-400" />
        ) : (
          <WifiOff className="w-5 h-5 text-yellow-400" />
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default OfflineIndicator;

