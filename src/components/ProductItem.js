import React from 'react';
import {View, Text, Image, TouchableNativeFeedback} from 'react-native';
import {Card} from 'react-native-paper';
import {styles} from '../styles/styles';

const ProductItem = ({product, onPress}) => {
  return (
    <TouchableNativeFeedback onPress={() => onPress()}>
      <Card style={styles.productItem}>
        <Image
          source={{
            uri: product.image,
          }}
          style={styles.productImage}
        />
        <View style={styles.productTextContainer}>
          <Text numberOfLines={2}>{product.product_name}</Text>
          <Text style={styles.textPrice} numberOfLines={1}>
            Rp. {product.price},-
          </Text>
        </View>
      </Card>
    </TouchableNativeFeedback>
  );
};

export default ProductItem;
