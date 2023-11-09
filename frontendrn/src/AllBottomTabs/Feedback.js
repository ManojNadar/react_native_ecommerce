import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import api from "../ApiConfig/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyContext } from "../Context/EcomContext";

const width = Dimensions.get("window");
const height = Dimensions.get("window");

const Feedback = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const { state } = useContext(MyContext);

  // console.log(message);
  // console.log(feedbacks[0]);

  const submitFeedback = async () => {
    if (message) {
      try {
        const token = await AsyncStorage.getItem("shoptoken");
        const response = await api.post("/addfeedback", { message, token });

        if (response.data.success) {
          alert("Feedback sent Successfully");
          setMessage("");
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      alert("Empty FeedBack");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.feedheader}>FEEDBACK</Text>
      <View style={styles.form}>
        {state?.currentuser ? (
          <View>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.labelName}>
              {state?.currentuser?.name.toUpperCase()}
            </Text>
          </View>
        ) : null}
        <TextInput
          onChangeText={(text) => setMessage(text)}
          style={styles.inputMessage}
          multiline={true}
          numberOfLines={8}
          placeholder="Enter message"
          value={message}
        />

        {state?.currentuser ? (
          <View style={{ marginTop: 35, width: "100%" }}>
            <Button
              onPress={submitFeedback}
              title="Send"
              style={styles.button}
            />
          </View>
        ) : (
          <View style={{ marginTop: 35 }}>
            <Button
              onPress={() => navigation.navigate("login")}
              title="Login TO send FeedBack"
              style={styles.button}
            />
          </View>
        )}
      </View>

      <View>
        <Button
          title="FEEDBACK LISTS"
          onPress={() => navigation.navigate("FeedbackModal")}
        />
      </View>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    width: width,
    height: height,
    // justifyContent: "center",
    // alignItems: "center",
  },

  feedheader: {
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 2,
    backgroundColor: "skyblue",
    width: "100%",
    textAlign: "center",
    paddingVertical: 5,
  },
  form: {
    width: "100%",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  labelName: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 25,
  },
  inputMessage: {
    width: "100%",
    borderWidth: 3,
    paddingLeft: 10,
    paddingTop: 10,
    textAlignVertical: "top",
    marginTop: 20,
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: "#007bff",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
