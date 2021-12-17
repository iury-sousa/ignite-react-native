import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: 24px;

  background-color: ${({ theme }) => theme.colors.backgroundPrimary};

  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 116}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.secondary600};
`;

export const SubTitle = styled.Text`
  margin-top: 16px;

  color: ${({ theme }) => theme.colors.text};
  line-height: ${RFValue(25)}px;

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
`;

export const Footer = styled.View``;

export const Form = styled.View`
  width: 100%;
  margin: 64px 0;
`;
