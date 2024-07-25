import React, { useState } from 'react';
import axios from 'axios';
import lawFirmImage from '../assets/topp jet.jpg'; // Adjust path as needed

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    assigned_lawyers_ids: [], // Initialize assigned_lawyers_ids as an empty array
  });
  const [submitting, setSubmitting] = useState(false); // Track submission status
  const [submissionError, setSubmissionError] = useState(null); // Track submission errors
  const [submitted, setSubmitted] = useState(false); // Track submission success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLawyersChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      assigned_lawyers_ids: value.split(',').map(id => id.trim()), // Convert comma-separated IDs to an array
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Start submission process

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/contact/', formData); // Use formData here
      console.log('Form data submitted:', response.data);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
        assigned_lawyers_ids: [],
      });
      setSubmissionError(null);
      setSubmitted(true); // Set submitted to true
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionError('Failed to submit form. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col md:flex-row">
      {/* Left Column - Image */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0 flex items-center justify-center">
        <img className="w-full h-auto rounded-lg shadow-md" src={lawFirmImage} alt="Law Firm" />
      </div>

      {/* Right Column - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <section className="contact-us-form max-w-lg w-full text-center bg-white bg-opacity-75 shadow-xl p-8 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Contact Us</h1>
          <p className="text-base md:text-lg mb-8 text-gray-700">
            Have any questions or need a consultation? Fill out the form below to get in touch with us.
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label htmlFor="name" className="block text-left font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-left font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-left font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="assigned_lawyers_ids" className="block text-left font-medium text-gray-700">
                  Assigned Lawyer IDs (comma-separated)
                </label>
                <input
                  type="text"
                  id="assigned_lawyers_ids"
                  name="assigned_lawyers_ids"
                  value={formData.assigned_lawyers_ids.join(', ')}
                  onChange={handleLawyersChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
              {submissionError && (
                <p className="text-red-500 mt-2">{submissionError}</p>
              )}
            </form>
          ) : (
            <div className="text-center">
              <p className="text-green-600 text-2xl">Thank you for contacting us!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
