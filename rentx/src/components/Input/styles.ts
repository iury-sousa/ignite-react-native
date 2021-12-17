import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

type ContainerProps = {
  isFocused: boolean;
};
export const Container = styled.View<ContainerProps>`
  margin-bottom: 8px;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}

  flex-direction: row;
`;

export const IconContainer = styled.View`
  width: 56px;
  height: 56px;
  margin-right: 2px;

  background-color: ${({ theme }) => theme.colors.backgroundSecondary};

  justify-content: center;
  align-items: center;
`;

export const InputText = styled.TextInput`
  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};

  flex: 1;
`;
