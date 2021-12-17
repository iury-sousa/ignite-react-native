import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { BackHandler, StatusBar } from "react-native";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";
import {
  CartList,
  Container,
  Header,
  HeaderContent,
  MyCarsButton,
  TotalCars,
} from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, context: any) {
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    onActive(event, context: any) {
      positionX.value = context.positionX + event.translationX;
      positionY.value = context.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

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

  useEffect(() => {
    // Desabilita a ação do botão voltar
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
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
          {!loading && (
            <TotalCars>
              Total de {cars.length.toString().padStart(2, "0")} carros
            </TotalCars>
          )}
        </HeaderContent>
      </Header>
      <LoadAnimation isLoading={loading} />

      {!loading && (
        <CartList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <MyCarsButton style={myCarsButtonStyle}>
          <ButtonAnimated>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
              onPress={handleOpneMyCars}
            />
          </ButtonAnimated>
        </MyCarsButton>
      </PanGestureHandler>
    </Container>
  );
}
