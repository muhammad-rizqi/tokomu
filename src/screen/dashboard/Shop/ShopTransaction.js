/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {toPrice} from '../../../services/helper';
import {getShopTransaction} from '../../../services/Shop';
import {removeTransaction} from '../../../services/Transaction';
import {colors, styles} from '../../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ShopTransaction = ({navigation}) => {
  const [transaction, setTransaction] = useState([]);
  const {token, shop} = useSelector((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getList();
    });
    return unsubscribe;
  }, [navigation]);

  const getList = () => {
    setLoading(true);

    getShopTransaction(shop.id, token)
      .then((res) => {
        console.log(res.data);
        if (res.status === 'success') {
          setTransaction(res.data);
        } else {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const deleteTransaction = (id) => {
    removeTransaction(id, token)
      .then((res) => ToastAndroid.show(res.message, ToastAndroid.LONG))
      .catch((err) => console.log(err))
      .finally(() => getList());
  };

  const DeleteView = ({transact}) => {
    switch (transact.status) {
      case 'selesai':
      case 'dibatalkan':
        return (
          <TouchableNativeFeedback
            onPress={() => deleteTransaction(transact.id)}>
            <MaterialCommunityIcons
              name="delete"
              color={colors.backgroundDark2}
              size={26}
            />
          </TouchableNativeFeedback>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => getList()} />
      }>
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
                    <Text style={styles.textSmallBold}>
                      {transact.buying.product_name}
                    </Text>
                    <View style={styles.marginVerticalMini}>
                      <Text style={styles.textRight}>
                        Rp. {toPrice(transact.buying.price)}
                      </Text>
                      <Text style={styles.textRight}>{transact.qty} x</Text>
                      <Text
                        style={[
                          styles.textRight,
                          styles.textMedium,
                          styles.textPrice,
                        ]}>
                        Rp. {toPrice(transact.total)}
                      </Text>
                    </View>
                    <Text style={[styles.textRight, styles.textSmallBold]}>
                      {transact.status}
                    </Text>
                  </View>
                  <DeleteView transact={transact} />
                </View>
              </Card>
            </TouchableNativeFeedback>
          ))
        ) : loading === false ? (
          <Text>Data Kosong</Text>
        ) : null
      ) : (
        <Text>Error</Text>
      )}
    </ScrollView>
  );
};

export default ShopTransaction;
