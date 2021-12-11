import React, { useEffect, useState } from "react";
import { createContext, ReactNode, useContext } from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  user?: User | null;
  storageUserLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthorizationResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

const userStorageKey = "@gofinances:user";

const AuthContext = createContext({} as AuthContextData);
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [storageUserLoading, setStorageUserLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = "https://accounts.google.com/o/oauth2/auth";

      const authUrlFormatted = `${authUrl}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl: authUrlFormatted,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        const userInfo = await response.json();
        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          photo:
            userInfo?.picture ??
            `https://ui-avatars.com/api/?name=${userInfo.name}`,
        };
        setUser(userLogged);

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw error;
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName?.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}`;

        const userLogged = {
          id: credential.user,
          email: credential.email!,
          name: name,
          photo,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const user = JSON.parse(userStoraged) as User;
        setUser(user);
      }

      setStorageUserLoading(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        storageUserLoading,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
