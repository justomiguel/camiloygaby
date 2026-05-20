import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita HTTP 431 cuando el navegador envía muchas cookies en localhost
  reactMaxHeadersLength: 32768,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
