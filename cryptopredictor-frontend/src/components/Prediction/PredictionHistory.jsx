import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { PREDICTION_SIGNALS } from '../../utils/constants';
import LoadingSpinner from '../UI/LoadingSpinner';

const PredictionHistory = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const { user, paymentStatus } = useAuth();

  useEffect(() => {
    if (user && paymentStatus.hasPaid) {
      fetchPredictions();
    }
  }, [user, paymentStatus.hasPaid]);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      const data = await api.getPredictionHistory(user.id, 50);
      setPredictions(data.predictions || []);
    } catch (err) {
      setError('Failed to load prediction history');
      console.error('Error fetching predictions:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPredictions = predictions.filter(pred => {
    if (selectedFilter === 'all') return true;
    return pred.signal === selectedFilter;
  });

  const getSignalColor = (signal) => {
    return PREDICTION_SIGNALS[signal]?.color || '#9ca3af';
  };

  const calculateProfitLoss = (prediction) => {
    // This is a simplified calculation
    // In a real app, you'd compare with actual market prices
    if (prediction.signal === 'BUY') {
      const profit = prediction.target_price - prediction.current_price;
      return {
        amount: profit,
        percent: (profit / prediction.current_price) * 100,
        isProfit: profit > 0
      };
    } else if (prediction.signal === 'SELL') {
      const profit = prediction.current_price - prediction.stop_loss;
      return {
        amount: profit,
        percent: (profit / prediction.current_price) * 100,
        isProfit: profit > 0
      };
    }
    return { amount: 0, percent: 0, isProfit: null };
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-crypto-darker border border-crypto-border flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Login Required</h3>
        <p className="text-gray-400">Please login to view your prediction history</p>
      </div>
    );
  }

  if (!paymentStatus.hasPaid) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-crypto-purple/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-crypto-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Unlock Predictions</h3>
        <p className="text-gray-400">Subscribe to access your prediction history</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-400">Loading prediction history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-crypto-red/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-crypto-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2 text-crypto-red">Error</h3>
        <p className="text-gray-400">{error}</p>
        <button
          onClick={fetchPredictions}
          className="mt-4 px-4 py-2 rounded-lg bg-crypto-darker border border-crypto-border hover:border-crypto-green transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (predictions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-crypto-darker border border-crypto-border flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">No Predictions Yet</h3>
        <p className="text-gray-400">Make your first prediction to see history here</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Prediction History</h2>
          <p className="text-gray-400">Track your AI prediction performance</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Filter:</span>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-crypto-darker border border-crypto-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-crypto-green/50"
          >
            <option value="all">All Signals</option>
            <option value="BUY">Buy Signals</option>
            <option value="SELL">Sell Signals</option>
            <option value="HOLD">Hold Signals</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-crypto-darker border border-crypto-border">
          <div className="text-sm text-gray-400 mb-1">Total Predictions</div>
          <div className="text-2xl font-bold">{predictions.length}</div>
        </div>
        
        <div className="p-4 rounded-lg bg-crypto-darker border border-crypto-border">
          <div className="text-sm text-gray-400 mb-1">Buy Signals</div>
          <div className="text-2xl font-bold text-crypto-green">
            {predictions.filter(p => p.signal === 'BUY').length}
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-crypto-darker border border-crypto-border">
          <div className="text-sm text-gray-400 mb-1">Sell Signals</div>
          <div className="text-2xl font-bold text-crypto-red">
            {predictions.filter(p => p.signal === 'SELL').length}
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-crypto-darker border border-crypto-border">
          <div className="text-sm text-gray-400 mb-1">Success Rate</div>
          <div className="text-2xl font-bold gradient-text">
            {((predictions.filter(p => p.confidence > 70).length / predictions.length) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Predictions Table */}
      <div className="bg-crypto-darker rounded-xl border border-crypto-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-crypto-darker/50 border-b border-crypto-border">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Date</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Coin</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Signal</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Price</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Target</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Confidence</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">P/L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-crypto-border">
              {filteredPredictions.map((prediction, index) => {
                const pl = calculateProfitLoss(prediction);
                
                return (
                  <tr 
                    key={prediction._id || index}
                    className="hover:bg-crypto-darker/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="text-sm">{formatDate(prediction.entry_time, 'short')}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{prediction.coin}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${getSignalColor(prediction.signal)}20`,
                          color: getSignalColor(prediction.signal)
                        }}
                      >
                        {prediction.signal}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">
                        {formatCurrency(prediction.current_price, 'USD')}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-crypto-green">
                        {formatCurrency(prediction.target_price, 'USD')}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-crypto-darker rounded-full h-2 mr-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${prediction.confidence}%`,
                              backgroundColor: getSignalColor(prediction.signal)
                            }}
                          ></div>
                        </div>
                        <span className="text-sm">{prediction.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`font-medium ${
                        pl.isProfit === null 
                          ? 'text-gray-400' 
                          : pl.isProfit 
                            ? 'text-crypto-green' 
                            : 'text-crypto-red'
                      }`}>
                        {pl.isProfit === null ? 'N/A' : (
                          <>
                            {pl.isProfit ? '+' : ''}{formatCurrency(pl.amount, 'USD')}
                            <div className="text-xs">
                              ({pl.isProfit ? '+' : ''}{pl.percent.toFixed(2)}%)
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination/Info */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
        <div>
          Showing {filteredPredictions.length} of {predictions.length} predictions
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={fetchPredictions}
            className="px-3 py-1 rounded border border-crypto-border hover:border-crypto-green transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionHistory;