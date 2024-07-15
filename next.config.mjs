/** @type {import('next').NextConfig} */
import i18n from "./next-i18next.config.mjs";

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  i18n,
  images: {
    domains: ["localhost", "127.0.0.1"],
  },
};

export default nextConfig;
