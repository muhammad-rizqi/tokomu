/* eslint-disable react-hooks/exhaustive-deps */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  Chat,
  Cart,
  Login,
  ShopTransaction,
  Profile,
  Home,
  ShopDashboard,
} from '../../screen';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../styles/styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Pusher from 'pusher-js/react-native';
import {LogBox} from 'react-native';
import {getChatList} from '../../services/Chat';
import {setChatBadge} from '../../redux/action';

const BottomTab = createBottomTabNavigator();

const BottomNavigator = () => {
  const {user, cartReducer, token, chatBadge} = useSelector((state) => state);
  const cartBadge = cartReducer.length;
  LogBox.ignoreAllLogs();

  const dispatch = useDispatch();

  const getList = () => {
    getChatList(user.id, token)
      .then((res) => {
        console.log(res);
        if (res.data.unread.unread) {
          dispatch(setChatBadge(res.data.unread.unread));
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (user) {
      var pusher = new Pusher('279a0700b81b07fb497f', {
        cluster: 'ap1',
      });

      var channel = pusher.subscribe('my-channel');

      channel.bind('my-event', function (data) {
        if (`${data.to}` === `${user.id}`) {
          getList();
        }
      });
    }
  }, [chatBadge]);

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeBackgroundColor: colors.backgroundDark2,
        inactiveBackgroundColor: colors.backgroundDark2,
        activeTintColor: colors.white,
        inactiveTintColor: colors.backgroundGrey,
        adaptive: true,
        showLabel: false,
      }}>
      {token !== null && user.role === 2 ? (
        <>
          <BottomTab.Screen
            name="Shop"
            component={ShopDashboard}
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
              tabBarBadge: chatBadge
                ? chatBadge > 0
                  ? chatBadge
                  : null
                : null,
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
