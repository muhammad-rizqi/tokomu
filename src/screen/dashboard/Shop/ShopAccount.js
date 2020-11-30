/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ToastAndroid,
  Modal,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../../../components/Button';
import {
  addAccount,
  deleteAccount,
  updateAccount,
  getAccount,
} from '../../../services/ShopAccount';
import {colors, styles} from '../../../styles/styles';
import FloatingActionBar from '../../../components/FloatingActionBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const ShopAccount = ({navigation}) => {
  const [loading, setloading] = useState(true);
  const {token, shop} = useSelector((state) => state);
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [bank, setBank] = useState(null);
  const [code, setCode] = useState(null);
  const [error, seterror] = useState();
  const [accounts, setAccounts] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');

  const addBankAccount = () => {
    setloading(true);
    addAccount(shop.id, name, number, bank, code, token)
      .then((res) => {
        if (res.status) {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
          getBankAccount();
        } else {
          ToastAndroid.show('Gagal', ToastAndroid.LONG);
          seterror(res);
        }
      })
      .catch((e) => ToastAndroid.show(e.message, ToastAndroid.LONG))
      .finally(() => {
        clearState();
      });
  };

  const getBankAccount = async () => {
    try {
      const {data} = await getAccount(shop.id, token);
      setAccounts(data);
    } catch (e) {
      console.log(e);
    } finally {
      setloading(false);
    }
  };

  const deleteAccountById = (id) => {
    setModal(false);
    setloading(true);
    deleteAccount(id, token)
      .then((res) => {
        if (res.status) {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
          getBankAccount();
        } else {
          ToastAndroid.show('Gagal', ToastAndroid.LONG);
        }
      })
      .catch((e) => ToastAndroid.show(e.message, ToastAndroid.LONG));
  };

  const updateAccountById = () => {
    setloading(true);
    updateAccount(
      accounts[selectedIndex].id,
      name ? name : accounts[selectedIndex].nama_rekening,
      number ? number : accounts[selectedIndex].no_rekening,
      bank ? bank : accounts[selectedIndex].nama_bank,
      code ? code : accounts[selectedIndex].kode_bank,
      token,
    )
      .then((res) => {
        if (res.status) {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
          getBankAccount();
        } else {
          ToastAndroid.show('Gagal', ToastAndroid.LONG);
          seterror(res);
        }
      })
      .catch((e) => ToastAndroid.show(e.message, ToastAndroid.LONG))
      .finally(() => {
        clearState();
      });
  };

  const addOrUpdate = () => {
    if (selectedIndex === '') {
      addBankAccount();
    } else {
      updateAccountById();
    }
  };

  const clearState = () => {
    setSelectedIndex('');
    setName(null);
    setNumber(null);
    setBank(null);
    setCode(null);
    setModal(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBankAccount();
    });
    return unsubscribe;
  }, [navigation]);
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Modal visible={modal}>
        <ScrollView style={styles.container}>
          <Text style={styles.textTitle}>Tambah Rekening Bank</Text>
          <Text>{loading ? 'Loading' : ''} </Text>
          <View style={styles.marginVerticalMini}>
            <Text>Nama Pemilik Rekening</Text>
            <TextInput
              onChangeText={(iName) => setName(iName)}
              value={
                name === null
                  ? selectedIndex !== ''
                    ? accounts[selectedIndex].nama_rekening
                    : null
                  : name
              }
              placeholder="Nama Pemilik Rekening"
              style={styles.textInput}
            />
            {error ? (
              error.kode_bank ? (
                <Text style={styles.textError}>{error.kode_bank}</Text>
              ) : null
            ) : null}
          </View>
          <View style={styles.marginVerticalMini}>
            <Text>Nomor Rekening</Text>
            <TextInput
              onChangeText={(iNumber) => setNumber(iNumber)}
              value={
                number === null
                  ? selectedIndex !== ''
                    ? accounts[selectedIndex].no_rekening
                    : null
                  : number
              }
              keyboardType="number-pad"
              placeholder="Nomor Rekening"
              style={styles.textInput}
            />
            {error ? (
              error.kode_bank ? (
                <Text style={styles.textError}>{error.kode_bank}</Text>
              ) : null
            ) : null}
          </View>
          <View style={styles.marginVerticalMini}>
            <Text>Nama Bank</Text>
            <TextInput
              onChangeText={(iBank) => setBank(iBank)}
              value={
                bank === null
                  ? selectedIndex !== ''
                    ? accounts[selectedIndex].nama_bank
                    : null
                  : bank
              }
              placeholder="Nama Bank"
              style={styles.textInput}
            />
            {error ? (
              error.kode_bank ? (
                <Text style={styles.textError}>{error.kode_bank}</Text>
              ) : null
            ) : null}
          </View>
          <View style={styles.marginVerticalMini}>
            <Text>Kode Bank</Text>
            <TextInput
              onChangeText={(iCode) => setCode(iCode)}
              value={
                code === null
                  ? selectedIndex !== ''
                    ? accounts[selectedIndex].kode_bank
                    : null
                  : code
              }
              keyboardType="number-pad"
              placeholder="Kode Bank"
              style={styles.textInput}
            />
            {error ? (
              error.kode_bank ? (
                <Text style={styles.textError}>{error.kode_bank}</Text>
              ) : null
            ) : null}
          </View>
          <Button
            disabled={
              selectedIndex === ''
                ? name === null ||
                  number === null ||
                  bank === null ||
                  code === null
                : false
            }
            title="Tambah Rekening"
            isLoading={loading}
            onPress={() => addOrUpdate()}
          />
        </ScrollView>
        <TouchableOpacity
          style={[styles.absoluteTopRight, styles.container]}
          onPress={() => {
            clearState();
          }}>
          <MaterialCommunityIcons
            name="close"
            color={colors.backgroundDark2}
            size={26}
          />
        </TouchableOpacity>
      </Modal>
      <ScrollView>
        <View style={styles.screen}>
          {accounts ? (
            accounts.length > 0 ? (
              accounts.map((account, index) => (
                <View
                  style={[styles.backgroundLight, styles.marginVerticalMini]}
                  key={account.id}>
                  <TouchableNativeFeedback
                    onPress={() => {
                      setSelectedIndex(index);
                      setModal(true);
                    }}>
                    <View style={[styles.row, styles.container]}>
                      <View style={styles.flex1}>
                        <Text>{account.nama_rekening}</Text>
                        <Text style={styles.textMediumBold}>
                          {account.nama_bank}
                        </Text>
                        <Text style={styles.textSmallBold}>
                          {account.no_rekening}
                        </Text>
                        <Text>{account.kode_bank}</Text>
                      </View>
                      <TouchableOpacity
                        style={
                          (styles.marginVerticalMini,
                          styles.marginHorizontalMini)
                        }
                        onPress={() => deleteAccountById(account.id)}>
                        <MaterialCommunityIcons
                          name="delete"
                          color={colors.backgroundDark2}
                          size={26}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              ))
            ) : (
              <Text>Kosong</Text>
            )
          ) : (
            <Text>Daftar Rekening Kosong</Text>
          )}
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 16, right: 16}}>
        <FloatingActionBar onPress={() => setModal(true)} />
      </View>
    </View>
  );
};

export default ShopAccount;
