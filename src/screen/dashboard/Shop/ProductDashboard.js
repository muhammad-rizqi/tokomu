/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {getProductByShop} from '../../../services/Shop';
import {colors, styles} from '../../../styles/styles';
import {useSelector} from 'react-redux';
import ProductItem from '../../../components/ProductItem';
import FloatingActionBar from '../../../components/FloatingActionBar';
import {getAccount} from '../../../services/ShopAccount';

const ProductDashboard = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [accounts, setAccounts] = useState(null);
  //redux
  const {token, shop} = useSelector((state) => state);

  const getProductList = () => {
    setLoading(true);
    getProductByShop(shop.id, token)
      .then((data) => {
        console.log(data);
        setProducts(data.data);
        setLoading(false);
      })
      .catch((e) => console.log(e.message));
  };

  const getBankAccount = async () => {
    getAccount(shop.id, token)
      .then((data) => {
        setAccounts(data.data);
        setLoading(false);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProductList();
      getBankAccount();
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

  const addOrNavigate = () => {
    if (accounts) {
      navigation.navigate('AddProduct', {data: {}});
    } else {
      ToastAndroid.show(
        'Harap Menambah Akun Rekening Terlebih Dahulu',
        ToastAndroid.LONG,
      );
      navigation.navigate('ShopAccount');
    }
  };
  return (
    <View style={styles.screen}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              getProductList();
            }}
          />
        }>
        <View style={styles.productContainer}>
          {products ? (
            products.map((product) => (
              <ProductItem
                product={product}
                key={product.id}
                onPress={() =>
                  navigation.navigate('AddProduct', {data: product})
                }
              />
            ))
          ) : (
            <Text>Tidak Ada Barang</Text>
          )}
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 16, right: 16}}>
        <FloatingActionBar onPress={() => addOrNavigate()} />
      </View>
    </View>
  );
};

export default ProductDashboard;
