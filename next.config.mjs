/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/reports",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
