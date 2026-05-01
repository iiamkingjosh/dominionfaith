import { BookOpen, Building2, Home, ArrowRight } from 'lucide-react';
import { usePageContent } from '../lib/usePageContent';

interface MinistriesProps {
  onNavigate: (href: string) => void;
}

export default function Ministries({ onNavigate }: MinistriesProps) {
  const pc = usePageContent('ministries', {
    hero_title: 'Our Ministries',
    hero_subtitle: 'Kingdom Work',
    hero_description: 'Every arm of DFIM exists with a singular purpose — transforming lives and advancing the Kingdom of God.',
    hero_bg_image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1600',
  });
  const ministries = [
    {
      icon: BookOpen,
      title: 'School of Ministry',
      description: 'An intensive training ground for those called to full-time or marketplace ministry. The School of Ministry equips believers with biblical knowledge, ministry skills, and spiritual formation.',
      href: '/school-of-ministry',
      highlights: ['Biblical Studies', 'Homiletics & Preaching', 'Church Leadership', 'Pastoral Care'],
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Building2,
      title: 'Departments',
      description: 'Our departments are the operational arms of the ministry — each one carrying a unique grace and anointing to serve the body and the community effectively.',
      href: '/departments',
      highlights: ['Choir', 'Ushering', 'Media', 'Prayer Unit', 'Hospital & Prison'],
      image: 'https://images.pexels.com/photos/1184512/pexels-photo-1184512.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Home,
      title: 'House Care Fellowship',
      description: 'Church was never meant to be just a Sunday event. House Care Fellowships bring the church into our communities — smaller gatherings where real discipleship happens.',
      href: '/house-fellowship',
      highlights: ['Weekly Gatherings', 'Prayer & Worship', 'Bible Study', 'Community Care'],
      image: 'https://images.pexels.com/photos/3812437/pexels-photo-3812437.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

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
          <p className="text-gray-300 text-xl leading-relaxed">{pc.hero_description}</p>
        </div>
      </section>

      {/* Ministry Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {ministries.map((ministry, index) => (
            <div key={ministry.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                  <ministry.icon size={28} className="text-amber-600" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">{ministry.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">{ministry.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {ministry.highlights.map((hl) => (
                    <span key={hl} className="px-3 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                      {hl}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate(ministry.href)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors group"
                >
                  Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <img
                  src={ministry.image}
                  alt={ministry.title}
                  className="w-full rounded-2xl shadow-2xl h-96 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
