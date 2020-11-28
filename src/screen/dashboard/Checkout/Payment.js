/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../../../components/Button';
import {getAccount} from '../../../services/ShopAccount';
import {colors, styles} from '../../../styles/styles';
import ImagePicker from 'react-native-image-picker';
import {payment, sendPayment} from '../../../services/Payment';
import {updateTransaction} from '../../../services/Transaction';
import {invoiceByTransaction} from '../../../services/Invoice';
import {toPrice} from '../../../services/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getUserDetail} from '../../../services/User';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const Payment = ({route, navigation}) => {
  const {data} = route.params;
  const {token, user} = useSelector((state) => state);
  const [accounts, setAccounts] = useState([]);
  const [photo, setPhoto] = useState('');
  const [uploading, setUploading] = useState(false);
  const [invoice, setInvoice] = useState('');
  const [paymentData, setPaymentData] = useState({});
  const [userDetail, setUserDetail] = useState(null);

  const getUser = async () => {
    try {
      const userData = await getUserDetail(user.id, token);
      setUserDetail(userData.data.user);
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    }
  };

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
    getUser();
  }, [navigation, route]);

  const PayView = () => {
    return (
      <View style={[styles.cartItem, styles.container]}>
        <Text style={styles.textMedium}>Petunjuk Pembayaran </Text>
        <Text
          style={[
            styles.textMedium,
            styles.marginVerticalLarge,
            styles.textRight,
          ]}>
          Rp. {toPrice(data.qty * data.product.price)},-
        </Text>
        <Text>Transfer dapat dilakukan ke salah satu rekening berikut</Text>
        {accounts ? (
          accounts.length > 0 ? (
            accounts.map((account) => (
              <View key={account.id} style={styles.marginVerticalMini}>
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
      <View style={[styles.cartItem, styles.container]}>
        <Text style={styles.textMedium}>Bukti Pembayaran</Text>
        <Image
          source={{uri: paymentData.image}}
          style={[styles.productImageLarge, styles.marginVerticalLarge]}
          resizeMode="contain"
        />
      </View>
    );
  };

  const ConfirmPay = () => {
    return (
      <View style={styles.container}>
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
      <View style={[styles.cartItem, styles.container]}>
        <Text style={[styles.textMedium, styles.marginVerticalLarge]}>
          Informasi Pengiriman Barang :
        </Text>
        <Text>Jasa Pengiriman :{invoice.delivery_service}</Text>
        <Text>Nomor Resi : {invoice.receipt}</Text>
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
            <Text
              style={[
                styles.textMedium,
                styles.textCenter,
                styles.marginVerticalLarge,
              ]}>
              Pesanan Selesai
            </Text>
          </>
        );

      default:
        return null;
    }
  };
  return (
    <ScrollView>
      <View style={styles.containerMini}>
        <Text style={styles.textMedium}>Informasi Pembelian</Text>
        <View style={styles.marginVerticalMini}>
          <View style={styles.row}>
            <Text style={styles.flex1}>No Transaksi :</Text>
            <Text>ID: {data.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.flex1}>Status :</Text>
            <Text>{data.status}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.cartItem, styles.container]}>
        <View style={[styles.row, styles.marginVerticalMini]}>
          <MaterialCommunityIcons
            name="store"
            color={colors.backgroundDark2}
            size={18}
          />
          <Text style={[styles.marginHorizontalMini, styles.textSmallBold]}>
            {data.product.shop.shop_name}
          </Text>
        </View>
        <View style={styles.row}>
          <Image
            source={{
              uri: data.product.image,
            }}
            style={styles.imgSquareMini}
          />
          <View style={[styles.marginHorizontalMini, styles.flex1]}>
            <Text style={styles.textSmallBold}>
              {data.product.product_name}
            </Text>
            <Text style={[styles.textPrice, styles.textRight]}>
              Rp. {toPrice(data.product.price)}
            </Text>
            <Text style={styles.textRight}>{data.qty} x</Text>
            <Text
              style={[
                styles.textPrice,
                styles.textSmallBold,
                styles.textRight,
              ]}>
              Total : {toPrice(data.qty * data.product.price)}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.backgroundLight, styles.container]}>
        {userDetail ? (
          userDetail.userdetail ? (
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('UpdateAddress')}>
              <View>
                <Text style={[styles.textMedium, styles.marginVerticalMini]}>
                  Alamat Pengiriman :
                </Text>
                <Text style={styles.textSmallBold}>
                  {userDetail.name} {`(${userDetail.userdetail.phone_number})`}
                </Text>
                <Text>{userDetail.userdetail.address}</Text>
              </View>
            </TouchableNativeFeedback>
          ) : (
            <Text
              style={[styles.textMediumBold, styles.textError]}
              onPress={() => navigation.navigate('UpdateAddress')}>
              Harap Lengkapi Profile
            </Text>
          )
        ) : (
          <ActivityIndicator size="small" color={colors.primary} />
        )}
      </View>
      <StatusView />
    </ScrollView>
  );
};

export default Payment;
