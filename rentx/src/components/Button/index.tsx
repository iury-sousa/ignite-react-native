import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Container, Title } from "./styles";

type ButtonProps = RectButtonProps & {
  title: string;
  color?: string | null;
  loading?: boolean;
};

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  return (
    <Container
      {...rest}
      color={color}
      enabled={enabled && !loading}
      style={{ opacity: !enabled || loading ? 0.7 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
