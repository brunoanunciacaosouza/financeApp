import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import api from "../../services/api";

import Header from "../../components/Header";
import RegisterTypes from "../../components/RegisterTypes";

import { Background, Input, SubmitButton, SubmitText } from "./styles";
import { format } from "date-fns/format";
import { useNavigation } from "@react-navigation/native";

function New() {
  const navigation = useNavigation();

  const [labelInput, setLabelInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [type, setType] = useState("receita");

  const handleAdd = async () => {
    Keyboard.dismiss();

    await api.post("/receive", {
      description: labelInput,
      value: Number(valueInput),
      type: type,
      date: format(new Date(), "dd/MM/yyyy"),
    });

    setLabelInput("");
    setValueInput("");

    navigation.navigate("Home");
  };

  const handleSubmit = () => {
    Keyboard.dismiss();

    if (isNaN(parseFloat(valueInput)) || type === null) {
      alert("Preencha todos os campos");
      return;
    }

    Alert.alert(
      "Confirmando dados",
      `Tipo: ${type} - Valor: ${parseFloat(valueInput)}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: handleAdd,
        },
      ]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header title="Registrando" />

        <SafeAreaView style={{ marginTop: 14, alignItems: "center" }}>
          <Input
            placeholder="Descrição desse registro"
            value={labelInput}
            onChangeText={(text) => setLabelInput(text)}
          />

          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            value={valueInput}
            onChangeText={(text) => setValueInput(text)}
          />

          <RegisterTypes
            type={type}
            sendTypeChanged={(item) => setType(item)}
          />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}

export default New;
