/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, ToastAndroid} from 'react-native';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Button from '../../../components/Button';
import {toPrice} from '../../../services/helper';
import {payment} from '../../../services/Payment';
import {
  approveTransaction,
  getTransaction,
  updateTransaction,
} from '../../../services/Transaction';
import {getUserDetail} from '../../../services/User';
import {styles} from '../../../styles/styles';

const UpdateTransactions = ({route, navigation}) => {
  const {token} = useSelector((state) => state);
  const [data, setData] = useState('');
  const {id} = route.params;
  const [buyer, setBuyer] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [loading, setLoading] = useState(false);

  const [receipt, setReceipt] = useState('');
  const [delivery, setDelivery] = useState('');
  const [confLoading, setConfLoading] = useState(false);

  const getInfo = async () => {
    setLoading(true);
    try {
      const transaction = await getTransaction(id, token);
      const userDetail = await getUserDetail(
        transaction.data.transaction.user_id,
        token,
      );
      const getPayment = await payment(id, token);

      setData(transaction.data.transaction);
      setBuyer(userDetail.data.user);
      setPaymentData(getPayment.data.payment);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  const confirm = () => {
    setConfLoading(true);
    approveTransaction(id, receipt, delivery, token)
      .then((res) => {
        if (res.status === 'success') {
          updateTransaction(id, 'dikirim', token)
            .then((response) => {
              if (response.status === 'success') {
                navigation.goBack();
              }
              ToastAndroid.show(response.message, ToastAndroid.LONG);
            })
            .catch((e) => console.log(e));
        }
        ToastAndroid.show(JSON.stringify(res), ToastAndroid.LONG);
      })
      .catch((e) => console.log(e))
      .finally(() => setConfLoading(false));
  };

  useEffect(() => {
    getInfo();
  }, [id]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  if (data === '') {
    return <Text>Kosong</Text>;
  }

  return (
    <View>
      <View style={[styles.cartItem, styles.container]}>
        <View style={styles.row}>
          <Image
            source={{
              uri: data.product.image,
            }}
            style={styles.imgSquareMini}
          />
          <View style={[styles.marginHorizontalMini, styles.flex1]}>
            <Text style={styles.textMediumBold}>
              {data.product.product_name}
            </Text>
            <Text style={[styles.textPrice, styles.textSmallBold]}>
              Rp. {toPrice(data.product.price)},-
            </Text>
            <Text>Jumlah barang : {data.qty}</Text>
            <Text style={[styles.textPrice, styles.textSmallBold]}>
              Total Harga : {toPrice(data.qty * data.product.price)}
            </Text>
          </View>
        </View>
        <View>
          {data.status === 'diproses' ? (
            <View>
              <Text>Nama Penerima</Text>
              <Text>{buyer.name}</Text>
              <Text>Alamat</Text>
              <Text>{buyer.userdetail.address}</Text>
              <Text>Nomor Telepon</Text>
              <Text>{buyer.userdetail.phone_number}</Text>
              <Text>Bukti Pembayaran</Text>
              <Image
                source={{uri: paymentData[0].image}}
                style={styles.imgSquareMedium}
              />
              <View>
                <TextInput
                  mode="outlined"
                  placeholder="Jasa Pengiriman"
                  onChangeText={(iDelivery) => setDelivery(iDelivery)}
                />
                <TextInput
                  mode="outlined"
                  placeholder="Nomor Resi"
                  onChangeText={(iReceipt) => setReceipt(iReceipt)}
                />
                <Button
                  title="Konfirmasi Kirim Barang"
                  onPress={() => confirm()}
                  isLoading={confLoading}
                />
              </View>
            </View>
          ) : (
            <Text>Selesai</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default UpdateTransactions;
