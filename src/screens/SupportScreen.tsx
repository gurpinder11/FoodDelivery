import React, {useContext} from "react";
import {Linking, StyleSheet} from "react-native";

import {Text, View} from "../components/Themed";
import Button from "../components/Button";

import firebase from "firebase";
import {UserContext} from "../context/UserContext";
import {Ionicons} from "@expo/vector-icons";

export default function SupportScreen() {
  const [user] = useContext(UserContext);

  const sendMail = () => {
    Linking.openURL("mailto:ggndsfooddelivery@gmail.com");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Support </Text>
      <Ionicons name={"md-mail"} size={30} style={{marginBottom: -3}} onPress={() => sendMail()} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
