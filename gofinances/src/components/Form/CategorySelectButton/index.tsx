import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Category, Icon } from "./styles";

type Props = RectButtonProps & {
  title: string;
};
export const CategorySelectButton = ({ title, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
