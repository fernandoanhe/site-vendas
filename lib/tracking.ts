declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }
}

export function trackPixel(event: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}

const APP_URL = "https://gestao-leads-three.vercel.app";

export function buildSignupUrl(
  plano?: string,
  utmParams?: URLSearchParams
): string {
  const params = new URLSearchParams(utmParams);
  if (plano) params.set("plano", plano);
  const qs = params.toString();
  return `${APP_URL}/signup${qs ? `?${qs}` : ""}`;
}
