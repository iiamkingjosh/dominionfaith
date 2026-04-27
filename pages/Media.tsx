import { useState, useEffect } from 'react';
import { Play, Headphones, Image, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  description: string;
  video_url: string;
  audio_url: string;
  series: string;
  preached_at: string;
  is_featured: boolean;
}

const galleryImages = [
  'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2341290/pexels-photo-2341290.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2774546/pexels-photo-2774546.jpeg?auto=compress&cs=tinysrgb&w=600',
];

export default function Media() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);
  const [tab, setTab] = useState<'sermons' | 'gallery'>('sermons');

  useEffect(() => {
    supabase
      .from('sermons')
      .select('*')
      .order('preached_at', { ascending: false })
      .then(({ data }) => {
        if (data) {
          setSermons(data);
          const featured = data.find((s) => s.is_featured) || data[0];
          if (featured) setActiveSermon(featured);
        }
      });
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section
        className="relative py-32"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 100%), url('https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">His Word, Everywhere</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">Media Center</h1>
          <p className="text-gray-300 text-xl leading-relaxed">
            Access sermons, messages, and photos from DFIM. Let the Word of God follow you everywhere.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {(['sermons', 'gallery'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`py-4 text-sm font-semibold capitalize border-b-2 transition-colors ${
                  tab === t ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-slate-700'
                }`}
              >
                {t === 'sermons' ? 'Sermons' : 'Photo Gallery'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sermons Tab */}
      {tab === 'sermons' && (
        <section id="sermons" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Featured Player */}
            {activeSermon && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <div className="lg:col-span-2">
                  <div className="rounded-2xl overflow-hidden shadow-xl aspect-video bg-slate-900">
                    <iframe
                      src={activeSermon.video_url}
                      title={activeSermon.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  {activeSermon.series && (
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider w-fit">
                      {activeSermon.series}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{activeSermon.title}</h2>
                  <p className="text-amber-600 font-semibold mb-1">{activeSermon.preacher}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <Calendar size={14} />
                    <span>{formatDate(activeSermon.preached_at)}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{activeSermon.description}</p>
                  {activeSermon.audio_url && (
                    <a
                      href={activeSermon.audio_url}
                      className="mt-5 flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-colors w-fit"
                    >
                      <Headphones size={16} /> Download Audio
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Sermon List */}
            <h3 className="text-2xl font-bold text-slate-900 mb-6">All Sermons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sermons.map((sermon) => (
                <button
                  key={sermon.id}
                  onClick={() => setActiveSermon(sermon)}
                  className={`text-left rounded-2xl overflow-hidden border transition-all duration-200 group ${
                    activeSermon?.id === sermon.id
                      ? 'border-amber-400 ring-2 ring-amber-400 shadow-lg'
                      : 'border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200'
                  }`}
                >
                  <div className="bg-slate-800 aspect-video flex items-center justify-center relative">
                    <div className="w-12 h-12 rounded-full bg-amber-500/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={18} fill="white" className="text-white ml-0.5" />
                    </div>
                    {sermon.series && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-amber-400 text-xs rounded">
                        {sermon.series}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-slate-900 text-sm leading-tight mb-1 line-clamp-2">{sermon.title}</h4>
                    <p className="text-amber-600 text-xs font-medium">{sermon.preacher}</p>
                    <p className="text-gray-400 text-xs mt-1">{formatDate(sermon.preached_at)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Tab */}
      {tab === 'gallery' && (
        <section id="gallery" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-3">
              <Image size={24} className="text-amber-500" /> Photo Gallery
            </h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {galleryImages.map((src, i) => (
                <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <img src={src} alt={`Gallery ${i + 1}`} className="w-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
