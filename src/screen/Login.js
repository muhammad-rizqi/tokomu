/* eslint-disable no-alert */
import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {login} from '../controller/User';
import {getToken} from '../controller/Token';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    login(email, password).then((response) => {
      if (response.token) {
        getToken().then((token) => alert(token));
      } else {
        alert(response.error);
      }
    });
  };

  return (
    <View>
      <Text>Login</Text>
      <Text>Email</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(inputEmail) => setEmail(inputEmail)}
        textContentType="emailAddress"
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry
        placeholder="Password"
        onChangeText={(inputPassword) => setPassword(inputPassword)}
        textContentType="password"
      />
      <Button title="Login" onPress={() => loginUser()} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default Login;
