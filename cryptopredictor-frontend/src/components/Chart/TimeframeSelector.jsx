import React from 'react';
import { TIME_INTERVALS } from '../../utils/constants';

const TimeframeSelector = ({ selectedInterval, onIntervalChange, compact = false }) => {
  const handleIntervalClick = (interval) => {
    onIntervalChange(interval);
  };

  if (compact) {
    return (
      <div className="inline-flex rounded-lg border border-crypto-border overflow-hidden">
        {TIME_INTERVALS.map((interval) => (
          <button
            key={interval.value}
            onClick={() => handleIntervalClick(interval.value)}
            className={`px-3 py-1.5 text-sm transition-colors ${
              selectedInterval === interval.value
                ? 'bg-crypto-blue text-white'
                : 'bg-crypto-darker text-gray-300 hover:bg-crypto-darker/80'
            }`}
          >
            {interval.value}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        Timeframe
      </label>
      <div className="grid grid-cols-3 gap-2">
        {TIME_INTERVALS.map((interval) => (
          <button
            key={interval.value}
            onClick={() => handleIntervalClick(interval.value)}
            className={`p-3 rounded-lg border transition-all duration-300 ${
              selectedInterval === interval.value
                ? 'border-crypto-blue bg-crypto-blue/10 text-crypto-blue shadow-lg'
                : 'border-crypto-border bg-crypto-darker/50 text-gray-300 hover:border-crypto-blue hover:text-white'
            }`}
          >
            <div className="text-center">
              <div className="text-lg font-bold">{interval.value}</div>
              <div className="text-xs text-gray-400 mt-1">{interval.label}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeframeSelector;