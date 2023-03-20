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
    appDir: true,
    scrollRestoration: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/sass")],
  },
};

module.exports = nextConfig;
