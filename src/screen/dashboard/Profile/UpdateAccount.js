import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ToastAndroid,
} from 'react-native';
import Button from '../../../components/Button';
import {colors, styles} from '../../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Dialog, Portal, TextInput} from 'react-native-paper';
import {deleteUser, updatePassword, updateUser} from '../../../services/User';
import {clearToken, setUser} from '../../../redux/action';
import {removeToken} from '../../../services/Token';

const UpdateAccount = ({navigation}) => {
  const {token, user} = useSelector((state) => state);
  const [name, setname] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [oldPass, setoldPass] = useState('');
  const [pass, setpass] = useState('');
  const [confirm, setconfirm] = useState('');
  const [infoLoading, setinfoLoading] = useState(false);
  const [passLoading, setpassLoading] = useState(false);
  const [dialog, setdialog] = useState(false);
  const [deletePass, setDeletePass] = useState('');

  const dispatch = useDispatch();

  const logout = () => {
    removeToken().then(() => dispatch(clearToken()));
  };

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

  const changePass = () => {
    setpassLoading(true);
    updatePassword(user.id, oldPass, pass, confirm, token)
      .then((res) => {
        if (res.status === 'success') {
          logout();
        }
        ToastAndroid.show(res.message, ToastAndroid.LONG);
        console.log(res);
      })
      .catch((err) => ToastAndroid.show(err.message, ToastAndroid.LONG))
      .finally(() => setpassLoading(false));
  };

  const deleteAccount = () => {
    setpassLoading(true);
    deleteUser(user.id, deletePass, token)
      .then((res) => {
        console.log(res);
        if (res.status === 'success') {
          logout();
          setdialog(false);
          setpassLoading(false);
        }
        ToastAndroid.show(res.message, ToastAndroid.LONG);
      })
      .catch((err) => ToastAndroid.show(err.message, ToastAndroid.LONG))
      .finally(() => setpassLoading(false));
  };
  return (
    <View style={styles.screen}>
      <ScrollView style={[styles.container]}>
        <Text style={[styles.textTitle, styles.marginVerticalMini]}>
          Pengaturan Akun
        </Text>
        <Text style={styles.textMediumBold}>Informasi Akun</Text>
        <View>
          <TextInput
            mode="outlined"
            label="Nama"
            value={name}
            onChangeText={(iName) => setname(iName)}
          />
          <TextInput
            style={styles.marginVerticalMini}
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={(iEmail) => setemail(iEmail)}
          />
        </View>
        <Button
          isLoading={infoLoading}
          title="Ubah Info Akun"
          onPress={() => updateAccount()}
        />
        <View style={styles.marginVerticalLarge}>
          <Text style={styles.textMediumBold}>Ubah Kata Sandi</Text>
          <TextInput
            style={styles.marginVerticalMini}
            secureTextEntry={true}
            mode="outlined"
            label="Kata Sandi Lama"
            onChangeText={(iOld) => setoldPass(iOld)}
          />
          <TextInput
            style={styles.marginVerticalMini}
            secureTextEntry={true}
            mode="outlined"
            label="Kata Sandi Baru"
            onChangeText={(iPass) => setpass(iPass)}
          />
          <TextInput
            style={styles.marginVerticalMini}
            secureTextEntry={true}
            mode="outlined"
            label="Konfirmasi Kata Sandi Baru"
            onChangeText={(iConfirm) => setconfirm(iConfirm)}
          />
          <Button
            isLoading={passLoading}
            onPress={() => changePass()}
            title="Ubah Kata Sandi"
          />
        </View>

        <Portal>
          <Dialog visible={dialog} onDismiss={() => setdialog(false)}>
            <Dialog.Title>Hapus Akun</Dialog.Title>
            <Dialog.Content>
              <TextInput
                style={styles.marginVerticalMini}
                value={deletePass}
                secureTextEntry={true}
                mode="outlined"
                label="Masukkan Kata Sandi"
                onChangeText={(iDelete) => setDeletePass(iDelete)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                isLoading={passLoading}
                title="Hapus"
                onPress={() => deleteAccount()}
              />
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <TouchableOpacity
          onPress={() => setdialog(true)}
          style={[styles.row, styles.centerContainer]}>
          <MaterialCommunityIcons
            name="delete"
            color={colors.backgroundDark2}
            size={26}
          />
          <Text>Hapus Akun</Text>
        </TouchableOpacity>
        <View style={styles.marginVerticalLarge} />
      </ScrollView>
    </View>
  );
};

export default UpdateAccount;
