import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {register} from '../controller/User';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(0);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState({});

  const registerUser = () => {
    register(name, email, role, password, confirm).then((data) => {
      if (data.user) {
        alert(JSON.stringify(data));
      } else {
        console.log(data);
        setError(JSON.parse(data));
      }
    });
  };

  return (
    <View>
      <Text>Register</Text>
      <Text>Nama Pengguna</Text>
      <TextInput
        placeholder="Nama Pengguna"
        onChangeText={(inputName) => setName(inputName)}
      />
      {error.name ? <Text>{error.name}</Text> : null}
      <Text>Email</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(inputEmail) => setEmail(inputEmail)}
      />
      {error.email ? <Text>{error.email}</Text> : null}
      <Text>Daftar Sebagai</Text>
      <Picker
        selectedValue={role === 0 ? 2 : role}
        onValueChange={(value) => setRole(value)}>
        <Picker.Item label="Pembeli" value="3" />
        <Picker.Item label="Penjual" value="2" />
      </Picker>
      <Text>Password</Text>
      <TextInput
        secureTextEntry
        placeholder="Password"
        onChangeText={(inputPassword) => setPassword(inputPassword)}
      />
      {error.password ? <Text>{error.password}</Text> : null}

      <Text>Confirm Password</Text>
      <TextInput
        secureTextEntry
        placeholder="Confirm Password"
        onChangeText={(inputConfirm) => setConfirm(inputConfirm)}
      />
      <Button title="Register" onPress={() => registerUser()} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default Register;
