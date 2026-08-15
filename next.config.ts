import type { NextConfig } from "next";
import { SITE_HOST, SITE_HOST_WWW } from "./src/lib/site";

const nextConfig: NextConfig = {
  // Генератор PDF читает эти шрифты с диска во время запроса. Их никто не
  // импортирует, поэтому трассировка файлов не увидит зависимость и роуты
  // уедут в деплой без шрифтов — вся кириллица превратится в мусор.
  outputFileTracingIncludes: {
    "/api/webhook": ["./public/fonts/**"],
    "/api/generate-pdf": ["./public/fonts/**"],
  },

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
