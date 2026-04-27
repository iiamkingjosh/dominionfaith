import { Eye, Target, CheckCircle } from 'lucide-react';

export default function Vision() {
  const values = [
    { title: 'Excellence', desc: 'We pursue the highest standard in everything we do because we serve an excellent God.' },
    { title: 'Integrity', desc: 'We are committed to transparency, honesty, and accountability in all our dealings.' },
    { title: 'Faith', desc: 'We live and operate by faith — trusting God for the impossible and expecting His Word to work.' },
    { title: 'Discipleship', desc: 'We are intentional about making disciples who make disciples, multiplying the Kingdom.' },
    { title: 'Prayer', desc: 'We are a praying church. Prayer is not a program — it is our lifestyle and our first resort.' },
    { title: 'Community', desc: 'We believe in the power of authentic relationships. No one does life alone in our community.' },
    { title: 'Generosity', desc: 'We give freely — our time, resources, and love — because we have freely received.' },
    { title: 'Kingdom Impact', desc: 'We are not content with four walls. We exist to impact every sphere of society for God.' },
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section
        className="relative py-32 flex items-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(120,53,15,0.7) 100%), url('https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center w-full">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Why We Exist</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">Vision & Mission</h1>
          <p className="text-gray-300 text-xl leading-relaxed">
            Our direction is clear, our mandate is divine, and our purpose is eternal.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <Eye size={32} className="text-amber-600" />
              </div>
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Vision</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Raising a Generation of Champions
              </h2>
              <p className="text-2xl text-slate-700 font-light italic mb-6 border-l-4 border-amber-500 pl-6">
                "To raise a generation of champions — men and women who walk in the fullness of their God-given dominion and advance the Kingdom of God across every sphere of society."
              </p>
              <p className="text-gray-600 leading-relaxed">
                We see a church that goes beyond the four walls — a community of empowered believers transforming their homes, workplaces, cities, and nations. We see champions in every boardroom, classroom, hospital ward, and government house.
              </p>
            </div>
            <div className="bg-slate-900 rounded-3xl p-10 text-white">
              <h3 className="text-xl font-bold mb-6 text-amber-400">The Champion We Are Raising</h3>
              <ul className="space-y-4">
                {[
                  'Deeply rooted in the Word of God',
                  'Filled with and led by the Holy Spirit',
                  'Equipped for works of ministry and service',
                  'Influential in their marketplace and community',
                  'Living a life of integrity, generosity, and prayer',
                  'Reproducing disciples who reproduce disciples',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-24 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Mission"
                className="rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Mission</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                How We Are Doing It
              </h2>
              <p className="text-2xl text-slate-700 font-light italic mb-6 border-l-4 border-amber-500 pl-6">
                "To preach the undiluted Word of God, make disciples, build lives, and release believers into their kingdom assignments — locally and globally."
              </p>
              <p className="text-gray-600 leading-relaxed">
                We accomplish our mission through dynamic worship services, intentional discipleship, the School of Ministry, House Care Fellowships, and strategic community outreach. Every program and initiative is laser-focused on transforming lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">How We Live</span>
            <h2 className="text-4xl font-bold text-slate-900">Our Core Values</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              These are not just statements on a wall — they are the non-negotiables that shape our culture.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={value.title} className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-200 group">
                <div className="absolute top-4 right-4 text-5xl font-bold text-gray-50 select-none group-hover:text-amber-50 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3 relative z-10">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
