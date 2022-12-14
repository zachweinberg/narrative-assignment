/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: ["./src/styles"],
    prependData: `@import "variables.scss";`,
  },
  images: {
    domains: ["picsum.photos"],
  },
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
