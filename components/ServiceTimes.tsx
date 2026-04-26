export default function ServiceTimes() {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Service Times & Location</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Sunday Service</h3>
            <p>10:00 AM - 12:00 PM</p>
            <p>Main Auditorium</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <p>123 Faith Street, City, State</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>
    </section>
  );
}