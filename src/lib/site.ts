/**
 * Единый источник правды для публичного адреса сайта.
 * Канонический хост — www, апекс редиректится на него (см. next.config.ts).
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.hd-report.ru";

export const SITE_HOST = "hd-report.ru";
export const SITE_HOST_WWW = "www.hd-report.ru";

/**
 * Хосты, на которые разрешено возвращать пользователя после оплаты.
 * Всё, что вне списка, схлопывается в SITE_URL — чтобы заголовок Origin
 * от постороннего домена не увёл платёж на чужой сайт.
 */
const ALLOWED_RETURN_HOSTS = new Set([
  SITE_HOST,
  SITE_HOST_WWW,
  "human-design-report.vercel.app",
  "localhost",
]);

/** Приводит произвольный origin к безопасному базовому URL для return_url ЮKassa. */
export function resolveReturnOrigin(candidate: string | null | undefined): string {
  if (!candidate) return SITE_URL;

  try {
    const url = new URL(candidate);
    const isAllowed =
      ALLOWED_RETURN_HOSTS.has(url.hostname) ||
      // превью-деплои Vercel: <branch>-<hash>.vercel.app
      url.hostname.endsWith(".vercel.app");

    return isAllowed ? url.origin : SITE_URL;
  } catch {
    return SITE_URL;
  }
}
