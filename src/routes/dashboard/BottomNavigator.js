import 'react-native-gesture-handler';
import React from 'react';
import {Home, Chat, Cart, Transaction} from '../../screen';
import AuthNavigator from '../auth/AuthNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileNavigator from './ProfileNavigator';

const BottomTab = createBottomTabNavigator();

const BottomNavigator = ({token}) => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Home} />
      {token ? (
        <>
          <BottomTab.Screen name="Chat" component={Chat} />
          <BottomTab.Screen name="Cart" component={Cart} />
          <BottomTab.Screen name="Transaction" component={Transaction} />
          <BottomTab.Screen name="Profile" component={ProfileNavigator} />
        </>
      ) : (
        <BottomTab.Screen name="Login" component={AuthNavigator} />
      )}
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
