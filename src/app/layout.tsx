"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import SideMenu from "@/components/SideMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* TODO: Create template */}
      <body className={`${inter.className} flex`}>
        <QueryClientProvider client={queryClient}>
          <SideMenu />
          <div className="mt-2">{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
