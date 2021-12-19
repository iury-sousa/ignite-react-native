import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { api } from "../../services/api";
import { Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { Car as CarModel } from "../../database/model/Car";

type Params = {
  car: CarDTO;
  dates: string[];
};

type RentalPeriod = {
  start: string;
  end: string;
};

export function SchedulingDetails() {
  const [loading, setLoading] = useState(false);
  const [carUpdated, setCarUpdated] = useState<CarDTO>();
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number((dates.length - 1) * car.price);

  async function handleConfirmRental() {
    setLoading(true);

    await api
      .post("/rentals", {
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      })
      .then(() =>
        navigation.navigate(
          "Confirmation" as never,
          {
            title: "Carro alugado!",
            message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
            nextScreenRoute: "Home",
          } as never
        )
      )
      .catch((error) => {
        console.log(error);
        Alert.alert("Não foi possível confirmar o agendamento");
        setLoading(false);
      });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get<CarDTO>(`/cars/${car.id}`);

      const data = response.data;
      data.formattedPrice = data.price.toLocaleString("pt-br", {
        currency: "BRL",
        style: "currency",
      });
      setCarUpdated(data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={
            !!carUpdated?.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>
              {netInfo.isConnected === true
                ? carUpdated?.formattedPrice
                : "R$..."}
            </Price>
          </Rent>
        </Details>

        {carUpdated?.accessories && (
          <Accessories>
            {carUpdated.accessories.map((car) => (
              <Accessory
                key={car.type}
                name={car.name}
                icon={getAccessoryIcon(car.type)}
              />
            ))}
          </Accessories>
        )}
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              color={theme.colors.shape}
              size={RFValue(24)}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            color={theme.colors.text}
            size={RFValue(10)}
          />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {/* {`${car.formattedPrice} x${dates.length - 1} diárias`} */}
            </RentalPriceQuota>
            <RentalPriceTotal>
              {rentTotal.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          loading={loading}
          enabled={!!netInfo.isConnected}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
