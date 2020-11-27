/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
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
import {ActivityIndicator, DataTable} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {toPrice} from '../../../services/helper';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
const {Dimensions} = require('react-native');

const windowWidth = Dimensions.get('window').width;
const ProductDetail = ({route, navigation}) => {
  const [modal, setModal] = useState(false);
  const [qty, setQty] = useState(1);
  const [buy, setBuy] = useState(false);
  const {token, user, cartReducer} = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [productLoading, setproductLoading] = useState(true);
  const [alpha, setAlpha] = useState(0);

  const productData = route.params.data;

  const addOrUpdate = () => {
    setLoading(true);
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
        setModal(false);
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
    setLoading(true);
    cartFromUser(user.id, token)
      .then((res) => {
        dispatch(setCartData(res.data.carts));
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      })
      .finally(() => setLoading(false));
  };

  const getDetail = async () => {
    setproductLoading(true);
    try {
      const {data} = await getProductDetail(productData.id);
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

  if (product.shop === undefined || product.shop === null) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <Text>Product Tidak Ditemukan</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Modal transparent={true} visible={modal}>
        <TouchableWithoutFeedback onPress={() => setModal(false)}>
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
              <Text style={styles.textPrice}>
                Rp. {toPrice(product.price)},-
              </Text>
              <Text>
                Stok : {product.stock === 0 ? 'Habis' : `${product.stock} pcs`}
              </Text>
              <View style={[styles.row, styles.marginVerticalMini]}>
                <TouchableOpacity
                  style={[
                    styles.buttonOutlineSmall,
                    styles.marginHorizontalNano,
                  ]}
                  onPress={() => (qty > 1 ? setQty(qty - 1) : qty)}>
                  <Text style={styles.textMediumBold}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.textInputMini}
                  value={`${qty}`}
                  maxLength={10}
                  keyboardType="numeric"
                  onChangeText={(pcs) => setQty(_.toInteger(pcs))}
                />
                <TouchableOpacity
                  style={[
                    styles.buttonOutlineSmall,
                    styles.marginHorizontalNano,
                  ]}
                  onPress={() =>
                    qty < product.stock ? setQty(_.add(qty, 1)) : qty
                  }>
                  <Text style={styles.textMediumBold}>+</Text>
                </TouchableOpacity>
              </View>
              <Button
                disabled={qty <= 0 || qty > product.stock || !_.isNumber(qty)}
                isLoading={loading}
                onPress={() => addOrUpdate()}
                title={buy ? 'Beli Sekarang' : 'Tambah ke keranjang'}
              />
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView
        onScroll={(e) => {
          e.nativeEvent.contentOffset.y >= windowWidth * 0.8
            ? setAlpha(1)
            : setAlpha(0);
        }}>
        <Image
          source={{
            uri: product.image,
          }}
          style={styles.productImageLarge}
        />
        <View style={[styles.backgroundLight, styles.container]}>
          <View style={styles.marginVerticalMini}>
            <Text style={styles.productDetailName}>{product.product_name}</Text>
            <Text style={[styles.productDetailPrice]}>
              Rp. {toPrice(product.price)},-
            </Text>
          </View>
          <View style={styles.marginVerticalMini}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ShopProduct', {data: product.shop})
              }
              style={styles.row}>
              <Image
                style={styles.profileImageSmall}
                source={{
                  uri: product.shop.image,
                }}
              />
              <View style={[styles.marginHorizontalMini, styles.justifyCenter]}>
                <Text style={styles.textMedium}>{product.shop.shop_name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.container,
            styles.backgroundLight,
            styles.marginVerticalMini,
          ]}>
          <View style={styles.marginVerticalMini}>
            <Text style={styles.textMedium}>Informasi Barang</Text>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Kategori</DataTable.Cell>
                <DataTable.Cell>{product.category.category}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Stock</DataTable.Cell>
                <DataTable.Cell>
                  {product.stock === 0 ? 'Habis' : `${product.stock} pcs`}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        </View>
        <View
          style={[
            styles.container,
            styles.backgroundLight,
            styles.marginVerticalMini,
          ]}>
          <Text style={styles.textMedium}>Deskripsi</Text>
          <View style={styles.marginVerticalMini}>
            <Text>{product.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          {width: windowWidth, backgroundColor: `rgba(26, 35, 126, ${alpha})`},
          styles.absoluteTopRight,
        ]}>
        <View style={[styles.row, styles.centerContainer]}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={[styles.marginHorizontalMini, styles.alphaBgIcon]}>
              <MaterialCommunityIcons
                name="arrow-left"
                color={colors.white}
                size={26}
              />
            </View>
          </TouchableWithoutFeedback>
          <View
            style={[
              styles.container,
              styles.marginHorizontalMini,
              styles.flex1,
            ]}>
            <Text
              style={[styles.textLight, styles.textMedium]}
              numberOfLines={1}>
              {alpha === 1 ? product.product_name : ''}
            </Text>
          </View>
          <TouchableNativeFeedback>
            <View style={[styles.marginHorizontalMini, styles.alphaBgIcon]}>
              <MaterialCommunityIcons
                name="cart"
                color={colors.white}
                size={26}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.buttonOutlineMedium, styles.marginHorizontalNano]}
          onPress={() => {
            if (user) {
              navigation.navigate('Chat', {
                screen: 'ChatMessage',
                params: {to: product.shop.owner.id, initial: false},
              });
            } else {
              navigation.navigate('Login');
            }
          }}>
          <MaterialCommunityIcons
            name="chat-plus"
            color={colors.backgroundDark2}
            size={26}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (user) {
              setModal(true);
              setBuy(false);
            } else {
              navigation.navigate('Login');
            }
          }}
          style={[styles.buttonOutlineMedium, styles.marginHorizontalNano]}>
          <MaterialCommunityIcons
            name="cart-plus"
            color={colors.backgroundDark2}
            size={26}
          />
        </TouchableOpacity>
        <View style={[styles.flex1, styles.marginHorizontalMini]}>
          <Button
            title="Beli Sekarang"
            onPress={() => {
              if (user) {
                setModal(true);
                setBuy(true);
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
