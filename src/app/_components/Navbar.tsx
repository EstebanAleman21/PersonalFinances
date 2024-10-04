"use client";
import React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { UserIcon, MenuIcon } from "lucide-react";

import { Montserrat, Ubuntu as UbuntuFont } from "next/font/google";
import { useAuth } from "../context/authContext";

type User = {
  name: string;
};

const ubuntu = UbuntuFont({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const MontserratStyle = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
});

// Navbar Component
const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { user, isLoggedIn } = useAuth() as {
    user: User | null;
    isLoggedIn: boolean;
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white px-6 py-4 shadow-lg">
      {/* Hamburger Icon to Toggle Sidebar */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        {/* Logo or Brand Name */}
        <Link
          href="/"
          className={`text-2xl font-bold ${MontserratStyle.className}`}
        >
          FinTrack
        </Link>
      </div>

      {/* User Info */}
      {isLoggedIn && user?.name ? (
        <div className="flex items-center space-x-2">
          <UserIcon className="h-6 w-6" />
          <span className={`text-lg ${ubuntu.className}`}>{user.name}</span>
        </div>
      ) : (
        <Button variant="outline">Login</Button>
      )}
    </header>
  );
};

export default Navbar;
