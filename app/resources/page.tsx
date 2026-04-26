export default function Resources() {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Resources / Manuals</h1>

      <section>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Sunday School Manual</h2>
            <p className="mb-4">Comprehensive guide for Sunday School teachers.</p>
            <a href="/manuals/sunday-school.pdf" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Download</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">House Fellowship Manual</h2>
            <p className="mb-4">Guide for leading house fellowship groups.</p>
            <a href="/manuals/house-fellowship.pdf" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Download</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Training Materials</h2>
            <p className="mb-4">Various training resources for ministry workers.</p>
            <a href="/manuals/training.zip" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Download</a>
          </div>
        </div>
      </section>
    </main>
  );
}