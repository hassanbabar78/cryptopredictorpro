

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChartProvider } from './context/ChartContext';
import { PaymentProvider } from './context/PaymentContext';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChartPage from './pages/ChartPage'; 
import PredictionPage from './pages/PredictionPage';
import HistoryPage from './pages/HistoryPage';
import ToastProvider from './components/UI/ToastProvider';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ChartProvider>
          <PaymentProvider>
            <ToastProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />

                <Route path="/chart" element={
                  <ProtectedRoute>
                    <ChartPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/predict" element={
                  <ProtectedRoute requirePayment>
                    <PredictionPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/history" element={
                  <ProtectedRoute requirePayment>
                    <HistoryPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </ToastProvider>
          </PaymentProvider>
        </ChartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;