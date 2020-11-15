import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile, UpdateAddress} from '../../screen';
import ShopUpdate from '../../screen/dashboard/Shop/ShopUpdate';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen name="UpdateShop" component={ShopUpdate} />
      <Stack.Screen name="UpdateAddress" component={UpdateAddress} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
