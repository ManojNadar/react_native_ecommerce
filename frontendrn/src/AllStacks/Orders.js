import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import api from "../ApiConfig/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window");
const height = Dimensions.get("window");

const Orders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  console.log(orders);

  useEffect(() => {
    async function getOrderProducts() {
      try {
        const token = await AsyncStorage.getItem("shoptoken");

        console.log(token);
        const response = await api.post("/getorderproducts", { token });

        if (response.data.success) {
          setOrders(response.data.orderProducts);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }

    getOrderProducts();
  }, []);

  useEffect(() => {
    if (orders.length) {
      let sum = 0;
      for (let i = 0; i < orders.length; i++) {
        sum += orders[i].price;
      }

      setTotal(sum);
    }
  }, [orders, total]);

  const removeItem = async (id) => {
    try {
      const token = await AsyncStorage.getItem("shoptoken");
      const response = await api.post("/removeorders", { id, token });

      if (response.data.success) {
        alert(response.data.message);
        setOrders(response.data.refreshOrderProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {
    try {
      const token = await AsyncStorage.getItem("shoptoken");

      const response = await api.post("/finalbuy", { token });

      if (response.data.success) {
        Alert.alert("Buy this product", "Are you Sure", [
          {
            text: "Yes",
            onPress: () => {
              setOrders(response.data.orderProducts);
              alert("Order will Deliver Soon THANK YOU");
            },
          },

          {
            text: "Cancel",
            onPress: () => {},
          },
        ]);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          paddingVertical: 5,
          backgroundColor: "skyblue",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Your Orders
      </Text>

      {orders?.length ? (
        <View style={{ width: "100%" }}>
          <FlatList
            data={orders}
            keyExtractor={(key) => key.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("singleproduct", {
                    item,
                  });
                }}
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                  borderBottomColor: "black",
                  borderBottomWidth: 5,
                  paddingBottom: 10,
                  backgroundColor: "white",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {item.title.slice(0, 20)}..
                </Text>
                <Text
                  style={styles.removebtn}
                  onPress={() => removeItem(item.id)}
                >
                  Remove
                </Text>
              </Pressable>
            )}
          />

          <View>
            <Pressable
              onPress={placeOrder}
              style={{
                backgroundColor: "green",
                paddingVertical: 10,
                width: "70%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 25,
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "white",
                }}
              >
                $ {total} Place Order
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 25,
            marginTop: 25,
          }}
        >
          NO ORDERS
        </Text>
      )}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: { flex: 1, width: width, height: height },
  removebtn: { backgroundColor: "red", color: "white", padding: 5 },
});
