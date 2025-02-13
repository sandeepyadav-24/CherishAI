"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiUser, FiHeart, FiGlobe } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="bg-white py-3 px-4 md:px-20 flex flex-row justify-between ">
      <div className="text-[#C7011A]  text-3xl  md:text-4xl font-extrabold font-sans">
        ChERISH.ai
      </div>
      <div className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0">
        <span className="text-[#B491DE] mx-3 text-xl font-extrabold ">
          Cards
        </span>
        <span className="text-[#B491DE] mx-3 text-xl font-extrabold">
          Poems & Songs
        </span>
        <span className="text-[#B491DE] mx-3 text-xl font-extrabold">
          Couple Photos
        </span>
        <span className="text-[#B491DE] mx-3 text-xl font-extrabold">
          Video Messages
        </span>
        <span className="text-[#B491DE] mx-3 text-xl font-extrabold">
          Scrapbook
        </span>
      </div>
    </div>
  );
};

export default Navbar;
