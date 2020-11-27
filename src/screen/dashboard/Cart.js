/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ToastAndroid,
  RefreshControl,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  cartFromUser,
  deleteCartItem,
  updateCartItem,
} from '../../services/Cart';
import {setCartData} from '../../redux/action';
import {colors, styles} from '../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {toPrice} from '../../services/helper';
import _ from 'lodash';

const Cart = ({navigation}) => {
  const {token, user, cartReducer} = useSelector((state) => state);
  const [cart, setcart] = useState([]);
  const [loading, setloading] = useState(true);

  // const shopReducer = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const getCart = () => {
    setloading(true);
    cartFromUser(user.id, token)
      .then((res) => {
        if (res.data) {
          setcart(res.data.carts);
          dispatch(setCartData(res.data.carts));
          console.log(res.data.carts);
        } else {
          setcart([]);
          dispatch(setCartData([]));
        }
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      })
      .finally(() => setloading(false));
  };

  const deleteCart = (id) => {
    setloading(true);
    deleteCartItem(id, token)
      .then((res) => {
        ToastAndroid.show(res.message, ToastAndroid.LONG);
        getCart();
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCart();
    });
    return unsubscribe;
  }, [cartReducer, user]);

  if (loading === true) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  const setQty = (qty, cartId) => {
    if (_.isNumber(qty)) {
      if (qty > 0) {
        setloading(true);
        updateCartItem(cartId, qty, token)
          .then((res) => ToastAndroid.show(res.message, ToastAndroid.LONG))
          .catch((e) => console.log(e))
          .finally(() => getCart());
      } else {
        deleteCartItem(cartId, token);
      }
    } else {
      ToastAndroid.show('Angka yang anda masukkan salah !', ToastAndroid.LONG);
    }
  };
  return (
    <View style={styles.screen}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setloading(true);
              getCart();
            }}
          />
        }>
        {cart.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text>Keranjang Kosong</Text>
          </View>
        ) : (
          cart.map((product, index) => (
            <View key={index}>
              <View style={[styles.cartItem, styles.container]}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('ShopProduct', {
                      data: product.product.shop,
                    })
                  }>
                  <View style={[styles.row, styles.marginVerticalMini]}>
                    <MaterialCommunityIcons
                      name="store"
                      color={colors.backgroundDark2}
                      size={18}
                    />
                    <Text
                      style={[
                        styles.marginHorizontalMini,
                        styles.textSmallBold,
                      ]}>
                      {product.product.shop.shop_name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('Checkout', {data: product})
                  }>
                  <View style={styles.row}>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate('Detail', {data: product.product})
                      }>
                      <Image
                        source={{
                          uri: product.product.image,
                        }}
                        style={styles.imgSquareSmall}
                      />
                    </TouchableWithoutFeedback>
                    <View style={[styles.marginHorizontalMini, styles.flex1]}>
                      <Text style={styles.textMedium} numberOfLines={2}>
                        {product.product.product_name}
                      </Text>
                      <Text style={[styles.textPrice, styles.textMedium]}>
                        Rp. {toPrice(product.product.price)},-
                      </Text>
                      <View>
                        <View
                          style={[
                            styles.row,
                            styles.marginVerticalMini,
                            styles.centerContainer,
                          ]}>
                          <Text>Jumlah Pesanan : </Text>
                          <TextInput
                            style={styles.textInputMini}
                            placeholder={`${product.qty}`}
                            maxLength={10}
                            keyboardType="numeric"
                            onSubmitEditing={(pcs) => {
                              pcs.nativeEvent.text <= product.product.stock
                                ? setQty(
                                    _.toInteger(pcs.nativeEvent.text),
                                    product.id,
                                  )
                                : ToastAndroid.show(
                                    'Stok tidak cukup',
                                    ToastAndroid.LONG,
                                  );
                            }}
                          />
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => deleteCart(product.id)}>
                      <MaterialCommunityIcons
                        name="delete"
                        color={colors.backgroundDark2}
                        size={26}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Cart;
