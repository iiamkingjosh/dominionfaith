import Link from 'next/link';

export default function QuickButtons() {
  return (
    <section className="py-16 bg-blue-100">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/live-stream" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Watch Live
          </Link>
          <Link href="/give-online" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Give
          </Link>
          <Link href="/contact-us" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
            Join Us
          </Link>
        </div>
      </div>
    </section>
  );
}