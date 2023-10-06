/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hbrhodokmkprrksqwoph.supabase.co",
      },
    ],
  },

  experimental: {
    scrollRestoration: true,
    serverActions: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/sass")],
  },
};

module.exports = nextConfig;
