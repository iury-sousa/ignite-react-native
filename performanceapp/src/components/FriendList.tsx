import React from "react";
import { View } from "react-native";
import { Friend } from "./Friend";

type ItemProps = {
  data: {
    id: number;
    name: string;
    likes: number;
  }[];
};

export function FriendList({ data }: ItemProps) {
  return (
    <View>
      {data.map((friend) => (
        <Friend key={friend.id} data={friend} />
      ))}
    </View>
  );
}
