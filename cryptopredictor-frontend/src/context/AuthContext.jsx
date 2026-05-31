

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState({
    hasPaid: false,
    credits: 0,
    walletAddress: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const navigate = useNavigate();

  const loadUserFromStorage = useCallback(() => {
    const userId = localStorage.getItem('crypto_user_id');
    const userName = localStorage.getItem('crypto_user_name');
    const hasPaid = localStorage.getItem('crypto_has_paid') === 'true';
    const credits = parseInt(localStorage.getItem('crypto_credits') || '0');
    
    if (userId && userName) {
      setUser({ id: userId, name: userName });
      setPaymentStatus(prev => ({
        ...prev,
        hasPaid,
        credits,
      }));
      setIsAuthenticated(true);
      return { id: userId, name: userName };
    }
    return null;
  }, []);

  useEffect(() => {
    const storedUser = loadUserFromStorage();
    
    if (storedUser?.id) {
      // Fetch fresh status from API
      api.getUserStatus(storedUser.id)
        .then(status => {
          setPaymentStatus({
            hasPaid: status.has_paid || false,
            credits: status.credits || 0,
            walletAddress: status.payment_address || '',
          });
          
          // Update localStorage
          localStorage.setItem('crypto_has_paid', status.has_paid || false);
          localStorage.setItem('crypto_credits', status.credits || 0);
        })
        .catch(error => {
          console.error('Failed to fetch user status:', error);
          // Keep stored values if API fails
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [loadUserFromStorage]);

  const login = async (name, password) => {
    try {
      const data = await api.login(name, password);
      
      localStorage.setItem('crypto_user_id', data.user_id);
      localStorage.setItem('crypto_user_name', data.name);
      localStorage.setItem('crypto_has_paid', data.has_paid || false);
      localStorage.setItem('crypto_credits', data.credits || 0);
      
      setUser({ id: data.user_id, name: data.name });
      setPaymentStatus({
        hasPaid: data.has_paid || false,
        credits: data.credits || 0,
        walletAddress: data.payment_address || '',
      });
      setIsAuthenticated(true);
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, password) => {
    try {
      const data = await api.signup(name, password);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('crypto_user_id');
    localStorage.removeItem('crypto_user_name');
    localStorage.removeItem('crypto_has_paid');
    localStorage.removeItem('crypto_credits');
    
    setUser(null);
    setPaymentStatus({
      hasPaid: false,
      credits: 0,
      walletAddress: '',
    });
    setIsAuthenticated(false);
    
    navigate('/login');
  };

  const updatePaymentStatus = async () => {
    if (!user?.id) return;
    
    try {
      const status = await api.getUserStatus(user.id);
      setPaymentStatus({
        hasPaid: status.has_paid || false,
        credits: status.credits || 0,
        walletAddress: status.payment_address || '',
      });
      
      localStorage.setItem('crypto_has_paid', status.has_paid || false);
      localStorage.setItem('crypto_credits', status.credits || 0);
      
      return { success: true, status };
    } catch (error) {
      console.error('Failed to update payment status:', error);
      return { success: false, error: error.message };
    }
  };

  const deductCredit = () => {
    setPaymentStatus(prev => {
      const newCredits = Math.max(0, prev.credits - 1);
      localStorage.setItem('crypto_credits', newCredits);
      return {
        ...prev,
        credits: newCredits,
      };
    });
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    paymentStatus,
    login,
    register,
    logout,
    updatePaymentStatus,
    deductCredit,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};