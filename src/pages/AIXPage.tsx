import type { FC } from 'react';
import aixMarketIndex from '../assets/aix-market-index.png';

interface AIXPageProps {
  darkMode: boolean;
  setCurrentPage: (page: string) => void;
}

const AIXPage: FC<AIXPageProps> = ({ darkMode }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 ${
      darkMode ? 'bg-gray-950' : 'bg-white'
    }`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Image */}
        <div className="mb-12">
          <img
            src={aixMarketIndex}
            alt="AIX - AI Market Index"
            className="w-full max-w-3xl mx-auto rounded-lg shadow-2xl"
          />
        </div>

        {/* Title */}
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-light mb-6 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          AIX
        </h1>

        {/* Subtitle */}
        <p className={`text-2xl md:text-3xl font-light mb-6 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          AI Market Index
        </p>

        {/* Thesis Statement */}
        <p className={`text-lg md:text-xl font-light mb-12 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          A standardized measure of computational intelligence pricing
        </p>

        {/* CTA */}
        <a
          href="https://www.aixmarketindex.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block px-8 py-4 rounded-lg text-lg font-medium transition-all ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Visit AIX Market Index →
        </a>
      </div>
    </div>
  );
};

export default AIXPage;
