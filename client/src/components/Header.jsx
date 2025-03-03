import { InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white text-gray-900 shadow-md sticky top-0 z-10">
      <div className="container mx-auto py-3 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="text-3xl bg-indigo-100 text-indigo-800 rounded-full p-2">⏳</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Time Traveler's Social Media</h1>
              <p className="text-gray-500 text-sm">Experience past and future through a social lens</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <button className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition duration-200">
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>Explore</span>
            </button>
            <button className="flex items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition duration-200">
              <InformationCircleIcon className="w-5 h-5" />
              <span>About</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;