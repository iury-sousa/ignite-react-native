import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  width: 100%;
  padding: 16px 18px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;

  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
