import React from 'react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { PREDICTION_SIGNALS } from '../../utils/constants';

const PredictionResult = ({ prediction, onNewPrediction }) => {
  if (!prediction) return null;

  const signalInfo = PREDICTION_SIGNALS[prediction.signal] || PREDICTION_SIGNALS.HOLD;
  const isProfitable = prediction.signal === 'BUY' || prediction.signal === 'SELL';

  return (
    <div className="animate-fade-in">
      {/* Result Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold gradient-text">AI Prediction Result</h2>
          <p className="text-gray-400">Analysis completed for {prediction.coin}</p>
        </div>
        <button
          onClick={onNewPrediction}
          className="px-4 py-2 rounded-lg bg-crypto-darker border border-crypto-border hover:border-crypto-green transition-colors"
        >
          New Prediction
        </button>
      </div>

      {/* Main Result Card */}
      <div className="bg-crypto-darker rounded-xl p-6 border border-crypto-border mb-6">
        {/* Signal Display */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-center md:text-left">
            <div className="text-sm text-gray-400 mb-1">Signal</div>
            <div className="flex items-center space-x-3">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${signalInfo.color}20` }}
              >
                {signalInfo.icon}
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: signalInfo.color }}>
                  {prediction.signal}
                </div>
                <div className="text-gray-400">{signalInfo.label} Signal</div>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="text-sm text-gray-400 mb-1">Confidence</div>
            <div className="text-4xl font-bold gradient-text">{prediction.confidence}</div>
            <div className="text-gray-400">AI Confidence Score</div>
          </div>
        </div>

        {/* Price Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-crypto-darker/50 border border-crypto-border">
            <div className="text-sm text-gray-400 mb-1">Current Price</div>
            <div className="text-2xl font-bold">
              {formatCurrency(prediction.current_price, 'USD')}
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-crypto-darker/50 border border-crypto-border">
            <div className="text-sm text-gray-400 mb-1">Target Price</div>
            <div className="text-2xl font-bold text-crypto-green">
              {formatCurrency(prediction.target_price, 'USD')}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {((prediction.target_price / prediction.current_price - 1) * 100).toFixed(2)}% target
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-crypto-darker/50 border border-crypto-border">
            <div className="text-sm text-gray-400 mb-1">Stop Loss</div>
            <div className="text-2xl font-bold text-crypto-red">
              {formatCurrency(prediction.stop_loss, 'USD')}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {((prediction.stop_loss / prediction.current_price - 1) * 100).toFixed(2)}% risk
            </div>
          </div>
        </div>

        {/* Analysis Details */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">Analysis Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-crypto-darker/30 border border-crypto-border">
              <div className="text-sm text-gray-400 mb-1">Entry Time</div>
              <div className="font-medium">{formatDate(prediction.entry_time, 'full')}</div>
            </div>
            
            <div className="p-4 rounded-lg bg-crypto-darker/30 border border-crypto-border">
              <div className="text-sm text-gray-400 mb-1">Processing Time</div>
              <div className="font-medium">{prediction.analysis?.processing_time || '10-15 seconds'}</div>
            </div>
            
            <div className="p-4 rounded-lg bg-crypto-darker/30 border border-crypto-border">
              <div className="text-sm text-gray-400 mb-1">Data Points Analyzed</div>
              <div className="font-medium">{prediction.analysis?.data_points?.toLocaleString() || '1,500'}</div>
            </div>
            
            <div className="p-4 rounded-lg bg-crypto-darker/30 border border-crypto-border">
              <div className="text-sm text-gray-400 mb-1">RSI Indicator</div>
              <div className="font-medium">{prediction.analysis?.rsi?.toFixed(2) || '50.00'}</div>
            </div>
          </div>
        </div>

        {/* AI Explanation */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-crypto-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI Explanation
          </h3>
          <div className="p-4 rounded-lg bg-gradient-to-r from-crypto-darker to-crypto-darker/50 border border-crypto-border">
            <p className="text-gray-300 leading-relaxed">{prediction.explanation}</p>
          </div>
        </div>

        {/* Risk Disclaimer */}
        {/* <div className="p-4 rounded-lg bg-crypto-darker/30 border border-crypto-border">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-crypto-yellow mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5" />
            </svg>
            <div>
              <p className="text-sm text-gray-300">
                
              </p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => window.open(`https://www.binance.com/en/trade/${prediction.coin}_USDT`, '_blank')}
          className="flex-1 py-3 rounded-lg bg-crypto-darker border border-crypto-border hover:border-crypto-yellow transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5 text-crypto-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>Trade on Binance</span>
        </button>
        
        <button
          onClick={() => navigator.clipboard.writeText(JSON.stringify(prediction, null, 2))}
          className="flex-1 py-3 rounded-lg bg-crypto-darker border border-crypto-border hover:border-crypto-blue transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5 text-crypto-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy Result</span>
        </button>
        
        <button
          onClick={onNewPrediction}
          className="flex-1 py-3 rounded-lg btn-primary flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Analyze Again</span>
        </button>
      </div>
    </div>
  );
};

export default PredictionResult;