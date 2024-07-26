import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthTokens {
  jwtToken: string;
  expiration: Date;
  refreshToken: string;
}

interface User {
  username: string;
  image: string;
}

interface AuthContextType {
  user: User | null;
  authTokens: AuthTokens | null;
  login: (tokens: AuthTokens) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  });

  useEffect(() => {
    if (authTokens) {
      const decoded = jwtDecode<User>(authTokens.jwtToken);
      setUser(decoded);
    }
  }, [authTokens]);

  const login = (tokens: AuthTokens) => {
    setAuthTokens(tokens);
    localStorage.setItem("authTokens", JSON.stringify(tokens));
    const decoded = jwtDecode<User>(tokens.jwtToken);
    setUser(decoded);
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return (
    <AuthContext.Provider value={{ user, authTokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
