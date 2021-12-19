import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { database } from "../database";
import { User as UserModel } from "../database/model/User";
import { api } from "../services/api";

type User = {
  id: string;
  userId: string;
  email: string;
  name: string;
  driver_license: string;
  avatar?: string;
  token: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user?: User | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updatedUser: (user: User) => Promise<void>;
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User | null>();

  async function signIn(credentials: SignInCredentials) {
    try {
      const response = await api.post<{ token: string; user: User }>(
        "/sessions",
        credentials
      );

      const { token, user } = response.data;
      api.defaults.headers = {
        ...api.defaults.headers,
        Authorization: `Bearer ${token}`,
      } as never;

      const userCollection = database.get<UserModel>("users");
      await database.write(async () => {
        await userCollection.create((newUser) => {
          newUser.userId = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.avatar = user.avatar ?? "";
          newUser.driverLicense = user.driver_license;
          newUser.token = token;
        });
      });

      setData({ ...user, token });
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<UserModel>("users");
      await database.write(async () => {
        const userSelected = await userCollection.find(data?.id!);
        await userSelected.destroyPermanently();
      });

      setData(null);
    } catch (error) {
      throw error;
    }
  }

  async function updatedUser(user: User) {
    try {
      const userCollection = database.get<UserModel>("users");
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update((userData) => {
          userData.name = user.name;
          userData.avatar = user.avatar ?? "";
          userData.driverLicense = user.driver_license;
        });
      });

      setData(user);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<UserModel>("users");
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers = {
          ...api.defaults.headers,
          Authorization: `Bearer ${userData.token}`,
        } as never;

        setData(userData);
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, updatedUser, user: data, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
