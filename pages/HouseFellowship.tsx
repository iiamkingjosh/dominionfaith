import { Home, MapPin, Clock, Users, Heart, BookOpen } from 'lucide-react';
import { usePageContent } from '../lib/usePageContent';

const centers = [
  { zone: 'GRA Zone', location: 'GRA, Port Harcourt', coordinator: 'Deacon James Nwachukwu', day: 'Tuesday', time: '6:00 PM', contact: '+234 803 000 1001' },
  { zone: 'Rumuola Zone', location: 'Rumuola Road, Port Harcourt', coordinator: 'Min. Sandra Tunde', day: 'Wednesday', time: '6:00 PM', contact: '+234 803 000 1002' },
  { zone: 'Woji Zone', location: 'Woji, Port Harcourt', coordinator: 'Deaconess Faith Okonkwo', day: 'Thursday', time: '5:30 PM', contact: '+234 803 000 1003' },
  { zone: 'Trans-Amadi Zone', location: 'Trans-Amadi, Port Harcourt', coordinator: 'Min. Victor Eze', day: 'Tuesday', time: '6:30 PM', contact: '+234 803 000 1004' },
  { zone: 'Abuja Zone', location: 'Gwarinpa, Abuja', coordinator: 'Deacon Philip Okafor', day: 'Wednesday', time: '6:00 PM', contact: '+234 803 000 1005' },
  { zone: 'Lagos Zone', location: 'Ogba, Lagos', coordinator: 'Evang. Blessing Eze', day: 'Thursday', time: '6:00 PM', contact: '+234 803 000 1006' },
];

const benefits = [
  { icon: BookOpen, title: 'In-Depth Bible Study', desc: 'Go deeper in the Word in a smaller, more intimate setting where questions are welcomed.' },
  { icon: Heart, title: 'Genuine Community', desc: 'Build real relationships with believers who will walk through life with you.' },
  { icon: Users, title: 'Discipleship', desc: 'Get personalized attention and spiritual guidance from trained house fellowship leaders.' },
  { icon: Home, title: 'Neighbourhood Reach', desc: 'Be a light right where you live. House fellowships are strategic outreach points.' },
];

export default function HouseFellowship() {
  const pc = usePageContent('house-fellowship', {
    hero_title: 'House Care Fellowship',
    hero_subtitle: 'The Church in Your Home',
    hero_description: 'Community, discipleship, and kingdom impact — one home at a time.',
    hero_bg_image: 'https://images.pexels.com/photos/3812437/pexels-photo-3812437.jpeg?auto=compress&cs=tinysrgb&w=1600',
  });
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

      {/* What It Is */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">What Is It?</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Church Was Never Meant to End on Sunday
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                House Care Fellowship (HCF) is a mid-week gathering of DFIM members in homes, offices, or community centres within a defined zone. It is a smaller, more intimate expression of the church, designed for discipleship, prayer, and community care.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Each HCF meeting typically includes praise and worship, a short Bible study (often a continuation of Sunday's message), prayer, and fellowship. These gatherings are led by trained House Care Leaders who are accountable to the resident pastor.
              </p>
              <p className="text-gray-600 leading-relaxed">
                HCF is not just a program — it is a lifestyle of community. We believe that when believers gather in homes, the early church spirit is revived, and the Kingdom advances neighbourhood by neighbourhood.
              </p>
            </div>
            <img
              src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="House fellowship gathering"
              className="rounded-2xl shadow-2xl h-96 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Why Join?</span>
            <h2 className="text-4xl font-bold text-slate-900">Benefits of House Fellowship</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-8 shadow-sm border border-amber-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-amber-500 transition-colors">
                  <b.icon size={22} className="text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations / Centers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Near You</span>
            <h2 className="text-4xl font-bold text-slate-900">House Fellowship Centers</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Find a center near you and connect with your zone.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centers.map((center) => (
              <div key={center.zone} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{center.zone}</h3>
                    <p className="text-amber-600 text-sm font-medium">{center.coordinator}</p>
                  </div>
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <Home size={18} className="text-amber-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={14} className="text-amber-500 shrink-0" />
                    <span>{center.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock size={14} className="text-amber-500 shrink-0" />
                    <span>{center.day}s at {center.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Users size={14} className="text-amber-500 shrink-0" />
                    <span>{center.contact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Find Your Fellowship</h2>
          <p className="text-gray-400 text-lg mb-8">
            Don't do life alone. Connect with a House Care Fellowship near you today.
          </p>
          <a
            href="mailto:hcf@dfim.org"
            className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors"
          >
            Connect With a Center
          </a>
        </div>
      </section>
    </div>
  );
}
