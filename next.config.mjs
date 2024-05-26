/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // distDir: "dist",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/menu",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
