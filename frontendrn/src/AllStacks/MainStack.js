import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login";
import Register from "./Register";
import MainBottom from "../AllBottomTabs/MainBottom";
import EcomContext from "../Context/EcomContext";
import SingleProduct from "./SingleProducts";
import Cart from "./Cart";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <EcomContext>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen
            name="singleproduct"
            component={SingleProduct}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="cart"
            component={Cart}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="mainbottom"
            component={MainBottom}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </EcomContext>
  );
};

export default MainStack;
