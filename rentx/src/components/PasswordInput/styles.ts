import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

type Props = {
  isFocused?: boolean;
};
export const Container = styled.View`
  margin-bottom: 8px;

  flex-direction: row;
`;

export const IconContainer = styled.View<Props>`
  width: 56px;
  height: 56px;

  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}

  justify-content: center;
  align-items: center;
`;

export const Separator = styled.View<Props>`
  width: 2px;
  height: 56px;

  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const InputText = styled.TextInput<Props>`
  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.title};
  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};

  flex: 1;
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)``;
