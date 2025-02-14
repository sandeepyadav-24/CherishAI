import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
const Hero = () => {
  return (
    <div className="bg-[#E9D8FF] flex flex-col md:flex-row justify-between p-6 md:p-20 items-center">
      {/* Left Content */}
      <div className="mb-8 md:mb-0 w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-[#C7011A] text-3xl md:text-5xl font-extrabold font-sans leading-tight">
          Cherish.AI helps you create personalized
        </h1>
        <p className="text-xl md:text-2xl font-bold font-sans my-6">
          Love cards, poems, songs, couple photos, and memory scrapbooks with
          AI!
        </p>
        <button className="flex items-center gap-2 px-5 py-2 text-white bg-black rounded-3xl hover:bg-gray-900 transition duration-300 mx-auto md:mx-0">
          <FaGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>
      </div>

      {/* Right Image */}
      <div className="flex justify-center md:w-1/2">
        <Image
          src="https://badoo.com/_next/image?url=%2Fbadoo-homepage%2Fassets%2Fhero-image.png&w=3840&q=75"
          className="w-full max-w-md md:max-w-lg h-auto object-cover"
          alt="Cherish.AI"
          width={800}
          height={800}
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
