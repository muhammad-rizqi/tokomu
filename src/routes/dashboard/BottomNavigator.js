import 'react-native-gesture-handler';
import React from 'react';
import {Home, Profile, Chat, Cart, Transaction} from '../../screen';
import AuthNavigator from '../auth/AuthNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

const BottomNavigator = ({token}) => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Chat" component={token ? Chat : AuthNavigator} />
      <BottomTab.Screen name="Cart" component={token ? Cart : AuthNavigator} />
      <BottomTab.Screen
        name="Transaction"
        component={token ? Transaction : AuthNavigator}
      />
      <BottomTab.Screen
        name="Profile"
        options={{title: token ? 'Profile' : 'Login'}}
        component={token ? Profile : AuthNavigator}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
