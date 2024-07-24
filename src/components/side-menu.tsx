import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="border border-t-0 flex flex-shrink-0 w-fit px-1 min-h-screen">
      <ul className="pt-4">
        <li>
          <h1 className="px-3 font-bold text-blue-600 text-[29px] flex gap-2 items-center">
            <Link href="/">Lobie</Link>
          </h1>
        </li>
        <li
          className={`text-lg font-semibold rounded-md py-2 px-3 hover:bg-blue-600 hover:text-blue-600 hover:bg-opacity-10 ${
            pathname === "/" ? "text-blue-600 bg-blue-600 bg-opacity-10" : ""
          }`}
        >
          <Link href="/">Dashboard</Link>
        </li>
        <li
          className={`mt-[4px] text-lg font-semibold rounded-md py-2 px-3 hover:bg-blue-600 hover:text-blue-600 hover:bg-opacity-10 ${
            pathname === "/condominios"
              ? "text-blue-600 bg-blue-600 bg-opacity-10"
              : ""
          }`}
        >
          <Link href="/condominios" className="">
            Gestão de Condomínios
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;
