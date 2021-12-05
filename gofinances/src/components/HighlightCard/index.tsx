import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

export type HighlightCardTypes = "up" | "down" | "total";

type HighlightCardProps = {
  title: string;
  amount: string;
  lastTransaction: string;
  type: HighlightCardTypes;
};

const icon: Record<HighlightCardTypes, string> = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export const HighlightCard = ({
  title,
  amount,
  lastTransaction,
  type,
}: HighlightCardProps) => {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
};
