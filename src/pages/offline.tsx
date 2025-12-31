import { type FC } from "react";
import { WifiOff, RefreshCw } from "lucide-react";

const OfflinePage: FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
              <WifiOff className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            You're Offline
          </h1>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            It looks like you've lost your internet connection. Don't worry,
            some content is still available offline. Check your connection and
            try again.
          </p>

          {/* Status */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              <strong>Connection Status:</strong> Offline
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Last Online:</strong> {new Date().toLocaleString()}
            </p>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>

          {/* Tips */}
          <div className="mt-8 text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Quick Tips:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Check your WiFi or mobile data connection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Try turning airplane mode off and on</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Make sure you're in an area with signal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Some cached content may still be available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Branding */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Superecomm - AI as a Utility
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;

