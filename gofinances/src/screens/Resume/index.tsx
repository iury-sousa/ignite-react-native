import React, { useCallback, useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataListProps } from "../Dashboard";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useFocusEffect } from "@react-navigation/core";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

type CategoryData = {
  key: string;
  name: string;
  color: string;
  total: number;
  totalFormatted?: string;
  percent: number;
  percentFormatted: string;
};

const dataKey = "@gofinances:transaction";

export const Resume = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const theme = useTheme();
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const { user } = useAuth();

  const dataKey = `@gofinances:transaction_user:${user?.id}`;

  function handleDateChange(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate((oldDate) => addMonths(oldDate, 1));
    } else {
      setSelectedDate((oldDate) => subMonths(oldDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);

    const response = await AsyncStorage.getItem(dataKey);
    const transactionsResponse = response
      ? (JSON.parse(response) as DataListProps[])
      : [];

    const expensives = transactionsResponse.filter(
      (transaction) =>
        transaction.type === "negative" &&
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce((total, expansive) => {
      return total + Number(expansive.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const percent = categorySum / expensivesTotal;

        const percentFormatted = percent.toLocaleString("pt-BR", {
          style: "percent",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        totalByCategory.push({
          ...category,
          total: categorySum,
          totalFormatted: categorySum.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          percent,
          percentFormatted,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton
            onPress={() => !isLoading && handleDateChange("prev")}
          >
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>
          <Month>{format(selectedDate, "MMMM, yyyy", { locale: ptBR })}</Month>
          <MonthSelectButton
            onPress={() => !isLoading && handleDateChange("next")}
          >
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>
        {isLoading ? (
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </LoadContainer>
        ) : (
          <>
            <ChartContainer>
              {totalByCategories.length > 0 && (
                <VictoryPie
                  data={totalByCategories}
                  x="percentFormatted"
                  y="total"
                  colorScale={totalByCategories.map(
                    (category) => category.color
                  )}
                  style={{
                    labels: {
                      fontSize: RFValue(16),
                      fontWeight: "bold",
                      fill: theme.colors.shape,
                    },
                  }}
                  labelRadius={50}
                />
              )}
            </ChartContainer>

            {totalByCategories.map((item) => (
              <HistoryCard
                key={item.key}
                amount={item.totalFormatted}
                color={item.color}
                title={item.name}
              />
            ))}
          </>
        )}
      </Content>
    </Container>
  );
};
