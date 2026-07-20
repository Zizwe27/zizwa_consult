const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: isProd ? "/zizwa_consult" : "",
  assetPrefix: isProd ? "/zizwa_consult/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
