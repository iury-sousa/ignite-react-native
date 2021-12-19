import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Car as CarModel } from "../../database/model/Car";
import Animated from "react-native-reanimated";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 112px;
  padding: 32px 16px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: flex-end;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalCars = styled.Text`
  color: ${({ theme }) => theme.colors.text};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
`;

export const CartList = styled(
  FlatList as new (props: FlatListProps<CarModel>) => FlatList<CarModel>
).attrs({
  contentContainerStyle: { padding: 24 },
  showsVerticalScrollIndicator: false,
})``;

export const MyCarsButton = styled(Animated.View)`
  width: 60px;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 30px;

  position: absolute;
  bottom: 18px;
  right: 18px;

  align-items: center;
  justify-content: center;
`;
