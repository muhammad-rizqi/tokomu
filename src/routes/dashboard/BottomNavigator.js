import 'react-native-gesture-handler';
import React from 'react';
import {Chat, Cart} from '../../screen';
import AuthNavigator from '../auth/AuthNavigator';
import ProfileNavigator from './ProfileNavigator';
import ShopNavigator from './ShopNavigator';
import {useSelector} from 'react-redux';
import ProductNavigator from './ProductNavigator';
import {colors} from '../../styles/styles';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTab = createMaterialBottomTabNavigator();

const BottomNavigator = ({token}) => {
  const {user, cartReducer} = useSelector((state) => state);
  const cartBadge = cartReducer.length;

  return (
    <BottomTab.Navigator barStyle={{backgroundColor: colors.backgroundDark2}}>
      <BottomTab.Screen
        name="Home"
        component={ProductNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      {token ? (
        <>
          <BottomTab.Screen
            name="Chat"
            component={Chat}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="chat" color={color} size={26} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="cart" color={color} size={26} />
              ),
              tabBarBadge: cartBadge > 0 ? cartBadge : null,
            }}
          />
          <BottomTab.Screen
            name="Profile"
            component={ProfileNavigator}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="account-circle"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          {user.role === 2 ? (
            <BottomTab.Screen
              name="Shop"
              component={ShopNavigator}
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons
                    name="store"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          ) : null}
        </>
      ) : (
        <BottomTab.Screen
          name="Login"
          component={AuthNavigator}
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
