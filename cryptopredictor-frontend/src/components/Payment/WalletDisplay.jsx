import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatters';

const WalletDisplay = ({ address, network = 'Solana Devnet', amount = 1 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenExplorer = () => {
    window.open(`https://explorer.solana.com/address/${address}?cluster=devnet`, '_blank');
  };

  return (
    <div className="bg-crypto-darker rounded-xl p-6 border border-crypto-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold gradient-text">Payment Wallet</h3>
          <p className="text-gray-400 text-sm">Send {amount} SOL to unlock predictions</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-crypto-green/20 text-crypto-green text-sm font-medium">
          {amount} SOL
        </div>
      </div>

      <div className="space-y-4">
        {/* Network Info */}
        <div className="p-3 rounded-lg bg-crypto-darker/50 border border-crypto-border">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Network</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-crypto-green animate-pulse"></div>
              <span className="font-medium">{network}</span>
            </div>
          </div>
        </div>

        {/* Wallet Address */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">Wallet Address</label>
            <button
              onClick={handleCopy}
              className="text-xs text-crypto-green hover:text-crypto-teal transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="relative group">
            <div className="p-3 rounded-lg bg-crypto-darker border border-crypto-border font-mono text-sm break-all pr-24 transition-colors group-hover:border-crypto-green">
              {address}
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <button
                onClick={handleCopy}
                className="p-2 rounded hover:bg-crypto-darker transition-colors"
                title="Copy address"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={handleOpenExplorer}
                className="p-2 rounded hover:bg-crypto-darker transition-colors"
                title="View on explorer"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Estimated Value */}
        <div className="p-3 rounded-lg bg-gradient-to-r from-crypto-darker to-crypto-darker/50 border border-crypto-border">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Estimated Value</span>
            <div className="text-right">
              <div className="font-bold">{amount} SOL</div>
              <div className="text-sm text-gray-400">
                ≈ {formatCurrency(amount * 20, 'USD')}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-3 rounded-lg bg-crypto-darker/30 border border-crypto-border">
          <h4 className="font-medium text-sm mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-crypto-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Important
          </h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Make sure you're on <strong>Devnet</strong></li>
            <li>• Send exactly <strong>{amount} SOL</strong></li>
            <li>• Transaction may take 30-60 seconds</li>
            <li>• Copy the transaction hash after sending</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WalletDisplay;