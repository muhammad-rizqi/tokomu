import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {register} from '../../controller/User';
import {styles} from '../../styles/styles';
import {
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(2);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState({});

  const registerUser = () => {
    register(name, email, role, password, confirm).then((data) => {
      if (data.user) {
        alert('Success');
        navigation.navigate('Login');
      } else {
        console.log(data);
        setError(JSON.parse(data));
      }
    });
  };

  return (
    <ScrollView style={[styles.screen, styles.container]}>
      <View style={styles.marginVerticalLarge}>
        <Text style={styles.textTitle}>Register</Text>
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Nama Pengguna</Text>
        <TextInput
          placeholder="Nama Pengguna"
          onChangeText={(inputName) => setName(inputName)}
          style={styles.textInput}
        />
        {error.name ? <Text>{error.name}</Text> : null}
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          onChangeText={(inputEmail) => setEmail(inputEmail)}
          style={styles.textInput}
        />
        {error.email ? <Text>{error.email}</Text> : null}
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Daftar Sebagai</Text>
        <Picker selectedValue={role} onValueChange={(value) => setRole(value)}>
          <Picker.Item label="Pembeli" value="3" />
          <Picker.Item label="Penjual" value="2" />
        </Picker>
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Password</Text>
        <TextInput
          secureTextEntry
          placeholder="Password"
          onChangeText={(inputPassword) => setPassword(inputPassword)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Confirm Password</Text>
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(inputConfirm) => setConfirm(inputConfirm)}
          style={styles.textInput}
        />
        {error.password ? <Text>{error.password}</Text> : null}
      </View>
      <TouchableNativeFeedback
        style={styles.button}
        onPress={() => registerUser()}>
        <Text style={styles.textLight}>Register</Text>
      </TouchableNativeFeedback>
      <View style={[styles.centerContainer, styles.marginVerticalLarge]}>
        <Text
          onPress={() => navigation.navigate('Login')}
          style={styles.textCenter}>
          Already have an account? {'\n'} Login
        </Text>
      </View>
    </ScrollView>
  );
};

export default Register;
