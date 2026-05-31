import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { processCandleData, calculateIndicators } from '../services/chartData';

export const useChartData = (coin, interval = '4h') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [indicators, setIndicators] = useState(null);

  const fetchChartData = useCallback(async () => {
    if (!coin) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.getCoinPrices(coin, 100);
      const candles = processCandleData(response.history || []);
      const calculatedIndicators = calculateIndicators(candles);
      
      setData({
        ...response,
        candles,
        currentPrice: response.current_price,
      });
      
      setIndicators(calculatedIndicators);
    } catch (err) {
      console.error('Failed to fetch chart data:', err);
      setError(err.message || 'Failed to load chart data');
    } finally {
      setLoading(false);
    }
  }, [coin]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const refresh = useCallback(() => {
    fetchChartData();
  }, [fetchChartData]);

  return {
    data,
    loading,
    error,
    indicators,
    refresh,
  };
};