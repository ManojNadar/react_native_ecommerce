import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import Bars from "react-native-vector-icons/FontAwesome";
import Logout from "react-native-vector-icons/FontAwesome";
import { MyContext } from "../Context/EcomContext";

const WishList = ({ navigation }) => {
  const { state, logout } = useContext(MyContext);

  return (
    <View style={styles.container}>
      <View
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 25,
          backgroundColor: "skyblue",
          paddingVertical: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Bars name="bars" size={30} />
        <Text
          style={{
            fontSize: 25,
            paddingLeft: 15,
            fontWeight: "bold",
            letterSpacing: 1.5,
          }}
        >
          Main Menu
        </Text>
      </View>

      <View style={styles.menuContainer}>
        <Text style={styles.allMenus}>My Account</Text>
        <Text style={styles.allMenus}>Settings</Text>
        <Text style={styles.allMenus}>payment Methods</Text>
        <Text style={styles.allMenus}>Your Orders</Text>
      </View>

      {state?.currentuser ? (
        <Pressable
          onPress={logout}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            marginTop: 25,
            borderRadius: 20,
          }}
        >
          <Logout name="power-off" size={30} />
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              paddingLeft: 20,
            }}
          >
            Sign Out
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => navigation.navigate("login")}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            marginTop: 25,
            borderRadius: 20,
          }}
        >
          <Logout name="power-off" size={30} />
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              paddingLeft: 20,
            }}
          >
            Log in
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    marginTop: 15,
  },
  allMenus: {
    paddingVertical: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: "whitesmoke",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
