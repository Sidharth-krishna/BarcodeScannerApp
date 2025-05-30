import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('username').then((name) => {
      if (name) setUsername(name);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}!</Text>

      <View style={styles.buttonContainer}>
        <Button title="Scan Barcode" onPress={() => navigation.navigate('Scan')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="View Scanned Results" onPress={() => navigation.navigate('ResultScreen')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
