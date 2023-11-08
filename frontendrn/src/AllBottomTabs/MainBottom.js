import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Profile from "./Profile";
import Contact from "./Contact";
import Orders from "./Orders";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const MainBottom = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarStyle: { height: 50 },
          tabBarActiveTintColor: "skyblue",
          tabBarIcon: ({ size, focused }) => {
            return (
              <Ionicons
                name="home"
                size={size}
                color={focused ? "skyblue" : "black"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="contact"
        component={Contact}
        options={{
          tabBarActiveTintColor: "skyblue",
          tabBarIcon: ({ size, focused }) => {
            return (
              <Ionicons
                name="call-sharp"
                size={size}
                color={focused ? "skyblue" : "black"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarActiveTintColor: "skyblue",
          tabBarIcon: ({ size, focused }) => {
            return (
              <Ionicons
                name="person"
                size={size}
                color={focused ? "skyblue" : "black"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="orders"
        component={Orders}
        options={{
          tabBarActiveTintColor: "skyblue",
          tabBarIcon: ({ size, focused }) => {
            return (
              <Ionicons
                name="folder-open-sharp"
                size={size}
                color={focused ? "skyblue" : "black"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainBottom;
