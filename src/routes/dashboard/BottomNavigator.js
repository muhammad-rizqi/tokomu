import 'react-native-gesture-handler';
import React from 'react';
import {Chat, Cart, Checkout, ChatMessages} from '../../screen';
import AuthNavigator from '../auth/AuthNavigator';
import ProfileNavigator from './ProfileNavigator';
import ShopNavigator from './ShopNavigator';
import {useSelector} from 'react-redux';
import ProductNavigator from './ProductNavigator';
import {styles} from '../../styles/styles';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';

const BottomTab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const BottomNavigator = ({token}) => {
  const {user, cartReducer} = useSelector((state) => state);
  const cartBadge = cartReducer.length;

  return (
    <BottomTab.Navigator
      shifting={true}
      barStyle={styles.backgroundDark}
      sceneAnimationEnabled={true}>
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
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="chat" color={color} size={26} />
              ),
            }}>
            {() => (
              <Stack.Navigator>
                <Stack.Screen name="ChatList" component={Chat} />
                <Stack.Screen name="ChatMessage" component={ChatMessages} />
              </Stack.Navigator>
            )}
          </BottomTab.Screen>
          <BottomTab.Screen
            name="Cart"
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="cart" color={color} size={26} />
              ),
              tabBarBadge: cartBadge > 0 ? cartBadge : null,
            }}>
            {() => (
              <Stack.Navigator>
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="Checkout" component={Checkout} />
              </Stack.Navigator>
            )}
          </BottomTab.Screen>
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
