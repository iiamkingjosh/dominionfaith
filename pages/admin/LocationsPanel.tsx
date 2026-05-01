import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check, Star } from 'lucide-react';
import { getCollection, addToCollection, setDocument, deleteDocument, firebaseQuery } from '../../lib/firebase';

interface ServiceTime { day: string; time: string; }
interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pastor_name: string;
  service_times: ServiceTime[];
  phone: string;
  email: string;
  google_maps_url: string;
  is_headquarters: boolean;
}

const empty: Omit<Location, 'id'> = {
  name: '', address: '', city: '', state: '', country: 'Nigeria',
  pastor_name: '', service_times: [{ day: 'Sunday', time: '10:00 AM' }],
  phone: '', email: '', google_maps_url: '', is_headquarters: false,
};

export default function LocationsPanel() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Location, 'id'>>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getCollection<Location>('locations', [firebaseQuery.orderBy('is_headquarters', 'desc')])
      .then(setLocations).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setShowForm(true); };
  const openEdit = (l: Location) => { const { id, ...rest } = l; setForm(rest); setEditId(id); setShowForm(true); };
  const close = () => { setShowForm(false); setEditId(null); };

  const save = async () => {
    if (!form.name) return;
    setSaving(true);
    try {
      if (editId) { await setDocument('locations', editId, form); }
      else { await addToCollection('locations', form); }
      load(); close();
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => { await deleteDocument('locations', id); setDeleteId(null); load(); };

  const addServiceTime = () => setForm(p => ({ ...p, service_times: [...p.service_times, { day: '', time: '' }] }));
  const removeServiceTime = (i: number) => setForm(p => ({ ...p, service_times: p.service_times.filter((_, idx) => idx !== i) }));
  const updateServiceTime = (i: number, field: keyof ServiceTime, val: string) =>
    setForm(p => ({ ...p, service_times: p.service_times.map((st, idx) => idx === i ? { ...st, [field]: val } : st) }));

  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Locations</h2>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg text-sm transition-colors">
          <Plus size={16} /> Add Location
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-center py-16">Loading locations...</p>
      ) : (
        <div className="space-y-3">
          {locations.map((l) => (
            <div key={l.id} className="bg-white border border-gray-100 rounded-xl p-5 flex items-start justify-between gap-4 hover:border-amber-200 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {l.is_headquarters && <Star size={13} className="text-amber-500 fill-amber-500 shrink-0" />}
                  <h3 className="font-semibold text-slate-900 truncate">{l.name}</h3>
                </div>
                <p className="text-sm text-amber-600">{l.pastor_name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{l.address}, {l.city}, {l.state}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(l)} className="p-2 text-gray-400 hover:text-slate-700 hover:bg-gray-100 rounded-lg"><Pencil size={15} /></button>
                <button onClick={() => setDeleteId(l.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
          {locations.length === 0 && <p className="text-center text-gray-400 py-12">No locations yet. Add one above.</p>}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-bold text-lg">{editId ? 'Edit Location' : 'Add Location'}</h3>
              <button onClick={close}><X size={20} className="text-gray-400 hover:text-gray-700" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Branch Name *</label>
                <input className={inp} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. DFIM Lagos" /></div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Pastor</label>
                <input className={inp} value={form.pastor_name} onChange={e => setForm(p => ({ ...p, pastor_name: e.target.value }))} /></div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Address</label>
                <input className={inp} value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">City</label>
                  <input className={inp} value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} /></div>
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">State</label>
                  <input className={inp} value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} /></div>
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Country</label>
                  <input className={inp} value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Phone</label>
                  <input className={inp} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} /></div>
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Email</label>
                  <input type="email" className={inp} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /></div>
              </div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Google Maps URL</label>
                <input className={inp} value={form.google_maps_url} onChange={e => setForm(p => ({ ...p, google_maps_url: e.target.value }))} placeholder="https://maps.google.com/..." /></div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Times</label>
                  <button type="button" onClick={addServiceTime} className="text-xs text-amber-600 font-semibold hover:text-amber-700">+ Add</button>
                </div>
                <div className="space-y-2">
                  {form.service_times.map((st, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input className={inp} value={st.day} onChange={e => updateServiceTime(i, 'day', e.target.value)} placeholder="Day" />
                      <input className={inp} value={st.time} onChange={e => updateServiceTime(i, 'time', e.target.value)} placeholder="Time" />
                      <button type="button" onClick={() => removeServiceTime(i)} className="text-gray-400 hover:text-red-500 shrink-0"><X size={15} /></button>
                    </div>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.is_headquarters} onChange={e => setForm(p => ({ ...p, is_headquarters: e.target.checked }))} className="w-4 h-4 accent-amber-500" />
                <span className="text-sm font-medium text-slate-700">This is the Headquarters</span>
              </label>
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button onClick={close} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg">Cancel</button>
              <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-900 font-semibold rounded-lg text-sm">
                <Check size={15} /> {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <Trash2 size={36} className="text-red-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Delete this location?</h3>
            <p className="text-gray-500 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2 border border-gray-200 rounded-lg text-sm text-gray-600">Cancel</button>
              <button onClick={() => remove(deleteId)} className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
