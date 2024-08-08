import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">E-Learn Logo</span>
      </div>
      <div className="block lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="/courses">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Courses
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Dashboard
            </a>
          </Link>
          {/* Placeholder for admin-only Create Course link */}
          <Link href="/create-course">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Create Course
            </a>
          </Link>
        </div>
      </div>
      <div className="block lg:flex lg:items-center lg:w-auto">
        <button className="inline-block px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
