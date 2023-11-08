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
import React, { useEffect, useState } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../ApiConfig/Api";

const width = Dimensions.get("window");
const height = Dimensions.get("window");

const SingleProduct = ({ route, navigation }) => {
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = route.params;
  // console.log(id, "Singleproduct id");
  // console.log(singleProduct);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setSingleProduct(response.data);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
        setSingleProduct({});
      });
  }, [id]);

  const addToCart = async (id) => {
    try {
      const token = await AsyncStorage.getItem("shoptoken");
      const response = await api.post("/addtocart", {
        token,
        id,
        singleProduct,
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

      <Text style={styles.title}>{singleProduct.title}</Text>
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

      <ScrollView>
        <Image
          resizeMode="contain"
          style={styles.singleProductImage}
          source={{ uri: singleProduct.image }}
        />

        <Text style={styles.description}>{singleProduct.description}</Text>
      </ScrollView>
      <View style={styles.bottomSingleProduct}>
        <Pressable style={styles.heart}>
          <Icon name="heart" size={30} color="red" />
        </Pressable>
        <Pressable
          onPress={() => addToCart(singleProduct.id)}
          style={styles.addToCart}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Add To Cart</Text>
        </Pressable>
        <Pressable
          style={styles.cart}
          onPress={() => navigation.navigate("cart")}
        >
          <Icon name="shopping-cart" size={30} color="black" />
        </Pressable>
      </View>
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