import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Home, ProductDetail} from '../../screen';
const Stack = createStackNavigator();

const ProductNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Detail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default ProductNavigator;
