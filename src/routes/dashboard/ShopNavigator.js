import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ShopDashboard from '../../screen/dashboard/Shop/ShopDashboard';
import ShopUpdate from '../../screen/dashboard/Shop/ShopUpdate';
import AddProduct from '../../screen/dashboard/Shop/AddProduct';

const Drawer = createDrawerNavigator();

const ShopNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ShopDashboard" component={ShopDashboard} />
      <Drawer.Screen name="ShopUpdate" component={ShopUpdate} />
      <Drawer.Screen name="AddProduct" component={AddProduct} />
    </Drawer.Navigator>
  );
};

export default ShopNavigator;
