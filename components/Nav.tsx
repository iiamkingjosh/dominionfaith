import Link from 'next/link';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Vision & Mission', href: '/vision-mission' },
  { name: 'Leadership', href: '/leadership' },
  { name: 'Locations', href: '/locations' },
  { name: 'Media Center', href: '/media-center' },
  { name: 'School of Ministry', href: '/school-of-ministry' },
  { name: 'House Fellowship', href: '/house-fellowship' },
  { name: 'Departments', href: '/departments' },
  { name: 'Events', href: '/events' },
  { name: 'Blog', href: '/blog' },
  { name: 'Resources', href: '/resources' },
  { name: 'Give Online', href: '/give-online' },
  { name: 'Contact Us', href: '/contact-us' },
  { name: 'High Impact', href: '/high-impact' },
  { name: 'Live Stream', href: '/live-stream' },
];

export default function Nav() {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Dominion Faith International Ministry
        </Link>
        <ul className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="hover:underline">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Mobile menu can be added later */}
      </div>
    </nav>
  );
}