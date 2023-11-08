import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import api from "../ApiConfig/Api";
import { MyContext } from "../Context/EcomContext";

const Register = ({ navigation }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // console.log(user);

  const { state } = useContext(MyContext);
  useEffect(() => {
    if (state?.currentuser) {
      navigation.navigate("mainbottom");
    }
  }, [state]);

  function handleChange(value, name) {
    setUser((prevValue) => ({ ...prevValue, [name]: value }));
  }

  const handleSubmit = async () => {
    const { name, email, password } = user;

    if (name && email && password) {
      // console.log(user, "user details");
      try {
        const response = await api.post("/register", {
          user,
        });
        if (response.data.success) {
          alert(response.data.message);
          setUser({
            name: "",
            email: "",
            password: "",
          });
          navigation.navigate("login");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert(error.response.data.message);
        console.log(error);
      }
    } else {
      alert("All Fields are mandatory");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.regForm}>
        <Text style={styles.formHeading}>Register</Text>
        <TextInput
          placeholderTextColor="white"
          style={styles.formInput}
          placeholder="Enter Name"
          onChangeText={(value) => handleChange(value, "name")}
        />
        <TextInput
          placeholderTextColor="white"
          style={styles.formInput}
          placeholder="Enter email"
          onChangeText={(value) => handleChange(value, "email")}
        />
        <TextInput
          style={styles.formInput}
          placeholder="Enter Password"
          secureTextEntry={true}
          placeholderTextColor="white"
          onChangeText={(value) => handleChange(value, "password")}
        />

        <Pressable onPress={handleSubmit} style={styles.formBtn}>
          <Text style={styles.formBtnTxt}>Register</Text>
        </Pressable>

        <Text style={styles.newRegForm}>Already an User ?</Text>
        <Text
          style={styles.newReg}
          onPress={() => navigation.navigate("login")}
        >
          Login
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(255, 213, 128)",
  },
  regForm: {
    width: 320,
    height: 375,
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 10,
  },

  formHeading: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
    color: "white",
  },
  formInput: {
    width: "90%",
    borderWidth: 1,
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "white",
    color: "white",
  },
  formBtn: {
    backgroundColor: "orange",
    width: "90%",
    marginTop: 25,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },
  formBtnTxt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  newRegForm: {
    color: "white",
    marginTop: 10,
  },

  newReg: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 2,
  },
});

export default Register;
