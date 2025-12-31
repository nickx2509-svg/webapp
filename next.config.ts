/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // simple domains (Google profile pics etc.)
    domains: ["lh3.googleusercontent.com"],

    // advanced remote patterns (Unsplash etc.)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
