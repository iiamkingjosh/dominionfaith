export default function Departments() {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Departments / Units</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Choir</h2>
          <p>Leading worship through music and song.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Ushering</h2>
          <p>Welcoming and guiding members during services.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Media</h2>
          <p>Handling audio, video, and live streaming.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Prayer Unit</h2>
          <p>Interceding for the church and community.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Hospital and Prison</h2>
          <p>Ministering to those in hospitals and prisons.</p>
        </div>
      </div>
    </main>
  );
}