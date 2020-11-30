import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import ProductItem from '../../../components/ProductItem';
import {searchProduct} from '../../../services/Product';
import {colors, styles} from '../../../styles/styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const TabSearch = createMaterialTopTabNavigator();

const ProductSearch = ({route, navigation}) => {
  const {products} = route.params;
  return (
    <View style={styles.screen}>
      <View style={styles.productContainer}>
        {products.map((product) => (
          <ProductItem
            onPress={() => navigation.navigate('Detail', {data: product})}
            product={product}
            key={product.id}
          />
        ))}
      </View>
    </View>
  );
};

const ShopSearch = ({route, navigation}) => {
  const {shops} = route.params;
  return (
    <View style={styles.screen}>
      {shops.map((shop) => (
        <TouchableNativeFeedback
          key={shop.id}
          onPress={() => navigation.navigate('ShopProduct', {data: shop})}>
          <View
            style={[styles.container, styles.backgroundLight, styles.menuList]}>
            <View style={styles.row}>
              <Image
                style={styles.profileImageSmall}
                source={{
                  uri: shop.image,
                }}
              />
              <View style={[styles.marginHorizontalMini, styles.justifyCenter]}>
                <Text style={styles.textMediumBold}>{shop.shop_name}</Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
};

const SearchPoduct = ({navigation}) => {
  const [products, setProducts] = useState(null);
  const [loading, setloading] = useState(false);
  const [shops, setShops] = useState(null);
  const [keyword, setKeyword] = useState(null);

  const getProduct = (query) => {
    setloading(true);
    setProducts(null);
    setShops(null);
    searchProduct(query)
      .then((data) => {
        if (data.data) {
          setProducts(data.data.products);
          setShops(data.data.shops);
        }
      })
      .catch((e) => ToastAndroid.show(e.message, ToastAndroid.SHORT))
      .finally(() => setloading(false));
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header style={styles.backgroundDark}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <View
          style={[
            styles.searchBar,
            styles.centerContainer,
            styles.marginHorizontalMini,
          ]}>
          <MaterialCommunityIcons
            name="magnify"
            color={colors.border}
            size={26}
            style={styles.marginHorizontalMini}
          />
          <TextInput
            autoFocus={true}
            placeholder="Pencarian"
            style={[
              styles.searchInput,
              styles.flex1,
              styles.marginHorizontalMini,
            ]}
            onChangeText={(value) => {
              setKeyword(value);
            }}
            onSubmitEditing={() => {
              getProduct(keyword);
            }}
            returnKeyType="search"
          />
        </View>
      </Appbar.Header>
      <ScrollView>
        {loading ? (
          <View style={[styles.screen]}>
            <ActivityIndicator color="blue" />
          </View>
        ) : products !== null || shops !== null ? (
          <TabSearch.Navigator>
            {products ? (
              products.length > 0 ? (
                <TabSearch.Screen
                  name="Cari Produk"
                  component={ProductSearch}
                  initialParams={{products: products}}
                />
              ) : null
            ) : null}
            {shops ? (
              shops.length > 0 ? (
                <TabSearch.Screen
                  name="Cari Toko"
                  component={ShopSearch}
                  initialParams={{shops: shops}}
                />
              ) : null
            ) : null}
          </TabSearch.Navigator>
        ) : keyword ? (
          <Text>Tidak Ditemukan</Text>
        ) : (
          <Text>Cari Barang Bagus</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchPoduct;
