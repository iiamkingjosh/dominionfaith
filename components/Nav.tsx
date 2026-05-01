import { useEffect, useState } from 'react';
import { fetchMenuItems, type MenuItem } from '../lib/menu';

interface NavProps {
  currentPath: string;
  onNavigate: (href: string) => void;
}

const defaultMenuItems: MenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Vision', href: '/vision' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Ministries', href: '/ministries', submenu: [
      { label: 'Leadership', href: '/leadership' },
      { label: 'School of Ministry', href: '/school-of-ministry' },
      { label: 'Departments', href: '/departments' },
      { label: 'House Fellowship', href: '/house-fellowship' },
    ]
  },
  { label: 'Media', href: '/media', submenu: [
      { label: 'Events', href: '/events' },
      { label: 'Live Stream', href: '/live' },
    ]
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Give', href: '/give' },
  { label: 'Contact', href: '/contact' },
  { label: 'Locations', href: '/locations' },
];

export default function Nav({ currentPath, onNavigate }: NavProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    fetchMenuItems().then(setMenuItems).catch(() => {
      setMenuItems(defaultMenuItems);
    });
  }, []);

  const toggleMenu = (label: string) => {
    setActiveMenu((current) => (current === label ? null : label));
  };

  return (
    <header className="bg-slate-900 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <button
          onClick={() => {
            setActiveMenu(null);
            onNavigate('/');
          }}
          className="flex items-center"
        >
          <img
            src="/logo.png"
            alt="Dominion Faith International Ministry"
            className="w-12 h-12 object-contain"
          />
        </button>

        <nav className="relative">
          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            {menuItems.map((item) => (
              <div key={item.href} className="relative">
                {item.submenu ? (
                  <button
                    type="button"
                    onClick={() => toggleMenu(item.label)}
                    className={`text-sm px-3 py-2 rounded-md transition-colors ${
                      currentPath === item.href
                        ? 'bg-amber-500 text-slate-900'
                        : 'text-slate-200 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenu(null);
                      onNavigate(item.href);
                    }}
                    className={`text-sm px-3 py-2 rounded-md transition-colors ${
                      currentPath === item.href
                        ? 'bg-amber-500 text-slate-900'
                        : 'text-slate-200 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                )}

                {item.submenu && activeMenu === item.label && (
                  <div className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-slate-950 border border-slate-800 shadow-2xl z-20">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.href}
                        type="button"
                        onClick={() => {
                          setActiveMenu(null);
                          onNavigate(subItem.href);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-slate-200 hover:bg-slate-800"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
