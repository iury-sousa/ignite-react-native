import React, { useCallback, useEffect, useState } from "react";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardData,
  TransactionType,
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
import { useAuth } from "../../contexts/AuthContext";

export type DataListProps = TransactionCardData & {
  id: number;
};

type HighlightProps = {
  amount: string;
  lastTransaction?: string;
};

type HighlightData = {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
};

function moneyFormat(value: number | string) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function dateFormat(date: Date) {
  return Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "2-digit",
  }).format(date);
}

function getLastTransactionDateByType(
  transactions: DataListProps[],
  type: TransactionType
) {
  const lastTransaction = Math.max.apply(
    Math,
    transactions
      .filter((transaction) => transaction.type === type)
      .map((transaction) => transaction.date.getTime())
  );

  console.log(
    "🚀 ~ file: index.tsx ~ line 74 ~ lastTransaction",
    lastTransaction
  );
  if (!lastTransaction || lastTransaction === -Infinity) {
    return null;
  }

  return dateFormat(new Date(lastTransaction));
}

const defaultAmount = moneyFormat(0);

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({
    entries: { amount: defaultAmount },
    expensives: { amount: defaultAmount },
    total: { amount: defaultAmount },
  });
  const theme = useTheme();
  const { user, signOut } = useAuth();

  const dataKey = `@gofinances:transaction_user:${user?.id}`;

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const transactionsResponse = response
      ? (JSON.parse(response) as DataListProps[])
      : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactionsResponse.map(
      (transaction) => {
        transaction.type === "positive"
          ? (entriesTotal += Number(transaction.amount))
          : (expensiveTotal += Number(transaction.amount));

        const amount = moneyFormat(transaction.amount);
        const date = new Date(transaction.date);

        const dateFormatted = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(date);

        return {
          ...transaction,
          date,
          dateFormatted,
          amount,
        };
      }
    );

    const lastTransactionEntries = getLastTransactionDateByType(
      transactionsFormatted,
      "positive"
    );

    const lastTransactionExpensives = getLastTransactionDateByType(
      transactionsFormatted,
      "negative"
    );
    const totalInterval = lastTransactionExpensives
      ? `01 à ${lastTransactionExpensives}`
      : "Não há transações";

    setHighlightData({
      entries: {
        amount: moneyFormat(entriesTotal),
        lastTransaction: lastTransactionEntries
          ? `Última entrada dia ${lastTransactionEntries}`
          : "Não há transações",
      },
      expensives: {
        amount: moneyFormat(expensiveTotal),
        lastTransaction: lastTransactionExpensives
          ? `Última saída dia ${lastTransactionExpensives}`
          : "Não há transações",
      },
      total: {
        amount: moneyFormat(entriesTotal - expensiveTotal),
        lastTransaction: totalInterval,
      },
    });

    setTransactions(transactionsFormatted);

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
                    uri: user?.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user?.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData?.entries.amount}
              lastTransaction={highlightData?.entries.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData?.expensives.amount}
              lastTransaction={highlightData?.expensives.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData?.total.amount}
              lastTransaction={highlightData?.total.lastTransaction}
              type="total"
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList<React.ElementType>
              data={transactions}
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
