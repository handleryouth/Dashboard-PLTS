import Cookies, { CookieSetOptions } from "universal-cookie";

export type CookieType =
  | "accessToken"
  | "refreshToken"
  | "staffData"
  | "isLogin";

export interface SetCookieProps {
  cookieKey: CookieType;
  cookieValue: string | undefined;
  cookieOptions?: CookieSetOptions;
}

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

export function removeCookie(cookie: CookieType) {
  const cookies = new Cookies();

  return cookies.remove(cookie);
}
