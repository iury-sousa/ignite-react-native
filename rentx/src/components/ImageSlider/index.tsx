import React, { useRef, useState } from "react";
import { ViewToken } from "react-native";
import { FlatList } from "react-native";
import { Photo } from "../../dtos/CarDTO";
import { Bullet } from "../Bullet";

import { Container, ImageIndexes, CarImageWrapper, CarImage } from "./styles";

type ImageSliderProps = {
  imagesUrl: Photo[];
};

type ChangeImageProps = {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
};

export function ImageSlider({ imagesUrl = [] }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet key={item.id} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChange.current}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
      />
    </Container>
  );
}
