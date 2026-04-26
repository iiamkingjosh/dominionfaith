export default function Leadership() {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Leadership</h1>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">General Overseer</h2>
        <div className="flex flex-col md:flex-row items-center">
          <img src="/overseer.jpg" alt="General Overseer" className="w-48 h-48 rounded-full mb-6 md:mb-0 md:mr-8" />
          <div>
            <h3 className="text-2xl font-semibold mb-4">Pastor John Doe</h3>
            <p className="text-lg">
              Bio of the General Overseer.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Resident Pastor(s)</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <img src="/pastor1.jpg" alt="Resident Pastor 1" className="w-32 h-32 rounded-full mb-4" />
            <h3 className="text-xl font-semibold">Pastor Jane Smith</h3>
            <p>Bio</p>
          </div>
          {/* Add more pastors */}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Ministers / Workers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <img src="/minister1.jpg" alt="Minister 1" className="w-24 h-24 rounded-full mb-4 mx-auto" />
            <h3 className="text-lg font-semibold">Minister A</h3>
            <p>Role</p>
          </div>
          {/* Add more ministers */}
        </div>
      </section>
    </main>
  );
}