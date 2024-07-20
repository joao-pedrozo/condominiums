import React from "react";

const SideMenu: React.FC = () => {
  return (
    <div className="border text-white w-64 min-h-screen">
      <ul className="">
        <li className="px-6 py-3 border-b border-gray-700">
          <a href="#" className="text-black hover:text-white">
            Home
          </a>
        </li>
        <li className="px-6 py-3 border-b border-gray-700">
          <a href="#" className="text-black hover:text-white">
            About
          </a>
        </li>
        <li className="px-6 py-3 border-b border-gray-700">
          <a href="#" className="text-black hover:text-white">
            Services
          </a>
        </li>
        <li className="px-6 py-3 border-b border-gray-700">
          <a href="#" className="text-black hover:text-white">
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
