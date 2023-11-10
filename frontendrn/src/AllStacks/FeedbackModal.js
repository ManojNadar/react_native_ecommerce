import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../ApiConfig/Api";

const FeedbackModal = ({ navigation }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  // console.log(feedbacks);

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
            backgroundColor: "skyblue",
          }}
        >
          FEEDBACKS
        </Text>
      ) : null}
      <View>
        {feedbacks?.length ? (
          <View style={{ marginVertical: 10 }}>
            <FlatList
              data={feedbacks}
              key={(key) => key._id}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginVertical: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    borderBottomWidth: 3,
                    borderBottomColor: "skyblue",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    USER : {item.name.toUpperCase()}
                  </Text>
                  <Text style={{ paddingVertical: 5 }}>
                    COMMENTS : {item.message}
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
