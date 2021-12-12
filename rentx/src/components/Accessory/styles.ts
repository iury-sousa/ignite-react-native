import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 108px;
  height: 96px;
  padding: 16px;
  margin-bottom: 8px;

  background-color: ${({ theme }) => theme.colors.backgroundPrimary};

  justify-content: center;
  align-items: center;
`;

export const Name = styled.Text`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(13)}px;
`;
