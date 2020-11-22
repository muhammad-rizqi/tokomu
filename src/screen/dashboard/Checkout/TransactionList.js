/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  RefreshControl,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {getTransactionList} from '../../../services/Transaction';
import {colors, styles} from '../../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {toPrice} from '../../../services/helper';

const TransactionList = ({navigation}) => {
  const [transaction, setTransaction] = useState([]);
  const {token, user} = useSelector((state) => state);
  const [loading, setLoading] = useState(true);

  const getTransaction = () => {
    setLoading(true);
    getTransactionList(user.id, token)
      .then((res) => {
        if (res.status === 'success') {
          setTransaction(res.data.transactions);
          console.log(res.data.transactions);
        } else {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTransaction();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              getTransaction();
            }}
          />
        }>
        <TouchableNativeFeedback onPress={() => navigation.navigate('Profile')}>
          <MaterialCommunityIcons
            name="arrow-left"
            color={colors.backgroundDark2}
            size={32}
          />
        </TouchableNativeFeedback>
        {transaction ? (
          transaction.length > 0 ? (
            transaction.map((transact) => (
              <TouchableNativeFeedback
                key={transact.id}
                onPress={() =>
                  navigation.navigate('Payment', {data: transact})
                }>
                <Card style={[styles.cartItem]}>
                  <View style={[styles.row, styles.container]}>
                    <Image
                      source={{uri: transact.product.image}}
                      style={styles.imgSquareSmall}
                    />
                    <View style={[styles.flex1, styles.marginHorizontalMini]}>
                      <Text>{transact.product.product_name}</Text>
                      <Text>Rp. {toPrice(transact.product.price)}</Text>
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
      </ScrollView>
    </View>
  );
};

export default TransactionList;
