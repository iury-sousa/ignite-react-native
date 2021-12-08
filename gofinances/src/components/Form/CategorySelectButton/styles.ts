import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.8,
} as RectButtonProps)`
  padding: 16px 18px;

  background: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Category = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
`;
