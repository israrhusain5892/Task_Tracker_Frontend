// src/components/Navbar.jsx
import React from 'react';
import { FaBars } from 'react-icons/fa';
import Avatar from './Avatar';
import { useGlobalContext } from '../Context/GlobalContext';
const Navbar = ({ toggleSidebar }) => {
     const{user}=useGlobalContext();
  return (
    <header className="bg-white z-[100px]  shadow-md p-4 flex items-center w-full justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 focus:outline-none md:hidden"
        >
          <FaBars size={24} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 ml-4">Task Tracker</h1>
      </div>
      <div className='mr-4'>
        {/* Add user profile or other items here */}
        <Avatar name={user?.name} user={user}/>
      </div>
    </header>
  );
};

export default Navbar;
