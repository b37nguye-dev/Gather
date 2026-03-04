import type { AuthResponse, User } from "@gather/shared";

const API_URL = import.meta.env.VITE_API_URL ?? "";

// Module-level state for token and refresh coordination
let accessToken: string | null = null;
let refreshPromise: Promise<string> | null = null;
let sessionExpiredCallback: (() => void) | null = null;
let sessionExpiredCalled = false;

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function registerSessionExpired(cb: () => void): void {
  sessionExpiredCallback = cb;
}

type ApiErrorBody = { error?: string; message?: string };

async function handleTokenRefresh(): Promise<string> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async (): Promise<string> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = (await res.json().catch(() => ({}))) as AuthResponse | ApiErrorBody;

      if (!res.ok) {
        setAccessToken(null);
        if (!sessionExpiredCalled) {
          sessionExpiredCalled = true;
          sessionExpiredCallback?.();
        }
        const err = data as ApiErrorBody;
        throw new ApiError(res.status, err.error ?? err.message ?? "Request failed");
      }

      const payload = data as AuthResponse;
      setAccessToken(payload.accessToken);
      return payload.accessToken;
    } finally {
      refreshPromise = null;
      sessionExpiredCalled = false;
    }
  })();

  return refreshPromise;
}

type RequestOptions = RequestInit & { _retried?: boolean };

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { _retried, ...init } = options;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...init.headers,
  };
  const token = getAccessToken();
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });

  if (res.status === 401) {
    if (_retried) {
      const data = (await res.json().catch(() => ({}))) as ApiErrorBody;
      const err = data as ApiErrorBody;
      throw new ApiError(401, err.error ?? err.message ?? "Unauthorized");
    }
    await handleTokenRefresh();
    return request<T>(path, { ...options, _retried: true });
  }

  const data = (await res.json().catch(() => ({}))) as T | ApiErrorBody;

  if (!res.ok) {
    const err = data as ApiErrorBody;
    throw new ApiError(res.status, err.error ?? err.message ?? "Request failed");
  }

  return data as T;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signup(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export async function refresh(): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/refresh", { method: "POST" });
}

export async function logout(): Promise<void> {
  await request("/api/auth/logout", { method: "POST" });
}

export async function getMe(): Promise<{ user: User }> {
  return request<{ user: User }>("/api/auth/me", { method: "GET" });
}

export type UpdateProfilePayload = {
  name?: string;
  avatarUrl?: string | null;
};

export async function updateProfile(data: UpdateProfilePayload): Promise<{ user: User }> {
  return request<{ user: User }>("/api/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
