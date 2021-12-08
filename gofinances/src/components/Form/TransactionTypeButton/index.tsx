import React from "react";
import { Container, Icon, Title, Button } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

export type TransactionTypeButtonType = "up" | "down";

const icons: Record<TransactionTypeButtonType, string> = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

type Props = RectButtonProps & {
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
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
};
