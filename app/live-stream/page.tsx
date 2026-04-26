export default function LiveStream() {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Live Stream</h1>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Watch Our Live Services</h2>
        <div className="max-w-4xl mx-auto">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/live_stream?channel=UC..."
            title="Live Stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="mt-4 text-lg">
          Join us live every Sunday at 10:00 AM and 6:00 PM.
        </p>
      </section>
    </main>
  );
}