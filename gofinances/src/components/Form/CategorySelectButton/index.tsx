import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Category, Icon } from "./styles";

type Props = TouchableOpacityProps & {
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
