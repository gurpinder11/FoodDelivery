import {createStackNavigator} from "@react-navigation/stack";
import React, {useState, useEffect} from "react";

import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import {RootStackParamList} from "../types";
import BottomTabNavigator from "./BottomTabNavigator";

import {UserContextProvider} from "../context/UserContext";

import firebase from "firebase";
import ConsumerDetailsScreen from "../screens/ConsumerDetailsScreen";

// A root stack navigator is often used for displaying modals on top of all other content
const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
  };

  return (
    <UserContextProvider>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        ) : !isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen name="ConsumerDetails" component={ConsumerDetailsScreen} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: "Oops!"}} />
          </>
        )}
      </Stack.Navigator>
    </UserContextProvider>
  );
}
