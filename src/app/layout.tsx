'use client';

import { Inter } from 'next/font/google';
import '../styles/globals.css';
import SideMenu from '@/components/side-menu';
import TanstackProvider from '@/providers/TanstackProvider';
import ToastProvider from '@/providers/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <TanstackProvider>
          <SideMenu />
          <div className="mt-5 w-full max-w-[720px] px-5">{children}</div>
          <ToastProvider />
        </TanstackProvider>
      </body>
    </html>
  );
}
