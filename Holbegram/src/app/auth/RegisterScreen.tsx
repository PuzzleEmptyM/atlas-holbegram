import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

interface Props {
  navigation: any;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.replace('HomeScreen');
      })
      .catch((error) => setError(error.message));
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Create Account" onPress={handleRegister} />
      <Button
        title="Login to existing account"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};

export default RegisterScreen;
