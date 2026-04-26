export default function Events() {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Events</h1>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Prayer Meeting</h3>
            <p>Date: January 15, 2025</p>
            <p>Time: 7:00 PM</p>
            <p>Location: Main Auditorium</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Bible Study</h3>
            <p>Date: January 20, 2025</p>
            <p>Time: 6:00 PM</p>
            <p>Location: Fellowship Hall</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Youth Conference</h3>
            <p>Date: February 1, 2025</p>
            <p>Time: 9:00 AM</p>
            <p>Location: Convention Center</p>
          </div>
        </div>
      </section>
    </main>
  );
}