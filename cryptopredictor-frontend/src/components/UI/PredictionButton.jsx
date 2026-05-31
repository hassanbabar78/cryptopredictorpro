

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../UI/LoadingSpinner';

const PredictionButton = ({ 
  selectedCoin = 'BTC', 
  selectedInterval = '4h',
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'danger'
  size = 'normal', // 'small' | 'normal' | 'large'
  fullWidth = false,
  onPredictionStart = null,
  onPredictionComplete = null,
  onError = null
}) => {
  const { user, paymentStatus, deductCredit, updatePaymentStatus } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePredictClick = async () => {
    // Clear previous error
    setError(null);
    
    // Check authentication
    if (!user) {
      navigate('/login');
      return;
    }

    // Check payment status
    if (!paymentStatus.hasPaid) {
      navigate('/chart'); // Or show payment modal
      return;
    }

    // Check credits
    if (paymentStatus.credits <= 0) {
      setError('No credits remaining. Please purchase more credits.');
      if (onError) onError('No credits remaining');
      return;
    }

    // Start prediction
    setLoading(true);
    
    // Callback for prediction start
    if (onPredictionStart) onPredictionStart();

    try {
      // Make API call to get prediction
      const predictionData = await api.getPrediction(user.id, selectedCoin);
      
      // Deduct one credit
      deductCredit();
      
      // Update payment status with fresh data
      await updatePaymentStatus();
      
      // Callback for successful prediction
      if (onPredictionComplete) onPredictionComplete(predictionData);
      
      // Navigate to prediction result page
      navigate('/predict', { 
        state: { 
          prediction: predictionData,
          coin: selectedCoin,
          interval: selectedInterval
        } 
      });
      
    } catch (err) {
      console.error('Prediction failed:', err);
      const errorMessage = err.message || 'Failed to get prediction. Please try again.';
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get button text based on user status
  const getButtonText = () => {
    if (loading) return 'Analyzing...';
    
    if (!user) return 'Login to Predict';
    
    if (!paymentStatus.hasPaid) return 'Unlock Predictions';
    
    if (paymentStatus.credits <= 0) return 'No Credits';
    
    return `Get Prediction (1 Credit)`;
  };

  // Get button variant classes
  const getButtonClasses = () => {
    const baseClasses = [
      'font-semibold rounded-lg transition-all duration-300',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-crypto-dark',
      fullWidth ? 'w-full' : '',
      className
    ];

    // Size classes
    if (size === 'small') {
      baseClasses.push('px-3 py-2 text-sm');
    } else if (size === 'large') {
      baseClasses.push('px-8 py-4 text-lg');
    } else {
      baseClasses.push('px-6 py-3'); // normal
    }

    // State-based classes
    if (loading) {
      baseClasses.push('bg-gray-600 text-gray-300 cursor-wait');
    } else if (!user) {
      baseClasses.push('bg-gradient-to-r from-crypto-blue to-blue-500 hover:from-blue-500 hover:to-crypto-blue text-white hover:scale-105');
    } else if (!paymentStatus.hasPaid) {
      baseClasses.push('bg-gradient-to-r from-crypto-green to-emerald-500 hover:from-emerald-500 hover:to-crypto-green text-white hover:scale-105');
    } else if (paymentStatus.credits <= 0) {
      baseClasses.push('bg-gray-700 text-gray-400 cursor-not-allowed opacity-70');
    } else {
      // User can predict
      if (variant === 'primary') {
        baseClasses.push('bg-gradient-to-r from-crypto-green to-emerald-500 hover:from-emerald-500 hover:to-crypto-green text-white hover:scale-105');
      } else if (variant === 'danger') {
        baseClasses.push('bg-gradient-to-r from-crypto-red to-red-500 hover:from-red-500 hover:to-crypto-red text-white hover:scale-105');
      } else {
        baseClasses.push('bg-gradient-to-r from-crypto-blue to-blue-500 hover:from-blue-500 hover:to-crypto-blue text-white hover:scale-105');
      }
    }

    return baseClasses.join(' ');
  };

  // Check if button should be disabled
  const isDisabled = loading || (!user ? false : (!paymentStatus.hasPaid ? false : paymentStatus.credits <= 0));

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      <button
        className={getButtonClasses()}
        disabled={isDisabled}
        onClick={handlePredictClick}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <LoadingSpinner size="sm" />
            <span>{getButtonText()}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            {!user && <span>🔒</span>}
            {!paymentStatus.hasPaid && user && <span>🔓</span>}
            {paymentStatus.hasPaid && paymentStatus.credits > 0 && <span>🔮</span>}
            <span>{getButtonText()}</span>
          </div>
        )}
      </button>
      
      {/* Error message */}
      {error && (
        <div className="mt-2 p-2 rounded bg-crypto-red/20 border border-crypto-red/30">
          <p className="text-sm text-crypto-red">{error}</p>
        </div>
      )}
      
      {/* Credits display */}
      {user && paymentStatus.hasPaid && (
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-400">
            Credits remaining: <span className="font-bold text-crypto-green">{paymentStatus.credits}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictionButton;