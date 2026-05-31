import React, { useState } from 'react';
import { validateTransactionHash } from '../../utils/validators';
import LoadingSpinner from '../UI/LoadingSpinner';

const TransactionVerifier = ({ onSubmit, loading = false, error = null, success = null }) => {
  const [txHash, setTxHash] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate transaction hash
    if (!txHash.trim()) {
      setLocalError('Transaction hash is required');
      return;
    }
    
    if (!validateTransactionHash(txHash)) {
      setLocalError('Invalid transaction hash format');
      return;
    }
    
    setLocalError('');
    onSubmit(txHash);
  };

  const handleChange = (e) => {
    setTxHash(e.target.value);
    if (localError) {
      setLocalError('');
    }
  };

  return (
    <div className="bg-crypto-darker rounded-xl p-6 border border-crypto-border">
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-crypto-green/20 to-crypto-blue/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-crypto-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold gradient-text">Verify Payment</h3>
        <p className="text-gray-400 mt-1">Enter your transaction hash to verify</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error/Success Messages */}
        {error && (
          <div className="p-3 rounded-lg bg-crypto-red/20 border border-crypto-red/30">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-crypto-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-crypto-red">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-lg bg-crypto-green/20 border border-crypto-green/30">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-crypto-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-crypto-green">{success}</span>
            </div>
          </div>
        )}

        {/* Transaction Hash Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Transaction Hash
          </label>
          <div className="relative">
            <input
              type="text"
              value={txHash}
              onChange={handleChange}
              placeholder="Enter Solana transaction hash"
              className={`w-full p-3 rounded-lg bg-crypto-darker border ${
                localError ? 'border-crypto-red' : 'border-crypto-border'
              } text-white focus:outline-none focus:ring-2 focus:ring-crypto-green/50 focus:border-transparent`}
              disabled={loading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          {localError && (
            <p className="mt-1 text-sm text-crypto-red">{localError}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            Find this in your wallet's transaction history
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => window.open('https://explorer.solana.com/?cluster=devnet', '_blank')}
            className="text-crypto-blue hover:text-crypto-teal transition-colors flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Open Solana Explorer</span>
          </button>
          
          <button
            type="button"
            onClick={() => setTxHash('')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !txHash.trim()}
          className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" className="mr-2" />
              Verifying...
            </div>
          ) : (
            <>
              <span className="relative z-10">Verify Transaction</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-crypto-green transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </>
          )}
        </button>

        {/* Info Box */}
        <div className="p-3 rounded-lg bg-crypto-darker/30 border border-crypto-border">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-crypto-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-gray-300">Upon successful verification:</p>
              <ul className="text-xs text-gray-400 mt-1 space-y-1">
                <li>• Receive 50 prediction credits</li>
                <li>• Unlock AI prediction features</li>
                <li>• Access historical data</li>
                <li>• Get priority processing</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TransactionVerifier;