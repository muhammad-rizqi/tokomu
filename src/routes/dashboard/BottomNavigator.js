import 'react-native-gesture-handler';
import React from 'react';
import {
  Chat,
  Cart,
  Checkout,
  ChatMessages,
  Login,
  ShopProduct,
  ProductDashboard,
  ShopTransaction,
  Profile,
  Home,
} from '../../screen';
import AuthNavigator from '../auth/AuthNavigator';
import ProfileNavigator from './ProfileNavigator';
import ShopNavigator from './ShopNavigator';
import {useSelector} from 'react-redux';
import ProductNavigator from './ProductNavigator';
import {colors} from '../../styles/styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomNavigator = () => {
  const {user, cartReducer, token} = useSelector((state) => state);
  const cartBadge = cartReducer.length;

  return (
    <BottomTab.Navigator
      detachInactiveScreens={true}
      screenOptions={{unmountOnBlur: true}}
      tabBarOptions={{
        activeBackgroundColor: colors.backgroundDark2,
        inactiveBackgroundColor: colors.backgroundDark2,
        activeTintColor: colors.white,
        inactiveTintColor: colors.backgroundGrey,
        adaptive: true,
        showLabel: false,
        allowFontScaling: true,
      }}>
      {token !== null && user.role === 2 ? (
        <>
          <BottomTab.Screen
            name="Shop"
            component={ProductDashboard}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="store" color={color} size={26} />
              ),
            }}
          />
          <BottomTab.Screen
            name="ShopTransaction"
            component={ShopTransaction}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="currency-usd-circle"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </>
      ) : null}
      {user ? (
        user.role !== 2 ? (
          <>
            <BottomTab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
            />
            <BottomTab.Screen
              name="Cart"
              options={{
                unmountOnBlur: true,
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="cart" color={color} size={26} />
                ),
                tabBarBadge: cartBadge > 0 ? cartBadge : null,
              }}
              component={Cart}
            />
          </>
        ) : null
      ) : (
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
      )}

      {token ? (
        <>
          <BottomTab.Screen
            name="Chat"
            options={{
              unmountOnBlur: true,
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="chat" color={color} size={26} />
              ),
            }}
            component={Chat}
          />

          <BottomTab.Screen
            name="Profile"
            component={Profile}
            options={{
              unmountOnBlur: true,
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="account-circle"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </>
      ) : (
        <BottomTab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="login" color={color} size={26} />
            ),
          }}
        />
      )}
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
