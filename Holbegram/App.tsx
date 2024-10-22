import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { User } from 'firebase/auth';
import LoginScreen from './src/app/index'; // Ensure this is the correct import
import RegisterScreen from './src/app/RegisterScreen';
import Tabs from './src/app/(tabs)';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';

type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  Tabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
