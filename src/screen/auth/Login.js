/* eslint-disable no-alert */
import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {login} from '../../controller/User';
import {getToken} from '../../controller/Token';
import {useDispatch, useSelector} from 'react-redux';
import {changeToken, clearToken} from '../../redux/action';
import {styles} from '../../styles/styles';
import {
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const Login = ({navigation}) => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // end state

  // redux
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
    <ScrollView style={[styles.screen, styles.container]}>
      <View style={styles.marginVerticalLarge}>
        <Text style={styles.textTitle}>Login</Text>
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          onChangeText={(inputEmail) => setEmail(inputEmail)}
          textContentType="emailAddress"
          style={styles.textInput}
        />
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Password</Text>
        <TextInput
          secureTextEntry
          placeholder="Password"
          onChangeText={(inputPassword) => setPassword(inputPassword)}
          textContentType="password"
          style={styles.textInput}
        />
      </View>
      <TouchableNativeFeedback
        style={styles.button}
        onPress={() => loginUser()}>
        <Text style={styles.textLight}>Login</Text>
      </TouchableNativeFeedback>
      <View style={[styles.centerContainer, styles.marginVerticalLarge]}>
        <Text
          onPress={() => navigation.navigate('Register')}
          style={styles.textCenter}>
          Don't have an account? {'\n'} Register
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;
