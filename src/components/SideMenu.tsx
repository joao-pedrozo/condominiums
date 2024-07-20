import React from "react";

const SideMenu: React.FC = () => {
  return (
    <div className="border w-fit px-4 min-h-screen">
      <ul className="">
        <li className="mt-2">
          <h1 className="font-bold text-2xl">Gestão Condomínios</h1>
        </li>
        <li className="pt-1 pb-3 border-b border-gray-700">
          <a href="#" className="">
            Dashboard
          </a>
        </li>
        <li className="py-3 border-b border-gray-700">
          <a href="#" className="">
            Condomínios
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
