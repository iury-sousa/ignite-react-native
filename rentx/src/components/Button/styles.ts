import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

type ButtonProps = RectButtonProps & {
  color?: string | null;
};

type ButtonTitleProps = { light: boolean };

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 18px;

  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.main};

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text<ButtonTitleProps>`
  color: ${({ theme, light }) =>
    light ? theme.colors.title : theme.colors.shape};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary500};
`;
