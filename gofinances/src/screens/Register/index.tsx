import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import {
  TransactionTypeButton,
  TransactionTypeButtonType,
} from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import uuid from "react-native-uuid";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

type FormData = {
  name: string;
  amount: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  amount: yup
    .number()
    .required("Preço é obrigatório")
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo"),
});

const dataKey = "@gofinances:transaction";

export const Register = () => {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [transactionType, setTransactionType] =
    useState<TransactionTypeButtonType | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();

  function handleTransactionTypeSelect(type: TransactionTypeButtonType) {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transação");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categoria");
    }

    const transaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      category: category.key,
      type: transactionType,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, transaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType(null);
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigation.navigate("Listagem" as never);
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name?.message}
            />
            <InputForm
              placeholder="Preço"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors.amount?.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                type="positive"
                title="Income"
                onPress={() => handleTransactionTypeSelect("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                type="negative"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect("negative")}
                isActive={transactionType === "negative"}
              />
            </TransactionsTypes>
            <CategorySelectButton
              title={category.name ?? "Categoria"}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
