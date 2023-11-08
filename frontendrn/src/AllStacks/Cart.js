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
import React, { useContext, useEffect, useState } from "react";
import api from "../ApiConfig/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { MyContext } from "../Context/EcomContext";

const width = Dimensions.get("window");
const height = Dimensions.get("window");

const Cart = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const { state } = useContext(MyContext);

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
      <View style={styles.cartHeader}>
        <Icon name="shopping-cart" size={30} color="black" />
        <Text style={styles.cartHeaderText}>My Cart</Text>
      </View>

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
                Total $.{total}
              </Text>
              <View>
                <Button title="Place Order" color={"orange"} />
              </View>
              <View style={styles.cartBtn}>
                <Button
                  onPress={() => navigation.navigate("mainbottom")}
                  title="Continue Shopping"
                  color={"green"}
                />
              </View>
            </View>
          ) : (
            <View>
              <Image
                source={{
                  uri: "https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png",
                }}
                width={400}
                height={500}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          <Image
            source={{
              uri: "https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png",
            }}
            width={400}
            height={500}
            resizeMode="contain"
          />
          <Button
            onPress={() => navigation.navigate("mainbottom")}
            title="Back To Home"
            color={"green"}
          />
        </View>
      )}

      {!state?.currentuser ? (
        <View style={{ marginTop: 25 }}>
          <Button
            onPress={() => navigation.navigate("login")}
            title="Please Login To See Cart Details"
            color={"grey"}
          />
        </View>
      ) : null}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "skyblue",
    height: 70,
    paddingTop: 10,
  },
  cartHeaderText: {
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  cartProd: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 0.8,
    paddingBottom: 8,
    marginTop: 12,
  },
  removebtn: {
    backgroundColor: "red",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  cartBtn: {
    marginTop: 20,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
