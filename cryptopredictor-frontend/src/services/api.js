
import { API_CONFIG } from '../utils/constants';

class CryptoAPI {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.cache = new Map();
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = JSON.stringify({ endpoint, options });
    
    if (options.method === 'GET' && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail?.message || error.detail || `HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (options.method === 'GET') {
        this.cache.set(cacheKey, data);
      }

      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // HEALTH & APP INFO 
  async healthCheck() {
    return this.request('/health');
  }

  async getAppInfo() {
    return this.request('/');
  }

  //  AUTHENTICATION 
  async signup(name, password) {
    return this.request('/signup', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
    });
  }

  async login(name, password) {
    // Your backend expects query parameters for login
    return this.request(`/login?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`, {
      method: 'POST',
    });
  }

  //  USER MANAGEMENT 
  async getUserStatus(userId) {
    return this.request(`/user/${userId}/status`);
  }

  //  PAYMENT 
  async verifyPayment(userId, txHash) {
    return this.request('/verify-payment', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, tx_hash: txHash }),
    });
  }

  async checkTransaction(txHash) {
    return this.request(`/check-transaction/${txHash}`);
  }

  //  PREDICTIONS 
  async getPrediction(userId, coin) {
    return this.request('/predict', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, coin: coin.toUpperCase() }),
    });
  }

  async getPredictionHistory(userId, limit = 20) {
    return this.request(`/predictions/${userId}?limit=${limit}`);
  }

  //  MARKET DATA 
  async getCoinPrices(coin, limit = 100) {
    return this.request(`/prices/${coin.toUpperCase()}?limit=${limit}`);
  }

  async getAllPrices() {
    return this.request('/all-prices');
  }

  async getCurrentPrice(coin) {
    return this.request(`/prices/${coin.toUpperCase()}?limit=1`);
  }

  //  ADDITIONAL ENDPOINTS FROM YOUR BACKEND 
  async signupUser(name, password) {
    return this.request('/signup', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
    });
  }

  async getPaymentAddress() {
    const appInfo = await this.getAppInfo();
    return appInfo.payment?.address || '';
  }

  async getUserCredits(userId) {
    const status = await this.getUserStatus(userId);
    return status.credits || 0;
  }

  async hasUserPaid(userId) {
    const status = await this.getUserStatus(userId);
    return status.has_paid || false;
  }

  //  TEST ENDPOINTS 
  async testAllEndpoints(userId, txHash) {
    try {
      const results = {};
      
      // Health check
      results.health = await this.healthCheck();
      
      // App info
      results.appInfo = await this.getAppInfo();
      
      if (userId) {
        // User status
        results.userStatus = await this.getUserStatus(userId);
        
        // Prediction history
        results.predictionHistory = await this.getPredictionHistory(userId, 5);
        
        // Test prediction (will fail if no credits)
        try {
          results.prediction = await this.getPrediction(userId, 'BTC');
        } catch (error) {
          results.prediction = { error: error.message };
        }
      }
      
      if (txHash) {
        // Transaction check
        results.transactionCheck = await this.checkTransaction(txHash);
      }
      
      // Market data
      results.btcPrices = await this.getCoinPrices('BTC', 10);
      
      return results;
    } catch (error) {
      console.error('Test endpoints failed:', error);
      throw error;
    }
  }

  //  CACHE MANAGEMENT 
  clearCache() {
    this.cache.clear();
  }

  clearEndpointCache(endpointPattern) {
    for (const [key] of this.cache) {
      try {
        const cacheData = JSON.parse(key);
        if (cacheData.endpoint.includes(endpointPattern)) {
          this.cache.delete(key);
        }
      } catch (e) {
        // Invalid JSON, delete it
        this.cache.delete(key);
      }
    }
  }
}

export default new CryptoAPI();