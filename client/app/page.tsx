"use client";
import React from "react";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { image } from "framer-motion/client";
import Navbar from "@/components/Navbar";

const features = [
  {
    title: "Personalized Valentine's Cards",
    description:
      "Generate custom love cards with AI-designed themes and messages.",
    buttonText: "Create a Card",
    image:
      "https://badoo.com/_next/image?url=%2Fbadoo-homepage%2Fassets%2Fconfidence.png&w=3840&q=100",
  },
  {
    title: "AI-Generated Love Poems & Songs",
    description:
      "Turn your love story into a beautiful poem or song lyrics with AI.",
    buttonText: "Generate Poem/Song",
    image:
      "https://badoo.com/_next/image?url=%2Fbadoo-homepage%2Fassets%2Fsection-safety-bg.png&w=3840&q=75",
  },
  {
    title: "Couple Photo Generator",
    description: "Upload photos and let AI create a stunning couple picture.",
    buttonText: "Create Couple Photo",
    image:
      "https://badoo.com/_next/image?url=%2Fbadoo-homepage%2Fassets%2Fsection-trust-bg.png&w=3840&q=75",
  },
  {
    title: "Romantic Video Messages",
    description: "Generate a heartfelt video message using AI-powered avatars.",
    buttonText: "Create Video Message",
    image:
      "https://badoo.com/_next/image?url=%2Fbadoo-homepage%2Fassets%2Fsection-trust-bg.png&w=3840&q=75",
  },
  {
    title: "Memory Scrapbook",
    description:
      "Compile your best moments into a digital AI-enhanced scrapbook.",
    buttonText: "Create Scrapbook",
    image:
      "https://badoo.com/_next/image?url=%2Fbadoo-homepage%2Fassets%2Fsection-trust-bg.png&w=3840&q=75",
  },
];

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-[#E9D8FF] flex flex-col md:flex-row justify-between p-4 md:p-20">
        <div className="mb-4 md:mb-0 w-full md:w-1/2">
          <div className="text-[#C7011A] text-3xl md:text-5xl font-extrabold font-sans">
            Cherish.AI helps you create personalized
          </div>
          <div className="text-xl md:text-2xl font-bold font-sans my-8">
            love cards, poems, songs, couple photos, and memory scrapbooks with
            AI!
          </div>
          <button className="flex items-center gap-2 px-5 py-2 text-white bg-black rounded-3xl hover:bg-gray-900 transition duration-300">
            <FaGoogle className="text-xl" />
            <span>Continue with Google</span>
          </button>
        </div>
        <div className="flex justify-center md:justify-center w-full md:w-1/2">
          <Image
            src={
              "https://badoo.com/_next/image?url=%2Fbadoo-homepage%2Fassets%2Fhero-image.png&w=3840&q=75"
            }
            className="w-full md:w-auto max-w-xs md:max-w-none"
            alt="Cherish.AI"
            width={800}
            height={800}
          />
        </div>
      </div>
      <div className="bg-[#F2E9FE]">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center justify-between p-4 md:p-20`}
          >
            <div className="image md:w-1/2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-3xl p-4">
              <Image
                src={feature.image}
                alt={feature.title}
                className="w-full h-auto"
                height={200}
                width={200}
              />
            </div>
            <div className="text-center p-4 md:w-1/2 md:mx-20">
              <div className="text-4xl font-bold ">{feature.title}</div>
              <div>{feature.description}</div>
            </div>
          </div>
        ))}
      </div>
      <footer className=" text-black text-center p-4">
        <div className="text-2xl font-bold">Cherishai.in</div>
        <div className="text-sm">Made with ❤️ by Team CherishAi</div>
      </footer>
    </div>
  );
};

export default LandingPage;
