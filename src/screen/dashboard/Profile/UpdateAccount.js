import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  View,
  ToastAndroid,
} from 'react-native';
import Button from '../../../components/Button';
import {colors, styles} from '../../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';
import {updateUser} from '../../../controller/User';
import {setUser} from '../../../redux/action';

const UpdateAccount = ({navigation}) => {
  const {token, user} = useSelector((state) => state);
  const [name, setname] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [oldPass, setoldPass] = useState('');
  const [pass, setpass] = useState('');
  const [confirm, setconfirm] = useState('');
  const [infoLoading, setinfoLoading] = useState(false);

  const dispatch = useDispatch();

  const updateAccount = () => {
    setinfoLoading(true);
    updateUser(user.id, name, email, token)
      .then((res) => {
        if (res.data.user) {
          const userUpdate = res.data.user;
          console.log(userUpdate);
          dispatch(
            setUser(
              userUpdate.id,
              userUpdate.email,
              userUpdate.name,
              userUpdate.role,
            ),
          );
          navigation.navigate('Profile');
        }
        ToastAndroid.show(res.message, ToastAndroid.LONG);
        // console.log(res);
      })
      .catch((err) => ToastAndroid.show(err.message, ToastAndroid.LONG))
      .finally(() => setinfoLoading(false));
  };

  return (
    <ScrollView style={[styles.screen, styles.container]}>
      <Text style={styles.textTitle}>Ubah Informasi Akun</Text>
      <View style={styles.marginVerticalMini}>
        <TextInput
          mode="outlined"
          label="Nama"
          value={name}
          onChangeText={(iName) => setname(iName)}
        />
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(iEmail) => setemail(iEmail)}
        />
      </View>
      <Button
        isLoading={infoLoading}
        title="Ubah Akun"
        onPress={() => updateAccount()}
      />
      <View style={styles.marginVerticalMini}>
        <Text>Ubah Kata Sandi</Text>
        <TextInput
          secureTextEntry={true}
          mode="outlined"
          label="Kata Sandi Lama"
          onChangeText={(iOld) => setoldPass(iOld)}
        />
        <TextInput
          secureTextEntry={true}
          mode="outlined"
          label="Kata Sandi Baru"
          onChangeText={(iPass) => setpass(iPass)}
        />
        <TextInput
          secureTextEntry={true}
          mode="outlined"
          label="Konfirmasi Kata Sandi Baru"
          onChangeText={(iConfirm) => setconfirm(iConfirm)}
        />
        <Button title="Ubah Kata Sandi" />
      </View>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'Anda Yakin?',
            'Anda yakin ingin menghapus akun?',
            [
              {
                text: 'Batal',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          )
        }
        style={[styles.row, styles.centerContainer]}>
        <MaterialCommunityIcons
          name="delete"
          color={colors.backgroundDark2}
          size={26}
        />
        <Text>Hapus Akun</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UpdateAccount;
