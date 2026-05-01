import { Heart, Banknote, Star, Shield, CheckCircle } from 'lucide-react';
import { usePageContent } from '../lib/usePageContent';

const givingTypes = [
  {
    icon: Heart,
    title: 'Tithe',
    description: 'The first tenth of your income, returned to God as an act of faith and honour. Malachi 3:10.',
    color: 'amber',
  },
  {
    icon: Banknote,
    title: 'Offering',
    description: 'A freewill gift beyond the tithe, expressing your love and gratitude to God.',
    color: 'green',
  },
  {
    icon: Star,
    title: 'Special Seeds',
    description: 'Sowing a seed in faith for a specific divine purpose, harvest, or ministry project.',
    color: 'blue',
  },
];

export default function Give() {
  const pc = usePageContent('give', {
    hero_title: 'Give Online',
    hero_subtitle: 'Kingdom Giving',
    hero_description: 'Every gift you sow is an investment in the Kingdom of God. Thank you for your faithfulness.',
    hero_bg_image: 'https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=1600',
    give_scripture: '"Give, and it shall be given to you: good measure, pressed down, shaken together, and running over..."',
    give_scripture_ref: 'Luke 6:38',
    bank1_name: 'First Bank Nigeria',
    bank1_account_name: 'Dominion Faith Intl Ministry',
    bank1_account_number: '1234567890',
    bank2_name: 'Access Bank',
    bank2_account_name: 'Dominion Faith Intl Ministry',
    bank2_account_number: '0987654321',
    bank3_name: 'GTBank',
    bank3_account_name: 'DFIM Missions Fund',
    bank3_account_number: '1122334455',
  });

  const bankDetails = [
    { bank: pc.bank1_name, accountName: pc.bank1_account_name, accountNumber: pc.bank1_account_number, currency: 'NGN' },
    { bank: pc.bank2_name, accountName: pc.bank2_account_name, accountNumber: pc.bank2_account_number, currency: 'NGN' },
    { bank: pc.bank3_name, accountName: pc.bank3_account_name, accountNumber: pc.bank3_account_number, currency: 'NGN' },
  ];
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
          <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto">
            {pc.hero_description}
          </p>
        </div>
      </section>

      {/* Scripture Banner */}
      <section className="py-12 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-2xl text-slate-800 font-light italic leading-relaxed">{pc.give_scripture}</p>
          <p className="text-amber-600 font-semibold mt-3">— {pc.give_scripture_ref}</p>
        </div>
      </section>

      {/* Giving Types */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Ways to Give</span>
            <h2 className="text-4xl font-bold text-slate-900">How You Can Give</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {givingTypes.map((g) => (
              <div key={g.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-200 p-8 group text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-amber-500 transition-colors">
                  <g.icon size={28} className="text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-3">{g.title}</h3>
                <p className="text-gray-500 leading-relaxed">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bank Details */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Bank Transfer</span>
            <h2 className="text-4xl font-bold text-slate-900">Account Details</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              You can give via bank transfer using any of the accounts below. Please send a confirmation message after transferring.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bankDetails.map((acct) => (
              <div key={acct.bank} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                    <Banknote size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{acct.bank}</p>
                    <p className="text-xs text-gray-400">{acct.currency}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Account Name</p>
                    <p className="font-semibold text-slate-900 text-sm">{acct.accountName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Account Number</p>
                    <p className="font-bold text-amber-600 text-lg tracking-widest">{acct.accountNumber}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Give */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Commitment</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Your Gift Makes a Difference</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Every contribution to DFIM goes directly to advancing the Kingdom of God — funding ministry operations, supporting missions, empowering the School of Ministry, and caring for those in need.
              </p>
              <ul className="space-y-4">
                {[
                  'Funding church operations and programs',
                  'Supporting the School of Ministry',
                  'Outreach and community development',
                  'Missions and church planting',
                  'Care for the vulnerable and less privileged',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900 rounded-3xl p-10 text-center">
              <Shield size={48} className="text-amber-400 mx-auto mb-5" />
              <h3 className="text-white font-bold text-2xl mb-4">Giving with Confidence</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                All contributions are handled with the highest level of integrity and accountability. DFIM is committed to transparent financial stewardship.
              </p>
              <p className="text-amber-400 font-medium italic text-sm">
                "Faithful is He that calleth you, who also will do it." — 1 Thess 5:24
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
