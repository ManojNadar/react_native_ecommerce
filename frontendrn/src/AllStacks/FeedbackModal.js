import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../ApiConfig/Api";

const FeedbackModal = ({ navigation }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  console.log(feedbacks);

  useEffect(() => {
    async function getFeedbacks() {
      try {
        const response = await api.get("/getfeedback");

        if (response.data.success) {
          setFeedbacks(response.data.feed);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getFeedbacks();
  }, []);

  return (
    <View style={styles.container}>
      {feedbacks?.length ? (
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 15,
            letterSpacing: 2,
          }}
        >
          FEEDBACKS
        </Text>
      ) : null}
      <View>
        {feedbacks?.length ? (
          <View style={{ marginBottom: 20 }}>
            <FlatList
              data={feedbacks}
              key={(key) => key._id}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: "black",
                    marginVertical: 2,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ color: "white", paddingVertical: 5 }}>
                    {item.message}
                  </Text>
                </View>
              )}
            />
          </View>
        ) : (
          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
            >
              No Feed Backs Yet
            </Text>

            <Button
              title="Please Give Feed back"
              onPress={() => navigation.navigate("Feedback")}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default FeedbackModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
