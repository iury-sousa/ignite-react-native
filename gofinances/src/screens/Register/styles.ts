import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
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

export const Form = styled.View`
  width: 100%;
  padding: 24px;

  flex: 1;
  justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionsTypes = styled.View`
  margin-top: 8px;
  margin-bottom: 16px;

  flex-direction: row;
  justify-content: space-between;
`;
