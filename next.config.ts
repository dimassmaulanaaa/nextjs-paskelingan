import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rxgs3mtqd5hkxooj.public.blob.vercel-storage.com",
        pathname: "/{hero,pengurus,galeri}-section/**",
      },
    ],
  },
};

export default nextConfig;
