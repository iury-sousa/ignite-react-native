import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { TransactionTypeButtonType } from ".";
import theme from "../../../global/styles/theme";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type IconProps = {
  type: TransactionTypeButtonType;
};

type ContainerProps = {
  isActive?: boolean;
  type: TransactionTypeButtonType;
};

const setActiveButtonStyles = (
  isActive?: boolean,
  type?: TransactionTypeButtonType
) => {
  if (isActive) {
    switch (type) {
      case "up":
        return css`
          background-color: ${theme.colors.successLight};
          border-width: 0;
        `;
      case "down":
        return css`
          background-color: ${theme.colors.attentionLight};
          border-width: 0;
        `;
    }
  }
};

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
} as TouchableOpacityProps)<ContainerProps>`
  width: 48%;
  padding: 16px 24px;

  border: 1.5px solid ${theme.colors.border};
  ${({ isActive, type }) => setActiveButtonStyles(isActive, type)};

  border-radius: 5px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)<IconProps>`
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};

  font-size: ${RFValue(24)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
