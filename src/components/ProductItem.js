import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';

const ProductItem = ({product, onPress}) => {
  return (
    <TouchableOpacity style={styles.productItem} onPress={() => onPress()}>
      <Image
        source={{
          uri: 'https://.herokuapp.com/uploads/products/' + product.image,
        }}
        style={styles.productImage}
      />
      <View style={styles.productTextContainer}>
        <Text numberOfLines={2}>{product.product_name}</Text>
        <Text style={styles.textPrice} numberOfLines={1}>
          Rp. {product.price},-
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
