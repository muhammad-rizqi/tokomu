import React from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {styles} from '../../../styles/styles';

const ProductDetail = ({route}) => {
  console.log(route.params.data);
  const product = route.params.data;
  return (
    <View style={styles.screen}>
      <View>
        <Image
          source={{
            uri:
              'http://tokomu.herokuapp.com/uploads/products/' + product.image,
          }}
          style={styles.productImageLarge}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.marginVerticalMini}>
          <Text style={styles.textMediumBold}>{product.product_name}</Text>
          <Text style={styles.textPrice}>Rp. {product.price},-</Text>
        </View>
        <View style={styles.marginVerticalMini}>
          <Text>Stock : {product.stock}</Text>
          <Text>Kategori : {product.category.category}</Text>
        </View>
        <View style={styles.marginVerticalMini}>
          <Text>{product.description}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => Alert.alert('ShopUpdate')}
          style={styles.row}>
          <Image
            style={styles.profileImageSmall}
            source={{
              uri:
                'http://tokomu.herokuapp.com/uploads/shops/' +
                product.shop.image,
            }}
          />
          <View style={[styles.marginHorizontalMini, styles.justifyCenter]}>
            <Text style={styles.textMediumBold}>{product.shop.shop_name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;
