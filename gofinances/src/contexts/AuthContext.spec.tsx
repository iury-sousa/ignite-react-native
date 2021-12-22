import "jest-fetch-mock";

import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "./AuthContext";
import { startAsync } from "expo-auth-session";
import fetchMock from "jest-fetch-mock";
import { mocked } from "jest-mock";
import AsyncStorage from "../../__mocks__/@react-native-async-storage/async-storage";

jest.mock("expo-auth-session");
jest.doMock("@react-native-async-storage/async-storage", () => AsyncStorage);

//Coloque no inicio do arquivo para habilitar o mock do fetch.
fetchMock.enableMocks();

describe("Auth Hook", () => {
  it("should be able to sign in with Google account existing", async () => {
    AsyncStorage.removeAll();
    //Primeiro, nós precisamos do Token. Então, vamos Mockar a função de startAsync.
    const googleMocked = mocked(startAsync);
    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    } as any);

    //Agora que temos o Token, vamos mockar a requisição http dos dados de profile do usuário.
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "any_id",
        email: "iurysousa13@outlook.com",
        name: "Iury",
        photo: "any_photo.png",
      })
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    // console.log("USER PROFILE =>", result.current.user);
    // console.log(await AsyncStorage.getItem("@gofinances:user", null));

    expect(result.current.user?.email).toBe("iurysousa13@outlook.com");
  });

  it("user should not connect if cancel authentication with Google", async () => {
    AsyncStorage.removeAll();
    const googleMocked = mocked(startAsync);

    googleMocked.mockReturnValueOnce({
      type: "cancel",
    } as any);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeNull();
  });

  it("should be error with incorrectly Google parameters", async () => {
    AsyncStorage.removeAll();

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      await act(() => result.current.signInWithGoogle());
    } catch {
      expect(result.current.user).toBeNull();
    }
  });
});
