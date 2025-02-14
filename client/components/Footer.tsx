import React from "react";
import Link from "next/link";

import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6 md:px-24 flex flex-col md:flex-row justify-between items-center">
      {/* Left Section */}
      <div className="text-sm md:text-base">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">ChERISHai.in</span>. All
        rights reserved.
      </div>

      {/* Right Section (Social Media) */}
      <div className="flex flex-col md:flex-row items-center md:space-x-6 mt-4 md:mt-0">
        <h3 className="text-white font-medium mb-2 md:mb-0">Connect with us</h3>
        <div className="flex space-x-5">
          <Link
            href="https://www.linkedin.com/in/sandeep-yadav-027500219/"
            target="_blank"
          >
            <div className="transition-transform transform hover:scale-110 text-gray-400 hover:text-blue-500">
              <FaLinkedin size={28} />
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/sandeepyadav.24/"
            target="_blank"
          >
            <div className="transition-transform transform hover:scale-110 text-gray-400 hover:text-pink-500">
              <FaInstagram size={28} />
            </div>
          </Link>
          <Link href="https://x.com/sandeepyadav_24" target="_blank">
            <div className="transition-transform transform hover:scale-110 text-gray-400 hover:text-blue-400">
              <FaTwitter size={28} />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
