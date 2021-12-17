import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  margin-bottom: 8px;

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
  color: ${({ theme }) => theme.colors.text};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};

  flex: 1;
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)``;
