import {
  BorderlessButton,
  RectButton,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

type OptionProps = {
  active: boolean;
};
export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};

  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 227px;
  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.header};

  align-items: center;
`;

export const HeaderTop = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 32}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.backgroundSecondary};

  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary600};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  margin-top: 48px;

  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;

  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  width: 40px;
  height: 40px;

  background-color: ${({ theme }) => theme.colors.main};

  position: absolute;
  bottom: 10px;
  right: 10px;

  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 156px;

  flex: 1;
`;

export const Options = styled.View`
  margin-bottom: 24px;
  padding: 0 24px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};

  flex-direction: row;
  justify-content: space-around;
`;

export const Option = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<OptionProps>`
  padding: 0 8px 14px;

  ${({ theme, active }) =>
    active &&
    css`
      border-bottom-width: 3px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const OptionTitle = styled.Text<OptionProps>`
  color: ${({ theme, active }) =>
    active ? theme.colors.header : theme.colors.textDetail};

  font-size: ${RFValue(20)}px;
  font-family: ${({ theme, active }) =>
    active ? theme.fonts.secondary600 : theme.fonts.secondary500};
`;
