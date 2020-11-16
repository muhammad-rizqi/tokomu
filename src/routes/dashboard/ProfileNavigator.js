import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile, UpdateAccount, UpdateAddress} from '../../screen';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen name="UpdateAddress" component={UpdateAddress} />
      <Stack.Screen name="UpdateAccount" component={UpdateAccount} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
