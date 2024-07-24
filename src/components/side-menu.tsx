import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cva } from 'class-variance-authority';
import React from 'react';

const linkStyles = cva(
  'text-lg font-semibold rounded-md mb-[4px] py-2 px-4 hover:bg-blue-600 hover:text-blue-600 hover:bg-opacity-10',
  {
    variants: {
      active: {
        true: 'text-blue-600 bg-blue-600 bg-opacity-10',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

const menuItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/condominios', label: 'Gestão de Condomínios' },
];

const SideMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="flex min-h-screen w-fit flex-shrink-0 border border-t-0 px-1">
      <ul className="pt-4">
        <li>
          <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text px-3 text-[29px] font-bold text-transparent">
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
