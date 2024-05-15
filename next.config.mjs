/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "utfs.io" },
      { hostname: "i.imgur.com" },
      { hostname: "img.freepik.com" },
    ],
  },
};

export default nextConfig;
