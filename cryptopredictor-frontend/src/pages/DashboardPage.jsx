import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useChart } from '../context/ChartContext';
import Layout from '../components/Layout/Layout'; // ← ADD THIS
import CryptoChart from '../components/Chart/CryptoChart';
import ChartControls from '../components/Chart/ChartControls';
import PredictionPanel from '../components/Prediction/PredictionPanel';
import PaymentModal from '../components/Payment/PaymentModal';
import { CRYPTO_COINS } from '../../src/utils/constants';
import { formatCurrency } from '../../src/utils/formatters';

const DashboardPage = () => {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [selectedInterval, setSelectedInterval] = useState('4h');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [marketData, setMarketData] = useState([]);
  
  const { user, paymentStatus } = useAuth();
  const { chartData } = useChart();
  const navigate = useNavigate();

  
  useEffect(() => {
    // Simulate market data
    const simulatedData = CRYPTO_COINS.map(coin => ({
      ...coin,
      price: 1000 + Math.random() * 90000,
      change: (Math.random() - 0.5) * 10,
      volume: Math.random() * 1000000000,
    }));
    setMarketData(simulatedData);
  }, []);

  const handleCoinChange = (coin) => {
    setSelectedCoin(coin);
  };

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'predict':
        if (!user) {
          navigate('/login');
        } else if (!paymentStatus.hasPaid) {
          setShowPaymentModal(true);
        } else {
          navigate('/predict', { state: { coin: selectedCoin, interval: selectedInterval } });
        }
        break;
      case 'history':
        if (user && paymentStatus.hasPaid) {
          navigate('/history');
        }
        break;
      case 'payment':
        setShowPaymentModal(true);
        break;
    }
  };

  if (!user) {
    return (
      <Layout> {/* ← ADD LAYOUT HERE TOO */}
        <div className="min-h-screen bg-crypto-dark flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-crypto-green/20 to-crypto-blue/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-crypto-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold gradient-text mb-4">Welcome to Crypto Predictor</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Please login or create an account to access AI-powered cryptocurrency predictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-3 rounded-lg btn-primary"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-crypto-purple to-blue-600 hover:from-blue-600 hover:to-crypto-purple text-white font-semibold transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout> {/* ← ADD LAYOUT HERE (MAIN FIX) */}
      <div className="min-h-screen bg-crypto-dark">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-crypto-dark via-crypto-darker to-crypto-dark border-b border-crypto-border">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-2">Welcome back, {user.name}!</h1>
                <p className="text-gray-400">
                  Access AI-powered predictions and advanced market analysis
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-crypto-darker/50 rounded-xl p-4 border border-crypto-border">
                  <div className="text-sm text-gray-400">Credits</div>
                  <div className="flex justify-center text-2xl font-bold text-crypto-green">{paymentStatus.credits}</div>
                </div>
                <div className="bg-crypto-darker/50 rounded-xl pt-4 p-3 border border-crypto-border">
                  <div className="text-sm text-gray-400">Status</div>
                  <div className={`text-lg font-bold ${
                    paymentStatus.hasPaid ? 'text-crypto-green' : 'text-crypto-red'
                  }`}>
                    {paymentStatus.hasPaid ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <button
              onClick={() => handleQuickAction('predict')}
              className="p-6 rounded-xl bg-gradient-to-r from-crypto-darker to-crypto-darker/80 border border-crypto-border hover:border-crypto-green transition-all duration-300 text-left group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-crypto-green to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Get Prediction</h3>
                  <p className="text-sm text-gray-400">AI market analysis</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => handleQuickAction('history')}
              disabled={!paymentStatus.hasPaid}
              className={`p-6 rounded-xl border transition-all duration-300 text-left group ${
                paymentStatus.hasPaid
                  ? 'bg-gradient-to-r from-crypto-darker to-crypto-darker/80 border-crypto-border hover:border-crypto-blue'
                  : 'bg-crypto-darker/50 border-crypto-border opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${
                  paymentStatus.hasPaid
                    ? 'bg-gradient-to-r from-crypto-blue to-blue-500'
                    : 'bg-gray-600'
                }`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">View History</h3>
                  <p className="text-sm text-gray-400">Past predictions</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => handleQuickAction('payment')}
              className="p-6 rounded-xl bg-gradient-to-r from-crypto-darker to-crypto-darker/80 border border-crypto-border hover:border-crypto-purple transition-all duration-300 text-left group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-crypto-purple to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Add Credits</h3>
                  <p className="text-sm text-gray-400">Unlock predictions</p>
                </div>
              </div>
            </button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Chart */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <ChartControls
                  selectedCoin={selectedCoin}
                  selectedInterval={selectedInterval}
                  onCoinChange={handleCoinChange}
                  onIntervalChange={handleIntervalChange}
                />
              </div>
              
              <div className="chart-container mb-8">
                <CryptoChart 
                  data={chartData}
                  coin={selectedCoin}
                  interval={selectedInterval}
                  height={400}
                />
              </div>

              {/* Market Overview */}
              <div className="bg-crypto-darker rounded-xl p-6 border border-crypto-border">
                <h3 className="text-xl font-bold mb-6">Market Overview</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-crypto-border">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Coin</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Price</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">24h Change</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Volume</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.map((coin) => (
                        <tr key={coin.symbol} className="border-b border-crypto-border/30 hover:bg-crypto-darker/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: coin.color }}
                              >
                                {coin.symbol.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{coin.symbol}</div>
                                <div className="text-xs text-gray-400">{coin.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold">
                              {formatCurrency(coin.price, 'USD')}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className={`font-bold ${coin.change >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                              {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-gray-300">
                              ${(coin.volume / 1000000).toFixed(1)}M
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => setSelectedCoin(coin.symbol)}
                              className={`px-3 py-1 rounded text-sm ${
                                selectedCoin === coin.symbol
                                  ? 'bg-crypto-green text-white'
                                  : 'bg-crypto-darker border border-crypto-border hover:border-crypto-green'
                              }`}
                            >
                              {selectedCoin === coin.symbol ? 'Selected' : 'Select'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column - Prediction Panel */}
            <div>
              <PredictionPanel 
                selectedCoin={selectedCoin}
                selectedInterval={selectedInterval}
              />

              {/* User Stats */}
              <div className="bg-crypto-darker rounded-xl p-6 border border-crypto-border mt-8">
                <h3 className="text-xl font-bold mb-6">Your Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Account Created</span>
                    <span className="font-medium">Recently</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Predictions Made</span>
                    <span className="font-bold text-crypto-green">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="font-bold gradient-text">0%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Credits Used</span>
                    <span className="font-bold">0</span>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-crypto-border">
                  <h4 className="text-sm font-medium text-gray-300 mb-4">Quick Tips</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-crypto-green mt-1.5"></div>
                      <span>Start with small predictions to understand the system</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-crypto-green mt-1.5"></div>
                      <span>Check the prediction history to track performance</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-crypto-green mt-1.5"></div>
                      <span>Use different timeframes for varied analysis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
    </Layout> // ← CLOSING LAYOUT TAG
  );
};

export default DashboardPage;