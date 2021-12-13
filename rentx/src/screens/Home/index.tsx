import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

import { useNavigation } from "@react-navigation/native";
import {
  Container,
  HeaderContent,
  Header,
  TotalCars,
  CartList,
  MyCarsButton,
} from "./styles";
import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

export function Home() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails" as never, { car } as never);
  }

  function handleOpneMyCars() {
    navigation.navigate("MyCars" as never);
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get<CarDTO[]>("/cars");

        const cars = response.data.map((car) => {
          const formattedPrice = car.rent.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          return {
            ...car,
            rent: {
              ...car.rent,
              formattedPrice,
            },
          };
        });

        setCars(cars);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

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
      <Load isLoading={loading} />

      {!loading && (
        <CartList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <MyCarsButton>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
          onPress={handleOpneMyCars}
        />
      </MyCarsButton>
    </Container>
  );
}
