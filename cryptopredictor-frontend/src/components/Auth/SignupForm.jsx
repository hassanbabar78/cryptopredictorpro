

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupData, setSignupData] = useState(null);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Username is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Username must be at least 3 characters';
    } else if (formData.name.length > 20) {
      newErrors.name = 'Username must be less than 20 characters';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    
    const result = await signup(formData.name, formData.password);
    
    if (result.success) {
      setSignupSuccess(true);
      setSignupData(result.data);
      // Auto-login after successful signup
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setErrors({ general: result.error || 'Signup failed' });
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  if (signupSuccess && signupData) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-crypto-green to-crypto-blue flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Account Created!</h2>
          <p className="text-gray-400">Your user ID has been generated</p>
        </div>

        <div className="bg-crypto-darker rounded-xl p-8 border border-crypto-border">
          <div className="space-y-6">
            {/* User Info */}
            <div className="p-4 rounded-lg bg-crypto-darker/50 border border-crypto-border">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">User ID:</span>
                  <span className="font-mono text-crypto-green">{signupData.user_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Username:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-crypto-darker to-crypto-darker/50 border border-crypto-border">
              <h3 className="font-bold text-lg mb-3">Next Steps</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">To unlock predictions, send 1 SOL to:</p>
                <div className="p-2 rounded bg-crypto-darker border border-crypto-border font-mono text-xs break-all">
                  {signupData.payment_address}
                </div>
                <p className="text-gray-400 text-xs">
                  You'll be redirected to login in a few seconds...
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigator.clipboard.writeText(signupData.user_id)}
                className="w-full py-3 rounded-lg bg-crypto-darker border border-crypto-border hover:border-crypto-green transition-colors"
              >
                Copy User ID
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(signupData.payment_address)}
                className="w-full py-3 rounded-lg bg-crypto-darker border border-crypto-border hover:border-crypto-blue transition-colors"
              >
                Copy Wallet Address
              </button>
              <Link
                to="/login"
                className="block w-full py-3 rounded-lg btn-primary text-center"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Create Account</h2>
        <p className="text-gray-400">Start your crypto prediction journey</p>
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
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-crypto-darker/50 border ${
                errors.name ? 'border-red-500' : 'border-crypto-border'
              } text-white focus:outline-none focus:ring-2 focus:ring-crypto-green/50 focus:border-transparent transition-colors`}
              placeholder="Choose a username (3-20 chars)"
              disabled={loading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-crypto-darker/50 border ${
                errors.password ? 'border-red-500' : 'border-crypto-border'
              } text-white focus:outline-none focus:ring-2 focus:ring-crypto-green/50 focus:border-transparent transition-colors`}
              placeholder="At least 6 characters"
              disabled={loading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-crypto-darker/50 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-crypto-border'
              } text-white focus:outline-none focus:ring-2 focus:ring-crypto-green/50 focus:border-transparent transition-colors`}
              placeholder="Re-enter your password"
              disabled={loading}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms Info */}
          <div className="p-3 rounded-lg bg-crypto-darker/30 border border-crypto-border">
            <p className="text-sm text-gray-400">
              By signing up, you agree to our terms. This is a demonstration project.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-lg font-semibold"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="sm" className="mr-2" />
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Login Link */}
          <div className="text-center pt-4 border-t border-crypto-border">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-crypto-green hover:text-crypto-teal font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;