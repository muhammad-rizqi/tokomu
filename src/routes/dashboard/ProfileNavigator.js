import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile, UpdateAddress} from '../../screen';
import ShopDashboard from '../../screen/dashboard/Shop/ShopDashboard';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Shop" component={ShopDashboard} />
      <Stack.Screen name="UpdateAddress" component={UpdateAddress} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
