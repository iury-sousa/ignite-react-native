import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";
import { Input } from "../../components/Input";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/auth";

import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../../components/Button";

type OptionType = "dataEdit" | "passwordEdit";

export function Profile() {
  const { user, signOut, updatedUser } = useAuth();

  const [option, setOption] = useState<OptionType>("dataEdit");
  const [avatar, setAvatar] = useState(user?.avatar);

  const [name, setName] = useState(user?.name);
  // const [email, setEmail] = useState(user?.email);
  const [driverLicense, setDriverLicense] = useState(user?.driver_license);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Lembre-se que se você sair, irá precisar de internet para conectar-se novamente.",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Sair",
          onPress: () => signOut(),
        },
      ]
    );
  }

  function handleOptionChange(option: OptionType) {
    setOption(option);
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        driverLicense: Yup.string().required("CNH é obrigatório"),
      });

      const data = { name, driverLicense };
      await schema.validate(data, { abortEarly: false });

      await updatedUser({
        id: user?.id!,
        userId: user?.userId!,
        email: user?.email!,
        name: data.name!,
        driver_license: data.driverLicense!,
        avatar,
        token: user?.token!,
      });

      Alert.alert("Perfil atualizado!");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Atenção", error.errors[0]);
      } else {
        Alert.alert("Não foi possível atualizar o perfil!");
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name="camera" size={22} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>
          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleOptionChange("dataEdit")}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === "passwordEdit"}
                onPress={() => handleOptionChange("passwordEdit")}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>
            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user?.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user?.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user?.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </Section>
            )}

            <Button
              title="Salvar alterações"
              style={{ marginTop: 8 }}
              onPress={handleProfileUpdate}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
