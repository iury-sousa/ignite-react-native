import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Register } from ".";
import { ThemeProvider } from "styled-components/native";
import theme from "../../global/styles/theme";
import { mocked } from "jest-mock";
import { useNavigation } from "@react-navigation/native";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

jest.mock("@react-navigation/native");

describe("Register Screen", () => {
  it("should be open category modal when user click on button", async () => {
    const useNavigationMocked = mocked(useNavigation);
    useNavigationMocked.mockReturnValueOnce({ navigate: jest.fn() });

    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });
    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");

    fireEvent.press(buttonCategory);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
