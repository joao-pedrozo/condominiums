import Link from "next/link";
import { usePathname } from "next/navigation";
import { cva } from "class-variance-authority";
import React from "react";

const linkStyles = cva(
  "text-lg font-semibold rounded-md mb-[4px] py-2 px-4 hover:bg-blue-600 hover:text-blue-600 hover:bg-opacity-10",
  {
    variants: {
      active: {
        true: "text-blue-600 bg-blue-600 bg-opacity-10",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const menuItems = [
  { href: "/", label: "Dashboard" },
  { href: "/condominios", label: "Gestão de Condomínios" },
];

const SideMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="border border-t-0 flex flex-shrink-0 w-fit px-1 min-h-screen">
      <ul className="pt-4">
        <li>
          <h1 className="px-3 font-bold text-[29px] bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            <Link href="/">Lobie</Link>
          </h1>
        </li>
        {menuItems.map(({ href, label }) => (
          <li key={href} className={linkStyles({ active: pathname === href })}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideMenu;
