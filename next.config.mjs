/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "qdoxynjkmbgpgncnmadr.supabase.co",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
