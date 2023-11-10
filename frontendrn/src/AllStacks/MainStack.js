import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login";
import Register from "./Register";
import MainBottom from "../AllBottomTabs/MainBottom";
import EcomContext from "../Context/EcomContext";
import SingleProduct from "./SingleProducts";
import Cart from "./Cart";
import FeedbackModal from "./FeedbackModal";
import Orders from "./Orders";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <EcomContext>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="mainbottom">
          <Stack.Screen
            name="register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
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
          <Stack.Screen
            name="FeedbackModal"
            component={FeedbackModal}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="Orders"
            component={Orders}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </EcomContext>
  );
};

export default MainStack;
