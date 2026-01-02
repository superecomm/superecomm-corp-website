import type { FC } from 'react';
import aiGridLayerDiagram from '../assets/ai-grid-layer-digram.png';

interface AiGridLayerPageProps {
  darkMode: boolean;
  setCurrentPage: (page: string) => void;
}

const AiGridLayerPage: FC<AiGridLayerPageProps> = ({ darkMode, setCurrentPage }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 ${
      darkMode ? 'bg-gray-950' : 'bg-white'
    }`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Image */}
        <div className="mb-12">
          <img
            src={aiGridLayerDiagram}
            alt="AI Grid Layer"
            className="w-full max-w-2xl mx-auto rounded-lg"
          />
        </div>

        {/* Title */}
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-light mb-6 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          AI Grid Layer
        </h1>

        {/* Subtitle */}
        <p className={`text-2xl md:text-3xl font-light mb-6 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Intelligence delivered as infrastructure.
        </p>

        {/* Thesis Statement */}
        <p className={`text-lg md:text-xl font-light mb-12 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Metered. Routed. Secured.
        </p>

        {/* CTA */}
        <button
          onClick={() => setCurrentPage('reserve')}
          className={`px-8 py-4 rounded-lg text-lg font-medium transition-all ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Reserve Your Grid Account
        </button>
      </div>
    </div>
  );
};

export default AiGridLayerPage;
