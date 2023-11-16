import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
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
      alert("Empty Feedback Not Allowed");
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
          <Pressable onPress={submitFeedback} style={styles.btn}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              Send
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate("login")}
          >
            <Text>Please Login To Send Feedback</Text>
          </Pressable>
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
  btn: {
    width: 220,
    height: 50,
    marginTop: 25,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "green",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
