import { useState, useEffect } from 'react';
import { Calendar, User, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  image_url: string;
  published_at: string;
}

const categories = ['all', 'article', 'devotional', 'teaching'];

interface BlogProps {
  searchParams?: URLSearchParams;
}

export default function Blog({ searchParams }: BlogProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const initialCat = searchParams?.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCat);

  useEffect(() => {
    let query = supabase.from('blog_posts').select('*').eq('is_published', true).order('published_at', { ascending: false });
    if (activeCategory !== 'all') {
      query = query.eq('category', activeCategory);
    }
    query.then(({ data }) => {
      if (data) setPosts(data);
      setLoading(false);
    });
  }, [activeCategory]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const categoryLabel: Record<string, string> = {
    article: 'Article',
    devotional: 'Devotional',
    teaching: 'Teaching',
  };

  const categoryColors: Record<string, string> = {
    article: 'bg-blue-100 text-blue-700',
    devotional: 'bg-green-100 text-green-700',
    teaching: 'bg-amber-100 text-amber-700',
  };

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section
        className="relative py-32"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 100%), url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Words of Life</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">Blog</h1>
          <p className="text-gray-300 text-xl leading-relaxed">
            Articles, devotionals, and teachings to nourish your faith and ignite your purpose.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Posts' : categoryLabel[cat]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-gray-400 text-center py-16">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-400 text-center py-16">No posts in this category yet.</p>
          ) : (
            <>
              {/* Featured */}
              {featuredPost && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  <div className="rounded-2xl overflow-hidden shadow-xl h-72 bg-slate-100">
                    {featuredPost.image_url ? (
                      <img src={featuredPost.image_url} alt={featuredPost.title} className="w-full h-full object-cover" />
                    ) : (
                      <div
                        className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center"
                      >
                        <span className="text-amber-400 text-6xl font-bold opacity-30">{featuredPost.title.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[featuredPost.category] || 'bg-gray-100 text-gray-700'}`}>
                        {categoryLabel[featuredPost.category] || featuredPost.category}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold uppercase">Featured</span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">{featuredPost.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-5">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-5 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5"><User size={14} className="text-amber-500" />{featuredPost.author}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} className="text-amber-500" />{formatDate(featuredPost.published_at)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Rest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                    <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                      {post.image_url ? (
                        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <span className="text-amber-400 text-5xl font-bold opacity-30">{post.title.charAt(0)}</span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag size={13} className="text-amber-500" />
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                          {categoryLabel[post.category] || post.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2 leading-tight group-hover:text-amber-600 transition-colors">{post.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-gray-100 pt-4">
                        <span className="flex items-center gap-1"><User size={12} />{post.author}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(post.published_at)}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
