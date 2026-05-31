import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserStatus } from '../../services/api';

const PaymentButton = () => {
  const navigate = useNavigate();

  const handleBuyClick = async () => {
    const userId = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage after login
    if (!userId) {
      alert('Please log in to initiate payment.');
      navigate('/'); // Redirect to login page if user not logged in
      return;
    }

    try {
      const userStatus = await getUserStatus(userId);
      if (userStatus.has_paid) {
        alert('You have already paid and unlocked predictions!');
        // Optionally, refresh dashboard or show credits
      } else {
        navigate('/payment', { state: { userStatus } });
      }
    } catch (error) {
      console.error("Error initiating payment process:", error);
      alert('Failed to retrieve payment status. Please try again.');
    }
  };

  return (
    <button
      className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-full shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-lg"
      onClick={handleBuyClick}
    >
      Unlock Predictions
    </button>
  );
};

export default PaymentButton;
