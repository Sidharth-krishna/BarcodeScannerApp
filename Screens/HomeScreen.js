import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      const name = await AsyncStorage.getItem("@username");
      setUsername(name);
    };
    getUsername();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome, {username}!</Text>
      <Button title="Scan Barcode" onPress={() => navigation.navigate("ScanScreen")} />
      <View style={{ marginTop: 20 }}>
        <Button title="View Scanned Results" onPress={() => navigation.navigate("ResultScreen")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  greeting: { fontSize: 24, fontWeight: "bold", marginBottom: 40, textAlign: "center" },
});

export default HomeScreen;
