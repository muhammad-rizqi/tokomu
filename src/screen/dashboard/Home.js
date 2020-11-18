import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {Card, Searchbar, Title} from 'react-native-paper';
import ProductItem from '../../components/ProductItem';
import {getCategoryList} from '../../services/Category';
import {getProductList} from '../../services/Product';
import {styles} from '../../styles/styles';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [keyword, setKeyword] = useState('');
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
          onChangeText={(value) => setKeyword(value)}
          onSubmitEditing={() => {
            navigation.navigate('Search', {query: keyword});
          }}
        />
        <Text>Home</Text>

        <ScrollView horizontal={true}>
          {categories.map((category) => (
            <Card
              style={[styles.marginHorizontalMini, styles.container]}
              key={'cat' + category.id}>
              <Title>{category.category}</Title>
            </Card>
          ))}
        </ScrollView>
        <View style={styles.productContainer}>
          {products.map((product) => (
            <ProductItem
              onPress={() => navigation.navigate('Detail', {data: product})}
              product={product}
              key={product.id}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
