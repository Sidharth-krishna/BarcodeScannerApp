import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsernameScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");

  // Check if username already exists
  useEffect(() => {
    const checkUsername = async () => {
      const storedName = await AsyncStorage.getItem("@username");
      if (storedName) {
        navigation.replace("HomeScreen"); // skip to home if already stored
      }
    };
    checkUsername();
  }, []);

  const handleSave = async () => {
    if (username.trim() === "") {
      Alert.alert("Error", "Please enter a valid name.");
      return;
    }

    try {
      await AsyncStorage.setItem("@username", username.trim());
      navigation.replace("HomeScreen");
    } catch (error) {
      Alert.alert("Error", "Failed to save name.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Continue" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default UsernameScreen;
