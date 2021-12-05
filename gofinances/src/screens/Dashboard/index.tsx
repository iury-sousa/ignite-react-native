import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
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
} from "./styles";

export const Dashboard = () => {
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
        <TransactionCard />
      </Transactions>
    </Container>
  );
};
