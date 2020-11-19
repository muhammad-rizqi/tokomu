import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Checkout, TransactionList} from '../../screen';

const Stack = createStackNavigator();

const TransactionNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TransactionList" component={TransactionList} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
};

export default TransactionNavigator;
