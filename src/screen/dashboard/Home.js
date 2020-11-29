/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ToastAndroid,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';
import ProductItem from '../../components/ProductItem';
import {getCategoryList} from '../../services/Category';
import {getProductByCategory, getProductList} from '../../services/Product';
import {colors, styles} from '../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getProduct = async () => {
    setloading(true);
    try {
      const {data} = await getProductList();
      setProducts(data);
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    } finally {
      getCategories();
    }
  };

  const getCategories = async () => {
    try {
      const {data} = await getCategoryList();
      setCategories(data);
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    } finally {
      setloading(false);
    }
  };

  const getProductCategory = async (categoryId) => {
    setloading(true);
    try {
      const {data} = await getProductByCategory(categoryId);
      setProducts(data);
      console.log(data);
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    } finally {
      getCategories();
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={[styles.backgroundDark, styles.containerMini]}>
        <View style={[styles.row, styles.centerContainer]}>
          <Image
            source={require('../../assets/img/logo.png')}
            style={[{height: 36, width: 180}, styles.marginHorizontalMini]}
          />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Search')}>
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
                placeholder="Pencarian"
                style={[
                  styles.searchInput,
                  styles.flex1,
                  styles.marginHorizontalMini,
                ]}
                editable={false}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.containerMini}>
        <ScrollView horizontal={true}>
          {categories.map((category) => (
            <Card style={styles.marginHorizontalMini} key={'cat' + category.id}>
              <TouchableNativeFeedback
                style={styles.containerMini}
                onPress={() => getProductCategory(category.id)}>
                <Text>{category.category}</Text>
              </TouchableNativeFeedback>
            </Card>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setloading(true);
              getProduct();
            }}
          />
        }>
        <View style={styles.productContainer}>
          {products ? (
            products.length > 0 ? (
              products.map((product) => (
                <ProductItem
                  onPress={() => navigation.navigate('Detail', {data: product})}
                  product={product}
                  key={product.id}
                />
              ))
            ) : (
              <Text>Kosong</Text>
            )
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
