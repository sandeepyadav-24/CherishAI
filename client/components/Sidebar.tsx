"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const isLoggedIn = !!session; // Check if user is logged in
  const userEmail = session?.user?.email || "Guest"; // Get user email

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-[#8A5BBE] h-screen w-64 p-5 fixed left-0 top-0 z-50 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <div>
          {/* Close Button for Mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden absolute right-4 top-4 text-white text-2xl"
          >
            <FiX />
          </button>

          {/* Logo */}
          <h2 className="text-[#C6021A] text-2xl font-bold mb-6">
            <Link href={"/dashboard"}>CherishAI</Link>
          </h2>

          {/* Sidebar Links */}
          <ul className="space-y-4">
            {[
              { name: "Poems & Songs", href: "/dashboard/poems" },
              { name: "Video Message", href: "/dashboard/videos" },
              { name: "Scrap Book", href: "/dashboard/scrapbook" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="block text-white text-lg font-semibold hover:bg-[#B491DE] p-2 rounded-md transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User Info & Logout (Fixed at Bottom) */}
        <div className="mt-auto">
          {isLoggedIn && (
            <div className="bg-[#B491DE] p-3 rounded-md text-center text-white mb-4">
              <FiUser className="inline-block mr-2 text-xl" />
              <p className="text-sm">Welcome,</p>
              <p className="font-semibold text-sm truncate w-full overflow-hidden">
                {userEmail}
              </p>
            </div>
          )}

          {isLoggedIn && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })} // Redirect to landing page after logout
              className="w-full bg-[#C7011A] text-white text-lg font-semibold py-2 flex items-center justify-center rounded-md hover:bg-red-700 transition"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 text-[#8A5BBE] text-3xl z-50"
      >
        <FiMenu />
      </button>
    </div>
  );
};

export default Sidebar;
