/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, ToastAndroid} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../../../components/Button';
import {getAccount} from '../../../services/ShopAccount';
import {styles} from '../../../styles/styles';
import ImagePicker from 'react-native-image-picker';
import {payment, sendPayment} from '../../../services/Payment';
import {toPrice} from '../../../services/global_var/api';
import {updateTransaction} from '../../../services/Transaction';
import {invoiceByTransaction} from '../../../services/Invoice';

const Payment = ({route, navigation}) => {
  console.log(route.params.data);
  const {data} = route.params;
  const {token, user} = useSelector((state) => state);
  const [accounts, setAccounts] = useState([]);
  const [photo, setPhoto] = useState('');
  const [uploading, setUploading] = useState(false);
  const [invoice, setInvoice] = useState('');
  const [paymentData, setPaymentData] = useState({});

  const getBankAccount = async () => {
    getAccount(data.shop_id, token)
      .then((dataAccount) => {
        setAccounts(dataAccount.data);
      })
      .catch((e) => console.log(e));
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  };

  const uploadPayment = async () => {
    setUploading(true);
    try {
      const res = await sendPayment(data.id, photo, token);
      if (res.status === 'success') {
        updatePayment('diproses');
      }
    } catch (e) {
      console.log(e);
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    } finally {
      setUploading(false);
    }
  };

  const updatePayment = (status) => {
    setUploading(true);
    updateTransaction(data.id, status, token)
      .then((response) => {
        if (response.status === 'success') {
          navigation.navigate('TransactionList');
        }
        ToastAndroid.show(response.message, ToastAndroid.LONG);
      })
      .catch((e) => console.log(e))
      .finally(() => setUploading(false));
  };

  const getPayment = () => {
    setUploading(true);
    payment(data.id, token)
      .then((res) => setPaymentData(res.data.payment[0]))
      .catch((e) => console.log(e))
      .finally(() => setUploading(false));
  };

  const getInvoice = () => {
    invoiceByTransaction(data.id, token)
      .then((res) => setInvoice(res.data.payment[0]))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getBankAccount();
    getPayment();
    getInvoice();
  }, [navigation]);

  const PayView = () => {
    return (
      <View>
        <Text>Lakukan Pembayaran Ke Rekening : </Text>
        {accounts ? (
          accounts.length > 0 ? (
            accounts.map((account) => (
              <View key={account.id}>
                <Text>{account.nama_rekening}</Text>
                <Text>{account.no_rekening}</Text>
                <Text>{account.nama_bank}</Text>
                <Text>{account.kode_bank}</Text>
              </View>
            ))
          ) : (
            <Text>Kosong</Text>
          )
        ) : null}
        {photo.uri ? (
          <Image source={{uri: photo.uri}} style={styles.imgSquareMedium} />
        ) : (
          <Button
            title="Pilih Foto Bukti Pembayaran"
            onPress={() => handleChoosePhoto()}
          />
        )}
        <Button
          title="Unggah Bukti Pembayaran"
          disabled={!photo.uri}
          isLoading={uploading}
          onPress={() => uploadPayment()}
        />
      </View>
    );
  };

  const PaymentDataView = () => {
    return (
      <View>
        <Text>ID Transaksi : {JSON.stringify(paymentData.transaction_id)}</Text>
        <Text>Bukti Pembayaran</Text>
        <Image
          source={{uri: paymentData.image}}
          style={styles.productImageLarge}
        />
      </View>
    );
  };

  const ConfirmPay = () => {
    return (
      <View>
        <Button
          isLoading={uploading}
          title="Konfirmasi terima barang"
          onPress={() => updatePayment('selesai')}
        />
      </View>
    );
  };

  const InvoiceView = () => {
    return (
      <View>
        <Text>Jasa Pengiriman : </Text>
        <Text>{invoice.delivery_service}</Text>
        <Text>Nomor Resi :</Text>
        <Text>{invoice.receipt}</Text>
      </View>
    );
  };

  const StatusView = () => {
    switch (data.status) {
      case 'belum dibayar':
        return <PayView />;
      case 'diproses':
        return (
          <>
            <PaymentDataView />
          </>
        );
      case 'dikirim':
        return (
          <>
            <PaymentDataView />
            <InvoiceView />
            <ConfirmPay />
          </>
        );
      case 'selesai':
        return (
          <>
            <PaymentDataView />
            <InvoiceView />
            <Text>Pesanan Selesai</Text>
          </>
        );

      default:
        return null;
    }
  };
  return (
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
            <Text style={[styles.textPrice, styles.textSmallBold]}>
              Rp. {toPrice(data.product.price)},-
            </Text>
            <Text>Jumlah barang : {data.qty}</Text>
            <Text style={[styles.textPrice, styles.textSmallBold]}>
              Total Harga : {toPrice(data.qty * data.product.price)}
            </Text>
          </View>
        </View>
        <StatusView />
      </View>
    </ScrollView>
  );
};

export default Payment;
