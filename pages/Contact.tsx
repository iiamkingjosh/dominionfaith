import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from 'lucide-react';
import { addToCollection } from '../lib/firebase';
import { usePageContent } from '../lib/usePageContent';

export default function Contact() {
  const pc = usePageContent('contact', {
    hero_title: 'Contact Us',
    hero_subtitle: "We'd Love to Hear From You",
    hero_description: 'Reach out, ask a question, or visit us. Our doors and hearts are always open.',
    hero_bg_image: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1600',
    contact_address: '1 Dominion Avenue, Onireke, Opposite Ojo Military Cantonment',
    contact_address_sub: 'Lagos, Nigeria',
    contact_phone: '+234 703 454 3971',
    contact_phone_hours: 'Mon – Sat, 8am – 6pm',
    contact_email: 'info@dfim.org',
    contact_email_note: 'We reply within 24 hours',
    contact_service_times: 'Sun: 7am & 10am',
    contact_service_times_sub: 'Wed & Fri: 5pm',
  });
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [firstTimer, setFirstTimer] = useState({ full_name: '', email: '', phone: '', address: '', how_you_heard: '', prayer_request: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ftSubmitting, setFtSubmitting] = useState(false);
  const [ftSubmitted, setFtSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [ftError, setFtError] = useState('');
  const [activeTab, setActiveTab] = useState<'contact' | 'first-timer'>('contact');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFtChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFirstTimer(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await addToCollection('contact_submissions', form);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFtSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstTimer.full_name || !firstTimer.email || !firstTimer.phone) {
      setFtError('Please fill in all required fields.');
      return;
    }
    setFtSubmitting(true);
    setFtError('');
    try {
      await addToCollection('first_timer_submissions', firstTimer);
      setFtSubmitted(true);
    } catch {
      setFtError('Something went wrong. Please try again.');
    } finally {
      setFtSubmitting(false);
    }
  };

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-shadow';

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section
        className="relative py-32"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 100%), url('${pc.hero_bg_image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">{pc.hero_subtitle}</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">{pc.hero_title}</h1>
          <p className="text-gray-300 text-xl leading-relaxed">
            {pc.hero_description}
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, label: 'Address', value: pc.contact_address, sub: pc.contact_address_sub },
              { icon: Phone, label: 'Phone', value: pc.contact_phone, sub: pc.contact_phone_hours },
              { icon: Mail, label: 'Email', value: pc.contact_email, sub: pc.contact_email_note },
              { icon: Clock, label: 'Service Times', value: pc.contact_service_times, sub: pc.contact_service_times_sub },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
                <item.icon size={22} className="text-amber-500 mb-3" />
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="font-semibold text-slate-900">{item.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Tab toggle */}
          <div className="flex gap-2 bg-gray-100 rounded-2xl p-1.5 mb-10">
            {(['contact', 'first-timer'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-slate-700'
                }`}
              >
                {t === 'contact' ? 'Send a Message' : "I'm a First-Timer"}
              </button>
            ))}
          </div>

          {/* Contact Form */}
          {activeTab === 'contact' && (
            submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className={inputCls} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className={inputCls} placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputCls} placeholder="+234..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange} className={inputCls}>
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Prayer Request">Prayer Request</option>
                      <option value="Counselling">Counselling</option>
                      <option value="Partnerships">Partnerships</option>
                      <option value="Volunteer">I Want to Volunteer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} className={`${inputCls} resize-none`} placeholder="How can we help you?" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-900 font-bold rounded-xl transition-colors">
                  <Send size={18} /> {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )
          )}

          {/* First Timer Form */}
          {activeTab === 'first-timer' && (
            ftSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome to the Family!</h3>
                <p className="text-gray-600">We are so glad you're here. Someone from our team will reach out to you soon.</p>
              </div>
            ) : (
              <div>
                <div className="bg-amber-50 rounded-2xl p-6 mb-8 border border-amber-100">
                  <h3 className="font-bold text-slate-900 text-xl mb-2">Welcome, First-Timer!</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We are thrilled you visited DFIM for the first time. Fill out this short form and a member of our team will reach out to welcome you and help you connect with our community.
                  </p>
                </div>
                <form onSubmit={handleFtSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                      <input type="text" name="full_name" value={firstTimer.full_name} onChange={handleFtChange} className={inputCls} placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                      <input type="email" name="email" value={firstTimer.email} onChange={handleFtChange} className={inputCls} placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                      <input type="tel" name="phone" value={firstTimer.phone} onChange={handleFtChange} className={inputCls} placeholder="+234..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">How did you hear about us?</label>
                      <select name="how_you_heard" value={firstTimer.how_you_heard} onChange={handleFtChange} className={inputCls}>
                        <option value="">Select an option</option>
                        <option value="Friend / Family">Friend / Family</option>
                        <option value="Social Media">Social Media</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Flyer / Poster">Flyer / Poster</option>
                        <option value="Google / Website">Google / Website</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Address</label>
                    <input type="text" name="address" value={firstTimer.address} onChange={handleFtChange} className={inputCls} placeholder="Your residential address" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Prayer Request (Optional)</label>
                    <textarea name="prayer_request" value={firstTimer.prayer_request} onChange={handleFtChange} rows={3} className={`${inputCls} resize-none`} placeholder="Share a prayer request if you'd like..." />
                  </div>
                  {ftError && <p className="text-red-500 text-sm">{ftError}</p>}
                  <button type="submit" disabled={ftSubmitting} className="w-full flex items-center justify-center gap-2 py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-900 font-bold rounded-xl transition-colors">
                    <CheckCircle size={18} /> {ftSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
