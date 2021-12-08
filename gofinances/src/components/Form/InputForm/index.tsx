import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";
import { Container, Error } from "./styles";

type InputFormProps = TextInputProps & {
  control: Control<any>;
  name: string;
  error?: string | undefined;
};

export const InputForm = ({
  control,
  name,
  error,
  ...rest
}: InputFormProps) => {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            {...rest}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};
