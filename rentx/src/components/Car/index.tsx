import React from "react";

import GasolineSvg from "../../assets/gasoline.svg";
import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

export type CarData = {
  brand: string;
  name: string;
  thumbnail: string;
  rent: {
    period: string;
    price: number;
  };
};
type CarProps = {
  data: CarData;
};
export function Car({ data }: CarProps) {
  const { brand, name, rent, thumbnail } = data;
  return (
    <Container>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{rent.period}</Period>
            <Price>{rent.price}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
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
