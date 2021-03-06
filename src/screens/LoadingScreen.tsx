import {StackScreenProps} from "@react-navigation/stack";
import * as React from "react";
import {StyleSheet, Text, ActivityIndicator, View} from "react-native";

import {RootStackParamList} from "../types";

export default function LoadingScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Loading">) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.title}>Loading</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
