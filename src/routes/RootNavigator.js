import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigator from './dashboard/BottomNavigator';
import {
  AddProduct,
  Chat,
  ChatMessages,
  Checkout,
  Payment,
  ProductDashboard,
  ProductDetail,
  Register,
  SearchPoduct,
  ShopAccount,
  ShopDashboard,
  ShopProduct,
  ShopTransaction,
  ShopUpdate,
  TransactionList,
  UpdateAccount,
  UpdateAddress,
  UpdateTransactions,
} from '../screen';
import {colors, styles} from '../styles/styles';

const Stack = createStackNavigator();

const RootNavigator = ({token}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.backgroundDark,
        headerTintColor: colors.white,
      }}>
      <Stack.Screen
        name="Home"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={SearchPoduct}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ShopProduct" component={ShopProduct} />
      <Stack.Screen
        name="Detail"
        component={ProductDetail}
        options={{headerShown: false}}
      />
      {token ? (
        <>
          <Stack.Screen name="UpdateAddress" component={UpdateAddress} />
          <Stack.Screen name="UpdateAccount" component={UpdateAccount} />
          <Stack.Screen name="TransactionList" component={TransactionList} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="ChatList" component={Chat} />
          <Stack.Screen
            name="ChatMessage"
            component={ChatMessages}
            options={{headerShown: false}}
          />
          <Stack.Screen name="ShopDashboard" component={ShopDashboard} />
          <Stack.Screen name="ShopUpdate" component={ShopUpdate} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="ShopAccount" component={ShopAccount} />
          <Stack.Screen
            name="ShopTransaction"
            component={ShopTransaction}
            options={{detachPreviousScreen: true}}
          />
          <Stack.Screen
            name="UpdateTransactions"
            component={UpdateTransactions}
          />
          <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
        </>
      ) : (
        <>
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
