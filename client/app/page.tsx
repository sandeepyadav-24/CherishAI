import React from "react";
import Navbar from "@/components/Navbar";
import { Feature } from "@/components/ui/feature";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

const LandingPage = () => {
  return (
    <div>
      {/* Navbar*/}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/** Feature Section  */}
      <Feature />

      {/* Footer Section  */}
      <Footer />
    </div>
  );
};

export default LandingPage;
