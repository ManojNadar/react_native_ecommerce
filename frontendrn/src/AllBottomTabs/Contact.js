import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
} from "react-native";

const Contact = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Contact Us</Text>
      <ScrollView style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Enter your name" />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
        />

        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the subject of your message"
        />

        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your message"
          multiline={true}
          numberOfLines={5}
        />

        <Button title="Send" style={styles.button} />
      </ScrollView>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderWidth: 0,
    borderBottomWidth: 3,
    marginBottom: 5,
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
