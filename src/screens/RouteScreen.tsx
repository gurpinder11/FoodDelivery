import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {StyleSheet, Button, TouchableOpacity} from "react-native";

import firebase from "firebase/app";

import {Text, View} from "../components/Themed";
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "../context/UserContext";

export default function RouteScreen() {
  const navigation = useNavigation();

  const [user] = useContext(UserContext);
  const [consumers, setConsumers] = useState([]);
  const [routes, setRoutes] = useState([]);

  const refresh = () => {
    try {
      const deliveryPersonDocRef = firebase.firestore().collection("user").doc(user.uid);

      // Routes
      firebase
        .firestore()
        .collection("route")
        // .orderBy("name", "asc")
        .where("delivery_person", "array-contains", deliveryPersonDocRef)
        .get()
        .then(async (routes) => {
          let routesData: any = [];

          for (var i = 0; i < routes.size; i++) {
            const routeDoc = routes.docs[i];
            const consumersTemp = await fetchConsumers(routeDoc);
            routesData.push({...routeDoc.data(), consumer: consumersTemp});
          }
          console.log(routesData);
          setRoutes(routesData);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchConsumers = async (routeDoc) => {
    const consumerList = routeDoc.data().consumer;

    let consumersTemp = [];
    for (var i = 0; i < consumerList.length; i++) {
      const c = await consumerList[i].get().then((snap) => {
        return snap.data();
      });
      consumersTemp.push(c);
    }
    console.log("Route: ", routeDoc.data().name, "CO Data: ", consumersTemp);
    return consumersTemp;
  };

  useEffect(() => {
    refresh();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User {JSON.stringify(user)}</Text>
      <Text style={styles.title}>Consumers</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {routes.map((route, index) => {
        console.log(route);
        return (
          <View key={index}>
            <Text>{route.name}</Text>
            {route.consumer.map((c, i) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate("ConsumerDetails", c)}>
                  <Text key={i}>{c.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
      <Button title="Refresh" onPress={refresh} />
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
