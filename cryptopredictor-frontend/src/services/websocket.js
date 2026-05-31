

import { API_CONFIG } from '../utils/constants';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.handlers = new Map();
    this.subscriptions = new Set();
    this.pingInterval = null;
    this.reconnectTimeout = null;
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    try {
      this.ws = new WebSocket(API_CONFIG.WS_URL);

      this.ws.onopen = () => {
        console.log(' WebSocket Connected');
        this.reconnectAttempts = 0;
        this.restoreSubscriptions();
        this.startHeartbeat();
        this.emit('connect', { timestamp: Date.now() });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.emit(data.type || 'message', data);
        } catch (error) {
          console.error('WebSocket parse error:', error);
        }
      };

      this.ws.onclose = () => {
        console.log(' WebSocket Disconnected');
        this.stopHeartbeat();
        this.scheduleReconnect();
        this.emit('disconnect', { timestamp: Date.now() });
      };

      this.ws.onerror = (error) => {
        console.error(' WebSocket Error:', error);
        this.emit('error', error);
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    
    this.stopHeartbeat();
    this.subscriptions.clear();
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(message) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
      return true;
    }
    return false;
  }

  subscribe(coin, interval = '4h') {
    const subscription = {
      action: 'subscribe',
      coin: coin.toUpperCase(),
      interval: interval
    };
    
    const key = JSON.stringify(subscription);
    this.subscriptions.add(key);
    
    if (this.send(subscription)) {
      console.log(` Subscribed to ${coin} ${interval}`);
      return true;
    }
    return false;
  }

  unsubscribe(coin, interval = '4h') {
    const subscription = {
      action: 'unsubscribe',
      coin: coin.toUpperCase(),
      interval: interval
    };
    
    const key = JSON.stringify(subscription);
    this.subscriptions.delete(key);
    this.send(subscription);
    
    console.log(` Unsubscribed from ${coin} ${interval}`);
  }

  restoreSubscriptions() {
    this.subscriptions.forEach(subKey => {
      try {
        const subscription = JSON.parse(subKey);
        this.send(subscription);
        console.log(`Restored subscription: ${subscription.coin} ${subscription.interval}`);
      } catch (error) {
        console.error('Failed to restore subscription:', error);
      }
    });
  }

  scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log(' Max reconnection attempts reached');
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectTimeout = setTimeout(() => {
      this.reconnectAttempts++;
      console.log(` Reconnecting... Attempt ${this.reconnectAttempts}`);
      this.connect();
    }, delay);
  }

  startHeartbeat() {
    this.pingInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({ action: 'ping', timestamp: Date.now() });
      }
    }, 30000);
  }

  stopHeartbeat() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  on(event, handler) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event).add(handler);
  }

  off(event, handler) {
    if (this.handlers.has(event)) {
      this.handlers.get(event).delete(handler);
    }
  }

  emit(event, data) {
    if (this.handlers.has(event)) {
      this.handlers.get(event).forEach(handler => handler(data));
    }
    if (this.handlers.has('*')) {
      this.handlers.get('*').forEach(handler => handler({ event, data }));
    }
  }

  isConnected() {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export default new WebSocketService();
