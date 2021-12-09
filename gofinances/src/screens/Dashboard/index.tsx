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
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";

export interface DataListProps extends TransactionCardData {
  id: number;
}

const dataKey = "@gofinances:transaction";

export const Dashboard = () => {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response
      ? (JSON.parse(response) as DataListProps[])
      : [];

    const transactionsFormatted: DataListProps[] = transactions.map(
      (transaction) => {
        const amount = Number(transaction.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
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

    setData(transactionsFormatted);
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
          amount="R$ 17.000,00"
          lastTransaction="Útima entrada 05 de dezembro de 2021"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.500,00"
          lastTransaction="Útima saída 05 de dezembro de 2021"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 15.500,00"
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
    </Container>
  );
};
