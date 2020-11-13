import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ShopDashboard from '../../screen/dashboard/Shop/ShopDashboard';
import ShopUpdate from '../../screen/dashboard/Shop/ShopUpdate';

const Drawer = createDrawerNavigator();

const ShopNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ShopDashboard" component={ShopDashboard} />
      <Drawer.Screen name="ShopUpdate" component={ShopUpdate} />
    </Drawer.Navigator>
  );
};

export default ShopNavigator;
