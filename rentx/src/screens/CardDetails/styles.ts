import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  flex: 1;
`;

export const Header = styled.View`
  margin-top: ${getStatusBarHeight() + 18}px;
  position: absolute;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`;
