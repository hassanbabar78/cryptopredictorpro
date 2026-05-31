import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PaymentModal from '../Payment/PaymentModal';
import { formatCurrency } from '../../utils/formatters';

const PredictionPanel = ({ selectedCoin = 'BTC', selectedInterval = '4h' }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const { paymentStatus, user } = useAuth();
  const navigate = useNavigate();

  const handlePredictClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!paymentStatus.hasPaid) {
      setShowPaymentModal(true);
      return;
    }

    if (paymentStatus.credits <= 0) {
      // Show credit purchase modal or message
      alert('No credits remaining. Please purchase more credits.');
      return;
    }

    // Navigate to prediction page
    navigate('/predict', { 
      state: { 
        coin: selectedCoin, 
        interval: selectedInterval 
      } 
    });
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Optional: Show success message
  };

  const getButtonState = () => {
    if (!user) {
      return {
        label: 'Login to Predict',
        disabled: false,
        variant: 'secondary',
      };
    }

    if (!paymentStatus.hasPaid) {
      return {
        label: 'Unlock Predictions',
        disabled: false,
        variant: 'primary',
      };
    }

    if (paymentStatus.credits <= 0) {
      return {
        label: 'No Credits',
        disabled: true,
        variant: 'disabled',
      };
    }

    return {
      label: `Get Prediction (${paymentStatus.credits} credits)`,
      disabled: false,
      variant: 'success',
    };
  };

  const buttonState = getButtonState();

  return (
    <div className="bg-crypto-darker rounded-xl p-6 border border-crypto-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold gradient-text">AI Prediction</h3>
          <p className="text-gray-400 text-sm">Advanced market analysis</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          paymentStatus.hasPaid 
            ? 'bg-crypto-green/20 text-crypto-green' 
            : 'bg-crypto-red/20 text-crypto-red'
        }`}>
          {paymentStatus.hasPaid ? 'Unlocked' : 'Locked'}
        </div>
      </div>

      {/* Selected Parameters */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-crypto-darker/50 border border-crypto-border">
            <div className="text-sm text-gray-400 mb-1">Coin</div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-crypto-blue"></div>
              <span className="font-bold text-lg">{selectedCoin}</span>
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-crypto-darker/50 border border-crypto-border">
            <div className="text-sm text-gray-400 mb-1">Timeframe</div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-crypto-purple"></div>
              <span className="font-bold text-lg">{selectedInterval}</span>
            </div>
          </div>
        </div>

        {/* Analysis Duration */}
        <div className="p-3 rounded-lg bg-crypto-darker/30 border border-crypto-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-crypto-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Analysis Duration</span>
            </div>
            <span className="font-bold text-crypto-green">10-15 seconds</span>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Payment Status</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Subscription</span>
            <span className={`font-medium ${
              paymentStatus.hasPaid ? 'text-crypto-green' : 'text-crypto-red'
            }`}>
              {paymentStatus.hasPaid ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Credits Available</span>
            <span className="font-bold text-crypto-green">{paymentStatus.credits}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Cost per Prediction</span>
            <span className="font-bold">1 Credit</span>
          </div>
        </div>
      </div>

      {/* Prediction Button */}
      <button
        onClick={handlePredictClick}
        disabled={buttonState.disabled}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
          buttonState.variant === 'primary'
            ? 'btn-primary hover:scale-105'
            : buttonState.variant === 'success'
            ? 'bg-gradient-to-r from-crypto-green to-emerald-500 hover:from-emerald-500 hover:to-crypto-green text-white hover:scale-105'
            : buttonState.variant === 'secondary'
            ? 'bg-gradient-to-r from-crypto-blue to-blue-500 hover:from-blue-500 hover:to-crypto-blue text-white hover:scale-105'
            : 'bg-crypto-darker text-gray-500 cursor-not-allowed opacity-80'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          {buttonState.variant === 'primary' && (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
          {buttonState.variant === 'success' && (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
          {buttonState.variant === 'secondary' && (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          )}
          <span>{buttonState.label}</span>
        </div>
      </button>

      {/* Unlock Button for non-paid users */}
      {user && !paymentStatus.hasPaid && (
        <div className="mt-4">
          <button
            onClick={() => setShowPaymentModal(true)}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-crypto-purple to-blue-600 hover:from-blue-600 hover:to-crypto-purple text-white font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Pay 1 SOL to Unlock</span>
            </div>
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Get 50 prediction credits
          </p>
        </div>
      )}

      {/* Features List */}
      <div className="mt-6 pt-6 border-t border-crypto-border">
        <h4 className="text-sm font-medium text-gray-300 mb-3">What you get:</h4>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-crypto-green"></div>
            <span>AI-powered market analysis</span>
          </li>
          <li className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-crypto-green"></div>
            <span>Detailed buy/sell/hold signals</span>
          </li>
          <li className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-crypto-green"></div>
            <span>Target price & stop loss levels</span>
          </li>
          <li className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-crypto-green"></div>
            <span>Confidence score & explanation</span>
          </li>
        </ul>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default PredictionPanel;