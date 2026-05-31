import React from 'react';

const AnalysisLoader = ({ progress = 0 }) => {
  const steps = [
    { label: 'Fetching Market Data', icon: '📊' },
    { label: 'Analyzing Price Trends', icon: '📈' },
    { label: 'Calculating Indicators', icon: '🧮' },
    { label: 'Generating AI Insights', icon: '🤖' },
    { label: 'Finalizing Prediction', icon: '🎯' },
  ];

  const currentStep = Math.floor((progress / 100) * steps.length);
  const stepProgress = ((progress % (100 / steps.length)) / (100 / steps.length)) * 100;

  return (
    <div className="py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 rounded-full border-4 border-crypto-border border-t-crypto-green animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-crypto-green/20 animate-pulse"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold gradient-text mb-2">AI Analysis in Progress</h2>
        <p className="text-gray-400">Analyzing market data and generating predictions</p>
        <div className="mt-4 text-lg font-bold text-crypto-green">
          {progress.toFixed(0)}% Complete
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-crypto-darker rounded-full h-3">
          <div 
            className="h-3 rounded-full bg-gradient-to-r from-crypto-green to-crypto-blue transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>Started</span>
          <span>Estimated: 10-15s</span>
          <span>Complete</span>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div 
              key={index}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                isCompleted 
                  ? 'border-crypto-green bg-crypto-green/10' 
                  : isActive
                  ? 'border-crypto-blue bg-crypto-blue/10 animate-pulse'
                  : 'border-crypto-border bg-crypto-darker/30 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    isCompleted 
                      ? 'bg-crypto-green text-white' 
                      : isActive
                      ? 'bg-crypto-blue text-white'
                      : 'bg-crypto-darker text-gray-400 border border-crypto-border'
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="font-medium">{step.label}</div>
                    <div className="text-sm text-gray-400">
                      {isCompleted ? 'Completed' : isActive ? 'In progress...' : 'Pending'}
                    </div>
                  </div>
                </div>
                
                {isActive && (
                  <div className="w-24 bg-crypto-darker rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-crypto-blue to-crypto-green transition-all duration-300"
                      style={{ width: `${stepProgress}%` }}
                    ></div>
                  </div>
                )}
                
                {isCompleted && (
                  <svg className="w-6 h-6 text-crypto-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 rounded-lg bg-crypto-darker/30 border border-crypto-border">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-crypto-yellow mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-gray-300">
              <strong>Note:</strong> Our AI analyzes multiple indicators including RSI, moving averages, 
              volume trends, and market sentiment to generate accurate predictions.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Please don't close this window while analysis is in progress.
            </p>
          </div>
        </div>
      </div>

      {/* Time Estimate */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-crypto-darker border border-crypto-border">
          <svg className="w-4 h-4 text-crypto-green animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">Estimated completion: {Math.max(0, 15 - Math.floor(progress / 100 * 15))} seconds</span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisLoader;