import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const STORAGE_KEY = "@scanned_barcodes";

const ResultScreen = ({ route }) => {
  const { scannedData } = route.params || {};
  const [scannedList, setScannedList] = useState([]);

  // Save new scan if data was passed
  useEffect(() => {
    const saveScan = async () => {
      if (!scannedData) return;

      const timestamp = new Date().toLocaleString();
      const newScan = { code: scannedData, time: timestamp  };

      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const existingScans = stored ? JSON.parse(stored) : [];

        const updatedScans = [newScan, ...existingScans];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScans));
        setScannedList(updatedScans);
      } catch (error) {
        Alert.alert("Error", "Could not save scan.");
      }
    };

    saveScan();
  }, [scannedData]);

  // Load saved scans
  useEffect(() => {
    const loadScans = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setScannedList(JSON.parse(stored));
        }
      } catch (error) {
        Alert.alert("Error", "Could not load saved scans.");
      }
    };

    loadScans();
  }, []);

  const deleteScan = async (index) => {
    try {
      const updated = scannedList.filter((_, i) => i !== index);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setScannedList(updated);
    } catch (error) {
      Alert.alert("Error", "Could not delete item.");
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View style={styles.textContainer}>
        <Text style={styles.code}>📦 {item.code}</Text>
        <Text style={styles.time}>🕒 {item.time}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteScan(index)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Scanned Results</Text>
      <FlatList
        data={scannedList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No scanned results yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  code: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "#555",
  },
  deleteButton: {
    backgroundColor: "#d11a2a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
  

});

export default ResultScreen;
