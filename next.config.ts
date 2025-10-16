import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // The protocol (e.g., 'https' or 'http')
        hostname: 'files.stripe.com', // The hostname of the remote image source
        port: '', // Optional: Specify a port if needed, otherwise an empty string
      },
    ],
  },
};

export default nextConfig;
