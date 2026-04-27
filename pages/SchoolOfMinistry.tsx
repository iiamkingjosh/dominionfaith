import { useState } from 'react';
import { BookOpen, Award, Users, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function SchoolOfMinistry() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', program: '', qualification: '', testimony: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const programs = [
    {
      title: 'Certificate in Biblical Studies',
      duration: '1 Year',
      level: 'Foundation',
      description: 'A foundational program covering Old and New Testament studies, systematic theology, and Christian living.',
      modules: ['Old Testament Survey', 'New Testament Survey', 'Systematic Theology', 'Christian Living', 'Prayer & Intercession'],
    },
    {
      title: 'Diploma in Ministry Leadership',
      duration: '2 Years',
      level: 'Intermediate',
      description: 'Designed for aspiring leaders, this program dives deep into church leadership, pastoral care, and ministry administration.',
      modules: ['Church Leadership Principles', 'Homiletics & Preaching', 'Pastoral Care', 'Church Administration', 'Evangelism & Missions'],
    },
    {
      title: 'Advanced Ministry Training',
      duration: '1 Year',
      level: 'Advanced',
      description: 'For experienced ministers ready to take their gifts and knowledge to the next level. Intensive and transformative.',
      modules: ['Advanced Theology', 'Prophetic Ministry', 'Church Planting', 'Mentorship Practicum', 'Leadership Capstone'],
    },
  ];

  const steps = [
    { step: '01', title: 'Download Application', desc: 'Fill and submit the registration form below.' },
    { step: '02', title: 'Interview', desc: 'Shortlisted applicants are invited for a brief interview.' },
    { step: '03', title: 'Acceptance Letter', desc: 'Successful candidates receive an acceptance letter.' },
    { step: '04', title: 'Enrollment', desc: 'Pay the required fees and collect your course materials.' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.program) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    const { error: dbError } = await supabase.from('school_registrations').insert([form]);
    setSubmitting(false);
    if (dbError) {
      setError('Something went wrong. Please try again.');
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section
        className="relative py-32"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(120,53,15,0.6) 100%), url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Equipping Ministers</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">School of Ministry</h1>
          <p className="text-gray-300 text-xl leading-relaxed">
            Where God's call meets professional training. Equipping you for effective Kingdom service.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Overview</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Why School of Ministry?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The School of Ministry exists to bridge the gap between divine calling and effective ministry execution. We believe that every minister deserves proper training — not just spiritual fervor, but sound biblical knowledge and practical ministry skills.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our curriculum has been crafted by experienced ministers with decades of practical ministry experience. Classes combine academic rigor with spiritual depth, and our graduates go on to plant churches, lead departments, and serve effectively in their spheres.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: BookOpen, label: 'Programs', value: '3 Levels' },
                  { icon: Award, label: 'Graduates', value: '200+' },
                  { icon: Users, label: 'Class Size', value: 'Small Groups' },
                  { icon: Clock, label: 'Duration', value: '1–2 Years' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                    <stat.icon size={22} className="text-amber-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">{stat.value}</p>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="School of Ministry"
              className="rounded-2xl shadow-2xl h-96 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Curriculum</span>
            <h2 className="text-4xl font-bold text-slate-900">Programs Offered</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <div key={prog.title} className={`rounded-2xl overflow-hidden shadow-sm border ${i === 1 ? 'border-amber-400 ring-2 ring-amber-400' : 'border-gray-100'} bg-white`}>
                {i === 1 && (
                  <div className="bg-amber-500 text-slate-900 text-xs font-bold uppercase tracking-wider text-center py-2">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
                    {prog.level}
                  </span>
                  <h3 className="font-bold text-slate-900 text-xl mb-2 leading-tight">{prog.title}</h3>
                  <p className="text-amber-600 font-medium text-sm mb-4">{prog.duration}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{prog.description}</p>
                  <ul className="space-y-2.5">
                    {prog.modules.map((mod) => (
                      <li key={mod} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={15} className="text-amber-500 shrink-0" />
                        {mod}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">How to Join</span>
            <h2 className="text-4xl font-bold text-slate-900">Admission Process</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
                  <span className="text-slate-900 font-bold text-xl">{step.step}</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Apply Now</span>
            <h2 className="text-4xl font-bold text-slate-900">Registration Form</h2>
          </div>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Received!</h3>
              <p className="text-gray-600">Thank you for applying to the School of Ministry. We will contact you shortly with next steps.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="+234..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Program of Interest *</label>
                  <select
                    name="program"
                    value={form.program}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  >
                    <option value="">Select a program</option>
                    <option value="Certificate in Biblical Studies">Certificate in Biblical Studies (1 Year)</option>
                    <option value="Diploma in Ministry Leadership">Diploma in Ministry Leadership (2 Years)</option>
                    <option value="Advanced Ministry Training">Advanced Ministry Training (1 Year)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Highest Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. B.Sc. Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Calling / Testimony</label>
                <textarea
                  name="testimony"
                  value={form.testimony}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                  placeholder="Briefly share your calling and what you hope to gain..."
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-900 font-bold rounded-xl transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
