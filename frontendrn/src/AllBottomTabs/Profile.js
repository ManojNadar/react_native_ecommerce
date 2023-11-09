import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Image, Button, TextInput } from "react-native";
import { MyContext } from "../Context/EcomContext";
import api from "../ApiConfig/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const { state, login } = useContext(MyContext);
  const [profileModal, setProfileModal] = useState(false);
  const [updateProf, setUpdateProf] = useState({
    name: "",
    email: "",
    password: "",
  });

  // console.log(updateProf);

  const handleUpdate = (value, name) => {
    setUpdateProf((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const closeUpdateModal = () => {
    setProfileModal(false);
    setUpdateProf({
      name: "",
      email: "",
      password: "",
    });
  };

  const submitUpdateProfile = async () => {
    const { name, email, password } = updateProf;

    if (name && email && password) {
      try {
        const token = await AsyncStorage.getItem("shoptoken");
        const response = await api.post("/updateprofile", {
          token,
          updateProf,
        });

        if (response.data.success) {
          const userData = response.data.updateUser;
          login(userData, token);
          alert("Profile Updated Success");
          setProfileModal(false);

          setUpdateProf({ name: "", email: "", password: "" });
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("please fill all the fields to Update");
    }
  };

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

      <Button
        onPress={() => setProfileModal(true)}
        title="Edit Profile"
        style={styles.editButton}
      />

      {profileModal ? (
        <View style={styles.profileModalStyle}>
          <View>
            <TextInput
              placeholder="Update Name"
              style={styles.profileUpdateInput}
              value={updateProf.name}
              onChangeText={(value) => handleUpdate(value, "name")}
            />
            <TextInput
              placeholder="Update Email"
              style={styles.profileUpdateInput}
              value={updateProf.email}
              onChangeText={(value) => handleUpdate(value, "email")}
            />
            <TextInput
              placeholder="Update Password"
              style={styles.profileUpdateInput}
              onChangeText={(value) => handleUpdate(value, "password")}
              value={updateProf.password}
              secureTextEntry={true}
            />
            <View style={styles.profileUpdateBtn}>
              <Button title="Update Profile" onPress={submitUpdateProfile} />
            </View>
            <View style={styles.profileUpdateBtn}>
              <Button onPress={closeUpdateModal} title="Close" />
            </View>
          </View>
        </View>
      ) : null}
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
  profileModalStyle: {
    backgroundColor: "skyblue",
    width: "100%",
    height: 320,
    marginTop: 25,
    position: "absolute",
    top: 250,
    left: 20,
  },
  profileUpdateInput: {
    width: "90%",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    paddingVertical: 10,
  },
  profileUpdateBtn: {
    marginTop: 18,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
