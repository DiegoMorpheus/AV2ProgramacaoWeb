import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { Produto } from "../script/produtoService";
import theme from "../app/theme";

interface Props {
  produto: Produto;
  loading: boolean;
  onChange: (name: keyof Produto, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function FormProduto({
  produto,
  loading,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      nome: produto.nome,
      preco: produto.preco ? String(produto.preco) : "",
    },
  });

  useEffect(() => {
    setValue("nome", produto.nome);
    setValue("preco", produto.preco ? String(produto.preco) : "");
  }, [produto, setValue]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="nome"
        rules={{ required: "Nome obrigatório" }}
        render={({ field: { onChange: onChangeField, value }, fieldState }) => (
          <TextInput
            label="Nome"
            value={value}
            onChangeText={(text) => {
              onChangeField(text);
              onChange("nome", text);
            }}
            mode="outlined"
            style={styles.input}
            autoFocus
            selectionColor={theme.colors.primary}
            theme={{ colors: { text: theme.colors.text } }}
            error={!!fieldState.error}
          />
        )}
      />

      <Controller
        control={control}
        name="preco"
        rules={{
          required: "Preço obrigatório",
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: "Digite um valor válido",
          },
        }}
        render={({ field: { onChange: onChangeField, value }, fieldState }) => (
          <TextInput
            label="Preço"
            value={value}
            onChangeText={(text) => {
              const sanitized = text.replace(",", ".").replace(/[^0-9.]/g, "");
              onChangeField(sanitized);
              onChange("preco", sanitized);
            }}
            mode="outlined"
            keyboardType="decimal-pad"
            style={styles.input}
            selectionColor={theme.colors.primary}
            theme={{ colors: { text: theme.colors.text } }}
            error={!!fieldState.error}
          />
        )}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        style={styles.buttonSalvar}
        labelStyle={styles.buttonSalvarLabel}
      >
        Salvar
      </Button>

      <Button
        mode="outlined"
        onPress={onCancel}
        labelStyle={styles.buttonCancelarLabel}
      >
        Cancelar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    marginBottom: 16,
    backgroundColor: theme.colors.background,
  },
  buttonSalvar: {
    marginBottom: 10,
    backgroundColor: theme.colors.primary,
  },
  buttonSalvarLabel: {
    color: theme.colors.text,
  },
  buttonCancelarLabel: {
    color: theme.colors.primary,
  },
});
