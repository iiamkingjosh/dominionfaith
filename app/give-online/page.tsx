'use client';

import { useState } from 'react';

export default function GiveOnline() {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('tithe');

  const handlePayment = () => {
    // Integrate Paystack or Flutterwave here
    alert(`Processing ${type} of $${amount}`);
  };

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Give Online</h1>

      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Type of Giving</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="tithe">Tithe</option>
            <option value="offering">Offering</option>
            <option value="special">Special Seeds</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter amount"
          />
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Give Now
        </button>
      </div>

      <section className="mt-16">
        <h2 className="text-3xl font-semibold text-center mb-6">Account Details</h2>
        <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg">
          <p><strong>Bank:</strong> Example Bank</p>
          <p><strong>Account Name:</strong> Dominion Faith International Ministry</p>
          <p><strong>Account Number:</strong> 1234567890</p>
          <p><strong>Swift Code:</strong> EXBKUS33</p>
        </div>
      </section>
    </main>
  );
}