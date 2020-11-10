/* eslint-disable no-alert */
import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {login} from '../../controller/User';
import {getToken} from '../../controller/Token';
import {useDispatch, useSelector} from 'react-redux';
import {changeToken, clearToken} from '../../redux/action';

const Login = ({navigation}) => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // end state

  // redux
  const token = useSelector((state) => state);
  const dispatch = useDispatch();
  const addToken = (dataToken) => dispatch(changeToken(dataToken));
  const removeToken = () => dispatch(clearToken());
  //end redux

  const loginUser = () => {
    login(email, password).then((response) => {
      if (response.token) {
        getToken().then((data) => {
          alert(data);
          addToken(data);
        });
      } else {
        removeToken();
        alert(response.error);
      }
    });
  };

  return (
    <View>
      <Text>{token}</Text>
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
