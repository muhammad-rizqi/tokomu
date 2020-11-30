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
      detachInactiveScreens={true}
      screenOptions={{
        animationEnabled: false,
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
      <Stack.Screen
        name="ShopProduct"
        component={ShopProduct}
        options={{title: 'Toko'}}
      />
      <Stack.Screen
        name="Detail"
        component={ProductDetail}
        options={{headerShown: false}}
      />
      {token ? (
        <>
          <Stack.Screen
            name="UpdateAddress"
            component={UpdateAddress}
            options={{title: 'Ubah Informasi Akun'}}
          />
          <Stack.Screen
            name="UpdateAccount"
            component={UpdateAccount}
            options={{title: 'Pengaturan Akun'}}
          />
          <Stack.Screen
            name="TransactionList"
            component={TransactionList}
            options={{
              title: 'Daftar Transaksi',
              detachPreviousScreen: true,
            }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{detachPreviousScreen: true}}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{title: 'Pembayaran'}}
          />
          <Stack.Screen
            name="ChatList"
            component={Chat}
            options={{title: 'Daftar Pesan'}}
          />
          <Stack.Screen
            name="ChatMessage"
            component={ChatMessages}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ShopDashboard"
            component={ShopDashboard}
            options={{title: 'Dashboard Toko'}}
          />
          <Stack.Screen
            name="ShopUpdate"
            component={ShopUpdate}
            options={{title: 'Pengaturan Toko'}}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProduct}
            options={{title: 'Tambah & Edit Produk'}}
          />
          <Stack.Screen
            name="ShopAccount"
            component={ShopAccount}
            options={{title: 'Pengaturan Rekening'}}
          />
          <Stack.Screen
            name="ShopTransaction"
            component={ShopTransaction}
            options={{
              title: 'Data Pembelian',
              detachPreviousScreen: true,
            }}
          />
          <Stack.Screen
            name="UpdateTransactions"
            component={UpdateTransactions}
            options={{title: 'Edit Transaksi'}}
          />
          <Stack.Screen
            name="ProductDashboard"
            component={ProductDashboard}
            options={{title: 'Dashboard Produk'}}
          />
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
