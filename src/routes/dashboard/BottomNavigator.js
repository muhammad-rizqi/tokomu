import 'react-native-gesture-handler';
import React from 'react';
import {
  Chat,
  Cart,
  Login,
  ProductDashboard,
  ShopTransaction,
  Profile,
  Home,
  ShopDashboard,
} from '../../screen';
import {useSelector} from 'react-redux';
import {colors} from '../../styles/styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTab = createBottomTabNavigator();

const BottomNavigator = () => {
  const {user, cartReducer, token} = useSelector((state) => state);
  const cartBadge = cartReducer.length;

  return (
    <BottomTab.Navigator
      tabBarOptions={{
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
