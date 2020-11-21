/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ToastAndroid,
  TouchableNativeFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../../../components/Button';
import {toPrice} from '../../../services/global_var/api';
import {addTransaction} from '../../../services/Transaction';
import {getUserDetail} from '../../../services/User';
import {styles} from '../../../styles/styles';

const Checkout = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const {data} = route.params;
  const [userDetail, setUserDetail] = useState({});
  const {token, user} = useSelector((state) => state);

  console.log(userDetail);

  const getUser = async () => {
    try {
      const userData = await getUserDetail(user.id, token);
      setUserDetail(userData.data.user);
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    getUser();
  }, [route]);

  const buy = async () => {
    setLoading(true);
    try {
      const buyData = await addTransaction(
        user.id,
        data.product.id,
        data.qty,
        token,
      );
      if (buyData.status === 'success') {
        navigation.navigate('Profile', {screen: 'Transaction'});
      }
      ToastAndroid.show(buyData.message, ToastAndroid.LONG);
      console.log(buyData);
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.screen, styles.container]}>
      <Text style={styles.textTitle}>Checkout</Text>

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
      </View>

      <View>
        <Text>Alamat Pengiriman</Text>
        {userDetail ? (
          userDetail.userdetail ? (
            <TouchableNativeFeedback
              onPress={() =>
                navigation.navigate('Profile', {screen: 'UpdateAddress'})
              }>
              <View>
                <Text>Penerima : </Text>
                <Text>{userDetail.name}</Text>
                <Text>Alamat Penerima : </Text>
                <Text>{userDetail.userdetail.address}</Text>
                <Text>Telepon :</Text>
                <Text>{userDetail.userdetail.phone_number}</Text>
                <Button
                  title="Lanjutkan Pembayaran"
                  isLoading={loading}
                  onPress={() => buy()}
                />
              </View>
            </TouchableNativeFeedback>
          ) : (
            <Text
              onPress={() =>
                navigation.navigate('Profile', {screen: 'UpdateAddress'})
              }>
              Harap Lengkapi Profile
            </Text>
          )
        ) : (
          <Text>Error</Text>
        )}
      </View>
    </View>
  );
};

export default Checkout;
