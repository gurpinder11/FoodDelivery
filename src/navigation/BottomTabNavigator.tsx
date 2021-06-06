import {Ionicons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import React, {useContext} from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import RouteScreen from "../screens/RouteScreen";
import SupportScreen from "../screens/SupportScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {BottomTabParamList, RouteTabParamList, ProfileTabParamList} from "../types";
import {UserContext} from "../context/UserContext";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const deliveryPerson = "DELIVERY_PERSON";

export default function BottomTabNavigator() {
  const [user] = useContext(UserContext);
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="RouteTab"
      tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}
    >
      {user.type === deliveryPerson && (
        <BottomTab.Screen
          name="RouteTab"
          component={RouteTabNavigator}
          options={{
            title: "Route",
            tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color} />,
          }}
        />
      )}
      <BottomTab.Screen
        name="SupportTab"
        component={SupportTabNavigator}
        options={{
          title: "Support",
          tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ProfieTab"
        component={ProfileTabNavigator}
        options={{
          title: "Profile",
          tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {name: React.ComponentProps<typeof Ionicons>["name"]; color: string}) {
  return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

const RouteTabStack = createStackNavigator<RouteTabParamList>();

function RouteTabNavigator() {
  return (
    <RouteTabStack.Navigator>
      <RouteTabStack.Screen
        name="RouteScreen"
        component={RouteScreen}
        options={{headerTitle: "My Route"}}
      />
    </RouteTabStack.Navigator>
  );
}

const SupportTabStack = createStackNavigator<SupportTabParamList>();

function SupportTabNavigator() {
  return (
    <SupportTabStack.Navigator>
      <SupportTabStack.Screen
        name="SupportScreen"
        component={SupportScreen}
        options={{headerTitle: "Support"}}
      />
    </SupportTabStack.Navigator>
  );
}

const ProfileTabStack = createStackNavigator<ProfileTabParamList>();

function ProfileTabNavigator() {
  return (
    <ProfileTabStack.Navigator>
      <ProfileTabStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerTitle: "Profile"}}
      />
    </ProfileTabStack.Navigator>
  );
}
