/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TouchableNativeFeedback,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {cartFromUser, deleteCartItem} from '../../services/Cart';
import {setCartData} from '../../redux/action';
import {colors, styles} from '../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  }, [cartReducer]);

  if (loading === true) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

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
            <TouchableNativeFeedback
              key={index}
              onPress={() => navigation.navigate('Detail', {data: product})}>
              <View style={[styles.cartItem, styles.container]}>
                <View style={styles.row}>
                  <Image
                    source={{
                      uri: product.product.image,
                    }}
                    style={styles.imgSquareMini}
                  />
                  <View style={[styles.marginHorizontalMini, styles.flex1]}>
                    <Text style={styles.textMediumBold}>
                      {product.product.product_name}
                    </Text>
                    <Text style={[styles.textPrice, styles.textSmallBold]}>
                      Rp. {product.product.price},-
                    </Text>
                    <Text>Jumlah barang : {product.qty}</Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteCart(product.id)}>
                    <MaterialCommunityIcons
                      name="delete"
                      color={colors.backgroundDark2}
                      size={26}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableNativeFeedback>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Cart;
