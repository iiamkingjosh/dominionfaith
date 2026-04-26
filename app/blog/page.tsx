export default function Blog() {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Blog / Teachings</h1>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Articles</h2>
        <div className="space-y-6">
          <article className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Faith in Action</h3>
            <p className="text-gray-600 mb-4">Published on Jan 1, 2025</p>
            <p>Excerpt of the article...</p>
            <a href="#" className="text-blue-600 hover:underline">Read More</a>
          </article>
          {/* Add more articles */}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Devotionals</h2>
        <div className="space-y-6">
          <article className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Daily Devotional</h3>
            <p className="text-gray-600 mb-4">Jan 1, 2025</p>
            <p>Scripture and reflection...</p>
          </article>
          {/* Add more */}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Teachings</h2>
        <div className="space-y-6">
          <article className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">The Power of Prayer</h3>
            <p className="text-gray-600 mb-4">Jan 1, 2025</p>
            <p>Teaching notes...</p>
          </article>
          {/* Add more */}
        </div>
      </section>
    </main>
  );
}