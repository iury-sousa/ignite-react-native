import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

import {
  Container,
  HeaderContent,
  Header,
  TotalCars,
  CartList,
} from "./styles";

export function Home() {
  const data = {
    brand: "audi",
    name: "RS 5 Coupé",
    rent: {
      period: "Ao dia",
      price: 120.5,
    },
    thumbnail: "https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png",
  };
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CartList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <Car data={data} />}
      />
    </Container>
  );
}
