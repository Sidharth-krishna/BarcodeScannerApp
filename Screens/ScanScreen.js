import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native"; // ✅ Required

const ScanScreen = () => {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation(); // ✅ Initialize navigation

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>We need camera permission</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  // ✅ Handle scan and navigate to ResultScreen
  const handleScan = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      
      navigation.navigate("ResultScreen", { scannedData: data }); // ✅ This is the correct place
      setTimeout(() => setScanned(false), 3000);
    }
  };

  return (
    <CameraView
      style={styles.camera}
      onBarcodeScanned={handleScan}
      barcodeScannerSettings={{
        barcodeTypes: ["ean13", "code128", "ean8", "upc_a", "upc_e", "code39"],
      }}
    />
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScanScreen;
