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

  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,

  sassOptions: {
    includePaths: [path.join(__dirname, "src/sass")],
  },
};

module.exports = nextConfig;
