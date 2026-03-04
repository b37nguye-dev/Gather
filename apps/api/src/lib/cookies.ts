import type { Response, Request } from "express";

const REFRESH_COOKIE_NAME = "refreshToken";
const REFRESH_MAX_AGE_SECONDS = 604800;

export function setRefreshCookie(res: Response, token: string): void {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: REFRESH_MAX_AGE_SECONDS * 1000,
    path: "/api/auth",
  });
}

export function clearRefreshCookie(res: Response): void {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/api/auth",
  });
}

export function getRefreshCookie(req: Request): string | undefined {
  return req.cookies?.[REFRESH_COOKIE_NAME];
}
