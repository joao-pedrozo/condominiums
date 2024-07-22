"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import SideMenu from "@/components/side-menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

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
          <div className="mt-5 pl-5 w-full max-w-[720px]">{children}</div>
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
