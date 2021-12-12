import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import { Container, Header, CarImages } from "./styles";

export function CardDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => null} />
      </Header>
      <CarImages>
        <ImageSlider
          imageUrl={["https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png"]}
        />
      </CarImages>
    </Container>
  );
}
