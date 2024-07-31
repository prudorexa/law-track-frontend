import React, { useState } from 'react';
import axios from 'axios';

// Support Page Component
const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      // Replace with your backend API endpoint
      await axios.post('http://127.0.0.1:8000/api/support/', formData);
      setStatus('Your request has been submitted successfully.');
    } catch (error) {
      console.error('Error submitting the support request:', error);
      setStatus('There was an error submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Support</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Contact Support</h2>
        <p className="text-gray-600 mb-4">
          If you need assistance or have any questions, please fill out the form below, and our support team will get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="subject" className="text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="border border-gray-300 p-2 rounded-lg"
            ></textarea>
          </div>

          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {status && (
          <div className={`mt-4 p-3 rounded-lg ${status.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {status}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Support Information</h2>
        <p className="text-gray-600">
          If you need immediate assistance, please contact our support team directly:
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Email:</strong> support@law firm.com
        </p>
        <p className="text-gray-600">
          <strong>Phone:</strong> +254-7 23831464
        </p>
        <p className="text-gray-600">
          <strong>Address:</strong> 123 Legal St., Suite 100, Lawtown, LT 12345
        </p>
      </section>
    </div>
  );
};

export default Support;
