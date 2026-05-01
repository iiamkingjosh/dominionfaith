import { Music, UserCheck, Camera, Flame, Heart, Shield } from 'lucide-react';
import { usePageContent } from '../lib/usePageContent';

const departments = [
  {
    icon: Music,
    name: 'Choir & Worship Team',
    color: 'blue',
    description: 'The Choir and Worship Team leads the congregation into the presence of God through anointed music and song. We believe music is a powerful weapon for spiritual warfare and a gateway to divine encounter.',
    activities: ['Sunday Worship', 'Rehearsals (Saturdays)', 'Special Events', 'Recording Sessions'],
    join: 'Open to those with vocal or instrumental gifts. Contact: choir@dfim.org',
  },
  {
    icon: UserCheck,
    name: 'Ushering Department',
    color: 'green',
    description: 'Our ushers are the hands and feet of hospitality in DFIM. They create a warm, orderly, and welcoming environment for every service, ensuring that every person who walks through our doors feels seen and valued.',
    activities: ['Sunday Services', 'Special Programs', 'Event Management', 'First-Timer Care'],
    join: 'Open to all. Training provided. Contact: ushering@dfim.org',
  },
  {
    icon: Camera,
    name: 'Media Department',
    color: 'slate',
    description: 'The Media Department is responsible for recording, broadcasting, and amplifying the message of DFIM to the world. From live streaming to graphic design, this team uses creativity to advance the Kingdom.',
    activities: ['Live Streaming', 'Video Production', 'Photography', 'Social Media', 'Graphic Design'],
    join: 'Open to creatives with tech/media skills. Contact: media@dfim.org',
  },
  {
    icon: Flame,
    name: 'Prayer Unit',
    color: 'red',
    description: 'Prayer is the engine of DFIM. The Prayer Unit coordinates and leads all intercessory prayer activities — from early morning prayers to strategic intercession sessions. These are the prayer warriors of the ministry.',
    activities: ['Early Morning Prayers', 'Friday Prayer Nights', 'Department Intercession', 'Special Prayer Sessions'],
    join: 'Open to all who desire a deep prayer life. Contact: prayer@dfim.org',
  },
  {
    icon: Heart,
    name: 'Hospital & Prison Ministry',
    color: 'amber',
    description: 'This department takes the love of God beyond the church walls, reaching the sick in hospitals and those behind bars. We believe no one is beyond the reach of God\'s grace.',
    activities: ['Hospital Visitations', 'Prison Evangelism', 'Care Packages', 'Follow-up Discipleship'],
    join: 'Compassionate hearts welcome. Contact: outreach@dfim.org',
  },
  {
    icon: Shield,
    name: 'Security Department',
    color: 'gray',
    description: 'Our security team ensures the safety and orderliness of all services and events. They work quietly in the background so that every member can worship with peace of mind.',
    activities: ['Sunday Services', 'Special Events', 'Parking Coordination', 'Safety Protocols'],
    join: 'Open to dedicated, disciplined individuals. Contact: security@dfim.org',
  },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-500',
  green: 'bg-green-100 text-green-600 group-hover:bg-green-500',
  slate: 'bg-slate-100 text-slate-600 group-hover:bg-slate-500',
  red: 'bg-red-100 text-red-600 group-hover:bg-red-500',
  amber: 'bg-amber-100 text-amber-600 group-hover:bg-amber-500',
  gray: 'bg-gray-100 text-gray-600 group-hover:bg-gray-500',
};

export default function Departments() {
  const pc = usePageContent('departments', {
    hero_title: 'Departments',
    hero_subtitle: 'Serve Your Calling',
    hero_description: 'Find your place of service. Every department is a ministry, and every member matters.',
    hero_bg_image: 'https://images.pexels.com/photos/1184512/pexels-photo-1184512.jpeg?auto=compress&cs=tinysrgb&w=1600',
  });
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

      {/* Intro */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Every Part of the Body Matters</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Based on 1 Corinthians 12, we believe every believer has been gifted to serve a specific function in the Body of Christ. Our departments give you the structure and community to express that gift effectively.
          </p>
        </div>
      </section>

      {/* Department Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300 overflow-hidden group">
                <div className="p-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${colorMap[dept.color]}`}>
                    <dept.icon size={22} className="group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl mb-3">{dept.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{dept.description}</p>
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Activities</p>
                    <div className="flex flex-wrap gap-2">
                      {dept.activities.map((a) => (
                        <span key={a} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{a}</span>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500 leading-relaxed">{dept.join}</p>
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
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Serve?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Take the step. Join a department and discover the fulfillment of serving God with your gifts.
          </p>
          <a
            href="mailto:departments@dfim.org"
            className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors"
          >
            Express Your Interest
          </a>
        </div>
      </section>
    </div>
  );
}
