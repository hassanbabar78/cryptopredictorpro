import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { verifyPayment } from '../services/api';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentAddress, setPaymentAddress] = useState('');
  const [paymentExplorer, setPaymentExplorer] = useState('');
  const [txHash, setTxHash] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { user, updatePaymentStatus } = useAuth();
  const userId = user ? user.user_id : null;

  useEffect(() => {
    if (location.state && location.state.userStatus) {
      setPaymentAddress(location.state.userStatus.payment_address);
      setPaymentExplorer(location.state.userStatus.payment_explorer);
    } else if (userId) {
      // Fallback to fetch status if direct state is not available (e.g., page refresh)
      // This would require another API call to getUserStatus, which is not implemented here for brevity.
      // For a real app, you'd fetch user status again here if `location.state` is empty.
      setMessage('Please navigate from the dashboard to initiate payment correctly.');
    } else {
      navigate('/'); // Redirect to login if no user_id
    }
  }, [location.state, navigate, userId]);

  const handleVerifyPayment = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!userId) {
      setError('User not logged in.');
      return;
    }

    if (!txHash) {
      setError('Please enter a transaction hash.');
      return;
    }

    try {
      const response = await verifyPayment(userId, txHash);

      if (response.success) {
        setMessage(response.message);
        updatePaymentStatus(response.has_paid, response.total_credits);
        setTimeout(() => {
          navigate('/dashboard'); // Navigate back to dashboard on success
        }, 2000);
      } else {
        setError(response.reason || 'Payment verification failed.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during verification.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Complete Payment</h1>
        
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {paymentAddress ? (
          <div className="space-y-4">
            <p className="text-lg">Please send 1 SOL to the following address:</p>
            <div className="bg-gray-700 p-3 rounded-md break-all font-mono">
              {paymentAddress}
            </div>
            {paymentExplorer && (
              <p>
                <a href={paymentExplorer} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  View address on Solana Explorer
                </a>
              </p>
            )}

            <form onSubmit={handleVerifyPayment} className="space-y-4 mt-6">
              <div>
                <label htmlFor="txHash" className="block text-white text-sm font-bold mb-2">Transaction Hash:</label>
                <input
                  type="text"
                  id="txHash"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="Enter Solana transaction hash"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Verify Payment
              </button>
            </form>
          </div>
        ) : ( 
          <p className="text-center text-gray-400">No payment details available. Please go back to the dashboard.</p>
        )}

      </div>
    </div>
  );
};

export default PaymentPage;
