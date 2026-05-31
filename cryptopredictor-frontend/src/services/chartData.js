export const processCandleData = (candles) => {
  if (!candles || !Array.isArray(candles)) return [];
  
  return candles.map(candle => ({
    time: candle.time,
    open: parseFloat(candle.open),
    high: parseFloat(candle.high),
    low: parseFloat(candle.low),
    close: parseFloat(candle.close),
    volume: parseFloat(candle.volume) || 0,
  })).sort((a, b) => a.time - b.time);
};

export const calculateIndicators = (candles) => {
  if (!candles || candles.length < 14) return {};

  // Simple RSI calculation
  let gains = 0;
  let losses = 0;
  
  for (let i = 1; i <= 14; i++) {
    const change = candles[candles.length - i].close - candles[candles.length - i - 1].close;
    if (change > 0) {
      gains += change;
    } else {
      losses += Math.abs(change);
    }
  }

  const avgGain = gains / 14;
  const avgLoss = losses / 14 || 1;
  const rs = avgGain / avgLoss;
  const rsi = 100 - (100 / (1 + rs));

  // Simple Moving Average (SMA)
  const smaPeriod = 20;
  const recentPrices = candles.slice(-smaPeriod).map(c => c.close);
  const sma = recentPrices.reduce((sum, price) => sum + price, 0) / smaPeriod;

  return {
    rsi,
    sma,
    isOverbought: rsi > 70,
    isOversold: rsi < 30,
    trend: candles[candles.length - 1].close > sma ? 'bullish' : 'bearish',
  };
};

export const generateMockCandles = (count = 100) => {
  const candles = [];
  let price = 1000;
  const now = Date.now();
  const interval = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

  for (let i = 0; i < count; i++) {
    const time = now - (count - i - 1) * interval;
    const change = (Math.random() - 0.5) * 50;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 20;
    const low = Math.min(open, close) - Math.random() * 20;
    const volume = 100 + Math.random() * 900;

    candles.push({
      time,
      open,
      high,
      low,
      close,
      volume,
    });

    price = close;
  }

  return candles;
};