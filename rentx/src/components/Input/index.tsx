import React from "react";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { Container, IconContainer, InputText } from "./styles";
import { TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  iconName?: React.ComponentProps<typeof Feather>["name"];
};
export function Input({ iconName, ...rest }: InputProps) {
  const theme = useTheme();

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.textDetail} />
      </IconContainer>
      <InputText {...rest} />
    </Container>
  );
}
