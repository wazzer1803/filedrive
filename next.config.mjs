/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "proficient-pheasant-194.convex.cloud",
      },
    ],
  },
};

export default nextConfig;