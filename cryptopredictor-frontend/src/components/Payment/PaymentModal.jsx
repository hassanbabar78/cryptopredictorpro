import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePayment } from '../../context/PaymentContext';
import LoadingSpinner from '../UI/LoadingSpinner';
import { validateTransactionHash } from '../../utils/validators';
import { formatCurrency } from '../../utils/formatters';

const PaymentModal = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [txHash, setTxHash] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { user, updatePaymentStatus } = useAuth();
  const { paymentInfo, verifying, verificationResult, loadPaymentInfo, verifyTransaction, clearVerification } = usePayment();

  useEffect(() => {
    if (isOpen) {
      loadPaymentInfo();
      clearVerification();
      setStep(1);
      setTxHash('');
      setErrors({});
    }
  }, [isOpen]);

  const handleCopyAddress = () => {
    if (paymentInfo?.address) {
      navigator.clipboard.writeText(paymentInfo.address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const validateTxHash = () => {
    const newErrors = {};
    
    if (!txHash.trim()) {
      newErrors.txHash = 'Transaction hash is required';
    } else if (!validateTransactionHash(txHash)) {
      newErrors.txHash = 'Invalid transaction hash format';
    }
    
    return newErrors;
  };

  const handleVerifyPayment = async () => {
    const validationErrors = validateTxHash();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    if (!user?.id) {
      setErrors({ general: 'User not found' });
      return;
    }
    
    const result = await verifyTransaction(user.id, txHash);
    
    if (result.success) {
      await updatePaymentStatus();
      
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    }
  };

  const handleTxHashChange = (e) => {
    setTxHash(e.target.value);
    if (errors.txHash) {
      setErrors({ ...errors, txHash: '' });
    }
  };

  const handleProceedToVerification = () => {
    setStep(2);
    clearVerification();
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-crypto-darker rounded-2xl w-full max-w-2xl overflow-hidden border border-crypto-border animate-slide-in">
        {/* Header */}
        <div className="p-6 border-b border-crypto-border bg-gradient-to-r from-crypto-darker to-crypto-darker/80">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold gradient-text">Unlock Predictions</h2>
              <p className="text-gray-400 mt-1">Get 50 prediction credits for 1 SOL</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-crypto-darker transition-colors"
              disabled={verifying}
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  step >= stepNumber
                    ? 'border-crypto-green bg-crypto-green/10 text-crypto-green'
                    : 'border-gray-600 text-gray-500'
                }`}>
                  {stepNumber}
                </div>
                <span className={`font-medium ${
                  step >= stepNumber ? 'text-white' : 'text-gray-500'
                }`}>
                  {stepNumber === 1 ? 'Send SOL' : 'Verify'}
                </span>
                {stepNumber < 2 && (
                  <div className="w-12 h-0.5 bg-gray-700"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-6">
              {/* Payment Instructions */}
              <div className="p-4 rounded-xl bg-crypto-darker/50 border border-crypto-border">
                <h3 className="font-bold text-lg mb-3 flex items-center">
                  <svg className="w-5 h-5 text-crypto-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Payment Instructions
                </h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-crypto-darker border border-crypto-border flex items-center justify-center text-xs mt-0.5">
                      1
                    </div>
                    <span>Open your Solana wallet (Phantom, Solflare, etc.)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-crypto-darker border border-crypto-border flex items-center justify-center text-xs mt-0.5">
                      2
                    </div>
                    <span>Switch to <strong className="text-crypto-green">Devnet</strong> network</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-crypto-darker border border-crypto-border flex items-center justify-center text-xs mt-0.5">
                      3
                    </div>
                    <span>Send exactly <strong className="text-crypto-green">1 SOL</strong> to the address below</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-crypto-darker border border-crypto-border flex items-center justify-center text-xs mt-0.5">
                      4
                    </div>
                    <span>Copy the transaction hash after sending</span>
                  </li>
                </ol>
              </div>

              {/* Payment Details */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-crypto-darker to-crypto-darker/50 border border-crypto-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Payment Details</h3>
                    <p className="text-sm text-gray-400">Send 1 SOL on Solana Devnet</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-crypto-green/20 text-crypto-green text-sm font-medium">
                    1 SOL ≈ {formatCurrency(20, 'USD')}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Network</label>
                    <div className="p-3 rounded-lg bg-crypto-darker border border-crypto-border flex items-center justify-between">
                      <span>Solana Devnet</span>
                      <span className="text-xs px-2 py-1 rounded bg-crypto-blue/20 text-crypto-blue">
                        Test Network
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-gray-400">Recipient Address</label>
                      <button
                        onClick={handleCopyAddress}
                        className="text-xs text-crypto-green hover:text-crypto-teal transition-colors"
                      >
                        {copySuccess ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="relative">
                      <div className="p-3 rounded-lg bg-crypto-darker border border-crypto-border font-mono text-sm break-all pr-12">
                        {paymentInfo?.address || 'Loading...'}
                      </div>
                      <button
                        onClick={handleCopyAddress}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded hover:bg-crypto-darker transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleProceedToVerification}
                  className="btn-primary px-8 py-3"
                  disabled={!paymentInfo?.address}
                >
                  I've Sent the Payment
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Verification Form */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-crypto-darker to-crypto-darker/50 border border-crypto-border">
                <h3 className="font-bold text-lg mb-4">Verify Transaction</h3>
                
                {verificationResult && (
                  <div className={`mb-4 p-3 rounded-lg ${
                    verificationResult.success
                      ? 'bg-crypto-green/20 border border-crypto-green/30'
                      : 'bg-crypto-red/20 border border-crypto-red/30'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {verificationResult.success ? (
                        <svg className="w-5 h-5 text-crypto-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-crypto-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={verificationResult.success ? 'text-crypto-green' : 'text-crypto-red'}>
                        {verificationResult.message}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Transaction Hash
                    </label>
                    <input
                      type="text"
                      value={txHash}
                      onChange={handleTxHashChange}
                      placeholder="Enter the transaction hash from your wallet"
                      className={`w-full p-3 rounded-lg bg-crypto-darker border ${
                        errors.txHash ? 'border-crypto-red' : 'border-crypto-border'
                      } text-white focus:outline-none focus:ring-2 focus:ring-crypto-green/50 focus:border-transparent`}
                      disabled={verifying}
                      autoFocus
                    />
                    {errors.txHash && (
                      <p className="mt-1 text-sm text-crypto-red">{errors.txHash}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Find this in your wallet's transaction history after sending
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-crypto-darker/50 border border-crypto-border">
                    <div className="flex items-center space-x-2 text-sm">
                      <svg className="w-5 h-5 text-crypto-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>You'll receive <strong className="text-crypto-green">50 prediction credits</strong> upon successful verification</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={handleBackToStep1}
                  disabled={verifying}
                  className="px-6 py-3 rounded-lg bg-crypto-darker border border-crypto-border hover:border-gray-500 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
                
                <button
                  onClick={handleVerifyPayment}
                  disabled={verifying || !txHash.trim()}
                  className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  {verifying ? (
                    <div className="flex items-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">Verify Payment</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-crypto-green transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-crypto-border bg-crypto-darker/50">
          <div className="text-center text-sm text-gray-500">
            <p>Need help? Check the transaction on{' '}
              <a 
                href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-crypto-blue hover:underline"
              >
                Solana Explorer
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;