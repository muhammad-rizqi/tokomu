import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {register} from '../../controller/User';
import {styles} from '../../styles/styles';
import {
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import Button from '../../components/Button';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(2);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const registerUser = () => {
    setLoading(true);
    register(name, email, role, password, confirm).then((data) => {
      if (data.user) {
        alert('Success');
        navigation.navigate('Login');
      } else {
        console.log(data);
        setError(JSON.parse(data));
      }
      setLoading(false);
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
        {error.name ? <Text style={styles.textError}>{error.name}</Text> : null}
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          onChangeText={(inputEmail) => setEmail(inputEmail)}
          style={styles.textInput}
        />
        {error.email ? (
          <Text style={styles.textError}>{error.email}</Text>
        ) : null}
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
        {error.password ? (
          <Text style={styles.textError}>{error.password}</Text>
        ) : null}
      </View>
      <Button
        title="Register"
        isLoading={loading}
        onPress={() => registerUser()}
      />
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
