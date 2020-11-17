/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {Searchbar} from 'react-native-paper';
import ProductItem from '../../../components/ProductItem';
import {searchProduct} from '../../../controller/Product';
import {styles} from '../../../styles/styles';

const SearchPoduct = ({route, navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const {query} = route.params;

  const getProduct = () => {
    searchProduct(query).then((data) => {
      if (data.data) {
        setProducts(data.data.products);
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
          onChangeText={(value) => console.log(value)}
        />
        <Text>Search Poduc</Text>

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

export default SearchPoduct;
