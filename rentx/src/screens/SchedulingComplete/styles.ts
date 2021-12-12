import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  padding-top: 96px;

  background-color: ${({ theme }) => theme.colors.header};

  flex: 1;
`;

export const Content = styled.View`
  padding-bottom: 80px;

  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: 40px;

  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary600};
`;

export const Message = styled.Text`
  color: ${({ theme }) => theme.colors.textDetail};
  line-height: ${RFValue(25)}px;
  text-align: center;

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
`;

export const Footer = styled.View`
  width: 100%;
  margin: 80px 0;

  align-items: center;
`;
