/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  MenuIcon,
  LayoutDashboard,
} from "lucide-react";

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

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, isLoggedIn } = useAuth() as {
    user: User | null;
    isLoggedIn: boolean;
  };

  if (!isLoggedIn) {
    return null;
  }

  const menuItems = [
    { icon: HomeIcon, label: "Home", href: "/" },
    { icon: UserIcon, label: "Profile", href: "/profile" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: SettingsIcon, label: "Settings", href: "/settings" },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col rounded-2xl bg-blue-50 py-4 shadow-lg">
      <h2
        className={`px-4 text-center text-xl font-bold tracking-tight ${ubuntu.className}`}
      >
        @ FinTrack
      </h2>
      {user?.name && (
        <p className={`px-4 text-center text-sm ${ubuntu.className}`}>
          Welcome, {user.name}
        </p>
      )}
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className="my-5 flex w-full items-center space-x-3 px-4 py-2 text-lg font-medium"
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-5 w-5 text-gray-500" />
              <span className={`${MontserratStyle.className}`}>
                {item.label}
              </span>
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-5 w-5 text-gray-600" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[220px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden h-screen w-[220px] flex-col bg-white shadow-lg lg:flex">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
