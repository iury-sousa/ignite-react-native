import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import { AntDesign } from "@expo/vector-icons";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { format, parseISO } from "date-fns";
import { LoadAnimation } from "../../components/LoadAnimation";
import { Car as CarModel } from "../../database/model/Car";

type DataProps = {
  id: string;
  car: CarModel;
  start_date: string;
  end_date: string;
};

export function MyCars() {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setloading] = useState(true);

  const screenIsFocus = useIsFocused();
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get<DataProps[]>("/rentals");
        const newCars = response.data.map((car) => {
          return {
            id: car.id,
            car: car.car,
            start_date: format(parseISO(car.start_date), "dd/MM/yyyy"),
            end_date: format(parseISO(car.end_date), "dd/MM/yyyy"),
          };
        });

        setCars(newCars);
      } catch (error) {
        console.log(error);
        Alert.alert("Falha ao consultar carros");
      } finally {
        setloading(false);
      }
    }

    if (screenIsFocus) fetchCars();
  }, [screenIsFocus]);
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title>
          Seus agendamentos,{"\n"}
          estão aqui.
        </Title>
        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      <LoadAnimation isLoading={loading} />

      {!loading && (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>
              {cars.length.toString().padStart(2, "0")}
            </AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
            showsVerticalScrollIndicator={false}
          />
        </Content>
      )}
    </Container>
  );
}
