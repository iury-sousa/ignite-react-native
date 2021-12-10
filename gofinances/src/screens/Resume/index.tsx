import React, { useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title, Content } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataListProps } from "../Dashboard";
import { categories } from "../../utils/categories";

type CategoryData = {
  key: string;
  name: string;
  color: string;
  total: number;
  totalFormatted?: string;
};

const dataKey = "@gofinances:transaction";

export const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  async function loadData() {
    const response = await AsyncStorage.getItem(dataKey);
    const transactionsResponse = response
      ? (JSON.parse(response) as DataListProps[])
      : [];

    const expensives = transactionsResponse.filter(
      (transaction) => transaction.type === "negative"
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        totalByCategory.push({
          ...category,
          total: categorySum,
          totalFormatted: categorySum.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
        });
      }
    });

    setTotalByCategories(totalByCategory);
    console.log(
      "🚀 ~ file: index.tsx ~ line 58 ~ loadData ~ totalByCategory",
      totalByCategory
    );
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            amount={item.totalFormatted}
            color={item.color}
            title={item.name}
          />
        ))}
      </Content>
    </Container>
  );
};
