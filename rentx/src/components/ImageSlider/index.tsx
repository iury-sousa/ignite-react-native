import React from "react";
import { FlatList } from "react-native";

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";

type ImageSliderProps = {
  imagesUrl: string[];
};

export function ImageSlider({ imagesUrl = [] }: ImageSliderProps) {
  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, key) => (
          <ImageIndex key={key} active={true} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
      />
    </Container>
  );
}
