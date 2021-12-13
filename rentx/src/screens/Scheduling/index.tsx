import React, { useState } from "react";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";

import { useNavigation, useRoute } from "@react-navigation/native";

import ArrowSvg from "../../assets/arrow.svg";
import { Alert, StatusBar } from "react-native";
import { Button } from "../../components/Button";
import {
  Calendar,
  DateProps,
  generateInterval,
  MarkedDateProps,
} from "../../components/Calendar";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { CarDTO } from "../../dtos/CarDTO";

type RentalPeriod = {
  start: string;
  end: string;
};

type Params = {
  car: CarDTO;
};

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DateProps>(
    {} as DateProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert("Selecione o intervalo para alugar");
      return;
    }
    navigation.navigate(
      "SchedulingDetails" as never,
      { car, dates: Object.keys(markedDates) } as never
    );
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleDayPress(date: DateProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;
    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const intervalKeys = Object.keys(interval);

    const firstDate = intervalKeys[0];
    const endDate = intervalKeys[intervalKeys.length - 1];

    setRentalPeriod({
      start: format(getPlatformDate(new Date(firstDate)), "dd/MM/yyyy"),
      end: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }

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
          Escolha uma{"\n"}
          data de início e{"\n"}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.start}>
              {rentalPeriod.start}
            </DateValue>
          </DateInfo>
          <ArrowSvg color={theme.colors.text} />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.end}>
              {rentalPeriod.end}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
