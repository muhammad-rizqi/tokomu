import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Register, Login} from '../../screen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </>
  );
};

export default AuthNavigator;
