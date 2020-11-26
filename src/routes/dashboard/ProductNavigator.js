import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Home, ProductDetail, SearchPoduct, ShopProduct} from '../../screen';
const Stack = createStackNavigator();

const ProductNavigator = () => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={SearchPoduct}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ShopProduct" component={ShopProduct} />
      <Stack.Screen name="Detail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default ProductNavigator;
