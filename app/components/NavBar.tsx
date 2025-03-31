"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Button } from "@/components/ui/button";

function NavBar() {
  const CurrentPath = usePathname();

  const Navlist = [
    { label: "Home", href: "/" },
    { label: "Patient List", href: "/patient" },
    { label: "Add Patient", href: "/patient/add" },
  ];

  return (
    <nav className="border-b bg-gray-100 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left Aligned Links */}
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="flex items-center text-xl font-bold text-gray-800"
          >
            <AiFillBug className="mr-2 text-2xl" />
            AutoMed
          </Link>
          <ul className="flex space-x-4">
            {Navlist.map((list) => (
              <li key={list.label}>
                <Link
                  href={list.href}
                  className={`rounded-md px-4 py-2 transition-transform ${
                    CurrentPath === list.href
                      ? "scale-105 transform bg-gray-800 text-white shadow-lg"
                      : "text-black-700 bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  {list.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Aligned Button */}
        <div>
          <Link href="/login">
            <Button
              size="lg"
              className="rounded-md px-4 py-2 font-semibold shadow-md transition-all"
            >
              Sign In / Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
