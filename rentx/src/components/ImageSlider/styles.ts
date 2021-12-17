import { Dimensions } from "react-native";
import styled from "styled-components/native";

type ImageIndexProps = {
  active: boolean;
};

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  /* padding-right: 24px; */

  flex-direction: row;
  align-self: flex-end;
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get("window").width}px;
  height: 132px;

  justify-content: center;
  align-items: center;
`;

export const CarImage = styled.Image`
  width: 280px;
  height: 132px;
`;
