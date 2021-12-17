import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibilityButton,
} from "./styles";
import { TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  iconName?: React.ComponentProps<typeof Feather>["name"];
};
export function PasswordInput({ iconName, ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.textDetail} />
      </IconContainer>
      <InputText {...rest} secureTextEntry={isPasswordVisible} />

      <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
        <IconContainer style={{ marginRight: 0 }}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.textDetail}
          />
        </IconContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  );
}
