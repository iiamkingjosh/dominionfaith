interface NavProps {
  currentPath: string;
  onNavigate: (href: string) => void;
}

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Vision', href: '/vision' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'School of Ministry', href: '/school-of-ministry' },
  { label: 'Departments', href: '/departments' },
  { label: 'House Fellowship', href: '/house-fellowship' },
  { label: 'Media', href: '/media' },
  { label: 'Events', href: '/events' },
  { label: 'Blog', href: '/blog' },
  { label: 'Give', href: '/give' },
  { label: 'Contact', href: '/contact' },
  { label: 'Locations', href: '/locations' },
  { label: 'Live', href: '/live' },
];

export default function Nav({ currentPath, onNavigate }: NavProps) {
  return (
    <header className="bg-slate-900 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center"
        >
          <img
            src="/logo.png"
            alt="Dominion Faith International Ministry"
            className="w-12 h-12 rounded-lg border border-amber-400 bg-white/10"
          />
        </button>

        <nav className="flex flex-wrap gap-3 justify-center md:justify-end">
          {menuItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => onNavigate(item.href)}
              className={`text-sm px-3 py-2 rounded-md transition-colors ${
                currentPath === item.href
                  ? 'bg-amber-500 text-slate-900'
                  : 'text-slate-200 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
