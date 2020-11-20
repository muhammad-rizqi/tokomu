import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {toPrice} from '../../../services/global_var/api';
import {getShopTransaction} from '../../../services/Shop';
import {styles} from '../../../styles/styles';

const ShopTransaction = ({navigation}) => {
  const [transaction, setTransaction] = useState([]);
  const {token, shop} = useSelector((state) => state);
  const [data, setData] = useState([]);

  useEffect(() => {
    getShopTransaction(shop.id, token)
      .then((res) => {
        console.log(res.data);
        if (res.status === 'success') {
          setTransaction(res.data);
          console.log(res.data);
        } else {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
        }
      })
      .catch((e) => console.log(e));
  }, [navigation]);

  return (
    <View>
      <Text>TransactionList</Text>
      {transaction ? (
        transaction.length > 0 ? (
          transaction.map((transact) => (
            <TouchableNativeFeedback
              key={transact.id}
              onPress={() =>
                navigation.navigate('UpdateTransactions', {id: transact.id})
              }>
              <Card style={[styles.cartItem]}>
                <View style={[styles.row, styles.container]}>
                  <Image
                    source={{uri: transact.buying.image}}
                    style={styles.imgSquareSmall}
                  />
                  <View style={[styles.flex1, styles.marginHorizontalMini]}>
                    <Text>{transact.buying.product_name}</Text>
                    <Text>Rp. {toPrice(transact.buying.price)}</Text>
                    <Text>Jumlah barang: {transact.qty}</Text>
                    <Text>Rp. {toPrice(transact.total)}</Text>
                    <Text>{transact.status}</Text>
                  </View>
                </View>
              </Card>
            </TouchableNativeFeedback>
          ))
        ) : (
          <Text>Data Kosong</Text>
        )
      ) : (
        <Text>Error</Text>
      )}
    </View>
  );
};

export default ShopTransaction;
