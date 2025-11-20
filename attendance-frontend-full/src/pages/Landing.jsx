import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { user } = useAuth();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return null; // Will be handled by routing
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            📚 Attendance System
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Modern, Automated Attendance Management for Educational Institutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition duration-200 shadow-lg"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-200 shadow-lg border-2 border-white"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">📹</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Face Recognition
            </h3>
            <p className="text-gray-600">
              Automated attendance marking using advanced face recognition technology
            </p>
          </div>

          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Real-time Analytics
            </h3>
            <p className="text-gray-600">
              Track attendance patterns and generate comprehensive reports instantly
            </p>
          </div>

          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Role-based Access
            </h3>
            <p className="text-gray-600">
              Separate dashboards for teachers and students with appropriate permissions
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our System?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <p className="font-semibold">⚡ Fast & Efficient</p>
              <p className="text-sm text-blue-100">Mark attendance in seconds</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <p className="font-semibold">🔒 Secure & Private</p>
              <p className="text-sm text-blue-100">Your data is protected</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <p className="font-semibold">📱 Easy to Use</p>
              <p className="text-sm text-blue-100">Intuitive interface for everyone</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <p className="font-semibold">📈 Detailed Reports</p>
              <p className="text-sm text-blue-100">Comprehensive attendance analytics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black bg-opacity-30 text-white text-center py-6 mt-16">
        <p className="text-sm">
          © 2024 Attendance System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Landing;

