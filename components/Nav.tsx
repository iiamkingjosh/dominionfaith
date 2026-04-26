"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const menuItems = [
  { name: 'Home', href: '/' },
  {
    name: 'About',
    href: '/about',
    submenu: [{ name: 'Vision', href: '/vision-mission' }],
  },
  {
    name: 'Ministries',
    href: '/leadership',
    submenu: [
      { name: 'Leadership', href: '/leadership' },
      { name: 'School of Ministry', href: '/school-of-ministry' },
      { name: 'Departments', href: '/departments' },
      { name: 'House Care Fellowship', href: '/house-fellowship' },
    ],
  },
  {
    name: 'Media',
    href: '/media-center',
    submenu: [{ name: 'Events', href: '/events' }],
  },
  {
    name: 'Blog',
    href: '/blog',
    submenu: [{ name: 'Give', href: '/give-online' }],
  },
  {
    name: 'Contact',
    href: '/contact-us',
    submenu: [{ name: 'Locations', href: '/locations' }],
  },
];

export default function Nav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const toggleMenu = (name: string) => {
    setActiveMenu((current) => (current === name ? null : name));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav ref={navRef} className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Dominion Faith International Ministry
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <li key={item.name} className="relative">
              <div className="flex items-center gap-2">
                {item.submenu ? (
                  <button
                    type="button"
                    onClick={() => toggleMenu(item.name)}
                    className="hover:underline focus:outline-none"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link href={item.href} className="hover:underline">
                    {item.name}
                  </Link>
                )}
              </div>

              {item.submenu && activeMenu === item.name && (
                <ul className="absolute left-0 top-full mt-2 w-64 rounded bg-white text-blue-900 shadow-lg">
                  {item.submenu.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        href={sub.href}
                        className="block px-4 py-3 hover:bg-blue-100"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
