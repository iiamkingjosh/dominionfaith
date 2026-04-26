export default function Locations() {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Locations / Branches</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Main Branch</h2>
          <p><strong>Address:</strong> 123 Faith Street, City, State</p>
          <p><strong>Pastor in Charge:</strong> Pastor John Doe</p>
          <p><strong>Service Time:</strong> Sundays 10:00 AM</p>
          <div className="mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.9!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDAuNzAwMDAw!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        {/* Add more branches */}
      </div>
    </main>
  );
}