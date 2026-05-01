import { useState, useEffect } from 'react';
import { Play, Heart, Users, ChevronRight, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { firebaseQuery, getCollection, getFirstFromCollection } from '../lib/firebase';
import { usePageContent } from '../lib/usePageContent';

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  location_name: string;
  image_url: string;
  is_featured: boolean;
}

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  series: string;
  preached_at: string;
  is_featured: boolean;
}

interface HomeProps {
  onNavigate: (href: string) => void;
}

const defaultEvents: Event[] = [
  { id: '1', title: 'Champions Summit 2026', description: 'Three days of intensive teaching, worship, and impartation. Theme: "Arise and Dominate."', start_date: '2026-06-13', location_name: '1 Dominion Avenue, Onireke, Lagos', image_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: true },
  { id: '2', title: '21 Days of Prayer & Fasting', description: 'A corporate season of prayer and fasting. Daily sessions at all branches with special Friday teachings.', start_date: '2026-07-01', location_name: 'All DFIM Branches', image_url: 'https://images.pexels.com/photos/2341290/pexels-photo-2341290.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: true },
  { id: '3', title: 'School of Ministry Graduation 2026', description: 'Celebrating graduates released into their Kingdom assignments.', start_date: '2026-08-22', location_name: '1 Dominion Avenue, Onireke, Lagos', image_url: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false },
];

const defaultFeaturedSermon: Sermon = {
  id: '1', title: 'Walking in Your God-Given Dominion', preacher: 'Pst. Dr. Paul C. Igwe',
  description: 'In this powerful message, Pst. Dr. Igwe unpacks what it truly means to walk in dominion — not just in church, but in every sphere of life. Rooted in Genesis 1:28 and Romans 8:37.',
  video_url: '', thumbnail_url: '', series: 'Dominion Series', preached_at: '2026-04-20', is_featured: true,
};

export default function Home({ onNavigate }: HomeProps) {
  const pc = usePageContent('home', {
    hero_title: 'Dominion Faith International Ministry',
    hero_subtitle: 'Welcome to DFIM',
    hero_description: 'Join a community of faith-filled believers growing in purpose, power, and dominion. Every service is designed to transform your life.',
    hero_bg_image: 'https://images.pexels.com/photos/2341290/pexels-photo-2341290.jpeg?auto=compress&cs=tinysrgb&w=1600',
    welcome_pastor_name: 'Pst. Dr. Paul C. Igwe',
    welcome_pastor_title: 'General Overseer',
    welcome_pastor_image: 'https://images.pexels.com/photos/8468/church-faith-religion-photography.jpg?auto=compress&cs=tinysrgb&w=800',
    welcome_p1: 'Welcome to Dominion Faith International Ministry — a place built on the unshakeable Word of God and the transforming power of the Holy Spirit.',
    welcome_p2: 'For over two decades, we have been committed to raising believers who do not just survive life but dominate it. Champions are not born — they are made. And God has called each one of you for greatness.',
    welcome_p3: 'Whether you are joining us for the first time or you have been a part of this family for years, I want you to know that there is a place for you here. Our doors are open, our hearts are wide, and heaven is backing us.',
    welcome_scripture: '"For God has not given us a spirit of fear, but of power and of love and of a sound mind." — 2 Timothy 1:7',
    stat_years: '20+',
    stat_locations: '5+',
    stat_lives: '1000s',
    stat_ministers: '50+',
    svc1_label: '1st Service', svc1_day: 'Sunday', svc1_time: '7:00 AM – 9:00 AM',
    svc2_label: '2nd Service', svc2_day: 'Sunday', svc2_time: '10:00 AM – 12:30 PM',
    svc3_label: 'Midweek Service', svc3_day: 'Wednesday', svc3_time: '5:00 PM – 7:00 PM',
    svc4_label: 'Prayer & Power Night', svc4_day: 'Friday', svc4_time: '5:00 PM – 7:00 PM',
    main_address: '1 Dominion Avenue, Onireke',
    main_address_sub: 'Opposite Ojo Military Cantonment, Lagos, Nigeria',
    cta_title: 'Ready to Begin Your Champion Journey?',
    cta_description: 'Take the first step. Visit us, connect with a House Fellowship, or reach out — we would love to walk this journey with you.',
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [featuredSermon, setFeaturedSermon] = useState<Sermon | null>(null);

  useEffect(() => {
    getCollection<Event>('events', [firebaseQuery.orderBy('start_date', 'asc'), firebaseQuery.limit(3)])
      .then((data) => setEvents(data.length ? data : defaultEvents))
      .catch(() => setEvents(defaultEvents));

    getFirstFromCollection<Sermon>('sermons', [firebaseQuery.where('is_featured', '==', true)])
      .then((data) => setFeaturedSermon(data ?? defaultFeaturedSermon))
      .catch(() => setFeaturedSermon(defaultFeaturedSermon));
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  const serviceTimes = [
    { label: pc.svc1_label, day: pc.svc1_day, time: pc.svc1_time },
    { label: pc.svc2_label, day: pc.svc2_day, time: pc.svc2_time },
    { label: pc.svc3_label, day: pc.svc3_day, time: pc.svc3_time },
    { label: pc.svc4_label, day: pc.svc4_day, time: pc.svc4_time },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.93) 0%, rgba(15,23,42,0.75) 60%, rgba(120,53,15,0.4) 100%), url('${pc.hero_bg_image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <span className="inline-block px-4 py-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-sm font-medium rounded-full mb-6 tracking-wider uppercase">
            {pc.hero_subtitle}
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {pc.hero_title}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-4 font-light italic">
            "A Place Where Champions Are Made"
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            {pc.hero_description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => onNavigate('/live')} className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-500/40 hover:-translate-y-0.5">
              <Play size={18} fill="white" /> Watch Live
            </button>
            <button onClick={() => onNavigate('/give')} className="flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/30 hover:-translate-y-0.5">
              <Heart size={18} /> Give
            </button>
            <button onClick={() => onNavigate('/contact')} className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 border border-white/20 hover:border-white/40 hover:-translate-y-0.5">
              <Users size={18} /> Join Us
            </button>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-amber-400">{pc.stat_years}</p>
              <p className="text-gray-400 text-sm">Years of Ministry</p>
            </div>
            <div className="w-px bg-white/10"></div>
            <div>
              <p className="text-3xl font-bold text-amber-400">{pc.stat_locations}</p>
              <p className="text-gray-400 text-sm">Church Locations</p>
            </div>
            <div className="w-px bg-white/10"></div>
            <div>
              <p className="text-3xl font-bold text-amber-400">{pc.stat_lives}</p>
              <p className="text-gray-400 text-sm">Lives Transformed</p>
            </div>
            <div className="w-px bg-white/10"></div>
            <div>
              <p className="text-3xl font-bold text-amber-400">{pc.stat_ministers}</p>
              <p className="text-gray-400 text-sm">Ministers Raised</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Pastor's Welcome */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img src={pc.welcome_pastor_image} alt={pc.welcome_pastor_name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 bg-amber-500 text-slate-900 rounded-2xl p-4 shadow-xl">
                <p className="font-bold text-lg leading-tight">{pc.welcome_pastor_name}</p>
                <p className="text-sm mt-1 opacity-80">{pc.welcome_pastor_title}</p>
              </div>
            </div>
            <div>
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Welcome Message</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">A Word From Our General Overseer</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{pc.welcome_p1}</p>
                <p>{pc.welcome_p2}</p>
                <p>{pc.welcome_p3}</p>
                <p className="font-semibold text-slate-700 italic">{pc.welcome_scripture}</p>
              </div>
              <button onClick={() => onNavigate('/about')} className="mt-8 flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors group">
                Learn More About Us
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Join Us</span>
            <h2 className="text-4xl font-bold text-slate-900">Service Times & Location</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Come experience the presence of God. All are welcome at every service.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {serviceTimes.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all duration-200 group">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                  <Clock size={20} className="text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">{s.label}</p>
                <p className="font-bold text-slate-900 text-lg">{s.day}</p>
                <p className="text-gray-500 text-sm mt-1">{s.time}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex items-start gap-4">
              <MapPin size={24} className="text-amber-500 shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold text-lg">{pc.main_address}</p>
                <p className="text-gray-400">{pc.main_address_sub}</p>
              </div>
            </div>
            <button onClick={() => onNavigate('/locations')} className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl transition-colors shrink-0">
              All Locations <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Latest Sermon */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">The Word</span>
            <h2 className="text-4xl font-bold text-slate-900">Latest Sermon</h2>
          </div>
          {featuredSermon ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-video bg-slate-900">
                <iframe src={featuredSermon.video_url} title={featuredSermon.title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <div>
                {featuredSermon.series && (
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">{featuredSermon.series}</span>
                )}
                <h3 className="text-3xl font-bold text-slate-900 mb-3 leading-tight">{featuredSermon.title}</h3>
                <p className="text-amber-600 font-semibold mb-1">{featuredSermon.preacher}</p>
                <p className="text-gray-500 text-sm mb-4">{formatDate(featuredSermon.preached_at)}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{featuredSermon.description}</p>
                <button onClick={() => onNavigate('/media')} className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors group">
                  Browse All Sermons <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">Loading latest sermon...</div>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">What's Happening</span>
              <h2 className="text-4xl font-bold text-slate-900">Upcoming Events</h2>
            </div>
            <button onClick={() => onNavigate('/events')} className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors group">
              View All Events <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div
                  className="h-48 bg-gradient-to-br from-slate-700 to-slate-900 relative overflow-hidden"
                  style={event.image_url ? { backgroundImage: `url(${event.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                  <div className="absolute inset-0 bg-slate-900/40"></div>
                  <div className="absolute top-4 left-4 bg-amber-500 text-slate-900 rounded-xl px-3 py-1.5 text-center">
                    <p className="text-xs font-bold uppercase tracking-wider">{new Date(event.start_date).toLocaleDateString('en-US', { month: 'short' })}</p>
                    <p className="text-xl font-bold leading-none">{new Date(event.start_date).getDate()}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-amber-600 transition-colors leading-tight">{event.title}</h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{event.description}</p>
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Calendar size={13} /><span>{formatDate(event.start_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs mt-1.5">
                    <MapPin size={13} /><span>{event.location_name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-24 relative"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(120,53,15,0.85) 100%), url('https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">{pc.cta_title}</h2>
          <p className="text-gray-300 text-xl mb-10 leading-relaxed">{pc.cta_description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => onNavigate('/contact#first-timer')} className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg">
              I'm a First-Timer
            </button>
            <button onClick={() => onNavigate('/house-fellowship')} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-200 hover:-translate-y-0.5">
              Find a House Fellowship
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
