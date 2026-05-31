import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-crypto-darker/50 border-t border-crypto-border mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-crypto-green to-crypto-blue flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h3 className="text-lg font-bold gradient-text">CryptoPredictor Pro</h3>
                <p className="text-sm text-gray-400">AI-Powered Crypto Analysis</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Professional cryptocurrency prediction platform using advanced AI algorithms and technical analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-crypto-green transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/chart" className="text-gray-400 hover:text-crypto-green transition-colors">
                  Live Charts
                </Link>
              </li>
              <li>
                <Link to="/predict" className="text-gray-400 hover:text-crypto-green transition-colors">
                  AI Predictions
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-400 hover:text-crypto-green transition-colors">
                  History
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://explorer.solana.com/?cluster=devnet" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-crypto-green transition-colors"
                >
                  Solana Explorer
                </a>
              </li>
              <li>
                <a 
                  href="https://www.binance.com/en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-crypto-green transition-colors"
                >
                  Binance Exchange
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.solana.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-crypto-green transition-colors"
                >
                  Solana Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact/Support */}
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">For payment issues:</li>
              <li className="text-sm text-gray-500">
                Ensure you're on Solana Devnet
              </li>
              <li className="text-sm text-gray-500">
                Send exactly 1 SOL
              </li>
              <li className="text-sm text-gray-500">
                Check transaction on explorer
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-crypto-border mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} CryptoPredictor Pro. This is a demonstration project. Not financial advice.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Prices and data are for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;