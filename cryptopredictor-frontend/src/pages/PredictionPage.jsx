// src/pages/PredictionPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CryptoChart from '../components/Chart/CryptoChart';
import PredictionResult from '../components/Prediction/PredictionResult';
import AnalysisLoader from '../components/Prediction/AnalysisLoader';
import { useToast } from '../components/UI/ToastProvider';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import api from '../services/api';

const PredictionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { coin: initialCoin, interval: initialInterval } = location.state || {};
  
  const [coin, setCoin] = useState(initialCoin || 'BTC');
  const [interval, setInterval] = useState(initialInterval || '4h');
  const [prediction, setPrediction] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [chartData, setChartData] = useState(null);
  
  const { user, paymentStatus, deductCredit } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!paymentStatus.hasPaid) {
      showToast('error', 'Please unlock predictions first');
      navigate('/chart');
      return;
    }

    if (paymentStatus.credits <= 0) {
      showToast('error', 'No credits remaining');
      navigate('/chart');
      return;
    }

    // Load initial chart data
    loadChartData();
  }, []);

  const loadChartData = async () => {
    try {
      const data = await api.getCoinPrices(coin, 100);
      setChartData(data);
    } catch (error) {
      console.error('Failed to load chart data:', error);
    }
  };

  const handleGetPrediction = async () => {
    if (!user || !paymentStatus.hasPaid || paymentStatus.credits <= 0) {
      showToast('error', 'Cannot make prediction');
      return;
    }

    setAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress (10-15 seconds as per backend)
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 300);

    try {
      const result = await api.getPrediction(user.id, coin);
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      // Wait a bit for smooth transition
      setTimeout(() => {
        setPrediction(result);
        setAnalyzing(false);
        deductCredit();
        showToast('success', 'Prediction complete!');
      }, 500);

    } catch (error) {
      clearInterval(progressInterval);
      setAnalyzing(false);
      showToast('error', error.message || 'Prediction failed');
    }
  };

  const handleNewPrediction = () => {
    setPrediction(null);
    setAnalyzing(false);
    setAnalysisProgress(0);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-crypto-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">AI Prediction Analysis</h1>
            <p className="text-gray-400 mt-2">
              Analyzing {coin} market data for {interval} timeframe
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="glass-effect rounded-xl px-4 py-2">
              <div className="text-sm">Credits: <span className="font-bold text-crypto-green">{paymentStatus.credits}</span></div>
            </div>
            <button
              onClick={() => navigate('/chart')}
              className="px-4 py-2 rounded-lg bg-crypto-darker border border-crypto-border hover:border-crypto-green transition-colors"
            >
              Back to Chart
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2">

            {/* Analysis Section */}
            <div className="chart-container border-2 p-6">
              {analyzing ? (
                <AnalysisLoader progress={analysisProgress} />
              ) : prediction ? (
                <PredictionResult 
                  prediction={prediction}
                  onNewPrediction={handleNewPrediction}
                />
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-crypto-green/20 to-crypto-blue/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-crypto-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Ready for Analysis</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Get AI-powered prediction for {coin} based on technical analysis and market data.
                  </p>
                  <button
                    onClick={handleGetPrediction}
                    className="btn-primary px-8 py-4 text-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className='text-slate-900'>Start AI Analysis (1 Credit)</span>
                    </div>
                  </button>
                  <p className="text-sm text-gray-500 mt-4">
                    Analysis takes 10-15 seconds
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Info Panel */}
          <div className="space-y-6">
            {/* Current Stats */}
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Current Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-crypto-darker/50">
                  <span className="text-gray-400">Selected Coin</span>
                  <span className="font-bold text-white">{coin}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-crypto-darker/50">
                  <span className="text-gray-400">Timeframe</span>
                  <span className="font-bold text-white">{interval}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-crypto-darker/50">
                  <span className="text-gray-400">Analysis Duration</span>
                  <span className="font-bold text-crypto-green">10-15s</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-crypto-darker/50">
                  <span className="text-gray-400">Credits Required</span>
                  <span className="font-bold text-crypto-green">1</span>
                </div>
              </div>
            </div>

            {/* Analysis Tips */}
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Analysis Includes</h3>
              <ul className="space-y-3">
                {[
                  'RSI (Relative Strength Index)',
                  'Moving Average Analysis',
                  'Support & Resistance Levels',
                  'Volume Profile',
                  'Market Sentiment',
                  'AI Pattern Recognition'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-crypto-green"></div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/history')}
                  className="w-full py-3 rounded-lg bg-crypto-darker border border-crypto-border hover:border-crypto-blue transition-colors text-left px-4"
                >
                  <div className="flex items-center justify-between">
                    <span>View Prediction History</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/chart')}
                  className="w-full py-3 rounded-lg bg-crypto-darker border border-crypto-border hover:border-crypto-green transition-colors text-left px-4"
                >
                  <div className="flex items-center justify-between">
                    <span>Change Coin/Interval</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;