import { Shield, Heart, Book, Users, Star, Globe } from 'lucide-react';
import { usePageContent } from '../lib/usePageContent';

interface AboutProps {
  onNavigate: (href: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const pc = usePageContent('about', {
    hero_title: 'Our Story',
    hero_subtitle: 'About DFIM',
    hero_description: 'Over two decades of raising champions in faith, purpose, and Kingdom dominion.',
    hero_bg_image: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1600',
    story_title: 'Building a Church That Transforms Nations',
    story_p1: 'Dominion Faith International Ministry (DFIM) was founded over two decades ago with a simple but powerful mandate: to raise a generation of believers who walk in their God-given dominion, unapologetically advancing the Kingdom of God wherever they go.',
    story_p2: 'From a small gathering of faith-hungry believers in Port Harcourt, Rivers State, DFIM has grown into a thriving multi-branch ministry with a presence across Nigeria. Our growth is not measured in numbers alone, but in the transformation of lives — families restored, destinies discovered, and communities impacted.',
    story_p3: 'We are a Word-based, Spirit-led, faith-driven church. Every service, every program, and every initiative is undergirded by the conviction that the Church of Jesus Christ is the most powerful institution on earth.',
    story_tagline: 'A Place Where Champions Are Made.',
    story_image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800',
    story_years: '20+',
  });
  const beliefs = [
    { icon: Book, title: 'The Holy Bible', desc: 'We believe the Bible is the inspired, inerrant Word of God — the final authority in all matters of faith and conduct.' },
    { icon: Star, title: 'The Holy Trinity', desc: 'We believe in one God who exists eternally in three persons: Father, Son, and Holy Spirit.' },
    { icon: Heart, title: 'Salvation by Grace', desc: 'We believe salvation is a free gift of God received by faith in Jesus Christ alone, not by works.' },
    { icon: Globe, title: 'The Holy Spirit', desc: 'We believe in the ongoing work of the Holy Spirit, including the gifts of the Spirit for the Church today.' },
    { icon: Users, title: 'The Church', desc: 'We believe in the local church as God\'s primary vehicle for discipleship, worship, and kingdom advancement.' },
    { icon: Shield, title: 'Eternal Life', desc: 'We believe in the resurrection of the dead and the eternal life of all who believe in Jesus Christ.' },
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section
        className="relative py-32 flex items-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.7) 100%), url('${pc.hero_bg_image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center w-full">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">{pc.hero_subtitle}</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">{pc.hero_title}</h1>
          <p className="text-gray-300 text-xl leading-relaxed">{pc.hero_description}</p>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Who We Are</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">{pc.story_title}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{pc.story_p1}</p>
                <p>{pc.story_p2}</p>
                <p>{pc.story_p3}</p>
                <p>Our tagline says it all: <span className="font-semibold text-slate-800 italic">"{pc.story_tagline}"</span> That is not just a phrase — it is our heartbeat and our commission.</p>
              </div>
            </div>
            <div className="relative">
              <img src={pc.story_image} alt="Church congregation" className="rounded-2xl shadow-2xl w-full h-96 object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white rounded-2xl p-5 shadow-xl">
                <p className="text-3xl font-bold text-amber-400">{pc.story_years}</p>
                <p className="text-sm text-gray-400 mt-1">Years of Transforming Lives</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Beliefs */}
      <section id="beliefs" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">What We Believe</span>
            <h2 className="text-4xl font-bold text-slate-900">Our Core Beliefs</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Grounded in the Word. Anchored in the truth of Jesus Christ.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beliefs.map((belief) => (
              <div key={belief.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all duration-200 group">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-amber-500 transition-colors">
                  <belief.icon size={22} className="text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3">{belief.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{belief.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Leaders</span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Leadership</h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">
            Godly leaders committed to shepherding this community with integrity, humility, and divine purpose.
          </p>
          <button
            onClick={() => onNavigate('/leadership')}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors"
          >
            View Full Leadership Team
          </button>
        </div>
      </section>
    </div>
  );
}
