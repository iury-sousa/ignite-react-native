import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export const Button = ({ title, ...rest }: Props) => {
  return (
    <Container {...rest} activeOpacity={0.8}>
      <Title>{title}</Title>
    </Container>
  );
};
