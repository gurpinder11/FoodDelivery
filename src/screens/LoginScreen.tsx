import {StackScreenProps} from "@react-navigation/stack";
import React, {useState, useContext} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {RootStackParamList} from "../types";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import {theme} from "../styles/theme";

import firebase from "firebase";
import {UserContext} from "../context/UserContext";

function emailValidator(email: string) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";
  return "";
}

function passwordValidator(password: string) {
  if (!password) return "Password can't be empty.";
  if (password.length < 5) return "Password must be at least 5 characters long.";
  return "";
}

export default function LoginScreen({navigation}: StackScreenProps<RootStackParamList, "Login">) {
  const [user, setUser] = useContext(UserContext);

  const [email, setEmail] = useState({value: "", error: ""});
  const [password, setPassword] = useState({value: "", error: ""});

  const storeUser = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("User Stored");
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  const getUser = async (uid: string | undefined) => {
    try {
      let user = await firebase.firestore().collection("user").doc(uid).get();
      console.log("User", user.data());
      user = {...user.data(), uid};
      setUser(user);
      storeUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      getUser(response.user?.uid);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Background>
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: string) => setEmail({value: text, error: ""})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string) => setPassword({value: text, error: ""})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
    </Background>
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
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
