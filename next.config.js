/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/buy-orders",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
