/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-[#010d78] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>
        <form>
          {/* Full Name Field */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              placeholder="John Doe"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="john.doe@example.com"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="******"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Register
            </button>
            <Link to="/"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;