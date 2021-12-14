import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.backgroundPrimary};

  align-items: center;
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

export const SubTitle = styled.Text`
  margin-top: 24px;

  color: ${({ theme }) => theme.colors.shape};
  line-height: ${RFValue(34)}px;

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary400};
`;

export const Content = styled.View`
  width: 100%;
  padding: 0 16px;

  flex: 1;
`;

export const Appointments = styled.View`
  width: 100%;
  padding: 24px 0;

  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const AppointmentsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
`;

export const AppointmentsQuantity = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary500};
`;

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  width: 100%;
  padding: 12px;
  margin-top: -10px;

  background-color: ${({ theme }) => theme.colors.backgroundSecondary};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CarFooterTitle = styled.Text`
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;
  letter-spacing: 0.4px;

  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary500};
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CarFooterDate = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
`;
