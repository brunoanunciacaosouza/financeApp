import React, { useContext } from "react";

import { Platform } from "react-native";

import {
  Container,
  Background,
  AreaInput,
  SubmitButton,
  SubmitText,
  Input,
} from "../SignIn/styles";

import { AuthContext } from "../../contexts/auth";

function SignUp() {
  const { user } = useContext(AuthContext);

  const handleSignUp = () => {
    console.log(user)
  };

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <AreaInput>
          <Input placeholder="Nome" />
        </AreaInput>

        <AreaInput>
          <Input placeholder="Seu email" />
        </AreaInput>

        <AreaInput>
          <Input placeholder="Sua senha" />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Container>
    </Background>
  );
}

export default SignUp;
