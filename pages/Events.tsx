import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { firebaseQuery, getCollection } from '../lib/firebase';
import { usePageContent } from '../lib/usePageContent';

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string | null;
  location_name: string;
  image_url: string;
  registration_url: string;
  is_featured: boolean;
}

const defaultEvents: Event[] = [
  {
    id: '1',
    title: 'Champions Summit 2026',
    description: 'Our flagship annual conference bringing together believers, leaders, and ministers for three days of intensive teaching, worship, and impartation. This year\'s theme: "Arise and Dominate."',
    start_date: '2026-06-13',
    end_date: '2026-06-15',
    location_name: '1 Dominion Avenue, Onireke, Lagos',
    image_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800',
    registration_url: '',
    is_featured: true,
  },
  {
    id: '2',
    title: '21 Days of Prayer & Fasting',
    description: 'Join the entire DFIM family for a corporate season of prayer and fasting. Daily 5 AM and 6 PM prayer sessions at all branches, with special evening teachings every Friday.',
    start_date: '2026-07-01',
    end_date: '2026-07-21',
    location_name: 'All DFIM Branches',
    image_url: 'https://images.pexels.com/photos/2341290/pexels-photo-2341290.jpeg?auto=compress&cs=tinysrgb&w=800',
    registration_url: '',
    is_featured: true,
  },
  {
    id: '3',
    title: 'School of Ministry Graduation 2026',
    description: 'Celebrating the graduating class of the DFIM School of Ministry. A landmark ceremony honouring men and women who have completed their training and are ready to be released into Kingdom assignments.',
    start_date: '2026-08-22',
    end_date: null,
    location_name: '1 Dominion Avenue, Onireke, Lagos',
    image_url: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
    registration_url: '',
    is_featured: false,
  },
];

export default function Events() {
  const pc = usePageContent('events', {
    hero_title: 'Upcoming Events',
    hero_subtitle: 'Mark Your Calendar',
    hero_description: 'Life-changing gatherings designed to build, inspire, and release you into your destiny.',
    hero_bg_image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1600',
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollection<Event>('events', [
      firebaseQuery.orderBy('start_date', 'asc'),
    ])
      .then((data) => setEvents(data.length ? data : defaultEvents))
      .catch(() => setEvents(defaultEvents))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const formatShortDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const featuredEvents = events.filter((e) => e.is_featured);
  const otherEvents = events.filter((e) => !e.is_featured);
  const isUpcoming = (d: string) => new Date(d) >= new Date();

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section
        className="relative py-32"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(120,53,15,0.6) 100%), url('${pc.hero_bg_image}')`,
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

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Don't Miss</span>
              <h2 className="text-4xl font-bold text-slate-900">Featured Events</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <div key={event.id} className="group rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div
                    className="h-64 relative bg-gradient-to-br from-slate-700 to-slate-900"
                    style={event.image_url ? { backgroundImage: `url(${event.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <div className="absolute top-5 left-5 bg-amber-500 text-slate-900 rounded-2xl px-4 py-2 text-center">
                      <p className="text-xs font-bold uppercase">{new Date(event.start_date).toLocaleDateString('en-US', { month: 'short' })}</p>
                      <p className="text-2xl font-bold leading-none">{new Date(event.start_date).getDate()}</p>
                    </div>
                    {isUpcoming(event.start_date) && (
                      <div className="absolute top-5 right-5 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Upcoming
                      </div>
                    )}
                    <div className="absolute bottom-5 left-5">
                      <h3 className="text-white font-bold text-2xl leading-tight group-hover:text-amber-400 transition-colors">{event.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar size={14} className="text-amber-500" />
                        <span>{formatDate(event.start_date)}{event.end_date ? ` – ${formatShortDate(event.end_date)}` : ''}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin size={14} className="text-amber-500" />
                        <span>{event.location_name}</span>
                      </div>
                    </div>
                    {event.registration_url && (
                      <a
                        href={event.registration_url}
                        className="mt-5 flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm group/link"
                      >
                        Register Now <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">All Events</h2>
          {loading ? (
            <p className="text-gray-400 text-center py-16">Loading events...</p>
          ) : (
            <div className="space-y-4">
              {[...featuredEvents, ...otherEvents].map((event) => (
                <div key={event.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-200 flex flex-col sm:flex-row gap-6 items-start">
                  <div className="bg-amber-500 text-slate-900 rounded-xl p-3 text-center min-w-16 shrink-0">
                    <p className="text-xs font-bold uppercase leading-none mb-0.5">
                      {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short' })}
                    </p>
                    <p className="text-2xl font-bold leading-none">{new Date(event.start_date).getDate()}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">{event.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{event.description}</p>
                      </div>
                      {isUpcoming(event.start_date) && (
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full shrink-0">
                          Upcoming
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Clock size={13} className="text-amber-500" />
                        {formatDate(event.start_date)}
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <MapPin size={13} className="text-amber-500" />
                        {event.location_name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
