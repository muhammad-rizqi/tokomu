import React, {useState} from 'react';
import {View, Text, TextInput, ToastAndroid} from 'react-native';
import {login} from '../../controller/User';
import {getToken, storeToken} from '../../controller/Token';
import {useDispatch} from 'react-redux';
import {changeToken, clearToken} from '../../redux/action';
import {styles} from '../../styles/styles';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../components/Button';

const Login = ({navigation}) => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // end state

  // redux
  const dispatch = useDispatch();
  //end redux

  const loginUser = () => {
    setLoading(true);
    login(email, password)
      .then((response) => {
        if (response.token) {
          storeToken(response.token);
          getToken().then((data) => {
            ToastAndroid.show('Login Berhasil', ToastAndroid.SHORT);
            dispatch(changeToken(data));
          });
        } else {
          dispatch(clearToken());
          ToastAndroid.show(response.error, ToastAndroid.SHORT);
        }
        setLoading(false);
      })
      .catch((err) => {
        dispatch(clearToken());
        ToastAndroid.show(`${err}`, ToastAndroid.SHORT);
        setLoading(false);
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
      <Button title="Login" isLoading={loading} onPress={() => loginUser()} />
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
