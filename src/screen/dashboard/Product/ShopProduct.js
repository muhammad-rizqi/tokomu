/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getProductByShop, getShop} from '../../../services/Shop';
import {colors, styles} from '../../../styles/styles';
import {useSelector} from 'react-redux';
import ProductItem from '../../../components/ProductItem';

const ShopProduct = ({route, navigation}) => {
  const [shop, setShop] = useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const shopId = route.params.data.id;
  //redux
  const {token} = useSelector((state) => state);
  // const shopReducer = useSelector((state) => state.shop);
  //

  const getShopDetail = () => {
    setLoading(true);
    getShop(shopId, token)
      .then((res) => {
        if (res.data) {
          setShop(res.data);
          getProductList(res.data.id);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        ToastAndroid.show(`${err}`, ToastAndroid.LONG);
        setLoading(false);
      });
  };

  const getProductList = () => {
    getProductByShop(shopId, token)
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getShopDetail();
    });
    return unsubscribe;
  }, [navigation]);

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
              setLoading(true);
              getShopDetail();
            }}
          />
        }>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ShopUpdate')}
            style={styles.row}>
            <Image
              style={styles.profileImageSmall}
              source={{
                uri: shop.image,
              }}
            />
            <View
              style={[styles.marginHorizontalMini, {justifyContent: 'center'}]}>
              <Text style={styles.textMediumBold}>{shop.shop_name}</Text>
            </View>
          </TouchableOpacity>
          <Text>{shop.description}</Text>
        </View>
        <View style={styles.productContainer}>
          {products ? (
            products.map((product) => (
              <ProductItem
                product={product}
                key={product.id}
                onPress={() => navigation.navigate('Detail', {data: product})}
              />
            ))
          ) : (
            <Text>Tidak Ada Barang</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopProduct;
