import React, {useContext} from "react";
import {Alert, Linking, Platform, StyleSheet} from "react-native";

import {Text, View} from "../components/Themed";
import Button from "../components/Button";

import firebase from "firebase";
import {UserContext} from "../context/UserContext";
import {Ionicons} from "@expo/vector-icons";

export default function ConsumerDetailsScreen({route}) {
  const consumer = route.params;

  const callNumber = (phone) => {
    console.log("callNumber ----> ", phone);
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `sms:+91${phone}`;
      phoneNumber = `whatsapp://send?text=hellophone=${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        // if (!supported) {
        //   Alert.alert("Phone number is not available");
        // } else {
        return Linking.openURL(phoneNumber);
        // }
      })
      .catch((err) => console.log(err));
  };

  const openMaps = (address) => {
    const fullAddress = address;
    const url = Platform.select({
      ios: `maps:0,0?q=${fullAddress}`,
      android: `geo:0,0?q=${fullAddress}`,
    });

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consumer: {consumer.name}</Text>
      <Text style={styles.title}>Modile: {consumer.phone_no}</Text>
      <Ionicons
        name={"phone-portrait"}
        size={30}
        style={{marginBottom: -3}}
        onPress={() => callNumber(consumer.phone_no)}
      />
      <Text style={styles.title}>Address: {consumer.address}</Text>
      <Ionicons
        name={"map-sharp"}
        size={30}
        style={{marginBottom: -3}}
        onPress={() => openMaps(consumer.address)}
      />
      {/* <Text style={styles.title}>{JSON.stringify(consumer)}</Text> */}
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
