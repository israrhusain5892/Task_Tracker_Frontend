// src/components/Sidebar.jsx
import React from 'react';
import { FaHome, FaTasks, FaProjectDiagram, FaChartBar } from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { MdOutlinePending } from "react-icons/md";
import { IoCloudDoneOutline } from "react-icons/io5";
import { RiProgress4Line } from "react-icons/ri";
const Sidebar = ({ isOpen, toggleSidebar }) => {

     const status=['pending','in progress','completed','AllTasks']
  return (
    <div
      className={`fixed md:static top-0 left-0 md:z-0 z-100 md:h-auto h-[100vh] bg-gray-800 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:translate-x-0  md:block w-64`}
    >
      <div className="flex items-center justify-between p-4 md:hidden">
        <h2 className="text-xl font-bold">Menu</h2>
        <button onClick={toggleSidebar} className="text-white">
          ✕
        </button>
      </div>
      <nav className="mt-10">
        <NavLink to="/taskDashboard"  className="flex items-center px-4 py-2 hover:bg-gray-700">
             <FaHome className="mr-3" /> Dashboard
        </NavLink>
       
        <NavLink to="/projects" className="flex items-center px-4 py-2 hover:bg-gray-700">
          <FaProjectDiagram className="mr-3" /> Projects
        </NavLink>
        <NavLink to={`/tasks/${status[3]}`} className="flex items-center px-4 py-2 hover:bg-gray-700">
          <FaTasks className="mr-3" /> Tasks
        </NavLink>
         <NavLink to={`/tasks/${status[0]}`} className='flex  px-4 py-2 items-center cursor-pointer hover:bg-gray-700'><MdOutlinePending className='mr-3 text-xl' /> Pending Tasks</NavLink>
          <NavLink to={`/tasks/${status[1]}`} className='flex  px-4 py-2 items-center cursor-pointer hover:bg-gray-700'><RiProgress4Line  className='mr-3 text-xl' /> In Progress Tasks</NavLink>
         <NavLink to={`/tasks/${status[2]}`} className='flex  px-4 py-2 items-center cursor-pointer hover:bg-gray-700'><IoCloudDoneOutline className='mr-3 text-xl' /> Completed Tasks</NavLink>
         
       
      </nav>
    </div>
  );
};

export default Sidebar;
