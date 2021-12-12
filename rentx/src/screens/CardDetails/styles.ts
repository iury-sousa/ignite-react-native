import { ScrollViewProps } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  flex: 1;
`;

export const Header = styled.View`
  margin-top: ${getStatusBarHeight() + 18}px;
  padding-left: 24px;
  position: absolute;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CarImages = styled.View`
  padding-right: 24px;
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 24, alignItems: "center" },
  showsVerticalScrollIndicator: false,
} as ScrollViewProps)``;

export const Details = styled.View`
  width: 100%;
  margin-top: 38px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;

  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary500};
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary500};
`;

export const Rent = styled.View``;

export const Period = styled.Text`
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;

  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary500};
`;

export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.main};

  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary500};
`;

export const About = styled.Text`
  margin-top: 23px;

  color: ${({ theme }) => theme.colors.text};
  text-align: justify;
  line-height: ${RFValue(25)}px;

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
`;

export const Accessories = styled.View`
  width: 100%;
  margin-top: 16px;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;
