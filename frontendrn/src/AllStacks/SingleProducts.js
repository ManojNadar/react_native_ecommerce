import {
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../ApiConfig/Api";
import { MyContext } from "../Context/EcomContext";
import Star from "react-native-vector-icons/FontAwesome";
import Animated, { LightSpeedInLeft } from "react-native-reanimated";

const width = Dimensions.get("window");
const height = Dimensions.get("window");

const SingleProduct = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { item } = route.params;
  const { state } = useContext(MyContext);

  // console.log(id, "Singleproduct id");
  // console.log(singleProduct);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`https://fakestoreapi.com/products/${id}`)
  //     .then((response) => {
  //       setSingleProduct(response.data);
  //       setLoading(false);
  //       setError(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //       setError(true);
  //       setSingleProduct({});
  //     });
  // }, [id]);

  const addToCart = async (id) => {
    try {
      const token = await AsyncStorage.getItem("shoptoken");
      const response = await api.post("/addtocart", {
        token,
        id,
        item,
      });

      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar color="white" />

      <Animated.Text
        entering={LightSpeedInLeft.duration(500).delay(400)}
        style={styles.title}
      >
        {item.title}
      </Animated.Text>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={40} color={"red"} />
        </View>
      ) : null}
      {error ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>Error on Fetching the product</Text>
        </View>
      ) : null}

      <ScrollView style={styles.mainImageContainer}>
        <Animated.Image
          resizeMode="contain"
          style={styles.singleProductImage}
          source={{ uri: item.image }}
        />

        <View style={styles.singleProductDetailsContainer}>
          <Text style={styles.singleProductDetails}>${item.price}</Text>
          {item?.rating?.rate > 3.5 ? (
            <View style={styles.singleProductDetails}>
              <Star name="star" size={20} color="green" />

              <Text style={{ textAlign: "center" }}>{item?.rating?.rate}</Text>
            </View>
          ) : (
            <View style={styles.singleProductDetails}>
              <Star name="star" size={20} color="red" />

              <Text style={{ textAlign: "center" }}>{item?.rating?.rate}</Text>
            </View>
          )}
        </View>
        <Animated.Text
          entering={LightSpeedInLeft.duration(1000)}
          style={styles.description}
        >
          {item.description}
        </Animated.Text>
      </ScrollView>
      {state?.currentuser ? (
        <View style={styles.bottomSingleProduct}>
          <Pressable style={styles.heart}>
            <Icon name="heart" size={30} color="red" />
          </Pressable>
          <Pressable
            onPress={() => addToCart(item.id)}
            style={styles.addToCart}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Add To Cart
            </Text>
          </Pressable>

          <Pressable
            style={styles.cart}
            onPress={() => navigation.navigate("cart")}
          >
            <Star name="shopping-cart" size={30} color="black" />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  mainImageContainer: {
    marginBottom: 80,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "skyblue",
    color: "black",
    fontWeight: "bold",
  },
  singleProductImage: {
    width: "100%",
    height: 450,
  },

  singleProductDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  singleProductDetails: {
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: 25,
  },
  description: {
    marginTop: 15,
    fontSize: 15,
    paddingHorizontal: 15,
    fontWeight: "bold",
  },
  bottomSingleProduct: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    width: "100%",
    height: 75,
    // backgroundColor: "pink",
    bottom: 0,
    paddingBottom: 10,
  },
  heart: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  addToCart: {
    backgroundColor: "skyblue",
    width: "50%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  cart: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
});
