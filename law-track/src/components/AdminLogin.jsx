import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';

// Configure Axios instance for API requests
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: BASE_URL,
});

const AdminLogin = () => {
  const [action, setAction] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      if (action === 'Login') {
        await handleLogin();
      } else if (action === 'Sign Up') {
        await handleSignUp();
      } else if (action === 'Forgot Password') {
        await handlePasswordReset();
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Operation failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await client.post(`${BASE_URL}/api/api/login/`, { email, password });
      if (response.status === 200) {
        setMessage('Login successful!');
        navigate('/admin-dashboard'); // Navigate to desired page after successful login
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setMessage('Login failed. Please check your credentials.');
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await client.post(`${BASE_URL}/api/api.users`, { username: name, email, password });
      if (response.status === 201) {
        setMessage('Registration successful!');
        setAction('Login'); // Automatically switch to login after successful signup
      } else {
        setMessage('Registration failed. Please check your details.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      setMessage('Registration failed. Please check your details.');
    }
  };

  const handlePasswordReset = async () => {
    try {
      const response = await client.post(`${BASE_URL}/api/api/reset-password/`, { email: resetEmail, newPassword, confirmPassword });
      if (response.status === 200) {
        setMessage('Password reset request successful!');
      } else {
        setMessage('Password reset request failed.');
      }
    } catch (error) {
      console.error('Password Reset Error:', error);
      setMessage('Password reset request failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('src/assets/criminal  litigation.webp')`}}>
      <div className="bg-white bg-opacity-80 shadow-lg rounded-lg px-6 pt-6 pb-8 mb-4 w-full max-w-md sm:px-8 sm:pt-8 sm:pb-10">
        <div className="text-2xl font-bold mb-4 text-center text-gray-800 sm:text-3xl">{action}</div>
        <div className="mb-6">
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        {message && <div className="text-red-500 mb-4 text-center">{message}</div>}
        {action === 'Forgot Password' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="resetEmail"
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="input-field focus:ring-blue-500 focus:border-blue-500 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-field focus:ring-blue-500 focus:border-blue-500 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field focus:ring-blue-500 focus:border-blue-500 w-full"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full focus:outline-none shadow-md"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Reset Password'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {action === 'Login' ? (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field focus:ring-blue-500 focus:border-blue-500 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field focus:ring-blue-500 focus:border-blue-500 w-full"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field focus:ring-blue-500 focus:border-blue-500 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field focus:ring-blue-500 focus:border-blue-500 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field focus:ring-blue-500 focus:border-blue-500 w-full"
                    required
                  />
                </div>
              </>
            )}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full focus:outline-none shadow-md"
                disabled={loading}
              >
                {loading ? 'Processing...' : action}
              </button>
            </div>
          </form>
        )}
        <div className="flex items-center justify-center mt-4">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setAction(action === 'Forgot Password' ? 'Login' : 'Forgot Password')}
          >
            {action === 'Forgot Password' ? 'Back to Login' : 'Forgot Password?'}
          </button>
          {action === 'Login' && (
            <button
              className="text-blue-500 hover:underline ml-4"
              onClick={() => setAction('Sign Up')}
            >
              Sign Up
            </button>
          )}
          {action === 'Sign Up' && (
            <button
              className="text-blue-500 hover:underline ml-4"
              onClick={() => setAction('Login')}
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
