

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
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
      // Navigate based on payment status
      if (result.data.has_paid) {
        navigate('/dashboard');
      } else {
        navigate('/chart');
      }
    } else {
      setErrors({ general: result.error || 'Login failed' });
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h2>
        <p className="text-gray-400">Sign in to access your predictions</p>
      </div>

      <div className="bg-crypto-darker rounded-xl p-8 border border-crypto-border">
        {errors.general && (
          <div className="mb-6 p-3 rounded-lg bg-red-900/30 border border-red-700/50">
            <p className="text-red-300 text-sm">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
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
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-crypto-darker/50 border ${
                  errors.name ? 'border-red-500' : 'border-crypto-border'
                } text-white focus:outline-none focus:ring-2 focus:ring-crypto-green/50 focus:border-transparent transition-colors`}
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Password Field */}
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
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-crypto-darker/50 border ${
                  errors.password ? 'border-red-500' : 'border-crypto-border'
                } text-white focus:outline-none focus:ring-2 focus:ring-crypto-green/50 focus:border-transparent transition-colors`}
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Demo Credentials */}
          <div className="p-3 rounded-lg bg-crypto-darker/30 border border-crypto-border">
            <p className="text-sm text-gray-400">
              <span className="font-medium">Demo:</span> testuser / test123
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-lg font-semibold relative overflow-hidden group"
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

          {/* Sign Up Link */}
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
    </div>
  );
};

export default LoginForm;