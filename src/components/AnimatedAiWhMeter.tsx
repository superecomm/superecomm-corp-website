import { type FC } from 'react';
import meterImage from '../assets/aiWh-meter-transparent-background.png';

interface AnimatedAiWhMeterProps {
  darkMode?: boolean;
}

export const AnimatedAiWhMeter: FC<AnimatedAiWhMeterProps> = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto p-4">
      {/* Meter image - clean with transparent background */}
      <img
        src={meterImage}
        alt="aiWh Meter showing AI usage tracking"
        className="w-full h-auto drop-shadow-2xl"
      />
    </div>
  );
};

export default AnimatedAiWhMeter;

