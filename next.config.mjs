/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow github.usercontent.com to be used as image source
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

export default nextConfig;
