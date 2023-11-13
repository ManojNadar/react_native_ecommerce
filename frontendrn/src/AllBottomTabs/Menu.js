import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React, { useContext } from "react";
import Bars from "react-native-vector-icons/FontAwesome";
import Logout from "react-native-vector-icons/FontAwesome";
import Login from "react-native-vector-icons/Ionicons";
import { MyContext } from "../Context/EcomContext";

const WishList = ({ navigation }) => {
  const { state, logout } = useContext(MyContext);

  const logoutAlert = () =>
    Alert.alert("Confirm Logout", "Are you sure", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      { text: "OK", onPress: () => logout() },
    ]);

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
        <Text
          style={styles.allMenus}
          onPress={() => navigation.navigate("Profile")}
        >
          Account
        </Text>
        <Text style={styles.allMenus}>WishList</Text>
        <Text style={styles.allMenus}>Settings</Text>
        <Text style={styles.allMenus}>payment</Text>

        {state?.currentuser ? (
          <Text
            onPress={() => navigation.navigate("Orders")}
            style={styles.allMenus}
          >
            Your Orders
          </Text>
        ) : null}
      </View>

      {state?.currentuser ? (
        <Pressable
          onPress={logoutAlert}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            marginTop: 25,
            backgroundColor: "skyblue",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Logout name="power-off" size={30} color={"red"} />
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              paddingLeft: 20,
              color: "red",
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
            backgroundColor: "skyblue",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Login name="log-in" size={35} color={"green"} />
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              paddingLeft: 20,
              color: "green",
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
    paddingVertical: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: "grey",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: 0.5,
    backgroundColor: "whitesmoke",
  },
});
