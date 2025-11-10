import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedAccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4">
      <div className="flex flex-col items-center text-center space-y-6">

        <h1 className="text-4xl font-bold">Unauthorized Access</h1>
        <p className="max-w-md text-slate-300">
          Oops! You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>

        <div className="flex space-x-4">
          <Link
            to="/"
            className="px-6 py-3 bg-primary-500 text-white rounded-lg shadow-lg hover:bg-primary-600 transition"
          >
            Back to Home
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-slate-700 text-white rounded-lg shadow-lg hover:bg-slate-600 transition"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
