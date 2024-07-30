/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/reports',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/reports',
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
