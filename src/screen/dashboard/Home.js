import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {Searchbar} from 'react-native-paper';
import ProductItem from '../../components/ProductItem';
import {getProductList} from '../../controller/Product';
import {styles} from '../../styles/styles';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [keyword, setKeyword] = useState('');

  const getProduct = () => {
    getProductList().then((data) => {
      if (data.data) {
        setProducts(data.data);
      }
      setloading(false);
    });
  };
  useEffect(() => {
    getProduct();
    setloading(true);
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
          placeholder="Search"
          onChangeText={(value) => setKeyword(value)}
          onSubmitEditing={() => {
            navigation.navigate('Search', {query: keyword});
          }}
        />
        <Text>Home</Text>

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
