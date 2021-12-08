import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

type Props = Omit<RectButtonProps, "onPress"> & {
  title: string;
  onPress: () => void;
};

export const Button = ({ title, onPress, ...rest }: Props) => {
  return (
    <Container {...rest} onPress={onPress} activeOpacity={0.8}>
      <Title>{title}</Title>
    </Container>
  );
};
