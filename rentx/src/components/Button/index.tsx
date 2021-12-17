import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Container, Title } from "./styles";

type ButtonProps = RectButtonProps & {
  title: string;
  color?: string | null;
  loading?: boolean;
  light?: boolean;
};

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  style,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  return (
    <Container
      {...rest}
      color={color}
      enabled={enabled && !loading}
      style={[style, { opacity: !enabled || loading ? 0.7 : 1 }]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
