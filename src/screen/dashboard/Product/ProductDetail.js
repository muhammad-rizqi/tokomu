/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../components/Button';
import {addCart, cartFromUser, updateCartItem} from '../../../services/Cart';
import {colors, styles} from '../../../styles/styles';
import _ from 'lodash';
import {setCartData} from '../../../redux/action';
import {getProductDetail} from '../../../services/Product';
import {ActivityIndicator} from 'react-native-paper';

const ProductDetail = ({route, navigation}) => {
  const [modal, setmodal] = useState(false);
  const [qty, setqty] = useState(1);
  const [buy, setbuy] = useState(false);
  const {token, user, cartReducer} = useSelector((state) => state);
  const [loading, setloading] = useState(false);
  const [product, setProduct] = useState([]);
  const [productLoading, setproductLoading] = useState(true);

  const productData = route.params.data;

  const addOrUpdate = () => {
    setloading(true);
    const data = _.find(cartReducer, {product: {id: productData.id}});
    // => true
    const updateToCart = data
      ? updateCartItem(data.id, qty, token)
      : addCart(productData.id, user.id, qty, token);

    updateToCart
      .then((res) => {
        if ((res.status = 'success')) {
          ToastAndroid.show(
            'Berhasil membahkan ke keranjang',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show(res.status, ToastAndroid.LONG);
        }
        setmodal(false);
        // setloading(false);
        if (buy) {
          navigation.navigate('Cart');
        }
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      })
      .finally(() => getCart());
  };

  const dispatch = useDispatch();

  const getCart = () => {
    setloading(true);
    cartFromUser(user.id, token)
      .then((res) => {
        dispatch(setCartData(res.data.carts));
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      })
      .finally(() => setloading(false));
  };

  const getDetail = async () => {
    setproductLoading(true);
    const {data} = await getProductDetail(productData.id);
    try {
      setProduct(data);
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    } finally {
      setproductLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  if (productLoading) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Modal transparent={true} visible={modal}>
        <TouchableWithoutFeedback onPress={() => setmodal(false)}>
          <View style={[styles.flex1, styles.backgroundOpacity]} />
        </TouchableWithoutFeedback>
        <View style={{backgroundColor: colors.background}}>
          <View style={[styles.container, styles.row]}>
            <View>
              <Image
                source={{
                  uri: product.image,
                }}
                style={styles.imgSquareSmall}
              />
            </View>
            <View style={[styles.marginHorizontalMini, styles.flex1]}>
              <Text style={styles.textMediumBold}>{product.product_name}</Text>
              <Text style={styles.textPrice}>Rp. {product.price},-</Text>
              <Text>Stok : {product.stock} pcs</Text>
              <View style={[styles.row, styles.marginVerticalMini]}>
                <TouchableOpacity
                  style={[
                    styles.buttonOutlineSmall,
                    styles.marginHorizontalNano,
                  ]}
                  onPress={() => (qty > 1 ? setqty(qty - 1) : qty)}>
                  <Text style={styles.textMediumBold}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.textInputMini}
                  value={`${qty}`}
                  maxLength={10}
                  keyboardType="numeric"
                  onChangeText={(pcs) => setqty(pcs)}
                />
                <TouchableOpacity
                  style={[
                    styles.buttonOutlineSmall,
                    styles.marginHorizontalNano,
                  ]}
                  onPress={() => setqty(qty + 1)}>
                  <Text style={styles.textMediumBold}>+</Text>
                </TouchableOpacity>
              </View>
              <Button
                isLoading={loading}
                onPress={() => addOrUpdate()}
                title={buy ? 'Beli Sekarang' : 'Tambah ke keranjang'}
              />
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: product.image,
            }}
            style={styles.productImageLarge}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.marginVerticalMini}>
            <Text style={styles.textMediumBold}>{product.product_name}</Text>
            <Text style={[styles.textPrice, styles.textSmallBold]}>
              Rp. {product.price},-
            </Text>
          </View>

          <View style={styles.marginVerticalMini}>
            <TouchableOpacity
              onPress={() => Alert.alert('ShopUpdate')}
              style={styles.row}>
              <Image
                style={styles.profileImageSmall}
                source={{
                  uri: product.shop.image,
                }}
              />
              <View style={[styles.marginHorizontalMini, styles.justifyCenter]}>
                <Text style={styles.textMediumBold}>
                  {product.shop.shop_name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.marginVerticalMini}>
            <Text>Kategori : {product.category.category}</Text>
            <Text>Stok : {product.stock} pcs</Text>
          </View>
          <Text>Deskripsi : </Text>
          <View style={styles.marginVerticalMini}>
            <Text>{product.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.buttonOutlineMedium, styles.marginHorizontalNano]}>
          <Image
            source={require('../../../assets/icons/chat-bubble.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (user) {
              setmodal(true);
              setbuy(false);
            } else {
              navigation.navigate('Login');
            }
          }}
          style={[styles.buttonOutlineMedium, styles.marginHorizontalNano]}>
          <Image
            source={require('../../../assets/icons/shopping-cart.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={[styles.flex1, styles.marginHorizontalMini]}>
          <Button
            title="Beli Sekarang"
            onPress={() => {
              if (user) {
                setmodal(true);
                setbuy(true);
              } else {
                navigation.navigate('Login');
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;
