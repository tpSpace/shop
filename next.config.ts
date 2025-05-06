/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...other config
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
