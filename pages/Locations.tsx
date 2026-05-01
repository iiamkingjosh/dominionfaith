import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Star } from 'lucide-react';
import { firebaseQuery, getCollection } from '../lib/firebase';
import { usePageContent } from '../lib/usePageContent';

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pastor_name: string;
  service_times: { day: string; time: string }[];
  phone: string;
  email: string;
  google_maps_url: string;
  image_url: string;
  is_headquarters: boolean;
}

export default function Locations() {
  const pc = usePageContent('locations', {
    hero_title: 'Our Locations',
    hero_subtitle: 'Find Us Near You',
    hero_description: 'DFIM is spreading across Nigeria. Find a branch near you and join the family.',
    hero_bg_image: 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=1600',
  });
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollection<Location>('locations', [
      firebaseQuery.orderBy('is_headquarters', 'desc'),
    ])
      .then(setLocations)
      .catch(() => setLocations([]))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const hq = locations.find((l) => l.is_headquarters);
  const branches = locations.filter((l) => !l.is_headquarters);

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

      {loading ? (
        <div className="py-24 text-center text-gray-400">Loading locations...</div>
      ) : (
        <>
          {/* Headquarters */}
          {hq && (
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                  <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Main Campus</span>
                  <h2 className="text-4xl font-bold text-slate-900">Headquarters</h2>
                </div>
                <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-10 lg:p-14">
                      <div className="flex items-center gap-2 mb-4">
                        <Star size={16} className="text-amber-400 fill-amber-400" />
                        <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Headquarters</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">{hq.name}</h3>
                      <p className="text-amber-400 font-medium mb-6">{hq.pastor_name}</p>
                      <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3">
                          <MapPin size={18} className="text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white">{hq.address}</p>
                            <p className="text-gray-400">{hq.city}, {hq.state}, {hq.country}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone size={18} className="text-amber-500 shrink-0" />
                          <p className="text-gray-300">{hq.phone}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail size={18} className="text-amber-500 shrink-0" />
                          <p className="text-gray-300">{hq.email}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Service Times</p>
                        <div className="space-y-2">
                          {hq.service_times.map((s, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <Clock size={14} className="text-amber-500 shrink-0" />
                              <span className="text-gray-300 text-sm">{s.day}: {s.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-800 flex items-center justify-center min-h-64 lg:min-h-0">
                      <div className="text-center p-8">
                        <MapPin size={48} className="text-amber-400 mx-auto mb-4" />
                        <p className="text-gray-300 text-sm">1 Dominion Avenue, Onireke</p>
                        <p className="text-gray-400 text-sm">Opposite Ojo Military Cantonment, Lagos</p>
                        {hq.google_maps_url && (
                          <a href={hq.google_maps_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm rounded-xl transition-colors">
                            Open in Maps
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Branches */}
          {branches.length > 0 && (
            <section className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                  <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Branch Assemblies</span>
                  <h2 className="text-4xl font-bold text-slate-900">Our Branches</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {branches.map((loc) => (
                    <div key={loc.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300 p-8">
                      <div className="flex items-start justify-between mb-5">
                        <div>
                          <h3 className="font-bold text-slate-900 text-xl">{loc.name}</h3>
                          <p className="text-amber-600 font-medium text-sm mt-1">{loc.pastor_name}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                          <MapPin size={20} className="text-amber-600" />
                        </div>
                      </div>
                      <div className="space-y-3 mb-5">
                        <div className="flex items-start gap-2.5">
                          <MapPin size={15} className="text-gray-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-slate-700 text-sm">{loc.address}</p>
                            <p className="text-gray-500 text-xs">{loc.city}, {loc.state}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Phone size={15} className="text-gray-400 shrink-0" />
                          <span className="text-gray-600 text-sm">{loc.phone}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Mail size={15} className="text-gray-400 shrink-0" />
                          <span className="text-gray-600 text-sm">{loc.email}</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Service Times</p>
                        <div className="flex flex-wrap gap-2">
                          {loc.service_times.map((s, i) => (
                            <span key={i} className="flex items-center gap-1.5 text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full font-medium">
                              <Clock size={11} />
                              {s.day}: {s.time}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
