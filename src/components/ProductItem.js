import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';

const ProductItem = (props) => {
  return (
    <TouchableOpacity style={styles.productItem}>
      <Image
        source={{
          uri:
            'http://tokomu.herokuapp.com/uploads/products/' +
            props.product.image,
        }}
        style={styles.productImage}
      />
      <View style={styles.productTextContainer}>
        <Text numberOfLines={2}>{props.product.product_name}</Text>
        <Text style={styles.textPrice} numberOfLines={1}>
          Rp. {props.product.price},-
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
