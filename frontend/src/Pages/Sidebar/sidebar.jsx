import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Static sidebar space to show open button always */}
      <div className="fixed top-0 left-0 h-screen w-14 bg-gray-900 z-20 flex items-center justify-center lg:hidden">
        <button
          onClick={toggleSidebar}
          className="text-white text-xl focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Actual Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white z-30 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:block w-64`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-white text-xl">
            <FaTimes />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center py-6 border-b border-gray-700 px-4">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-gray-300"
          />
          <p className="text-lg font-semibold mt-2">John Doe</p>
          <p className="text-sm text-gray-400">johndoe@example.com</p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col px-4 space-y-2">
          <Link
            to="/"
            className="flex items-center p-3 rounded hover:bg-gray-700"
          >
            <FaHome className="mr-3" /> Home
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center p-3 rounded hover:bg-gray-700"
          >
            <FaUser className="mr-3" /> Dashboard
          </Link>
          <Link
            to="/member"
            className="flex items-center p-3 rounded hover:bg-gray-700"
          >
            <FaCog className="mr-3" /> Member
          </Link>
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 text-center text-sm text-gray-500">
          © 2025 My Dashboard
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
        />
      )}
    </div>
  );
};

export default Sidebar;
