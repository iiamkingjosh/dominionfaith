export default function SchoolOfMinistry() {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">School of Ministry (SoM)</h1>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Overview</h2>
        <p className="text-lg">
          The School of Ministry is designed to equip believers with biblical knowledge and practical skills for ministry.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Programs</h2>
        <ul className="list-disc list-inside text-lg">
          <li>Biblical Studies</li>
          <li>Leadership Training</li>
          <li>Missions</li>
          <li>Worship Ministry</li>
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Admission Process</h2>
        <p className="text-lg">
          To apply, submit your application form and attend an interview. Requirements include a letter of recommendation and commitment to the program.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Registration</h2>
        <p className="text-lg mb-4">
          Register for the next session.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Register Now
        </button>
      </section>
    </main>
  );
}