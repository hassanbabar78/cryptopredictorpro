

export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',  // Your FastAPI backend
  WS_URL: 'ws://localhost:8765',      // Your WebSocket server
  TIMEOUT: 30000,                     // 30 second timeout
};

export const CRYPTO_COINS = [
  { symbol: 'BTC', name: 'Bitcoin', color: '#f7931a' },
  { symbol: 'ETH', name: 'Ethereum', color: '#627eea' },
  { symbol: 'SOL', name: 'Solana', color: '#00ffa3' },
  { symbol: 'BNB', name: 'Binance Coin', color: '#f0b90b' },
  { symbol: 'XRP', name: 'Ripple', color: '#23292f' },
  { symbol: 'DOGE', name: 'Dogecoin', color: '#c2a633' },
  { symbol: 'ADA', name: 'Cardano', color: '#0033ad' },
  { symbol: 'MATIC', name: 'Polygon', color: '#8247e5' },
];

export const TIME_INTERVALS = [
  { value: '4h', label: '4 Hours' },
  { value: '1d', label: '1 Day' },
  { value: '1w', label: '1 Week' },
];

export const PREDICTION_SIGNALS = {
  BUY: { color: '#00ff88', label: 'Buy', icon: '📈' },
  SELL: { color: '#ff4d4d', label: 'Sell', icon: '📉' },
  HOLD: { color: '#f0b90b', label: 'Hold', icon: '⚖️' },
};

export const PAYMENT_CONFIG = {
  AMOUNT_SOL: 1,
  CREDITS_GRANTED: 50,
  NETWORK: 'Solana Devnet',
  WALLET_ADDRESS: 'VqhmcMjsoW185gzvuQPUJXEVZiSEadCHKqSdr1YzKru', // From your backend
  SOLANA_RPC_URL: 'https://api.devnet.solana.com',
};