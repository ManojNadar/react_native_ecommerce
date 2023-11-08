import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import api from "../ApiConfig/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window");
const height = Dimensions.get("window");

const Cart = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // console.log(total);
  // console.log(cart);

  // Fetch Cart Products

  useEffect(() => {
    async function getCartproducts() {
      try {
        const token = await AsyncStorage.getItem("shoptoken");
        const response = await api.post("/getcartproducts", { token });

        if (response.data.success) {
          setCart(response.data.cartproduct);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCartproducts();
  }, []);

  // Total Price

  useEffect(() => {
    if (cart.length) {
      let sum = 0;
      for (let i = 0; i < cart.length; i++) {
        sum += cart[i].price;
      }

      setTotal(sum);
    }
  }, [cart, total]);

  // Remove Cart Items

  const removeItem = async (id) => {
    try {
      const token = await AsyncStorage.getItem("shoptoken");
      const response = await api.post("/removeitem", { id, token });

      if (response.data.success) {
        alert(response.data.message);
        setCart(response.data.refreshCartProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.cartHeader}>Cart</Text>

      {cart.length ? (
        <View>
          <FlatList
            data={cart}
            keyExtractor={(key) => key.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("singleproduct", {
                    id: item.id,
                  });
                }}
                style={styles.cartProd}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
                <Text>{item.title.slice(0, 20)}..</Text>
                <Text
                  style={styles.removebtn}
                  onPress={() => removeItem(item.id)}
                >
                  Remove
                </Text>
              </Pressable>
            )}
          />

          {cart.length ? (
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginVertical: 20,
                  fontSize: 30,
                  backgroundColor: "skyblue",
                }}
              >
                Total Rs.{total}
              </Text>
            </View>
          ) : (
            <Text>Your Cart is Empty</Text>
          )}
          {cart.length ? (
            <View>
              <Button title="Place Order" color={"orange"} />
            </View>
          ) : (
            <Text>Your Cart is Empty</Text>
          )}

          {cart.length ? (
            <View
              style={{
                marginTop: 20,
                width: "50%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button
                onPress={() => navigation.navigate("mainbottom")}
                title="Continu Shopping"
                color={"green"}
              />
            </View>
          ) : (
            <Text>Your Cart is Empty</Text>
          )}
        </View>
      ) : (
        <Text>Your Cart is Empty</Text>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "white",
  },

  cartHeader: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "skyblue",
    height: 70,
    paddingTop: 10,
  },
  cartProd: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    borderWidth: 0.2,
    marginTop: 12,
  },
  removebtn: {
    backgroundColor: "red",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
});
