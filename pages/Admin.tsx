import { useState, useEffect } from 'react';
import { LogOut, Mic, Calendar, BookOpen, MapPin, Layout, LayoutDashboard, Eye, EyeOff } from 'lucide-react';
import { onAuthChange, loginAdmin, logoutAdmin } from '../lib/auth';
import SermonsPanel from './admin/SermonsPanel';
import EventsPanel from './admin/EventsPanel';
import BlogPanel from './admin/BlogPanel';
import LocationsPanel from './admin/LocationsPanel';
import PageContentPanel from './admin/PageContentPanel';
import type { User } from 'firebase/auth';

type Section = 'dashboard' | 'sermons' | 'events' | 'blog' | 'locations' | 'pages';

const navItems: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard',  label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'sermons',    label: 'Sermons',        icon: Mic },
  { id: 'events',     label: 'Events',         icon: Calendar },
  { id: 'blog',       label: 'Blog',           icon: BookOpen },
  { id: 'locations',  label: 'Locations',      icon: MapPin },
  { id: 'pages',      label: 'Page Content',   icon: Layout },
];

function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h2>
      <p className="text-gray-500 mb-8">Manage your church content from here. Choose a section from the sidebar.</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {navItems.filter(n => n.id !== 'dashboard').map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-amber-200 hover:shadow-sm transition-all">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
              <item.icon size={20} className="text-amber-600" />
            </div>
            <p className="font-semibold text-slate-900">{item.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">Manage {item.label.toLowerCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true); setError('');
    try {
      await loginAdmin(email, password);
      onLogin();
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
            <span className="text-slate-900 font-bold text-xl">D</span>
          </div>
          <h1 className="text-2xl font-bold text-white">DFIM Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage your content</p>
        </div>

        <form onSubmit={submit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="admin@dfim.org"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-900 font-bold rounded-xl transition-colors mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [section, setSection] = useState<Section>('dashboard');

  useEffect(() => {
    const unsub = onAuthChange((u) => { setUser(u); setAuthLoading(false); });
    return unsub;
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <LoginPage onLogin={() => {}} />;

  const renderSection = () => {
    switch (section) {
      case 'sermons':   return <SermonsPanel />;
      case 'events':    return <EventsPanel />;
      case 'blog':      return <BlogPanel />;
      case 'locations': return <LocationsPanel />;
      case 'pages':     return <PageContentPanel />;
      default:          return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 flex flex-col shrink-0">
        <div className="px-5 py-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-slate-900 font-bold text-sm">D</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">DFIM Admin</p>
              <p className="text-gray-500 text-xs">Content Manager</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-amber-500 text-slate-900'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <item.icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-slate-800">
          <div className="px-3 py-2 mb-2">
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => logoutAdmin()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-slate-800 transition-all"
          >
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto p-8">
        {renderSection()}
      </main>
    </div>
  );
}
