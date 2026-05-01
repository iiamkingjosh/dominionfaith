import { usePageContent } from '../lib/usePageContent';

const leaders = {
  residentPastors: [
    {
      name: 'Pastor Samuel Bright',
      title: 'Resident Pastor — DFIM Rumuola Assembly',
      image: 'https://images.pexels.com/photos/3825532/pexels-photo-3825532.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Port Harcourt, Rivers State',
    },
    {
      name: 'Pastor Grace Nwosu',
      title: 'Resident Pastor — DFIM Woji Assembly',
      image: 'https://images.pexels.com/photos/5082976/pexels-photo-5082976.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Port Harcourt, Rivers State',
    },
    {
      name: 'Pastor Daniel Mensah',
      title: 'Resident Pastor — DFIM Abuja Assembly',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Abuja, FCT',
    },
    {
      name: 'Pastor Favour Adeyemi',
      title: 'Resident Pastor — DFIM Lagos Assembly',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Lagos, Lagos State',
    },
  ],
  ministers: [
    { name: 'Evang. Blessing Eze', role: 'Music Director' },
    { name: 'Deacon Philip Okafor', role: 'Head, Ushering Department' },
    { name: 'Min. Sandra Tunde', role: 'Head, Prayer Unit' },
    { name: 'Deacon James Nwachukwu', role: 'Head, Media Department' },
    { name: 'Min. Rachel Obi', role: 'Women\'s Ministry Leader' },
    { name: 'Deacon Moses Chukwu', role: 'Head, Hospital & Prison Ministry' },
    { name: 'Min. Victor Eze', role: 'Youth Leader' },
    { name: 'Deaconess Faith Okonkwo', role: 'Children\'s Church Leader' },
  ],
};

export default function Leadership() {
  const pc = usePageContent('leadership', {
    hero_title: 'Leadership Team',
    hero_subtitle: 'Our Shepherds',
    hero_description: 'Called, equipped, and sent — our leaders are committed to serving God and His people with excellence.',
    hero_bg_image: 'https://images.pexels.com/photos/2774546/pexels-photo-2774546.jpeg?auto=compress&cs=tinysrgb&w=1600',
    go_name: 'Pst. Dr. Paul C. Igwe',
    go_title: 'General Overseer & Founder',
    go_image: 'https://images.pexels.com/photos/8468/church-faith-religion-photography.jpg?auto=compress&cs=tinysrgb&w=800',
    go_scripture_focus: 'Ephesians 4:11-12',
    go_bio1: 'Pst. Dr. Paul C. Igwe is the visionary founder and General Overseer of Dominion Faith International Ministry. Called into ministry over two decades ago, he has dedicated his life to raising champions — believers who walk in the fullness of their God-given authority.',
    go_bio2: 'A prolific teacher of the Word, Pst. Dr. Igwe has ministered across Nigeria and beyond, igniting revival fires and building generational foundations wherever he goes. His ministry is characterized by deep biblical teaching, prophetic accuracy, and a genuine passion for discipleship.',
    go_bio3: 'He is a loving husband and father, and together with his wife, they lead the DFIM family with grace, wisdom, and uncommon dedication.',
    go_quote: 'The Church is the most powerful institution on earth. We are here to prove it, one champion at a time.',
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
          <p className="text-gray-300 text-xl leading-relaxed">{pc.hero_description}</p>
        </div>
      </section>

      {/* General Overseer */}
      <section id="general-overseer" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Founder & Visionary</span>
            <h2 className="text-4xl font-bold text-slate-900">General Overseer</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="sticky top-24">
              <img src={pc.go_image} alt={pc.go_name} className="w-full rounded-2xl shadow-2xl aspect-[4/5] object-cover" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                {pc.go_title}
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">{pc.go_name}</h3>
              <p className="text-amber-600 font-medium mb-8">Scripture Focus: {pc.go_scripture_focus}</p>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">{pc.go_bio1}</p>
                <p className="text-gray-600 leading-relaxed">{pc.go_bio2}</p>
                <p className="text-gray-600 leading-relaxed">{pc.go_bio3}</p>
              </div>
              <blockquote className="mt-8 border-l-4 border-amber-500 pl-6 py-2 bg-amber-50 rounded-r-xl">
                <p className="text-slate-700 font-medium italic">"{pc.go_quote}"</p>
                <footer className="text-sm text-gray-500 mt-2">— {pc.go_name}</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Resident Pastors */}
      <section id="resident-pastors" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Branch Leaders</span>
            <h2 className="text-4xl font-bold text-slate-900">Resident Pastors</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.residentPastors.map((pastor) => (
              <div key={pastor.name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={pastor.image}
                    alt={pastor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">{pastor.name}</h3>
                  <p className="text-amber-600 text-xs font-medium mt-1 leading-tight">{pastor.title}</p>
                  <p className="text-gray-500 text-xs mt-2">{pastor.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministers & Workers */}
      <section id="ministers" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Serving the Body</span>
            <h2 className="text-4xl font-bold text-slate-900">Ministers & Workers</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              The backbone of DFIM — dedicated servants giving their best for the kingdom.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {leaders.ministers.map((minister) => (
              <div key={minister.name} className="bg-slate-50 rounded-xl p-5 border border-gray-100 hover:border-amber-200 hover:bg-amber-50 transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <span className="text-amber-700 font-bold text-sm">{minister.name.charAt(0)}</span>
                </div>
                <h4 className="font-semibold text-slate-900">{minister.name}</h4>
                <p className="text-gray-500 text-sm mt-0.5">{minister.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
