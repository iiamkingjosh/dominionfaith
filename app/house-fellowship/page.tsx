export default function HouseFellowship() {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">House Fellowship / Care Units</h1>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">What It Is</h2>
        <p className="text-lg">
          House Fellowship is a small group ministry where members gather in homes for prayer, Bible study, and fellowship. Care Units provide support and care for members in need.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Locations / Centers</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Downtown Center</h3>
            <p>Address: 456 Hope Ave, City</p>
            <p>Leader: Sister Mary</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Suburb Center</h3>
            <p>Address: 789 Grace St, City</p>
            <p>Leader: Brother Paul</p>
          </div>
          {/* Add more */}
        </div>
      </section>
    </main>
  );
}