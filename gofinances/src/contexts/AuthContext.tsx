import React, { useState } from "react";
import { createContext, ReactNode, useContext } from "react";
import * as AuthSession from "expo-auth-session";

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

type AuthContextData = {
  user?: User;
  signInWithGoogle: () => Promise<void>;
};

type AuthorizationResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>();

  async function signInWithGoogle() {
    try {
      const CLIENT_ID =
        "107119917133-4o1gl7rv1hnp2g77tc2of0mob01k3338.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@iury_wemerson/gofinances";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = "https://accounts.google.com/o/oauth2/auth";

      const array: string[] = [
        authUrl,
        "?client_id=",
        CLIENT_ID,
        "&redirect_uri=",
        REDIRECT_URI,
        "&response_type=",
        RESPONSE_TYPE,
        "&scope=",
        SCOPE,
      ];
      console.log(array.join(""));
      const authUrlFormatted = `${authUrl}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl: authUrlFormatted,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        const userInfo = await response.json();
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          photo: userInfo?.picture,
        });
      }

      // console.log(response);
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
