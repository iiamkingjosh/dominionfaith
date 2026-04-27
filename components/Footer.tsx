import { Facebook, Youtube, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (href: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Our Vision', href: '/vision' },
    { label: 'Leadership', href: '/leadership' },
    { label: 'Locations', href: '/locations' },
    { label: 'Events', href: '/events' },
    { label: 'Blog', href: '/blog' },
  ];

  const ministryLinks = [
    { label: 'School of Ministry', href: '/school-of-ministry' },
    { label: 'Departments', href: '/departments' },
    { label: 'House Fellowship', href: '/house-fellowship' },
    { label: 'Media Center', href: '/media' },
    { label: 'Live Stream', href: '/live' },
    { label: 'Give Online', href: '/give' },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                <span className="text-slate-900 font-bold">DFIM</span>
              </div>
              <div>
                <p className="text-white font-bold leading-tight">Dominion Faith</p>
                <p className="text-amber-400 text-sm leading-tight">International Ministry</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A Place Where Champions Are Made. Raising believers who walk in dominion, faith, and purpose.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">
                <Youtube size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Ministries</h4>
            <ul className="space-y-2.5">
              {ministryLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">15 Faith Avenue, GRA, Port Harcourt, Rivers State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-amber-500 shrink-0" />
                <span className="text-gray-400 text-sm">+234 803 000 0001</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-amber-500 shrink-0" />
                <span className="text-gray-400 text-sm">info@dfim.org</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('/contact')}
              className="mt-6 w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm rounded-lg transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Dominion Faith International Ministry. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-gray-500 hover:text-gray-400 text-sm transition-colors">Privacy Policy</button>
            <button className="text-gray-500 hover:text-gray-400 text-sm transition-colors">Terms of Use</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
