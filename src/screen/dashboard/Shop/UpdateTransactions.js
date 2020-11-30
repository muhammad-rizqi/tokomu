/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  ToastAndroid,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../../../components/Button';
import {toPrice} from '../../../services/helper';
import {invoiceByTransaction} from '../../../services/Invoice';
import {payment} from '../../../services/Payment';
import {
  approveTransaction,
  getTransaction,
  updateTransaction,
} from '../../../services/Transaction';
import {getUserDetail} from '../../../services/User';
import {colors, styles} from '../../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UpdateTransactions = ({route, navigation}) => {
  const {token} = useSelector((state) => state);
  const [data, setData] = useState('');
  const {id} = route.params;
  const [buyer, setBuyer] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState([]);
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
      const dataInvoice = await invoiceByTransaction(id, token);

      dataInvoice.data ? setInvoice(dataInvoice.data.payment[0]) : null;
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
      })
      .catch((e) => console.log(e))
      .finally(() => setConfLoading(false));
  };

  useEffect(() => {
    getInfo();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (data === '') {
    return <Text>Kosong</Text>;
  }

  const PaymentImage = () => {
    return (
      <View style={[styles.cartItem, styles.container]}>
        <Text style={styles.textMedium}>Bukti Pembayaran</Text>
        <Image
          source={{uri: paymentData[0].image}}
          style={[styles.productImageLarge, styles.marginVerticalLarge]}
          resizeMode="contain"
        />
      </View>
    );
  };

  const InvoiceView = () => {
    return (
      <View style={[styles.cartItem, styles.container]}>
        <Text style={[styles.textMedium, styles.marginVerticalLarge]}>
          Informasi Pengiriman Barang :
        </Text>
        <Text>Jasa Pengiriman : {invoice.delivery_service}</Text>
        <Text>Nomor Resi : {invoice.receipt}</Text>
      </View>
    );
  };
  const SendConfirm = () => {
    return (
      <View style={[styles.cartItem, styles.container]}>
        <Text style={[styles.textMedium, styles.marginVerticalMini]}>
          Konfirmasi Pengiriman Pesanan
        </Text>
        <View style={styles.marginVerticalMini}>
          <Text>Jasa Pengiriman</Text>
          <TextInput
            style={styles.textInput}
            value={delivery}
            placeholder="Jasa Pengiriman"
            onChangeText={(iDelivery) => setDelivery(iDelivery)}
          />
        </View>
        <View style={styles.marginVerticalMini}>
          <Text>Nomor Resi</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nomor Resi"
            onChangeText={(iReceipt) => setReceipt(iReceipt)}
          />
        </View>
        <Button
          title="Konfirmasi Kirim Barang"
          onPress={() => confirm()}
          isLoading={confLoading}
        />
      </View>
    );
  };

  const cancelTransaction = () => {
    updateTransaction(id, 'dibatalkan', token)
      .then((response) => {
        if (response.status === 'success') {
          navigation.goBack();
        }
        ToastAndroid.show(response.message, ToastAndroid.LONG);
      })
      .catch((e) => console.log(e));
  };

  const CancelTransaction = () => {
    return (
      <View style={styles.container}>
        <Button
          title="Batalkan Transaksi"
          onPress={() => cancelTransaction()}
          isLoading={confLoading}
        />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
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
              <View style={styles.marginVerticalMini}>
                <Text style={[styles.textPrice, styles.textRight]}>
                  Rp. {toPrice(data.product.price)},-
                </Text>
                <Text style={styles.textRight}>{data.qty} x</Text>
                <Text
                  style={[
                    styles.textPrice,
                    styles.textSmallBold,
                    styles.textRight,
                  ]}>
                  Total: {toPrice(data.qty * data.product.price)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.cartItem, styles.container, styles.row]}>
          <View style={styles.flex1}>
            <Text style={[styles.textMedium, styles.marginVerticalMini]}>
              Alamat Penerima
            </Text>
            <Text style={styles.textSmallBold}>
              {buyer.name + ' (' + buyer.userdetail.phone_number + ')'}{' '}
            </Text>
            <Text>{buyer.userdetail.address}</Text>
          </View>
          <TouchableOpacity
            style={[styles.buttonOutlineSmall]}
            onPress={() => {
              navigation.navigate('ChatMessage', {
                to: buyer.id,
                chatName: buyer.name,
              });
            }}>
            <MaterialCommunityIcons
              name="chat-outline"
              color={colors.backgroundDark2}
              size={15}
            />
          </TouchableOpacity>
        </View>
        <View>
          {data.status !== 'belum dibayar'
            ? data.status !== 'dibatalkan'
              ? PaymentImage()
              : null
            : null}

          {data.status === 'belum dibayar'
            ? CancelTransaction()
            : data.status === 'diproses'
            ? SendConfirm()
            : data.status === 'dikirim'
            ? InvoiceView()
            : data.status === 'selesai'
            ? InvoiceView()
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateTransactions;
