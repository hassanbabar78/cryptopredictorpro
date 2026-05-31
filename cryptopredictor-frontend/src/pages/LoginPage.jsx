// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/UI/ToastProvider';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const LoginPage = () => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const result = await login(formData.name, formData.password);

    if (result.success) {
      showToast('success', 'Login successful! Welcome back.');
      
      // Show beautiful success animation
      setTimeout(() => {
        if (result.data.has_paid) {
          navigate('/dashboard');
        } else {
          navigate('/chart');
        }
      }, 1000);
    } else {
      showToast('error', result.error || 'Login failed. Please check your credentials.');
      setErrors({ general: result.error });
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Animated Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block p-3 rounded-full bg-gradient-to-r from-crypto-green/20 to-crypto-blue/20 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-crypto-green to-crypto-blue flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access your crypto predictions</p>
        </div>

        {/* Login Form */}
        <div className="glass-effect rounded-2xl p-8 shadow-2xl animate-slide-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-4 rounded-lg bg-red-900/30 border border-red-700/50">
                <p className="text-red-300 text-sm">{errors.general}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-crypto-darker border ${
                      errors.name ? 'border-red-500' : 'border-crypto-border'
                    } text-white focus:outline-none focus:ring-2 focus:ring-crypto-green/50 focus:border-transparent transition-all`}
                    placeholder="Enter your username"
                    disabled={loading}
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-crypto-darker border ${
                      errors.password ? 'border-red-500' : 'border-crypto-border'
                    } text-white focus:outline-none focus:ring-2 focus:ring-crypto-green/50 focus:border-transparent transition-all`}
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg font-semibold relative overflow-hidden group"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="sm" className="mr-2" />
                  Signing In...
                </div>
              ) : (
                <>
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-crypto-green transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </>
              )}
            </button>

            <div className="text-center pt-4 border-t border-crypto-border">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-crypto-green hover:text-crypto-teal font-medium transition-colors">
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-crypto-darker/50 rounded-full px-4 py-2">
            <span>Demo: testuser / test123</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;