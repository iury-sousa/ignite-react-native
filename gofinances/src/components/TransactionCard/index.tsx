import React from "react";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

type Category = {
  name: string;
  icon: string;
};

export type TransactionCardData = {
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: Category;
  date: string;
};

type TransactionCardProps = {
  data: TransactionCardData;
};

export const TransactionCard = ({ data }: TransactionCardProps) => {
  const { type, title, amount, category, date } = data;
  return (
    <Container>
      <Title>{title}</Title>

      <Amount type={type}>
        {type === "negative" && "- "}
        {amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};
