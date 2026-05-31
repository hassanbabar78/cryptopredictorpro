import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const loadPaymentInfo = async () => {
    try {
      const appInfo = await api.getAppInfo();
      setPaymentInfo(appInfo.payment);
      return appInfo.payment;
    } catch (error) {
      console.error('Failed to load payment info:', error);
      return null;
    }
  };

  const verifyTransaction = async (userId, txHash) => {
    setVerifying(true);
    setVerificationResult(null);
    
    try {
      // First check the transaction
      const checkResult = await api.checkTransaction(txHash);
      
      if (!checkResult.verification.verified) {
        setVerificationResult({
          success: false,
          message: checkResult.verification.reason || 'Transaction verification failed',
        });
        setVerifying(false);
        return { success: false, result: checkResult };
      }
      
      // Then verify payment
      const verifyResult = await api.verifyPayment(userId, txHash);
      
      setVerificationResult({
        success: verifyResult.success,
        message: verifyResult.message || verifyResult.reason,
        data: verifyResult,
      });
      
      setVerifying(false);
      return { success: verifyResult.success, result: verifyResult };
      
    } catch (error) {
      console.error('Payment verification error:', error);
      setVerificationResult({
        success: false,
        message: error.message || 'Verification failed',
      });
      setVerifying(false);
      return { success: false, error: error.message };
    }
  };

  const clearVerification = () => {
    setVerificationResult(null);
  };

  const value = {
    paymentInfo,
    verifying,
    verificationResult,
    loadPaymentInfo,
    verifyTransaction,
    clearVerification,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};