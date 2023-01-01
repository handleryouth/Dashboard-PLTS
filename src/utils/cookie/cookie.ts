import Cookies, { CookieSetOptions } from "universal-cookie";

export interface SetCookieProps {
  cookieKey: string;
  cookieValue: string;
  cookieOptions?: CookieSetOptions;
}

export type CookieType = "accessToken" | "refreshToken";

export function setCookie({
  cookieKey,
  cookieValue,
  cookieOptions,
}: SetCookieProps) {
  const cookies = new Cookies();

  cookies.set(cookieKey, cookieValue, { ...cookieOptions });
}

export function getCookie(cookie: CookieType) {
  const cookies = new Cookies();
  return cookies.get(cookie);
}
