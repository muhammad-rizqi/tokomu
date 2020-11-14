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
import {getMyShop, getProductByShop} from '../../../controller/Shop';
import {colors, styles} from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {setShopId} from '../../../redux/action';
import Button from '../../../components/Button';
import ProductItem from '../../../components/ProductItem';
import FloatingActionBar from '../../../components/FloatingActionBar';

const ShopDashboard = ({navigation}) => {
  const [shop, setShop] = useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  //redux
  const {token, user} = useSelector((state) => state);
  // const shopReducer = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  //

  const getShop = () => {
    setLoading(true);
    getMyShop(user.id, token)
      .then((res) => {
        if (res.data) {
          setShop(res.data);
          dispatch(setShopId(res.data.id));
          getProductList(res.data.id);
        }
      })
      .catch((err) => {
        ToastAndroid.show(`${err}`, ToastAndroid.LONG);
      });
  };

  const getProductList = (shopId) => {
    getProductByShop(shopId, token)
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    getShop();
  }, []);

  if (loading === true) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (shop === '' || shop == null) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <Text>Anda belum punya toko </Text>
        <Button
          title="Buat toko?"
          onPress={() => navigation.navigate('ShopUpdate')}
        />
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
              getShop();
            }}
          />
        }>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ShopUpdate')}
            style={styles.row}>
            <Image
              style={styles.profileImageSmall}
              source={
                shop.image
                  ? {
                      uri:
                        'http://tokomu.herokuapp.com/uploads/shops/' +
                        shop.image,
                    }
                  : {
                      uri:
                        'http://tokomu.herokuapp.com/uploads/shops/default.jpg',
                    }
              }
            />
            <View
              style={[styles.marginHorizontalMini, {justifyContent: 'center'}]}>
              <Text style={styles.textMediumBold}>{shop.shop_name}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.productContainer}>
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product.id}
              onPress={() => navigation.navigate('AddProduct', {data: product})}
            />
          ))}
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 16, right: 16}}>
        <FloatingActionBar
          onPress={() => navigation.navigate('AddProduct', {data: {}})}
        />
      </View>
    </View>
  );
};

export default ShopDashboard;
