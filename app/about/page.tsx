export default function About() {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
        <p className="text-lg">
          Dominion Faith International Ministry was founded in [year] with a vision to spread the gospel and build a community of believers. Our history is one of growth, faith, and dedication to God's word.
        </p>
        {/* Add more history */}
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Our Beliefs</h2>
        <p className="text-lg">
          We believe in the Holy Trinity, the divinity of Christ, salvation through faith, and the power of the Holy Spirit. Our doctrinal foundation is rooted in the Bible.
        </p>
        {/* Add more beliefs */}
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Leadership</h2>
        <p className="text-lg">
          Our leadership team is committed to guiding the church with wisdom and integrity.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">General Overseer Profile</h2>
        <div className="flex flex-col md:flex-row items-center">
          <img src="/overseer.jpg" alt="General Overseer" className="w-48 h-48 rounded-full mb-6 md:mb-0 md:mr-8" />
          <div>
            <h3 className="text-2xl font-semibold mb-4">Pastor John Doe</h3>
            <p className="text-lg">
              Pastor John Doe has been leading Dominion Faith for over 20 years. His bio here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}