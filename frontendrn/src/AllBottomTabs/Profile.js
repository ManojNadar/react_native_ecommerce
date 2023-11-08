import React from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://avatars.githubusercontent.com/u/44746563?v=4" }}
        style={styles.profileImage}
      />

      <View style={styles.profileInfo}>
        <Text style={styles.profileLabel}>Name:</Text>
        <Text style={styles.profileValue}>Bard</Text>

        <Text style={styles.profileLabel}>Email:</Text>
        <Text style={styles.profileValue}>bard@google.com</Text>
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
    backgroundColor: "skyblue",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileInfo: {
    marginBottom: 20,
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
