import React, {useState} from 'react';
import {View, Text, TextInput, ToastAndroid} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {register} from '../../services/User';
import {styles} from '../../styles/styles';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../components/Button';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(3);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const registerUser = () => {
    setLoading(true);
    register(name, email, role, password, confirm).then((data) => {
      if (data.user) {
        ToastAndroid.show('Daftar Berhasil', ToastAndroid.SHORT);
        navigation.navigate('Login');
      } else {
        ToastAndroid.show('Daftar Gagal', ToastAndroid.SHORT);
        if (typeof data === 'string') {
          setError(JSON.parse(data));
        } else {
          ToastAndroid.show('Kesalahan Jaringan', ToastAndroid.SHORT);
        }
      }
      setLoading(false);
    });
  };

  return (
    <ScrollView style={[styles.screen, styles.container]}>
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
          keyboardType="email-address"
          onChangeText={(inputEmail) => setEmail(inputEmail)}
          style={styles.textInput}
        />
        {error.email ? (
          <Text style={styles.textError}>{error.email}</Text>
        ) : null}
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Daftar Sebagai</Text>
        <View style={styles.textInput}>
          <Picker
            mode="dropdown"
            selectedValue={role}
            onValueChange={(value) => setRole(value)}>
            <Picker.Item label="Pembeli" value={3} />
            <Picker.Item label="Penjual" value={2} />
          </Picker>
        </View>
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Kata Sandi</Text>
        <TextInput
          secureTextEntry
          placeholder="Kata Sandi"
          onChangeText={(inputPassword) => setPassword(inputPassword)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Konfirmasi Kata Sandi</Text>
        <TextInput
          secureTextEntry
          placeholder="Konfirmasi Kata Sandi"
          onChangeText={(inputConfirm) => setConfirm(inputConfirm)}
          style={styles.textInput}
          onSubmitEditing={() => registerUser()}
        />
        {error.password ? (
          <Text style={styles.textError}>{error.password}</Text>
        ) : null}
      </View>
      <Button
        title="Mendaftar"
        isLoading={loading}
        onPress={() => registerUser()}
      />
      <View style={[styles.centerContainer, styles.marginVerticalLarge]}>
        <Text
          onPress={() => navigation.navigate('Login')}
          style={styles.textCenter}>
          Sudah punya akun? {'\n'} Masuk
        </Text>
      </View>
      <View style={[styles.centerContainer, styles.marginVerticalLarge]}>
        <Text style={styles.textCenter}>
          Dengan mendaftar anda berarti menerima kebijakan layanan kami
        </Text>
      </View>
    </ScrollView>
  );
};

export default Register;
