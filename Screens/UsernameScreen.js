import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsernameScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const saveUsername = async () => {
    if (username.trim() === "") {
      Alert.alert("Error", "Please enter a valid name");
      return;
    }
    await AsyncStorage.setItem("@username", username);
    navigation.replace("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Your Name"
      />
      <Button title="Continue" onPress={saveUsername} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  label: { fontSize: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default UsernameScreen;
