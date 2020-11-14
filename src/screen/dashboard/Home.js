import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import ProductItem from '../../components/ProductItem';
import {getProductList} from '../../controller/Product';
import {styles} from '../../styles/styles';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProductList().then((data) => {
      if (data.data) {
        setProducts(data.data);
      }
    });
  }, []);
  return (
    <ScrollView style={styles.screen}>
      <Text>Home</Text>

      <View style={styles.productContainer}>
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
