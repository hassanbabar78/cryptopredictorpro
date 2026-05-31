import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, paymentStatus, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '' },
    { path: '/chart', label: 'Charts', icon: '' },
    { path: '/predict', label: 'Predict', icon: '', requiresPayment: true },
    { path: '/history', label: 'History', icon: '', requiresPayment: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-crypto-darker/80 backdrop-blur-lg border-b border-crypto-border sticky top-0 z-50 py-3">
      <div className="container mx-auto px-4 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-crypto-green to-crypto-blue flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">CryptoPredictor</h1>
              <p className="text-xs text-gray-400">AI-Powered Trading</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              if (item.requiresPayment && !paymentStatus.hasPaid) return null;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-crypto-green/20 text-crypto-green'
                      : 'text-gray-300 hover:text-white hover:bg-crypto-darker'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                {/* Credits Display */}
                <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-crypto-darker border border-crypto-border">
                  <div className="w-2 h-2 rounded-full bg-crypto-green animate-pulse"></div>
                  <span className="text-sm font-medium">
                    {paymentStatus.credits} Credits
                  </span>
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-400">
                      {paymentStatus.hasPaid ? 'Premium User' : 'Free Account'}
                    </p>
                  </div>
                  
                  <div className="relative group">
                    <button className="w-10 h-10 rounded-full bg-gradient-to-r from-crypto-blue to-crypto-purple flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-crypto-darker border border-crypto-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="p-3 border-b border-crypto-border">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">
                          ID: {user.id.substring(0, 8)}...
                        </p>
                      </div>
                      
                      <div className="p-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-crypto-darker/50 transition-colors"
                        >
                          <span></span>
                          <span>Dashboard</span>
                        </Link>
                        
                        {!paymentStatus.hasPaid && (
                          <Link
                            to="/chart"
                            className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-crypto-darker/50 transition-colors"
                          >
                            <span></span>
                            <span>Unlock Predictions</span>
                          </Link>
                        )}
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-3 py-2 rounded hover:bg-red-900/20 text-red-400 transition-colors"
                        >
                          <span></span>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-crypto-border hover:border-crypto-green transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-3 border-t border-crypto-border">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              if (item.requiresPayment && !paymentStatus.hasPaid) return null;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg ${
                    isActive(item.path)
                      ? 'text-crypto-green'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;