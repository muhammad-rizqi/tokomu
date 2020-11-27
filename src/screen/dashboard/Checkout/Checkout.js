/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ToastAndroid,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../../../components/Button';
import {toPrice} from '../../../services/helper';
import {addTransaction} from '../../../services/Transaction';
import {getUserDetail} from '../../../services/User';
import {colors, styles} from '../../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DataTable} from 'react-native-paper';

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
    <ScrollView style={styles.screen}>
      <View style={[styles.backgroundLight, styles.container]}>
        {userDetail ? (
          userDetail.userdetail ? (
            <TouchableNativeFeedback
              onPress={() =>
                navigation.navigate('Profile', {screen: 'UpdateAddress'})
              }>
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
              style={styles.textMediumBold}
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
      <View style={[styles.cartItem, styles.container]}>
        <Text style={styles.textMedium}>Daftar Belanja</Text>
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
            <Text style={styles.textPrice}>
              Rp. {toPrice(data.product.price)},-
            </Text>
            <Text>Jumlah barang : {data.qty}</Text>
          </View>
        </View>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>Total Harga</DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={[styles.textPrice, styles.textMediumBold]}>
                Rp. {toPrice(data.qty * data.product.price)},-
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      <View style={[styles.cartItem, styles.container]}>
        <Text style={styles.textMedium}>Rincian Harga</Text>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>Total Harga</DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={[styles.textPrice]}>
                Rp. {toPrice(data.qty * data.product.price)},-
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Ongkos Kirim</DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={[styles.textPrice]}>Rp. 0,-</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.textMedium}>Total Pembayaran</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={[styles.textPrice, styles.textMediumBold]}>
                Rp. {toPrice(data.qty * data.product.price)},-
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      <View style={styles.container}>
        <Button
          title="Lanjutkan Pembayaran"
          isLoading={loading}
          disabled={userDetail ? (userDetail.userdetail ? false : true) : true}
          onPress={() => buy()}
        />
      </View>
    </ScrollView>
  );
};

export default Checkout;
