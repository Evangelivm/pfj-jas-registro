/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // distDir: "dist",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/registro",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
