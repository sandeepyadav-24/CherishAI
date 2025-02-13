import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "badoo.com",
        port: "",
        pathname: "/_next/image",
      },
    ],
  },
};

export default nextConfig;
