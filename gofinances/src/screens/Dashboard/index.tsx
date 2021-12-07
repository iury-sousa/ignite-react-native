import React from "react";

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
} from "./styles";

export interface DataListProps extends TransactionCardData {
  id: number;
}

export const Dashboard = () => {
  const data: DataListProps[] = [
    {
      id: 1,
      type: "positive",
      title: "Desenvolvimento do site",
      amount: "R$ 12.000,00",
      date: "05/12/2021",
      category: { name: "Vendas", icon: "dollar-sign" },
    },
    {
      id: 2,
      type: "negative",
      title: "Pizzaria",
      amount: "R$ 12.000,00",
      date: "05/12/2021",
      category: { name: "Alimentação", icon: "coffee" },
    },
    {
      id: 3,
      type: "negative",
      title: "Aluguel",
      amount: "R$ 1.200,00",
      date: "15/12/2021",
      category: { name: "Casa", icon: "shopping-bag" },
    },
    {
      id: 4,
      type: "positive",
      title: "Desenvolvimento do site",
      amount: "R$ 12.000,00",
      date: "20/12/2021",
      category: { name: "Vendas", icon: "dollar-sign" },
    },
  ];

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
          <Icon name="power" />
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
