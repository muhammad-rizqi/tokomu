import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../../../components/Button';
import {getAccount} from '../../../services/ShopAccount';
import {styles} from '../../../styles/styles';
import ImagePicker from 'react-native-image-picker';
import {payment, sendPayment} from '../../../services/Payment';
import {toPrice} from '../../../services/global_var/api';

const Payment = ({route, navigation}) => {
  console.log(route.params.data);
  const {data} = route.params;
  const {token, user} = useSelector((state) => state);
  const [accounts, setAccounts] = useState([]);
  const [photo, setPhoto] = useState('');
  const [uploading, setUploading] = useState(false);

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

  const uploadPayment = () => {
    setUploading(true);
    sendPayment(data.id, photo, token)
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
      .finally(() => setUploading(false));
  };

  const getPayment = () => {
    setUploading(true);
    payment(data.id, token)
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
      .finally(() => setUploading(false));
  };

  useEffect(() => {
    getBankAccount();
    getPayment();
  }, [navigation]);

  return (
    <ScrollView>
      <Text>Payment</Text>
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
          <Text>Lakukan Pembayaran Ke Rekening : </Text>
          {accounts ? (
            accounts.length > 0 ? (
              accounts.map((account) => (
                <>
                  <Text>{account.nama_rekening}</Text>
                  <Text>{account.no_rekening}</Text>
                  <Text>{account.nama_bank}</Text>
                  <Text>{account.kode_bank}</Text>
                </>
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
      </View>
    </ScrollView>
  );
};

export default Payment;
