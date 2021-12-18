import React, { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
};

export type AuthState = {
  token: string;
  user: User;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user?: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState | null>();

  async function signIn(credentials: SignInCredentials) {
    const response = await api.post("/sessions", credentials);

    const { token, user } = response.data;
    api.defaults.headers = {
      ...api.defaults.headers,
      Authorization: `Bearer ${token}`,
    } as never;

    setData({ token, user });
  }

  return (
    <AuthContext.Provider value={{ signIn, user: data?.user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
