import React, {useContext} from "react";
import {StyleSheet} from "react-native";

import {Text, View} from "../components/Themed";
import Button from "../components/Button";

import firebase from "firebase";
import {UserContext} from "../context/UserContext";

export default function ProfileScreen() {
  const [user] = useContext(UserContext);

  const onLogoutPressed = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User{JSON.stringify(user)}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button mode="contained" onPress={onLogoutPressed}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
