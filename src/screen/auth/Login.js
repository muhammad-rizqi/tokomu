import React, {useState} from 'react';
import {View, Text, TextInput, ToastAndroid} from 'react-native';
import {getUserInfo, login} from '../../services/User';
import {getToken, removeToken, storeToken} from '../../services/Token';
import {useDispatch} from 'react-redux';
import {changeToken, clearToken, setUser} from '../../redux/action';
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
            getUserInfo(data)
              .then((res) => {
                setLoading(false);
                if (res.data) {
                  const {id, name, role} = res.data.user;
                  dispatch(setUser(id, res.data.user.email, name, role));
                  dispatch(changeToken(data));
                  ToastAndroid.show('Login Berhasil', ToastAndroid.SHORT);
                } else if (res.status !== 'success') {
                  dispatch(clearToken());
                  removeToken();
                }
              })
              .catch((err) =>
                ToastAndroid.show(err.message, ToastAndroid.SHORT),
              );
          });
        } else {
          setLoading(false);
          dispatch(clearToken());
          ToastAndroid.show(response.error, ToastAndroid.SHORT);
        }
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
        <Text style={styles.textTitle}>Masuk</Text>
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          onChangeText={(inputEmail) => setEmail(inputEmail)}
          textContentType="emailAddress"
          keyboardType="email-address"
          style={styles.textInput}
        />
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Kata Sandi</Text>
        <TextInput
          secureTextEntry
          placeholder="Kata Sandi"
          onChangeText={(inputPassword) => setPassword(inputPassword)}
          textContentType="password"
          style={styles.textInput}
          onSubmitEditing={() => loginUser()}
        />
      </View>
      <Button title="Masuk" isLoading={loading} onPress={() => loginUser()} />
      <View style={[styles.centerContainer, styles.marginVerticalLarge]}>
        <Text
          onPress={() => navigation.navigate('Register')}
          style={styles.textCenter}>
          Belum punya akun? {'\n\n'} Daftar gratis!
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;
