import React, { memo } from "react";
import { Text, View, TouchableOpacity } from "react-native";

type ItemProps = {
  data: {
    name: string;
    likes: number;
    online?: string;
  };
  follow: () => void;
};

function FriendComponent({ data, follow }: ItemProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text>
          {data.name} - Likes: {data.likes}
        </Text>
        <Text>Online em: {data.online}</Text>
      </View>
      <TouchableOpacity
        style={{
          marginLeft: 10,
          padding: 8,
          backgroundColor: "#ddd",
        }}
        onPress={follow}
      >
        <Text>Deixar de seguir</Text>
      </TouchableOpacity>
    </View>
  );
}

export const Friend = memo(FriendComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.data, nextProps.data);
});
