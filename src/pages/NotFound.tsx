import { type FC } from 'react';

interface NotFoundProps {
  darkMode?: boolean;
  onNavigate?: (page: string) => void;
}

export const NotFound: FC<NotFoundProps> = ({ darkMode = false, onNavigate }) => {
  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${
      darkMode ? 'bg-gray-950' : 'bg-white'
    }`}>
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Error Code */}
        <div className={`text-8xl md:text-9xl font-light mb-8 ${
          darkMode ? 'text-blue-400' : 'text-blue-600'
        }`}>
          404
        </div>

        {/* Heading */}
        <h1 className={`text-3xl md:text-4xl font-light mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Page Not Found
        </h1>

        {/* Description */}
        <p className={`text-lg mb-8 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* AI-themed message */}
        <div className={`p-6 rounded-lg border-l-4 mb-8 ${
          darkMode
            ? 'border-blue-500 bg-gray-900/50'
            : 'border-blue-600 bg-blue-50'
        }`}>
          <p className={`text-sm ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <strong className={darkMode ? 'text-blue-400' : 'text-blue-600'}>
              aiWh Routing Error:
            </strong> The AI Grid couldn't find a model to handle this request. 
            Let's route you back to the right path.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleNavigate('home')}
            className={`px-8 py-3 rounded-full text-base font-medium shadow-sm transition-colors ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Go to Homepage
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <p className={`text-sm mb-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Or try one of these:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleNavigate('plan-individual')}
              className={`text-sm ${
                darkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              Plans & Pricing
            </button>
            <button
              onClick={() => handleNavigate('how-it-works')}
              className={`text-sm ${
                darkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavigate('support')}
              className={`text-sm ${
                darkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              Support
            </button>
            <button
              onClick={() => handleNavigate('contact')}
              className={`text-sm ${
                darkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

