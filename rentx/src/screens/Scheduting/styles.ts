import { ScrollViewProps } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

type DateValueProps = {
  selected?: boolean;
};

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 325px;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 32}px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: center;
`;

export const Title = styled.Text`
  margin-top: 24px;

  color: ${({ theme }) => theme.colors.shape};
  line-height: ${RFValue(34)}px;

  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary600};
`;

export const RentalPeriod = styled.View`
  width: 100%;
  margin: 32px 0;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;

  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary500};
`;

export const DateValue = styled.Text<DateValueProps>`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary500};

  ${({ selected, theme }) =>
    !selected &&
    css`
      padding-bottom: 5px;
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.text};
    `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 24, alignItems: "center" },
  showsVerticalScrollIndicator: false,
} as ScrollViewProps)``;

export const Footer = styled.View`
  padding: 24px;
`;
