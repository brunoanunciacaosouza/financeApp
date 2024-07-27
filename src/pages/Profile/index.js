import { useContext } from "react";
import Header from "../../components/Header";
import {
  Container,
  Message,
  Name,
  NavLink,
  NewText,
  LogoutButton,
  LogoutText,
} from "./styles";

import { AuthContext } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <Container>
      <Header title="Meu Perfil" />

      <Message>Olá, Bem vindo(a) de volta!</Message>

      <Name numberOfLines={1}>{user && user.name}</Name>

      <NavLink onPress={() => navigation.navigate('Home')}>
        <NewText>Fazer registro</NewText>
      </NavLink>

      <LogoutButton onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </LogoutButton>
    </Container>
  );
}

export default Profile;
