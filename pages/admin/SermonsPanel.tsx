import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check, Star } from 'lucide-react';
import { getCollection, addToCollection, setDocument, deleteDocument, firebaseQuery } from '../../lib/firebase';

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  description: string;
  video_url: string;
  audio_url: string;
  series: string;
  preached_at: string;
  is_featured: boolean;
}

const empty: Omit<Sermon, 'id'> = {
  title: '', preacher: 'Pst. Dr. Paul C. Igwe', description: '',
  video_url: '', audio_url: '', series: '', preached_at: '', is_featured: false,
};

export default function SermonsPanel() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Sermon, 'id'>>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getCollection<Sermon>('sermons', [firebaseQuery.orderBy('preached_at', 'desc')])
      .then(setSermons).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setShowForm(true); };
  const openEdit = (s: Sermon) => {
    const { id, ...rest } = s;
    setForm(rest); setEditId(id); setShowForm(true);
  };
  const close = () => { setShowForm(false); setEditId(null); };

  const save = async () => {
    if (!form.title || !form.preached_at) return;
    setSaving(true);
    try {
      if (editId) {
        await setDocument('sermons', editId, form);
      } else {
        await addToCollection('sermons', form);
      }
      load(); close();
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    await deleteDocument('sermons', id);
    setDeleteId(null); load();
  };

  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Sermons</h2>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg text-sm transition-colors">
          <Plus size={16} /> Add Sermon
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-center py-16">Loading sermons...</p>
      ) : (
        <div className="space-y-3">
          {sermons.map((s) => (
            <div key={s.id} className="bg-white border border-gray-100 rounded-xl p-5 flex items-start justify-between gap-4 hover:border-amber-200 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {s.is_featured && <Star size={13} className="text-amber-500 fill-amber-500 shrink-0" />}
                  <h3 className="font-semibold text-slate-900 truncate">{s.title}</h3>
                </div>
                <p className="text-sm text-amber-600">{s.preacher}</p>
                {s.series && <p className="text-xs text-gray-400 mt-0.5">{s.series} · {s.preached_at}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(s)} className="p-2 text-gray-400 hover:text-slate-700 hover:bg-gray-100 rounded-lg transition-colors"><Pencil size={15} /></button>
                <button onClick={() => setDeleteId(s.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
          {sermons.length === 0 && <p className="text-center text-gray-400 py-12">No sermons yet. Add one above.</p>}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-bold text-lg">{editId ? 'Edit Sermon' : 'Add Sermon'}</h3>
              <button onClick={close}><X size={20} className="text-gray-400 hover:text-gray-700" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Title *</label>
                <input className={inp} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Sermon title" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Preacher</label>
                  <input className={inp} value={form.preacher} onChange={e => setForm(p => ({ ...p, preacher: e.target.value }))} /></div>
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Date *</label>
                  <input type="date" className={inp} value={form.preached_at} onChange={e => setForm(p => ({ ...p, preached_at: e.target.value }))} /></div>
              </div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Series</label>
                <input className={inp} value={form.series} onChange={e => setForm(p => ({ ...p, series: e.target.value }))} placeholder="e.g. Dominion Series" /></div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Video URL (YouTube Embed)</label>
                <input className={inp} value={form.video_url} onChange={e => setForm(p => ({ ...p, video_url: e.target.value }))} placeholder="https://www.youtube.com/embed/..." /></div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Audio URL</label>
                <input className={inp} value={form.audio_url} onChange={e => setForm(p => ({ ...p, audio_url: e.target.value }))} placeholder="https://..." /></div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Description</label>
                <textarea rows={3} className={inp} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Brief description..." /></div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={e => setForm(p => ({ ...p, is_featured: e.target.checked }))} className="w-4 h-4 accent-amber-500" />
                <span className="text-sm font-medium text-slate-700">Feature this sermon on the home page</span>
              </label>
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button onClick={close} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg">Cancel</button>
              <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-900 font-semibold rounded-lg text-sm">
                <Check size={15} /> {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <Trash2 size={36} className="text-red-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-slate-900 mb-2">Delete this sermon?</h3>
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
