import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

type ContainerProps = {
  color: string;
};
export const Container = styled.View<ContainerProps>`
  width: 100%;
  margin-bottom: 8px;
  padding: 13px 24px;

  background: ${({ theme }) => theme.colors.shape};
  border-left-width: 5px;
  border-left-color: ${({ color }) => color};
  border-radius: 5px;

  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Amount = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
