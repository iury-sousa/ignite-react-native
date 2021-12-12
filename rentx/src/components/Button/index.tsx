import React from "react";

import { Container, Title } from "./styles";

type ButtonProps = {
  title: string;
  color?: string | null;
  onPress?: () => void;
};

export function Button({ title, color, ...rest }: ButtonProps) {
  return (
    <Container {...rest} color={color}>
      <Title>{title}</Title>
    </Container>
  );
}
