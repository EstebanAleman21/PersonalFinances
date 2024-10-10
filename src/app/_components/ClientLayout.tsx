"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ClientProviders from "./clientProviders";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <ClientProviders>
      <div className="flex min-h-screen">
        {/* Sidebar is fixed now */}
        <Sidebar isOpen={isSidebarOpen} />

        <div className="flex min-h-screen flex-1 flex-col pl-[220px]">
          {/* Navbar remains on top and fixed */}
          <Navbar toggleSidebar={toggleSidebar} />

          {/* Main content should fill the available space */}
          <main className="flex-1 overflow-clip p-10 bg-white">{children}</main>
        </div>
      </div>
    </ClientProviders>
  );
}
