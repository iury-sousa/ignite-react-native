import React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components";

import { Container, Name } from "./styles";

type AccessoryProps = {
  name: string;
  icon: React.FC<SvgProps>;
};

export function Accessory({ name, icon: Icon }: AccessoryProps) {
  const theme = useTheme();
  return (
    <Container>
      <Icon width={32} height={32} color={theme.colors.header} />
      <Name>{name}</Name>
    </Container>
  );
}
