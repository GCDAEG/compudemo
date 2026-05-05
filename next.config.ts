import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc', // Autorizamos Postimages
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com', // Por si alguna vez usás Drive
      },
      {
        protocol:'https',
        hostname:'fakestoreapi.com'
      },
      {
        protocol:'https',
        hostname:'molinsdesign.com'
      },{
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
      
    ],
  },
};

export default nextConfig;