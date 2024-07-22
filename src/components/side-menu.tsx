import Link from "next/link";
import Image from "next/image";
import React from "react";

const SideMenu: React.FC = () => {
  return (
    <div className="border border-t-0 w-fit px-4 min-h-screen">
      <ul className="pt-4">
        <li>
          <h1 className="font-bold text-2xl flex gap-2 items-center">
            <Image
              src="/logotipo.png"
              width={120}
              height={120}
              alt="Logo Lobie"
            />
          </h1>
        </li>
        <li className="pt-1 pb-3 border-b border-gray-700">
          <Link href="/" className="">
            Dashboard
          </Link>
        </li>
        <li className="py-3 border-b border-gray-700">
          <Link href="/condominios" className="">
            Gestão de Condomínios
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
