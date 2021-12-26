import React, { useCallback, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { FriendList } from "../components/FriendList";

type Data = {
  id: number;
  name: string;
  likes: number;
  online?: string;
};
export function Home() {
  const [name, setName] = useState("");
  const [friends, setFriends] = useState<Data[]>([]);

  async function handleSearch() {
    const response = await fetch(`http://192.168.31.56:3333/friends?q=${name}`);
    const data = (await response.json()) as Data[];

    const formattedData = data.map((item) => {
      return {
        ...item,
        online: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };
    });

    setFriends(formattedData);
  }

  const handleFollow = useCallback(() => {
    console.log("follow user");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do cliente"
        onChangeText={setName}
        value={name}
      />
      <Button title="Buscar" onPress={handleSearch} />

      <FriendList data={friends} follow={handleFollow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginVertical: 10,
  },
});
