import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  AddProduct,
  ShopAccount,
  ShopDashboard,
  ShopTransaction,
  ShopUpdate,
  UpdateTransactions,
} from '../../screen';

const Drawer = createDrawerNavigator();

const ShopNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ShopDashboard" component={ShopDashboard} />
      <Drawer.Screen name="ShopUpdate" component={ShopUpdate} />
      <Drawer.Screen name="AddProduct" component={AddProduct} />
      <Drawer.Screen name="ShopAccount" component={ShopAccount} />
      <Drawer.Screen name="ShopTransaction" component={ShopTransaction} />
      <Drawer.Screen name="UpdateTransactions" component={UpdateTransactions} />
    </Drawer.Navigator>
  );
};

export default ShopNavigator;
