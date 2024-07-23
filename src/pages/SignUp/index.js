import React from "react";

import { Platform } from "react-native";

import {
  Container,
  Background,
  AreaInput,
  SubmitButton,
  SubmitText,
  Input,
} from "../SignIn/styles";

function SignUp() {
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

        <SubmitButton>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
        
      </Container>
    </Background>
  );
}

export default SignUp;
