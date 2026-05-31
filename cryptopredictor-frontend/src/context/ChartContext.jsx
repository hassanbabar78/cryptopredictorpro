import React, { createContext, useState, useContext, useCallback } from 'react';
import websocket from '../services/websocket';
import { processCandleData } from '../services/chartData';

const ChartContext = createContext();

export const useChart = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a ChartProvider');
  }
  return context;
};

export const ChartProvider = ({ children }) => {
  const [chartData, setChartData] = useState(null);
  const [currentCoin, setCurrentCoin] = useState('BTC');
  const [currentInterval, setCurrentInterval] = useState('4h');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const subscribeToChart = useCallback((coin, interval, onData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Store current selections
      setCurrentCoin(coin);
      setCurrentInterval(interval);
      
      // Connect WebSocket if not connected
      if (!websocket.isConnected()) {
        websocket.connect();
      }
      
      // Subscribe to chart data
      websocket.subscribe(coin, interval);
      
      // Set up message handlers
      const handleCandleData = (data) => {
        if (data.type === 'candles' || data.type === 'update') {
          const processedData = processCandleData(data.candles || []);
          setChartData({
            ...data,
            candles: processedData,
            coin: data.coin || coin,
            interval: data.interval || interval,
          });
          
          if (onData) {
            onData({ ...data, candles: processedData });
          }
          
          setIsLoading(false);
        }
      };
      
      websocket.on('candles', handleCandleData);
      websocket.on('update', handleCandleData);
      
      // Set up error handler
      const handleError = (errorData) => {
        console.error('Chart WebSocket error:', errorData);
        setError('Failed to load chart data');
        setIsLoading(false);
      };
      
      websocket.on('error', handleError);
      
      // Return cleanup function
      return () => {
        websocket.off('candles', handleCandleData);
        websocket.off('update', handleCandleData);
        websocket.off('error', handleError);
      };
      
    } catch (error) {
      console.error('Failed to subscribe to chart:', error);
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  const unsubscribeFromChart = useCallback((coin, interval) => {
    try {
      websocket.unsubscribe(coin, interval);
    } catch (error) {
      console.error('Failed to unsubscribe from chart:', error);
    }
  }, []);

  const clearChartData = useCallback(() => {
    setChartData(null);
    setError(null);
  }, []);

  const refreshChart = useCallback(() => {
    if (currentCoin && currentInterval) {
      subscribeToChart(currentCoin, currentInterval);
    }
  }, [currentCoin, currentInterval, subscribeToChart]);

  const value = {
    chartData,
    currentCoin,
    currentInterval,
    isLoading,
    error,
    subscribeToChart,
    unsubscribeFromChart,
    clearChartData,
    refreshChart,
    setCurrentCoin,
    setCurrentInterval,
  };

  return (
    <ChartContext.Provider value={value}>
      {children}
    </ChartContext.Provider>
  );
};