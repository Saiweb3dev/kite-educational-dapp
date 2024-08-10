import Link from "next/link";
import React from "react";
import ConnectWallet from "./Wallet/ConnectButton";
interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="navbar bg-blue-700">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm space-y-2 dropdown-content bg-white text-blue-700 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <Link href="/Courses">
              <span>Courses</span>
            </Link>
            <Link href="/Dashboard">
              <span>Dashboard</span>
            </Link>
            <Link href="/Create_Course">
              <span>Create Course</span>
            </Link>
          </ul>
        </div>
        <Link href="/">
          <span className="btn btn-ghost text-xl">KITE_EDU</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal  space-x-6 px-1">
          <Link href="/Courses">
            <span>Courses</span>
          </Link>
          <Link href="/Dashboard">
            <span>Dashboard</span>
          </Link>
          <Link href="/Create_Course">
            <span>Create Course</span>
          </Link>
        </ul>
      </div>
      <div className="navbar-end">
       <ConnectWallet/>
      </div>
    </div>
  );
};

export default Navbar;
