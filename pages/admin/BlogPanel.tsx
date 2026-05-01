import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { getCollection, addToCollection, setDocument, deleteDocument, firebaseQuery } from '../../lib/firebase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  image_url: string;
  published_at: string;
  is_published: boolean;
}

const empty: Omit<BlogPost, 'id'> = {
  title: '', slug: '', excerpt: '', author: 'Pst. Dr. Paul C. Igwe',
  category: 'article', image_url: '', published_at: '', is_published: false,
};

const categories = ['article', 'devotional', 'teaching'];

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function BlogPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<BlogPost, 'id'>>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getCollection<BlogPost>('blog_posts', [firebaseQuery.orderBy('published_at', 'desc')])
      .then(setPosts).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setShowForm(true); };
  const openEdit = (p: BlogPost) => { const { id, ...rest } = p; setForm(rest); setEditId(id); setShowForm(true); };
  const close = () => { setShowForm(false); setEditId(null); };

  const save = async () => {
    if (!form.title) return;
    const data = { ...form, slug: form.slug || toSlug(form.title) };
    setSaving(true);
    try {
      if (editId) { await setDocument('blog_posts', editId, data); }
      else { await addToCollection('blog_posts', data); }
      load(); close();
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => { await deleteDocument('blog_posts', id); setDeleteId(null); load(); };

  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400';

  const catColors: Record<string, string> = {
    article: 'bg-blue-100 text-blue-700',
    devotional: 'bg-green-100 text-green-700',
    teaching: 'bg-amber-100 text-amber-700',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Blog Posts</h2>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg text-sm transition-colors">
          <Plus size={16} /> Add Post
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-center py-16">Loading posts...</p>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-5 flex items-start justify-between gap-4 hover:border-amber-200 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${catColors[p.category] || 'bg-gray-100 text-gray-600'}`}>{p.category}</span>
                  {!p.is_published && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Draft</span>}
                </div>
                <h3 className="font-semibold text-slate-900 truncate">{p.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{p.author} · {p.published_at}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-slate-700 hover:bg-gray-100 rounded-lg"><Pencil size={15} /></button>
                <button onClick={() => setDeleteId(p.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
          {posts.length === 0 && <p className="text-center text-gray-400 py-12">No posts yet. Add one above.</p>}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-bold text-lg">{editId ? 'Edit Post' : 'Add Post'}</h3>
              <button onClick={close}><X size={20} className="text-gray-400 hover:text-gray-700" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Title *</label>
                <input className={inp} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value, slug: toSlug(e.target.value) }))} placeholder="Post title" /></div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Slug</label>
                <input className={inp} value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} placeholder="auto-generated-from-title" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Author</label>
                  <input className={inp} value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} /></div>
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Category</label>
                  <select className={inp} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                    {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Publish Date</label>
                  <input type="date" className={inp} value={form.published_at} onChange={e => setForm(p => ({ ...p, published_at: e.target.value }))} /></div>
                <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Image URL</label>
                  <input className={inp} value={form.image_url} onChange={e => setForm(p => ({ ...p, image_url: e.target.value }))} placeholder="https://..." /></div>
              </div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Excerpt</label>
                <textarea rows={3} className={inp} value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} placeholder="Short summary..." /></div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.is_published} onChange={e => setForm(p => ({ ...p, is_published: e.target.checked }))} className="w-4 h-4 accent-amber-500" />
                <span className="text-sm font-medium text-slate-700">Published (visible on site)</span>
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
            <h3 className="font-bold text-lg mb-2">Delete this post?</h3>
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
