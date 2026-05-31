// import { useEffect, useState, useCallback } from 'react';
// import { connectWebSocket, sendMessage, subscribeToMessages, unsubscribeFromMessages, disconnectWebSocket } from '../services/websocket';

// export const useWebSocket = () => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [lastMessage, setLastMessage] = useState(null);

//   useEffect(() => {
//     const handleOpen = () => {
//       setIsConnected(true);
//     };

//     connectWebSocket(handleOpen);

//     return () => {
//       disconnectWebSocket();
//       setIsConnected(false);
//     };
//   }, []);

//   const sendWsMessage = useCallback((message) => {
//     sendMessage(message);
//   }, []);

//   const subscribe = useCallback((type, handler) => {
//     subscribeToMessages(type, handler);
//   }, []);

//   const unsubscribe = useCallback((type, handler) => {
//     unsubscribeFromMessages(type, handler);
//   }, []);

//   return { isConnected, sendWsMessage, subscribe, unsubscribe, lastMessage };
// };


import { useEffect, useState, useCallback, useRef } from 'react';
import websocket from '../services/websocket';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [error, setError] = useState(null);
  const handlersRef = useRef(new Map());

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      setError(null);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleError = (errorData) => {
      console.error('WebSocket error in hook:', errorData);
      setError(errorData);
    };

    const handleMessage = (data) => {
      setLastMessage(data);
    };

    // Connect and set up handlers
    websocket.connect();
    websocket.on('connect', handleConnect);
    websocket.on('disconnect', handleDisconnect);
    websocket.on('error', handleError);
    websocket.on('*', handleMessage);

    // Store handlers for cleanup
    handlersRef.current.set('connect', handleConnect);
    handlersRef.current.set('disconnect', handleDisconnect);
    handlersRef.current.set('error', handleError);
    handlersRef.current.set('*', handleMessage);

    return () => {
      // Clean up handlers
      handlersRef.current.forEach((handler, event) => {
        websocket.off(event, handler);
      });
      handlersRef.current.clear();
    };
  }, []);

  const sendMessage = useCallback((message) => {
    return websocket.send(message);
  }, []);

  const subscribe = useCallback((event, handler) => {
    websocket.on(event, handler);
    handlersRef.current.set(event, handler);
  }, []);

  const unsubscribe = useCallback((event, handler) => {
    websocket.off(event, handler);
    handlersRef.current.delete(event);
  }, []);

  const subscribeToCrypto = useCallback((coin, interval) => {
    return websocket.subscribe(coin, interval);
  }, []);

  const unsubscribeFromCrypto = useCallback((coin, interval) => {
    websocket.unsubscribe(coin, interval);
  }, []);

  const disconnect = useCallback(() => {
    websocket.disconnect();
    setIsConnected(false);
  }, []);

  return {
    isConnected,
    lastMessage,
    error,
    sendMessage,
    subscribe,
    unsubscribe,
    subscribeToCrypto,
    unsubscribeFromCrypto,
    disconnect,
    isWebSocketConnected: websocket.isConnected,
  };
};