/* eslint-disable react-hooks/exhaustive-deps */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import ProductItem from '../../../components/ProductItem';
import {searchProduct} from '../../../controller/Product';
import {styles} from '../../../styles/styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

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
        <View style={styles.container}>
          <TouchableOpacity style={styles.row}>
            <Image
              style={styles.profileImageSmall}
              source={{
                uri: shop.image,
              }}
            />
            <View style={[styles.marginHorizontalMini, styles.justifyCenter]}>
              <Text style={styles.textMediumBold}>{shop.shop_name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const SearchPoduct = ({route, navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const {query} = route.params;
  const [shops, setShops] = useState({});
  const [keyword, setKeyword] = useState('');

  const getProduct = () => {
    searchProduct(query).then((data) => {
      if (data.data) {
        setProducts(data.data.products);
        setShops(data.data.shops);
      }
      setloading(false);
    });
  };

  useEffect(() => {
    getProduct();
    setloading(true);
  }, [query]);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <Appbar.Header style={styles.backgroundDark}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Searchbar
            style={styles.flex1}
            placeholder="Cari"
            onChangeText={(value) => setKeyword(value)}
            onSubmitEditing={() => {
              navigation.navigate('Search', {query: keyword});
            }}
          />
          {/* <Appbar.Action icon="dots-vertical" /> */}
        </Appbar.Header>
        {loading ? (
          <View style={[styles.screen]}>
            <ActivityIndicator color="blue" />
          </View>
        ) : (
          <TabSearch.Navigator>
            <TabSearch.Screen
              name="Cari Produk"
              component={ProductSearch}
              initialParams={{products: products}}
            />
            <TabSearch.Screen
              name="Cari Toko"
              component={ShopSearch}
              initialParams={{shops: shops}}
            />
          </TabSearch.Navigator>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchPoduct;
