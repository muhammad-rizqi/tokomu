import 'react-native-gesture-handler';
import React from 'react';
import {Home, Chat, Cart, Transaction} from '../../screen';
import AuthNavigator from '../auth/AuthNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileNavigator from './ProfileNavigator';
import ShopNavigator from './ShopNavigator';
import {useSelector} from 'react-redux';
import ProductNavigator from './ProductNavigator';

const BottomTab = createBottomTabNavigator();

const BottomNavigator = ({token}) => {
  const {user} = useSelector((state) => state);
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={ProductNavigator} />
      {token ? (
        <>
          <BottomTab.Screen name="Chat" component={Chat} />
          <BottomTab.Screen name="Cart" component={Cart} />
          <BottomTab.Screen name="Profile" component={ProfileNavigator} />
          {user.role === 2 ? (
            <BottomTab.Screen name="Shop" component={ShopNavigator} />
          ) : null}
        </>
      ) : (
        <BottomTab.Screen name="Login" component={AuthNavigator} />
      )}
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
