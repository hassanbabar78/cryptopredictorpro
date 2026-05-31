
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useChart } from '../context/ChartContext';
import Layout from '../components/Layout/Layout';
import CryptoChart from '../components/Chart/CryptoChart';
import ChartControls from '../components/Chart/ChartControls';
import PredictionButton from '../components/UI/PredictionButton';
import PaymentModal from '../components/Payment/PaymentModal';

const ChartPage = () => {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [selectedInterval, setSelectedInterval] = useState('4h');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const { user, paymentStatus } = useAuth();
  const { chartData, subscribeToChart } = useChart();
  const navigate = useNavigate();

  useEffect(() => {
    // Subscribe to WebSocket for live data
    subscribeToChart(selectedCoin, selectedInterval);
  }, [selectedCoin, selectedInterval]);

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Refresh payment status
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Crypto Predictor</h1>
        
        <ChartControls
          selectedCoin={selectedCoin}
          selectedInterval={selectedInterval}
          onCoinChange={setSelectedCoin}
          onIntervalChange={setSelectedInterval}
        />
        
        <div className="mt-6 ">
          <div className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <CryptoChart 
              data={chartData}
              coin={selectedCoin}
              interval={selectedInterval}
            />
          </div>
          
          {/* <div className="space-y-6">
            <div className="bg-crypto-darker rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Get Prediction</h3>
              <p className="text-gray-400 mb-4">
                Analyze {selectedCoin} on {selectedInterval} timeframe
              </p>
              
              <PredictionButton
                coin={selectedCoin}
                interval={selectedInterval}
                className="w-full py-3"
              />
              
              {!paymentStatus.hasPaid && user && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-crypto-purple to-blue-600 rounded-lg"
                >
                  Pay 1 SOL to Unlock
                </button>
              )}
            </div>
          </div> */}
        </div>
      </div>
      
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </Layout>
  );
};

export default ChartPage;