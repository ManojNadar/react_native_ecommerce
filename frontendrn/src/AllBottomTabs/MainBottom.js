import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Cart from "./Cart";

const Tab = createBottomTabNavigator();

const MainBottom = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="cart" component={Cart} />
    </Tab.Navigator>
  );
};

export default MainBottom;
