export default function MediaCenter() {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Media Center</h1>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Sermons</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Video Sermons</h3>
            <div className="space-y-4">
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Sermon Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {/* Add more videos */}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Audio Sermons</h3>
            <div className="space-y-4">
              <audio controls className="w-full">
                <source src="/sermon1.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              {/* Add more audios */}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Live Services</h2>
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/live_stream?channel=UC..."
          title="Live Service"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Photo Gallery</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <img src="/photo1.jpg" alt="Church Photo" className="w-full h-32 object-cover rounded" />
          <img src="/photo2.jpg" alt="Church Photo" className="w-full h-32 object-cover rounded" />
          {/* Add more photos */}
        </div>
      </section>
    </main>
  );
}