import { AntDesign } from "@expo/vector-icons";
import { synchronize } from "@nozbe/watermelondb/sync";
import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
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
import { database } from "../../database";
import { Car as CarModel } from "../../database/model/Car";
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
  const [cars, setCars] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);
  const netInfo = useNetInfo();
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

  function handleCarDetails(car: CarModel) {
    navigation.navigate("CarDetails" as never, { car } as never);
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;

        await api
          .post("/users/sync", user)
          .catch((e) => console.log("ERRO: ", e));
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<CarModel>("cars");
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  // useEffect(() => {
  //   // Desabilita a ação do botão voltar
  //   BackHandler.addEventListener("hardwareBackPress", () => {
  //     return true;
  //   });
  // }, []);

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
            <AntDesign
              name="retweet"
              size={32}
              color={theme.colors.backgroundSecondary}
              onPress={offlineSynchronize}
            />
          </ButtonAnimated>
        </MyCarsButton>
      </PanGestureHandler>
    </Container>
  );
}
