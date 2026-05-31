import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSignupSuccess = () => {
    setIsLogin(true); // Switch to login form after successful signup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-lg text-white ${isLogin ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg text-white ${!isLogin ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? <LoginForm /> : <SignupForm onSignupSuccess={handleSignupSuccess} />}
      </div>
    </div>
  );
};

export default AuthPage;
