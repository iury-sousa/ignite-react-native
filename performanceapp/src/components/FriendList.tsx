import React, { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { Friend } from "./Friend";

type ItemProps = {
  data: {
    id: number;
    name: string;
    likes: number;
    online?: string;
  }[];
  follow: () => void;
};

export function FriendList({ data, follow }: ItemProps) {
  const totalLikes = useMemo(() => {
    return data.reduce((likes, friends) => {
      return likes + friends.likes;
    }, 0);
  }, [data]);

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ marginBottom: 10 }}>Total de likes: {totalLikes}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Friend data={item} follow={follow} />}
      />
    </View>
  );
}
