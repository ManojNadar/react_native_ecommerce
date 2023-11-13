import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Profile from "./Profile";
import Feedback from "./Feedback";
import Menu from "./Menu";
import Ionicons from "react-native-vector-icons/Ionicons";
import Bars from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { MyContext } from "../Context/EcomContext";

const Tab = createBottomTabNavigator();

const MainBottom = () => {
  const { state } = useContext(MyContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 55 },
      }}
      initialRouteName="mainbottom"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarActiveTintColor: "skyblue",
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: "bold",
          },
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
        name="Feedback"
        component={Feedback}
        options={{
          tabBarActiveTintColor: "skyblue",
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarIcon: ({ size, focused }) => {
            return (
              <MaterialIcons
                name="feedback"
                size={size}
                color={focused ? "skyblue" : "black"}
              />
            );
          },
        }}
      />

      {state?.currentuser && (
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarActiveTintColor: "skyblue",
            tabBarLabelStyle: {
              fontSize: 15,
            },
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
      )}

      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarActiveTintColor: "skyblue",
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarIcon: ({ size, focused }) => {
            return (
              <Bars
                name="bars"
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
