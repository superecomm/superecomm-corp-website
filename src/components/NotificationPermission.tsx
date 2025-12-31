import { type FC, useState, useEffect } from 'react';
import { Bell, BellOff, X } from 'lucide-react';
import {
  requestPermission,
  getNotificationPermission,
  isNotificationSupported,
  initializeNotificationListeners,
} from '../services/notificationService';

interface NotificationPermissionProps {
  variant?: 'banner' | 'modal' | 'button';
  autoShow?: boolean;
  delayMs?: number;
}

/**
 * Banner variant for notification permission request
 */
export const NotificationPermissionBanner: FC<NotificationPermissionProps> = ({
  autoShow = true,
  delayMs = 5000,
}) => {
  const [visible, setVisible] = useState(false);
  const [permission, setPermission] = useState(getNotificationPermission());

  useEffect(() => {
    if (!isNotificationSupported()) {
      return;
    }

    // Check if we should show the banner
    const dismissed = localStorage.getItem('notification_banner_dismissed');
    const shouldShow = !dismissed && permission === 'default' && autoShow;

    if (shouldShow) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, delayMs);

      return () => clearTimeout(timer);
    }
  }, [autoShow, delayMs, permission]);

  const handleAllow = async () => {
    const result = await requestPermission();
    setPermission(result);

    if (result === 'granted') {
      await initializeNotificationListeners();
      setVisible(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('notification_banner_dismissed', 'true');
    setVisible(false);
  };

  if (!visible || !isNotificationSupported() || permission !== 'default') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Bell className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-sm md:text-base">
                Enable Notifications
              </p>
              <p className="text-xs md:text-sm opacity-90">
                Stay updated with important updates and messages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAllow}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-sm 
                hover:bg-purple-50 transition-colors duration-200 whitespace-nowrap"
            >
              Allow
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 hover:bg-purple-700 rounded-lg transition-colors duration-200"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Modal variant for notification permission request
 */
export const NotificationPermissionModal: FC<NotificationPermissionProps> = ({
  autoShow = true,
  delayMs = 10000,
}) => {
  const [visible, setVisible] = useState(false);
  const [permission, setPermission] = useState(getNotificationPermission());

  useEffect(() => {
    if (!isNotificationSupported()) {
      return;
    }

    const dismissed = localStorage.getItem('notification_modal_dismissed');
    const shouldShow = !dismissed && permission === 'default' && autoShow;

    if (shouldShow) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, delayMs);

      return () => clearTimeout(timer);
    }
  }, [autoShow, delayMs, permission]);

  const handleAllow = async () => {
    const result = await requestPermission();
    setPermission(result);

    if (result === 'granted') {
      await initializeNotificationListeners();
      setVisible(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('notification_modal_dismissed', 'true');
    setVisible(false);
  };

  if (!visible || !isNotificationSupported() || permission !== 'default') {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 pointer-events-auto
            transform transition-all"
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
              rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full">
              <Bell className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Enable Notifications
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
            Get notified about important updates, new features, and personalized
            content. You can change this anytime in settings.
          </p>

          {/* Benefits */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400">✓</span>
                <span>Stay updated with real-time alerts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400">✓</span>
                <span>Never miss important announcements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400">✓</span>
                <span>Receive personalized updates</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleDismiss}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 
                text-gray-700 dark:text-gray-300 rounded-lg font-semibold
                hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Not Now
            </button>
            <button
              onClick={handleAllow}
              className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold
                hover:bg-purple-700 transition-colors shadow-lg"
            >
              Allow
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Button variant - can be placed in settings
 */
export const NotificationPermissionButton: FC = () => {
  const [permission, setPermission] = useState(getNotificationPermission());
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (permission === 'granted') {
      // Can't revoke permission programmatically, show instructions
      alert(
        'To disable notifications, please use your browser settings:\n\n' +
          'Chrome: Settings > Privacy and security > Site Settings > Notifications\n' +
          'Firefox: Settings > Privacy & Security > Permissions > Notifications\n' +
          'Safari: Preferences > Websites > Notifications'
      );
      return;
    }

    setLoading(true);
    const result = await requestPermission();
    setPermission(result);

    if (result === 'granted') {
      await initializeNotificationListeners();
    }
    setLoading(false);
  };

  if (!isNotificationSupported()) {
    return null;
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold 
        transition-colors ${
          permission === 'granted'
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gray-600 text-white hover:bg-gray-700'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {permission === 'granted' ? (
        <>
          <Bell className="w-5 h-5" />
          <span>Notifications Enabled</span>
        </>
      ) : (
        <>
          <BellOff className="w-5 h-5" />
          <span>Enable Notifications</span>
        </>
      )}
    </button>
  );
};

/**
 * Default export - Banner variant
 */
const NotificationPermission: FC<NotificationPermissionProps> = (props) => {
  return <NotificationPermissionBanner {...props} />;
};

export default NotificationPermission;

