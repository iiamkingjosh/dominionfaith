import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Dominion Faith International Ministry
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>

          <li className="relative group">
            <span className="cursor-pointer hover:underline">About</span>
            <ul className="absolute left-0 top-full mt-2 hidden w-48 rounded bg-white text-blue-900 shadow-lg group-hover:block">
              <li>
                <Link href="/vision-mission" className="block px-4 py-3 hover:bg-blue-100">
                  Vision
                </Link>
              </li>
            </ul>
          </li>

          <li className="relative group">
            <span className="cursor-pointer hover:underline">Ministries</span>
            <ul className="absolute left-0 top-full mt-2 hidden w-64 rounded bg-white text-blue-900 shadow-lg group-hover:block">
              <li>
                <Link href="/leadership" className="block px-4 py-3 hover:bg-blue-100">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/school-of-ministry" className="block px-4 py-3 hover:bg-blue-100">
                  School of Ministry
                </Link>
              </li>
              <li>
                <Link href="/departments" className="block px-4 py-3 hover:bg-blue-100">
                  Departments
                </Link>
              </li>
              <li>
                <Link href="/house-fellowship" className="block px-4 py-3 hover:bg-blue-100">
                  House Care Fellowship
                </Link>
              </li>
            </ul>
          </li>

          <li className="relative group">
            <span className="cursor-pointer hover:underline">Media</span>
            <ul className="absolute left-0 top-full mt-2 hidden w-48 rounded bg-white text-blue-900 shadow-lg group-hover:block">
              <li>
                <Link href="/events" className="block px-4 py-3 hover:bg-blue-100">
                  Events
                </Link>
              </li>
            </ul>
          </li>

          <li className="relative group">
            <span className="cursor-pointer hover:underline">Blog</span>
            <ul className="absolute left-0 top-full mt-2 hidden w-48 rounded bg-white text-blue-900 shadow-lg group-hover:block">
              <li>
                <Link href="/give-online" className="block px-4 py-3 hover:bg-blue-100">
                  Give
                </Link>
              </li>
            </ul>
          </li>

          <li className="relative group">
            <span className="cursor-pointer hover:underline">Contact</span>
            <ul className="absolute left-0 top-full mt-2 hidden w-48 rounded bg-white text-blue-900 shadow-lg group-hover:block">
              <li>
                <Link href="/locations" className="block px-4 py-3 hover:bg-blue-100">
                  Locations
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
