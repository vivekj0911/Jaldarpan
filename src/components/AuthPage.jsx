import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

function AuthPage() {
  const [activeTab, setActiveTab] = useState('sign-up');

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg mt-6 mb-6 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 my-2">
          <h2 className="text-2xl font-bold mb-2">Ground Water Monitoring</h2>
          <p className="text-gray-600 mb-6">Sign up or log in to access the system</p>
          <div className="flex mb-4">
            <button
              className={`flex-1 py-2 px-4 text-center ${
                activeTab === 'sign-up' ? 'bg-cyan-700 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('sign-up')}
            >
              Sign Up
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${
                activeTab === 'login' ? 'bg-cyan-700 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
          </div>
          {activeTab === 'sign-up' ? <SignUpForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

