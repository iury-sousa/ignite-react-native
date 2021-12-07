import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

export type TransactionTypeButtonType = "up" | "down";

const icons: Record<TransactionTypeButtonType, string> = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

type Props = TouchableOpacityProps & {
  title: string;
  type: TransactionTypeButtonType;
  isActive?: boolean;
};
export const TransactionTypeButton = ({
  title,
  type,
  isActive,
  ...rest
}: Props) => {
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};
