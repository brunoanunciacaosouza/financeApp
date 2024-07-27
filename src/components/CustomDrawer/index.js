import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useContext } from "react";
import { Image } from "react-native";
import { View, Text } from "react-native";
import { AuthContext } from "../../contexts/auth";

function CustomDrawer(props) {
  const { user, signOut } = useContext(AuthContext);
  return (
    <DrawerContentScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        <Image
          source={require("../../../assets/Logo.png")}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />

        <Text style={{ fontSize: 18, marginTop: 14 }}>Bem-vindo(a)</Text>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 14,
            paddingHorizontal: 20,
          }}
          numberOfLines={1}
        >
          {user && user.name}
        </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
