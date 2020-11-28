import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Payment, TransactionList} from '../../screen';

const Stack = createStackNavigator();

const TransactionNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{detachPreviousScreen: true}}>
      <Stack.Screen
        name="TransactionList"
        component={TransactionList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default TransactionNavigator;
