import React, {useEffect, useState} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Button from '../../../components/Button';
import {addAccount, getAccount} from '../../../services/ShopAccount';
import {styles} from '../../../styles/styles';

const ShopAccount = ({navigation}) => {
  const [loading, setloading] = useState(false);
  const {token, shop} = useSelector((state) => state);
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);
  const [bank, setBank] = useState('');
  const [code, setCode] = useState(0);
  const [error, seterror] = useState();
  const [account, setAccount] = useState('');

  const addBankAccount = () => {
    setloading(true);
    addAccount(shop.id, name, number, bank, code, token)
      .then((res) => {
        if (res.status) {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
          navigation.navigate('ShopDashboard');
        } else {
          ToastAndroid.show('Gagal', ToastAndroid.LONG);
          seterror(res);
        }
      })
      .catch((e) => ToastAndroid.show(e.message, ToastAndroid.LONG))
      .finally(() => setloading(false));
  };

  const getBankAccount = async () => {
    const {data} = await getAccount(shop.id, token);
    setAccount(data);
    console.log(data);
  };

  useEffect(() => {
    getBankAccount();
  }, []);

  return (
    <View style={styles.screen}>
      {account ? (
        <>
          <Text style={styles.textMediumBold}>{account.nama_rekening}</Text>
          <Text>{account.nama_bank}</Text>
          <Text style={styles.textMediumBold}>{account.no_rekening}</Text>
          <Text>{account.kode_bank}</Text>
        </>
      ) : (
        <>
          <Text style={styles.textTitle}>Tambah Rekening Bank</Text>
          <Text>{loading ? 'Loading' : ''} </Text>
          <TextInput
            onChangeText={(iName) => setName(iName)}
            value={name}
            label="Nama Rekening"
            mode="outlined"
          />
          {error ? (
            error.kode_bank ? (
              <Text style={styles.textError}>{error.kode_bank}</Text>
            ) : null
          ) : null}
          <TextInput
            onChangeText={(iNumber) => setNumber(iNumber)}
            value={`${number}`}
            label="Nomor Rekening"
            mode="outlined"
          />
          {error ? (
            error.kode_bank ? (
              <Text style={styles.textError}>{error.kode_bank}</Text>
            ) : null
          ) : null}
          <TextInput
            onChangeText={(iBank) => setBank(iBank)}
            value={bank}
            label="Nama Bank"
            mode="outlined"
          />
          {error ? (
            error.kode_bank ? (
              <Text style={styles.textError}>{error.kode_bank}</Text>
            ) : null
          ) : null}
          <TextInput
            onChangeText={(iCode) => setCode(iCode)}
            value={`${code}`}
            label="Kode Bank"
            mode="outlined"
          />
          {error ? (
            error.kode_bank ? (
              <Text style={styles.textError}>{error.kode_bank}</Text>
            ) : null
          ) : null}
          <Button
            title="Tambah Rekening"
            isLoading={loading}
            onPress={() => addBankAccount()}
          />
        </>
      )}
    </View>
  );
};

export default ShopAccount;
