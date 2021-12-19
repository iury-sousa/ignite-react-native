import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Car as CarModel } from "../../database/model/Car";
import { AccessoryType, CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import {
  About,
  Brand,
  CarImage,
  Container,
  Details,
  Name,
  Period,
  Price,
  Rent,
  Type,
} from "./styles";

type CarProps = RectButtonProps & {
  data: CarModel;
};

export function Car({ data, ...rest }: CarProps) {
  const { brand, name, period, price, thumbnail, fuel_type } = data;

  const MotorIcon = getAccessoryIcon(fuel_type as AccessoryType);
  return (
    <Container {...rest}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{period}</Period>
            <Price>
              {price.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            </Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>
      <CarImage
        source={{
          uri: thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}
