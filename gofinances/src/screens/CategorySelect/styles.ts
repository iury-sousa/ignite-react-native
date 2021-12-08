import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type CategoryProps = {
  isActive: boolean;
};
export const Container = styled(GestureHandlerRootView)`
  background-color: ${({ theme }) => theme.colors.background};

  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(112)}px;
  padding-bottom: 16px;

  background: ${({ theme }) => theme.colors.primary};

  align-items: center;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(16)}px;

  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondaryLight : theme.colors.background};

  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;

  font-size: ${RFValue(20)}px;
`;

export const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;

  background-color: ${({ theme }) => theme.colors.border};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;

export const ButtonText = styled.Text``;
