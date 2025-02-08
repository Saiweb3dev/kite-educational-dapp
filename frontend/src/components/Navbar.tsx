"use client"
import Link from "next/link";
import React,{useState} from "react";
import ConnectWallet from "./Wallet/ConnectButton";
import { useAccount } from "wagmi";
interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {

  const { isConnected } = useAccount(); // Hook to check if the wallet is connected
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isConnected) {
      e.preventDefault(); // Prevent default link behavior
      setShowModal(true); // Show the modal
    }
  };

  return (
    <div className="navbar bg-blue-900">
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
            <Link href="/Courses" onClick={handleLinkClick}>
              <span>Courses</span>
            </Link>
            <Link href="/Dashboard" onClick={handleLinkClick}>
              <span>Dashboard</span>
            </Link>
            <Link href="/Create_Course" onClick={handleLinkClick}>
              <span>Create Course</span>
            </Link>
          </ul>
        </div>
        <Link href="/">
          <span className="btn btn-ghost text-xl">De-Learn</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal  space-x-6 px-1">
          <Link href="/Courses" onClick={handleLinkClick}>
            <span>Courses</span>
          </Link>
          <Link href="/Dashboard" onClick={handleLinkClick}>
            <span>Dashboard</span>
          </Link>
          <Link href="/Create_Course" onClick={handleLinkClick}>
            <span>Create Course</span>
          </Link>
        </ul>
      </div>
      <div className="navbar-end">
       <ConnectWallet/>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-xs space-y-4">
            <h2 className="text-xl font-semibold">Connect Wallet</h2>
            <p className="text-black">Please connect your wallet to access this feature.</p>
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition duration-300 w-full"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    
  );
  
};

export default Navbar;
