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
    { label: 'Media', href: '/media' },
    { label: 'Live Stream', href: '/live' },
    { label: 'Give Online', href: '/give' },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
              <span className="text-slate-900 font-bold">DFIM</span>
            </div>
            <div>
              <p className="font-semibold text-white">Dominion Faith</p>
              <p className="text-amber-400 text-sm">International Ministry</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            A place where champions are made. Raising believers who walk in dominion, faith, and purpose.
          </p>
          <div className="mt-6 flex gap-4 text-gray-400">
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => onNavigate(link.href)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Ministries</h3>
          <ul className="space-y-3 text-sm">
            {ministryLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => onNavigate(link.href)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Contact</h3>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <p>15 Faith Avenue, GRA, Port Harcourt, Rivers State, Nigeria</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-amber-400" />
              <p>+234 803 000 0001</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-amber-400" />
              <p>info@dfim.org</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="mt-6 w-full rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
          >
            Contact Us
          </button>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Dominion Faith International Ministry. All rights reserved.
      </div>
    </footer>
  );
}
