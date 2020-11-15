import 'react-native-gesture-handler';
import React from 'react';
import {Home, Chat, Cart, Transaction} from '../../screen';
import AuthNavigator from '../auth/AuthNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileNavigator from './ProfileNavigator';
import ShopNavigator from './ShopNavigator';
import {useSelector} from 'react-redux';
import ProductNavigator from './ProductNavigator';
import {Image} from 'react-native';
import {styles} from '../../styles/styles';

const BottomTab = createBottomTabNavigator();

const BottomNavigator = ({token}) => {
  const {user, cartReducer} = useSelector((state) => state);
  const cartBadge = cartReducer.length;
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={ProductNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              style={[styles.icon, {tintColor: color}]}
              source={require('../../assets/icons/home-button.png')}
            />
          ),
        }}
      />
      {token ? (
        <>
          <BottomTab.Screen
            name="Chat"
            component={Chat}
            options={{
              tabBarIcon: ({color, size}) => (
                <Image
                  style={[styles.icon, {tintColor: color}]}
                  source={require('../../assets/icons/chat-bubble.png')}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarIcon: ({color, size}) => (
                <Image
                  style={[styles.icon, {tintColor: color}]}
                  source={require('../../assets/icons/shopping-basket-button.png')}
                />
              ),
              tabBarBadge: cartBadge,
            }}
          />
          <BottomTab.Screen
            name="Profile"
            component={ProfileNavigator}
            options={{
              tabBarIcon: ({color, size}) => (
                <Image
                  style={[styles.icon, {tintColor: color}]}
                  source={require('../../assets/icons/user-account-box.png')}
                />
              ),
            }}
          />
          {user.role === 2 ? (
            <BottomTab.Screen
              name="Shop"
              component={ShopNavigator}
              options={{
                tabBarIcon: ({color, size}) => (
                  <Image
                    style={[styles.icon, {tintColor: color}]}
                    source={require('../../assets/icons/front-store.png')}
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
            tabBarIcon: ({color, size}) => (
              <Image
                style={[styles.icon, {tintColor: color}]}
                source={require('../../assets/icons/exit-to-app-button.png')}
              />
            ),
          }}
        />
      )}
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
