import React from "react";
import { categories } from "../../utils/categories";
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

export type TransactionType = "positive" | "negative";
export type TransactionCardData = {
  type: TransactionType;
  name: string;
  amount: string;
  category: string;
  date: Date;
  dateFormatted?: string;
};

type TransactionCardProps = {
  data: TransactionCardData;
};

export const TransactionCard = ({ data }: TransactionCardProps) => {
  const { type, name, amount, dateFormatted } = data;

  const [category] = categories.filter(
    (category) => category.key === data.category
  );

  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>
        {type === "negative" && "- "}
        {amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{dateFormatted}</Date>
      </Footer>
    </Container>
  );
};
