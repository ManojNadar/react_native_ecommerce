import React, { useContext } from "react";
import { StyleSheet, View, Text, Image, Button, Pressable } from "react-native";
import { MyContext } from "../Context/EcomContext";

const Profile = () => {
  const { state } = useContext(MyContext);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
        }}
        style={styles.profileImage}
      />

      <View style={styles.profileInfo}>
        <Text style={styles.profileLabel}>Name:</Text>
        <Text style={styles.profileValue}>
          {state?.currentuser
            ? state?.currentuser?.name.toUpperCase()
            : "No User"}
        </Text>

        <Text style={styles.profileLabel}>Email:</Text>
        <Text style={styles.profileValue}>
          {state?.currentuser
            ? state?.currentuser?.email.toUpperCase()
            : "No Email"}
        </Text>
      </View>

      <Button title="Edit Profile" style={styles.editButton} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileInfo: {
    marginBottom: 20,
    marginLeft: 10,
  },
  profileLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    width: 150,
    height: 40,
    backgroundColor: "#007bff",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
