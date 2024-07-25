import React, { useState } from 'react';
import axios from 'axios';
// import mpesaLogo from 'law-track/src/assets/mpesa.png'; // Adjust the path as needed

const Payment = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [accountReference, setAccountReference] = useState('');
  const [transactionDesc, setTransactionDesc] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();

    const paymentData = {
      phone_number: phoneNumber,
      amount: parseFloat(amount),
      account_reference: accountReference,
      transaction_desc: transactionDesc,
    };

    console.log('Sending payment data:', paymentData);

    try {
      const response = await axios.post('http://127.0.0.1:8000/mpesa/api/stk_push/', paymentData);
      console.log('Response from backend:', response.data);
      setResponseMessage(response.data.customer_message);
    } catch (error) {
      console.error('Payment error:', error.response ? error.response.data : error.message);
      setResponseMessage(error.response ? error.response.data.error : 'Payment failed. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="lg:w-1/2 flex justify-center mb-6 lg:mb-0">
          <img src="src/assets/mpesa img.jpg" alt="Mpesa Logo" className="h-85 w-auto" />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Mpesa Payment</h2>
          <form onSubmit={handlePayment}>
            <div className="mb-6">
              <label className="block text-lg text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-700 mb-2">Account Reference</label>
              <input
                type="text"
                value={accountReference}
                onChange={(e) => setAccountReference(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter account reference"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-700 mb-2">Transaction Description</label>
              <input
                type="text"
                value={transactionDesc}
                onChange={(e) => setTransactionDesc(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter transaction description"
                required
              />
            </div>
            <button type="submit" className="w-full p-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
              Pay Now
            </button>
          </form>
          {responseMessage && <p className={`mt-6 text-center ${responseMessage.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Payment;
