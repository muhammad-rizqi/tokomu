import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {toPrice} from '../../../services/global_var/api';
import {getTransaction} from '../../../services/Transaction';
import {styles} from '../../../styles/styles';

const UpdateTransactions = ({route, navigation}) => {
  const {token, shop} = useSelector((state) => state);
  const [data, setData] = useState('');
  const {id} = route.params;

  useEffect(() => {
    getTransaction(id, token)
      .then((res) => setData(res.data.transaction))
      .catch((e) => console.log(e));
  }, [id]);

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
      </View>
    </View>
  );
};

export default UpdateTransactions;
