import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between bg-blue-500 text-white py-2 md:py-4 px-4 md:px-6 sticky top-0 z-10">
      <h2 className="text-xl md:text-2xl font-bold">BLOGG</h2>

      <div className="relative flex items-center">
        <input
          className="bg-white text-gray-700 rounded-md py-1 md:py-2 px-3 md:px-4 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          type="text"
          placeholder="Search by Author or Title"
        />
        <button className="ml-2 bg-blue-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
          Search
        </button>
      </div>

      <ul className="flex space-x-4 hidden md:flex">
        <a href="/home" className="hover:text-gray-200">
          <li className="transition-colors duration-300">Home</li>
        </a>

        <a href="/profile" className="hover:text-gray-200">
          <li className="transition-colors duration-300">Profile</li>
        </a>

        <a href="/create" className="hover:text-gray-200">
          <li className="transition-colors duration-300">Create</li>
        </a>
      </ul>

      {/* Hamburger Menu */}
      <div className="md:hidden">
        <button
          className="p-2 rounded-md bg-blue-700 text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-16 bg-blue-500 text-white rounded-md p-2 mt-2">
            <a href="/home" className="block py-1 hover:text-gray-200">
              Home
            </a>
            <a href="/profile" className="block py-1 hover:text-gray-200">
              Profile
            </a>
            <a href="/create" className="block py-1 hover:text-gray-200">
              Create
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
