import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace('/(tabs)');
      })
      .catch((error) => setError(error.message));
  };

  return (
    <View className="flex-1 justify-center items-center bg-blue px-5">
      <Image
        source={require('../../assets/atlas-school.png')}
        style={{ width: '100%', height: 100, resizeMode: 'contain', marginBottom: 32 }}
      />
      <TextInput
        className="w-full bg-blue-light text-white p-4 rounded-lg mb-4"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="#B0B0B0"
      />
      <TextInput
        className="w-full bg-blue-light text-white p-4 rounded-lg mb-6"
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        placeholderTextColor="#B0B0B0"
      />
      {error ? <Text className="text-red mb-4">{error}</Text> : null}
      <TouchableOpacity onPress={handleLogin} className="w-full bg-teal py-4 rounded-lg mb-4">
        <Text className="text-center text-white font-bold text-lg">Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/RegisterScreen')} className="w-full py-4 rounded-lg">
        <Text className="text-center text-teal font-bold text-xl">Create a new account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
