import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  orderDetails: {
    marginBottom: 20,
  },
  orderLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  orderValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  shippingAddress: {
    marginBottom: 20,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addressValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  paymentMethod: {
    marginBottom: 20,
  },
  paymentMethodLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  paymentMethodValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  orderSummary: {
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  submitButton: {
    width: 150,
    height: 40,
    backgroundColor: "#007bff",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Order = () => {
  const [shippingAddress, setShippingAddress] = useState();
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePlaceOrder = () => {
    console.log(
      "Placing order with shipping address:",
      shippingAddress,
      "and payment method:",
      paymentMethod
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Order Summary</Text>

      <ScrollView style={styles.orderDetails}>
        <Text style={styles.orderLabel}>Order Number:</Text>
        <Text style={styles.orderValue}>ORD-123456</Text>

        <Text style={styles.orderLabel}>Order Date:</Text>
        <Text style={styles.orderValue}>2023-11-08</Text>

        <Text style={styles.orderLabel}>Shipping Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter shipping address"
          onChangeText={(text) => setShippingAddress(text)}
          value={shippingAddress}
        />

        <Text style={styles.orderLabel}>Payment Method:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter payment method"
          onChangeText={(text) => setPaymentMethod(text)}
          value={paymentMethod}
        />
      </ScrollView>

      <View style={styles.orderSummary}>
        <Text style={styles.summaryLabel}>Subtotal:</Text>
        <Text style={styles.summaryValue}>$100.00</Text>

        <Text style={styles.summaryLabel}>Shipping:</Text>
        <Text style={styles.summaryValue}>$10.00</Text>

        <Text style={styles.summaryLabel}>Total:</Text>
        <Text style={styles.summaryValue}>$110.00</Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handlePlaceOrder}>
        <Text style={{ color: "#fff" }}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Order;
