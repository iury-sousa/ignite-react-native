import React from "react";
import { Text } from "react-native";

type ItemProps = {
  data: {
    name: string;
    likes: number;
  };
};

export function Friend({ data }: ItemProps) {
  return (
    <Text>
      {data.name} - Likes: {data.likes}
    </Text>
  );
}
