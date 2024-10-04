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
import { CardStackIcon, ReaderIcon, UploadIcon } from "@radix-ui/react-icons";

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

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const { user, isLoggedIn } = useAuth() as {
    user: User;
    isLoggedIn: boolean;
  };

  if (!isLoggedIn) {
    return null;
  }

  const menuItems = [
    { icon: HomeIcon, label: "Home", href: "/" },
    { icon: CardStackIcon, label: "Cards", href: "/cards" },
    { icon: ReaderIcon, label: "Transactions", href: "/transactions" },
    { icon: UserIcon, label: "Profile", href: "/profile" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: SettingsIcon, label: "Settings", href: "/settings" },
  ];

  return (
    <div
      className={`fixed left-0 top-20 z-40 h-full w-[220px] bg-white shadow-lg lg:block`}
    >
      <div className="flex h-full flex-col py-4">
        <h2
          className={`px-4 text-center text-xl font-bold ${ubuntu.className}`}
        >
          @ FinTrack
        </h2>
        {user && (
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
    </div>
  );
};

export default Sidebar;
