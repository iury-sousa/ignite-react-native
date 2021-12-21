import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

describe("Profile", () => {
  it("should have placeholder correctly in user name input", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName.props.placeholder).toBeTruthy();
  });

  it("should be load user data", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("Iury");
    expect(inputSurname.props.value).toEqual("Sousa");
  });

  it("should exists title correctly", () => {
    const { getByText } = render(<Profile />);

    const textTitle = getByText("Perfil");

    expect(textTitle.props.children).toContain("Perfil");
  });
});
