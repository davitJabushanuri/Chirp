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

  sassOptions: {
    includePaths: [path.join(__dirname, "src/sass")],
  },
};

const { withAxiom } = require("next-axiom");

module.exports = withAxiom(nextConfig);
