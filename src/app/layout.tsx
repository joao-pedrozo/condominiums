"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import SideMenu from "@/components/side-menu";
import { Toaster } from "@/components/ui/toaster";
import TanstackProvider from "@/providers/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* TODO: Create template */}
      <body className={`${inter.className} flex`}>
        <TanstackProvider>
          <SideMenu />
          <div className="mt-5 pl-5 w-full max-w-[720px]">{children}</div>
          <Toaster />
        </TanstackProvider>
      </body>
    </html>
  );
}
