/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname:"quaint-oyster-954.convex.cloud",
      },
    ],
  },
};

export default nextConfig;