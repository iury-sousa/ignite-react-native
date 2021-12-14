import { useNavigation } from "@react-navigation/native";
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
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { Load } from "../../components/Load";

type CarProps = {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
};

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setloading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get<CarProps[]>("/schedules_byuser", {
          params: { user_id: 1 },
        });
        setCars(response.data);
      } catch (error) {
        console.log(error);
        Alert.alert("Falha ao consultar carros");
      } finally {
        setloading(false);
      }
    }

    fetchCars();
  }, []);
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

      <Load isLoading={loading} />

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
                    <CarFooterDate>
                      {format(
                        getPlatformDate(new Date(item.startDate)),
                        "dd/MM/yyyy"
                      )}
                    </CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>
                      {format(
                        getPlatformDate(new Date(item.endDate)),
                        "dd/MM/yyyy"
                      )}
                    </CarFooterDate>
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
