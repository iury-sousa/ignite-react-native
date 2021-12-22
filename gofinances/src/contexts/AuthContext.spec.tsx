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
    //Primeiro, nós precisamos do Token. Então, vamos Mockar a função de startAsync.
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

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
});
