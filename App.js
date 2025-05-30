import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UsernameScreen from './Screens/UsernameScreen';
import HomeScreen from './Screens/HomeScreen';
import ScanScreen from './Screens/ScanScreen';
import ResultScreen from './Screens/Resultscreen'

const Stack = createNativeStackNavigator();

export default function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const loadUsername = async () => {
      const name = await AsyncStorage.getItem('username');
      if (name) setUsername(name);
    };
    loadUsername();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={username ? "Home" : "Username"}>
        <Stack.Screen name="Username" component={UsernameScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
