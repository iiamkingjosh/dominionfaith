'use client';

import { useState } from 'react';

export default function HighImpact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted!');
    // Handle form submission
  };

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">High Impact</h1>

      <section className="mb-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">What to Expect</h2>
        <p className="text-lg max-w-2xl mx-auto">
          High Impact is our dynamic service designed for spiritual growth and community building. Experience powerful worship, inspiring messages, and connect with like-minded believers.
        </p>
      </section>

      <section className="mb-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">Service Times</h2>
        <p className="text-lg">Sundays at 10:00 AM and 6:00 PM</p>
        <p className="text-lg">Main Auditorium</p>
      </section>

      <section className="mb-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">How to Join</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Simply fill out the first-timer form below, and we'll welcome you with open arms. No prior experience required.
        </p>
      </section>

      <section className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">First-Timer Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Join High Impact
          </button>
        </form>
      </section>
    </main>
  );
}