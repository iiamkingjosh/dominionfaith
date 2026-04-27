import { Radio, Youtube, Facebook, Clock, Bell } from 'lucide-react';

const serviceTimes = [
  { day: 'Sunday', time: '7:00 AM (WAT)', label: '1st Service' },
  { day: 'Sunday', time: '10:00 AM (WAT)', label: '2nd Service' },
  { day: 'Wednesday', time: '5:00 PM (WAT)', label: 'Midweek Service' },
  { day: 'Friday', time: '5:00 PM (WAT)', label: 'Prayer Night' },
];

export default function Live() {
  return (
    <div className="min-h-screen bg-slate-950 pt-16">
      {/* Header */}
      <section className="py-16 text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-red-400 font-bold text-sm uppercase tracking-widest">Live Stream</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">Watch DFIM Live</h1>
          <p className="text-gray-400 text-xl leading-relaxed">
            Join us from anywhere in the world. The presence of God is not limited by geography.
          </p>
        </div>
      </section>

      {/* Main Player */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-800 aspect-video flex items-center justify-center">
            <div className="text-center p-12">
              <div className="w-20 h-20 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center mx-auto mb-6">
                <Radio size={36} className="text-red-400" />
              </div>
              <h2 className="text-white font-bold text-2xl mb-2">Stream Starts at Service Time</h2>
              <p className="text-gray-400 mb-8">Subscribe to our YouTube or Facebook channel to get notified when we go live.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://youtube.com/@DominionFaithIntlMinistry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-colors"
                >
                  <Youtube size={20} /> Subscribe on YouTube
                </a>
                <a
                  href="https://facebook.com/DFIMOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
                >
                  <Facebook size={20} /> Follow on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stream Schedule */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Stream Schedule</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serviceTimes.map((s) => (
              <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-5 hover:border-slate-600 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Clock size={22} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{s.label}</p>
                  <p className="text-white font-bold">{s.day}</p>
                  <p className="text-amber-400 text-sm">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notifications CTA */}
      <section className="py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Bell size={36} className="text-amber-400 mx-auto mb-5" />
          <h2 className="text-3xl font-bold text-white mb-4">Never Miss a Service</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Turn on notifications on YouTube or Facebook to be alerted every time we go live.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://youtube.com/@DominionFaithIntlMinistry"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-colors"
            >
              <Youtube size={20} /> YouTube Channel
            </a>
            <a
              href="https://facebook.com/DFIMOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
            >
              <Facebook size={20} /> Facebook Page
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
