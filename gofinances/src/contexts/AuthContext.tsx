import React from "react";
import { createContext, ReactNode, useContext } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  user: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const user: User = {
    id: "teste",
    name: "Iury Sousa",
    email: "iury.wemersonsousa@gmail.com",
  };
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
