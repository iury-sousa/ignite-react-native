import styled from "styled-components/native";

type Props = {
  active: boolean;
};

export const Container = styled.View<Props>`
  width: 6px;
  height: 6px;
  margin-left: 8px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};
  border-radius: 3px;
`;
