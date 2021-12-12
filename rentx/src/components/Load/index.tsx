import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

type LoadProps = {
  isLoading?: boolean;
};
export function Load({ isLoading = false }: LoadProps) {
  const theme = useTheme();

  if (!isLoading) {
    return <></>;
  }

  return (
    <ActivityIndicator
      color={theme.colors.main}
      size="large"
      style={{ flex: 1 }}
    />
  );
}
