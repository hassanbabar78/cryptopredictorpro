import React from 'react';

const ChartLoader = () => {
  return (
    <div className="h-[500px] flex flex-col items-center justify-center">
      {/* Animated Chart Skeleton */}
      <div className="w-full max-w-4xl">
        {/* Chart Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-crypto-border rounded loading-shimmer"></div>
            <div className="h-6 w-32 bg-crypto-border rounded loading-shimmer"></div>
          </div>
          <div className="h-10 w-24 bg-crypto-border rounded loading-shimmer"></div>
        </div>

        {/* Chart Area Skeleton */}
        <div className="relative h-[400px] bg-crypto-darker rounded-lg border border-crypto-border overflow-hidden">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-px bg-crypto-border/50"></div>
            ))}
          </div>
          <div className="absolute inset-0 flex justify-between">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-px bg-crypto-border/50"></div>
            ))}
          </div>

          {/* Animated Candles */}
          <div className="absolute inset-0 flex items-end justify-around px-4">
            {[...Array(20)].map((_, i) => {
              const height = 40 + Math.random() * 200;
              const isGreen = Math.random() > 0.5;
              
              return (
                <div
                  key={i}
                  className="relative w-3"
                  style={{
                    height: `${height}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {/* Candle wick */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-600"></div>
                  {/* Candle body */}
                  <div
                    className={`absolute top-1/4 left-0 w-full rounded ${
                      isGreen ? 'bg-crypto-green/30' : 'bg-crypto-red/30'
                    } loading-shimmer`}
                    style={{
                      height: '50%',
                      animationDelay: `${i * 0.1 + 0.5}s`,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>

          {/* Loading Indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-crypto-border border-t-crypto-green rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-crypto-green/20 rounded-full animate-ping"></div>
                </div>
              </div>
              <p className="mt-4 text-gray-400">Loading chart data...</p>
              <p className="text-sm text-gray-500 mt-2">Fetching real-time prices from Binance</p>
            </div>
          </div>
        </div>

        {/* Chart Footer Skeleton */}
        <div className="flex items-center justify-between mt-4">
          <div className="h-4 w-32 bg-crypto-border rounded loading-shimmer"></div>
          <div className="h-4 w-48 bg-crypto-border rounded loading-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ChartLoader;