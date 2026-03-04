import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "@gather/shared";
import * as api from "@/lib/api";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const REFRESH_INTERVAL_MS = 14 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = user !== null;

  useEffect(() => {
    const handleSessionExpired = (): void => {
      setUser(null);
    };
    api.registerSessionExpired(handleSessionExpired);

    api
      .refresh()
      .then((res) => {
        api.setAccessToken(res.accessToken);
        setUser(res.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      api
        .refresh()
        .then((res) => {
          api.setAccessToken(res.accessToken);
          setUser(res.user);
        })
        .catch(() => {
          setUser(null);
        });
    }, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    const res = await api.login(email, password);
    api.setAccessToken(res.accessToken);
    setUser(res.user);
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name: string): Promise<void> => {
      const res = await api.signup(email, password, name);
      api.setAccessToken(res.accessToken);
      setUser(res.user);
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    api.setAccessToken(null);
    await api.logout();
    setUser(null);
  }, []);

  const updateUser = useCallback((u: User) => setUser(u), []);

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
