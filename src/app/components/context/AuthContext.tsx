"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/app/types/api";
import { getUser, saveUser, clearUser } from "@/app/lib/auth";

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // localStorage only exists in the browser, so the user must be read after mount
    //eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(getUser());
  }, []);

  function login(user: User) {
    saveUser(user);
    setUser(user);
  }

  function logout() {
    clearUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
