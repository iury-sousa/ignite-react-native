import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export function Profile() {
  return (
    <View>
      <Text>Perfil</Text>
      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Iury"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        autoCorrect={false}
        value="Sousa"
      />

      <Button title="Salvar" onPress={() => null} />
    </View>
  );
}
