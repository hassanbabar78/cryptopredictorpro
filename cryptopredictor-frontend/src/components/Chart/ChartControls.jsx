import React, { useEffect } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import { CRYPTO_COINS, TIME_INTERVALS } from '../../utils/constants';

const ChartControls = ({ 
  selectedCoin, 
  selectedInterval, 
  onCoinChange, 
  onIntervalChange,
  showLiveData = true,
  showConnectionStatus = true
}) => {
  const { 
    isConnected, 
    subscribeToCrypto, 
    unsubscribeFromCrypto,
    isWebSocketConnected 
  } = useWebSocket();

  // Subscribe to WebSocket when coin/interval changes
  useEffect(() => {
    if (isWebSocketConnected && selectedCoin && selectedInterval) {
      // Unsubscribe from previous
      unsubscribeFromCrypto(selectedCoin, selectedInterval);
      
      // Subscribe to new
      subscribeToCrypto(selectedCoin, selectedInterval);
      
      console.log(` Subscribed to ${selectedCoin} ${selectedInterval}`);
    }

    return () => {
      if (selectedCoin && selectedInterval) {
        unsubscribeFromCrypto(selectedCoin, selectedInterval);
      }
    };
  }, [selectedCoin, selectedInterval, isWebSocketConnected]);

  const handleCoinSelect = (coin) => {
    onCoinChange(coin);
  };

  const handleIntervalSelect = (interval) => {
    onIntervalChange(interval);
  };

  // Get coin color for indicators
  const getCoinColor = (symbol) => {
    const coin = CRYPTO_COINS.find(c => c.symbol === symbol);
    return coin?.color || '#3b82f6';
  };

  return (
    <div className="bg-crypto-darker rounded-xl p-6 border border-crypto-border">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold gradient-text">Chart Controls</h2>
          <p className="text-gray-400 text-sm">Select coin and timeframe</p>
        </div>

        {/* Connection Status */}
        {showConnectionStatus && (
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
            isConnected 
              ? 'bg-crypto-green/20 text-crypto-green' 
              : 'bg-crypto-red/20 text-crypto-red'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-crypto-green animate-pulse' : 'bg-crypto-red'
            }`}></div>
            <span className="text-sm font-medium">
              {isConnected ? 'Live Data' : 'Disconnected'}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Coin Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-300">
              Select Cryptocurrency
            </label>
            <span className="text-xs text-gray-400">
              {CRYPTO_COINS.length} coins available
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1.5">
            {CRYPTO_COINS.map((coin) => {
              const isSelected = selectedCoin === coin.symbol;
              
              return (
                <button
                  key={coin.symbol}
                  onClick={() => handleCoinSelect(coin.symbol)}
                  className={`relative p-3 rounded-lg transition-all duration-300 ${
                    isSelected
                      ? 'ring-1 ring-offset-1 ring-offset-crypto-dark'
                      : 'hover:bg-crypto-darker/50'
                  }`}
                  style={{
                    backgroundColor: isSelected 
                      ? `${coin.color}20` 
                      : 'transparent',
                    border: isSelected 
                      ? `1px solid ${coin.color}` 
                      : '1px solid #374151',
                  }}
                >
                  <div className="flex flex-col items-center space-y-1">
                    {/* Coin Icon */}
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: coin.color }}
                    >
                      {coin.symbol.charAt(0)}
                    </div>
                    
                    {/* Coin Info */}
                    <div className="text-center">
                      <div className={`font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                        {coin.symbol}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {coin.name}
                      </div>
                    </div> {/* <div className="p-4 rounded-lg bg-crypto-darker/30 border border-crypto-border">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-crypto-yellow mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5" />
            </svg>
            <div>
              <p className="text-sm text-gray-300">
                
              </p>
            </div>
          </div>
        </div>
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-crypto-green"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interval Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-300">
              Select Timeframe
            </label>
            <span className="text-xs text-gray-400">
              Real-time {selectedInterval} candles
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {TIME_INTERVALS.map((interval) => {
              const isSelected = selectedInterval === interval.value;
              
              return (
                <button
                  key={interval.value}
                  onClick={() => handleIntervalSelect(interval.value)}
                  className={`px-5 py-2 rounded-lg transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-crypto-blue to-blue-500 text-white shadow-lg'
                      : 'bg-crypto-darker border border-crypto-border text-gray-300 hover:text-white hover:border-crypto-blue'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="font-bold">{interval.value}</div>
                    {/* <div className="text-xs opacity-80">{interval.label}</div> */}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Data Stats */}
        {showLiveData && (
          <div className="mt-3 pt-3 border-t border-crypto-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-crypto-green animate-pulse"></div>
                  <span className="text-sm text-gray-400">Live Data</span>
                </div>
              </div>
              
              <div className="text-right">
                {/* <div className="text-sm font-medium">
                  Currently viewing:
                </div> */}
                <div className="text-lg font-bold gradient-text">
                  {selectedCoin} • {selectedInterval}
                </div>
              </div>
            </div>
            
            {/* Additional Stats */}
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="text-center p-2 rounded bg-crypto-darker/50">
                <div className="text-xs text-gray-400">Updates</div>
                <div className="text-sm font-bold text-crypto-green">
                  Every 4h
                </div>
              </div>
              <div className="text-center p-2 rounded bg-crypto-darker/50">
                <div className="text-xs text-gray-400">Candles</div>
                <div className="text-sm font-bold">1000+</div>
              </div>
              <div className="text-center p-2 rounded bg-crypto-darker/50">
                <div className="text-xs text-gray-400">Source</div>
                <div className="text-sm font-bold">Binance</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartControls;