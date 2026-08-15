import type { NextConfig } from "next";
import { SITE_HOST, SITE_HOST_WWW } from "./src/lib/site";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Апекс → www: канонический хост один, чтобы не плодить дубли в индексе.
      {
        source: "/:path*",
        has: [{ type: "host", value: SITE_HOST }],
        destination: `https://${SITE_HOST_WWW}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
