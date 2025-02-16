"use client";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { data: session } = useSession(); // Get auth session
  console.log("Session Data:", session); // Debug log
  const isLoggedIn = !!session; // Check if user is logged in
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (href: string) => {
    if (!isLoggedIn) {
      router.push("/login"); // Redirect if not logged in
    } else {
      router.push(href);
    }
  };

  return (
    <nav className="bg-white py-3 px-4 md:px-20 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-[#C7011A] text-3xl md:text-4xl font-extrabold font-sans">
          CherishAI
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {[
            { name: "Cards", href: "/cards" },
            { name: "Poems & Songs", href: "/poems" },
            { name: "Couple Photos", href: "/photos" },
            { name: "Video Messages", href: "/videos" },
            { name: "Scrapbook", href: "/scrapbook" },
          ].map((item, index) => (
            <span
              key={index}
              onClick={() => handleNavigation(item.href)}
              className="text-[#B491DE] text-xl font-extrabold cursor-pointer hover:text-[#8A5BBE] transition"
            >
              {item.name}
            </span>
          ))}
        </div>

        {/* Login/Logout Button */}
        <div className="hidden md:flex">
          {isLoggedIn ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })} // Redirect to home on logout
              className="bg-[#C7011A] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#8A5BBE] transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })} // Redirect to dashboard on login
              className="bg-[#8A5BBE] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#B491DE] transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-3xl text-[#C7011A]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="flex flex-col items-center mt-4 space-y-3 md:hidden">
          {[
            { name: "Cards", href: "/cards" },
            { name: "Poems & Songs", href: "/poems" },
            { name: "Couple Photos", href: "/photos" },
            { name: "Video Messages", href: "/videos" },
            { name: "Scrapbook", href: "/scrapbook" },
          ].map((item, index) => (
            <span
              key={index}
              onClick={() => handleNavigation(item.href)}
              className="text-[#B491DE] text-lg font-bold cursor-pointer hover:text-[#8A5BBE] transition"
            >
              {item.name}
            </span>
          ))}

          {/* Mobile Login/Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })} // Redirect to home on logout
              className="bg-[#C7011A] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#8A5BBE] transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })} // Redirect to dashboard on login
              className="bg-[#8A5BBE] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#B491DE] transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
