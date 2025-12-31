import { type FC, useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor } from 'lucide-react';
import { useInstallPrompt, shouldShowInstallPrompt } from '../hooks/useInstallPrompt';

interface InstallPromptProps {
  variant?: 'banner' | 'modal' | 'button';
  autoShow?: boolean;
  delayMs?: number;
}

/**
 * Banner variant - shows at top of page
 */
export const InstallPromptBanner: FC<InstallPromptProps> = ({ 
  autoShow = true,
  delayMs = 3000 
}) => {
  const { isInstallable, isInstalled, promptInstall, dismissPrompt } = useInstallPrompt();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isInstallable && !isInstalled && autoShow && shouldShowInstallPrompt()) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, delayMs);

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, autoShow, delayMs]);

  const handleInstall = async () => {
    await promptInstall();
    setVisible(false);
  };

  const handleDismiss = () => {
    dismissPrompt();
    setVisible(false);
  };

  if (!visible || !isInstallable || isInstalled) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Download className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-sm md:text-base">
                Install Superecomm App
              </p>
              <p className="text-xs md:text-sm opacity-90">
                Get quick access and work offline
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstall}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm 
                hover:bg-blue-50 transition-colors duration-200 whitespace-nowrap"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 hover:bg-blue-800 rounded-lg transition-colors duration-200"
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
 * Modal variant - shows as a popup
 */
export const InstallPromptModal: FC<InstallPromptProps> = ({ 
  autoShow = true,
  delayMs = 5000 
}) => {
  const { isInstallable, isInstalled, promptInstall, dismissPrompt } = useInstallPrompt();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isInstallable && !isInstalled && autoShow && shouldShowInstallPrompt()) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, delayMs);

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, autoShow, delayMs]);

  const handleInstall = async () => {
    await promptInstall();
    setVisible(false);
  };

  const handleDismiss = () => {
    dismissPrompt();
    setVisible(false);
  };

  if (!visible || !isInstallable || isInstalled) {
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
            transform transition-all animate-scale-in"
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
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
              <Download className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Install Superecomm
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
            Install our app for a better experience with offline access, 
            faster loading, and push notifications.
          </p>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                <Smartphone className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span>Works on all your devices</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                <Monitor className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span>Full offline functionality</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span>Instant loading and updates</span>
            </div>
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
              onClick={handleInstall}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold
                hover:bg-blue-700 transition-colors shadow-lg"
            >
              Install App
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Button variant - can be placed anywhere
 */
export const InstallPromptButton: FC = () => {
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();

  if (!isInstallable || isInstalled) {
    return null;
  }

  return (
    <button
      onClick={promptInstall}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
        font-semibold hover:bg-blue-700 transition-colors shadow-lg"
    >
      <Download className="w-5 h-5" />
      <span>Install App</span>
    </button>
  );
};

/**
 * Default export - Modal variant
 */
const InstallPrompt: FC<InstallPromptProps> = (props) => {
  return <InstallPromptModal {...props} />;
};

export default InstallPrompt;

