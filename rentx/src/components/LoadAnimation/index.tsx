import React from "react";

import { Container } from "./styles";
import LottieView from "lottie-react-native";

import loadingCar from "../../assets/loadingCar.json";

type LoadAnimationProps = {
  isLoading?: boolean;
};
export function LoadAnimation({ isLoading = false }: LoadAnimationProps) {
  if (!isLoading) {
    return <></>;
  }
  return (
    <Container>
      <LottieView
        source={loadingCar}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
}
