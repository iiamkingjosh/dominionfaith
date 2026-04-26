export default function LatestSermon() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Latest Sermon Preview</h2>
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Walking in Faith</h3>
          <p className="mb-4">A powerful message on trusting God in every step.</p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Latest Sermon"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}