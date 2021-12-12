import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
  width: 100%;
  height: 126px;
  padding: 24px;
  margin-bottom: 16px;

  background-color: ${({ theme }) => theme.colors.backgroundSecondary};

  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Details = styled.View``;

export const Brand = styled.Text`
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;

  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(10)}px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(15)}px;
`;

export const About = styled.View`
  margin-top: 16px;

  flex-direction: row;
  align-items: center;
`;

export const Rent = styled.View`
  margin-right: 16px;
`;

export const Period = styled.Text`
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;

  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(10)}px;
`;

export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.main};
  text-transform: uppercase;

  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(15)}px;
`;

export const Type = styled.View``;

export const CarImage = styled.Image`
  width: 167px;
  height: 85px;
`;
