import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const width = Dimensions.get("window");
const height = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const listRef = useRef();

  // console.log(allProducts);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setAllProducts(response.data);
        setFullData(response.data);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
        setAllProducts([]);
      });
  }, []);

  const searchInput = (value) => {
    if (value == "") {
      setAllProducts(fullData);
    } else {
      const filterData = allProducts.filter((e) => {
        return e.title.toLowerCase().includes(value.toLowerCase());
      });
      setAllProducts(filterData);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar color="white" />
      {/* Side bar */}

      {/* Top Home Design */}
      <View style={styles.topFilter}>
        <TextInput
          onChangeText={(value) => searchInput(value)}
          placeholder="Search products"
          style={styles.searchBar}
        />
        <View style={styles.searchIcon}>
          <Icon name="search" size={22} />
        </View>

        <MaterialIcons
          onPress={() => navigation.navigate("cart")}
          name="shopping-cart"
          size={30}
        />

        <View style={styles.micIcon}>
          <Icon name="microphone" size={25} />
        </View>
      </View>

      {/* Top Banner */}

      <View style={styles.imageBannerContainer}>
        <Image
          source={{
            uri: "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX30061762.jpg",
          }}
          style={styles.imageBanner}
          resizeMode="contain"
        />
      </View>

      {/* Filter Section */}

      <View>
        <Pressable
          style={styles.filterBtn}
          onPress={() => setFilterModal(!filterModal)}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 2 }}>
            Filter
          </Text>

          <Ionicons name="filter" size={30} style={{ paddingLeft: 15 }} />
        </Pressable>

        {filterModal ? (
          <View style={styles.filteringSection}>
            <Text
              onPress={() => {
                let sortData = allProducts.sort((a, b) =>
                  a.title > b.title ? 1 : -1
                );
                setAllProducts(sortData);
                listRef.current.scrollToIndex({ animated: true, index: 0 });
                setFilterModal(false);
              }}
              style={styles.filterText}
            >
              Sort By Name
            </Text>
            <Text
              onPress={() => {
                setAllProducts(allProducts.sort((a, b) => b.price - a.price));
                listRef.current.scrollToIndex({ animated: true, index: 0 });

                setFilterModal(false);
              }}
              style={styles.filterText}
            >
              High To Low
            </Text>
            <Text
              onPress={() => {
                setAllProducts(allProducts.sort((a, b) => a.price - b.price));
                listRef.current.scrollToIndex({ animated: true, index: 0 });

                setFilterModal(false);
              }}
              style={styles.filterText}
            >
              Low to High
            </Text>
            <Text
              onPress={() => {
                setAllProducts(
                  allProducts.sort((a, b) => b.rating.rate - a.rating.rate)
                );
                listRef.current.scrollToIndex({ animated: true, index: 0 });

                setFilterModal(false);
              }}
              style={styles.filterText}
            >
              Top Ratings
            </Text>
          </View>
        ) : null}
      </View>

      {/* Loader Section */}

      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 250,
          }}
        >
          <ActivityIndicator size={40} color={"blue"} />
        </View>
      ) : null}

      {error ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>Error on Fetching the product</Text>
        </View>
      ) : null}

      {/* Main Image Fetching Section */}

      {allProducts && (
        <View>
          <FlatList
            data={allProducts}
            keyExtractor={(key) => key.id}
            numColumns={2}
            initialScrollIndex={0}
            ref={listRef}
            renderItem={({ item }) => (
              <Pressable
                style={styles.fetchedImg}
                onPress={() => {
                  navigation.navigate("singleproduct", {
                    id: item.id,
                  });
                }}
              >
                <Image
                  resizeMode="contain"
                  width={150}
                  height={250}
                  source={{ uri: item.image }}
                />

                <View style={styles.imageDetails}>
                  <Text style={styles.title}>{item.title.slice(0, 15)}..</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      paddingTop: 8,
                    }}
                  >
                    <Text>$ {item.price}</Text>
                    <Text style={{ fontWeight: "bold" }}>
                      <Icon name="star" size={20} color="yellow" />
                      {item?.rating?.rate}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  topFilter: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "skyblue",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    borderRadius: 10,
    paddingLeft: 40,
    paddingVertical: 5,
  },
  searchIcon: {
    position: "absolute",
    left: 20,
  },
  micIcon: {
    position: "absolute",
    right: 80,
  },
  imageBannerContainer: {
    width: "100%",
    alignItems: "center",
  },
  imageBanner: {
    width: "95%",
    height: 220,
  },
  filterBtn: {
    width: "100%",
    backgroundColor: "skyblue",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  filteringSection: {
    width: "100%",
    backgroundColor: "whitesmoke",
    position: "absolute",
    top: 40,
    zIndex: 10,
  },
  filterText: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.2,
    borderRightColor: "grey",
    borderRightWidth: 0.5,
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 20,
  },
  fetchedImg: {
    height: 320,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 0.1,
    backgroundColor: "white",
    marginVertical: 12,
    marginHorizontal: 5,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  imageDetails: {
    paddingTop: 3,
    width: "80%",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
