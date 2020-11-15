import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import ProductItem from '../../components/ProductItem';
import {getProductList} from '../../controller/Product';
import {colors, styles} from '../../styles/styles';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setloading(true);
      getProductList().then((data) => {
        if (data.data) {
          setProducts(data.data);
        }
        setloading(false);
      });
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

  return (
    <ScrollView style={styles.screen}>
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
  );
};

export default Home;
