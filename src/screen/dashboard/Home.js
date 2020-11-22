/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {Card, Searchbar, Title} from 'react-native-paper';
import ProductItem from '../../components/ProductItem';
import {getCategoryList} from '../../services/Category';
import {getProductList} from '../../services/Product';
import {styles} from '../../styles/styles';

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

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <View style={styles.screen}>
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
        <Searchbar
          placeholder="Cari"
          onFocus={() => navigation.navigate('Search')}
        />
        <ScrollView horizontal={true}>
          {categories.map((category) => (
            <Card style={styles.marginHorizontalMini} key={'cat' + category.id}>
              <TouchableNativeFeedback style={styles.containerMini}>
                <Text style={styles.textSmallBold}>{category.category}</Text>
              </TouchableNativeFeedback>
            </Card>
          ))}
        </ScrollView>
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
