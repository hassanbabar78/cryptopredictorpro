import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary',
  className = '' 
}) => {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  
  const colors = {
    primary: 'text-crypto-green',
    secondary: 'text-crypto-blue',
    danger: 'text-crypto-red',
    white: 'text-white',
    gray: 'text-gray-400',
  };
  
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg 
        className={`animate-spin ${sizes[size]} ${colors[color]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export const LoadingOverlay = ({ message = 'Loading...' }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="xl" />
      {message && (
        <p className="mt-4 text-white text-lg">{message}</p>
      )}
    </div>
  </div>
);

export const LoadingSkeleton = ({ count = 3, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div 
        key={i}
        className="h-4 bg-crypto-border rounded loading-shimmer"
        style={{ animationDelay: `${i * 0.1}s` }}
      ></div>
    ))}
  </div>
);

export default LoadingSpinner;