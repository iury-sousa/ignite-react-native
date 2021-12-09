import React, { useCallback, useEffect, useState } from "react";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";
import {
  Container,
  Header,
  UserInfo,
  User,
  UserGreeting,
  UserName,
  Photo,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
export type DataListProps = TransactionCardData & {
  id: number;
};

type HighlightProps = {
  amount: string;
};

type HighlightData = {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: string;
};

const dataKey = "@gofinances:transaction";

function moneyFormat(value: number | string) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({
    entries: { amount: moneyFormat(0) },
    expensives: { amount: moneyFormat(0) },
    total: moneyFormat(0),
  });
  const theme = useTheme();

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response
      ? (JSON.parse(response) as DataListProps[])
      : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (transaction) => {
        transaction.type === "positive"
          ? (entriesTotal += Number(transaction.amount))
          : (expensiveTotal += Number(transaction.amount));

        const amount = moneyFormat(transaction.amount);
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(transaction.date));

        return {
          ...transaction,
          date,
          amount,
        };
      }
    );
    setHighlightData({
      entries: {
        amount: moneyFormat(entriesTotal),
      },
      expensives: { amount: moneyFormat(expensiveTotal) },
      total: moneyFormat(entriesTotal - expensiveTotal),
    });
    setData(transactionsFormatted);

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/42949044?s=400&u=39e3d16ae6512aacedb920ac9adca57967a007e0&v=4",
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Iury</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData?.entries.amount}
              lastTransaction="Útima entrada 05 de dezembro de 2021"
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData?.expensives.amount}
              lastTransaction="Útima saída 05 de dezembro de 2021"
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData?.total}
              lastTransaction="01 à 30 de dezembro"
              type="total"
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList<React.ElementType>
              data={data}
              keyExtractor={(item: DataListProps) => item.id}
              renderItem={({ item }: { item: DataListProps }) => (
                <TransactionCard data={item} />
              )}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};
