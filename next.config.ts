import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rxgs3mtqd5hkxooj.public.blob.vercel-storage.com",
        pathname: "/{hero,pengurus,galeri}-section/**",
      },
      {
        protocol: "https",
        hostname: "rxgs3mtqd5hkxooj.public.blob.vercel-storage.com",
        pathname: "/brand/**",
      },
    ],
  },
};

export default nextConfig;
