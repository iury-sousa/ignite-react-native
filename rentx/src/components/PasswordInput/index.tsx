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
export function PasswordInput({ iconName, value, ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text}
        />
      </IconContainer>
      <InputText
        {...rest}
        secureTextEntry={!isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
      />

      <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
        <IconContainer style={{ marginRight: 0 }}>
          <Feather
            name={!isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text}
          />
        </IconContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  );
}
