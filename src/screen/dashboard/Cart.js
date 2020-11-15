/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  ActivityIndicator,
  TouchableNativeFeedback,
  TextInput,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {cartFromUser, deleteCartItem} from '../../controller/Cart';
import {setCartData} from '../../redux/action';
import {colors, styles} from '../../styles/styles';

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
        setcart(res.data.carts);
        dispatch(setCartData(res.data.carts));
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
    getCart();
  }, []);

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
        {cart.map((product, index) => (
          <TouchableNativeFeedback key={index}>
            <View style={[styles.cartItem, styles.container]}>
              <View style={styles.row}>
                <Image
                  source={{
                    uri:
                      'http://tokomu.herokuapp.com/uploads/products/' +
                      product.product.image,
                  }}
                  style={styles.imgSquareMini}
                />
                <View style={styles.marginHorizontalMini}>
                  <Text style={styles.textMediumBold}>
                    {product.product.product_name}
                  </Text>
                  <Text style={styles.textPrice}>
                    Rp. {product.product.price},-
                  </Text>
                  <View style={[styles.row, styles.marginVerticalMini]}>
                    <TouchableOpacity
                      style={styles.buttonOutlineSmall}
                      onPress={() => Alert.alert('yysysys')}>
                      <Text>-</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={[
                        styles.textInputMini,
                        styles.marginHorizontalNano,
                      ]}
                      value={`${product.qty}`}
                    />
                    <TouchableOpacity
                      style={styles.buttonOutlineSmall}
                      onPress={() => Alert.alert('yyyyyyy')}>
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Button title="Hapus" onPress={() => deleteCart(product.id)} />
            </View>
          </TouchableNativeFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default Cart;
