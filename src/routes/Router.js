/* eslint-disable react-hooks/exhaustive-deps */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
//navigation
import {NavigationContainer} from '@react-navigation/native';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {changeToken, clearToken, setCartData, setUser} from '../redux/action';
//component
import {getToken, removeToken} from '../controller/Token';
import BottomNavigator from './dashboard/BottomNavigator';
import {Splash} from '../screen';
import {getUserInfo} from '../controller/User';
import {ToastAndroid} from 'react-native';
import {cartFromUser} from '../controller/Cart';

const Router = () => {
  //redux
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state);
  //endredux
  const [loading, setLoading] = useState(true);

  const getUser = (tokenData) => {
    getUserInfo(tokenData)
      .then((res) => {
        if (res.data) {
          const {id, email, name, role} = res.data.user;
          dispatch(setUser(id, email, name, role));
          // setLoading(false);
          getCart(id, tokenData);
        } else if (res.status !== 'success') {
          dispatch(clearToken());
          removeToken();
          // setLoading(false);
        }
      })
      .catch((err) => {
        // setLoading(false);
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  const getCart = (id, tokenCart) => {
    cartFromUser(id, tokenCart)
      .then((res) => {
        if (res.data) {
          dispatch(setCartData(res.data.carts));
        } else {
          dispatch(setCartData([]));
        }
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getToken().then((data) => {
      if (data) {
        dispatch(changeToken(data));
        getUser(data);
      } else {
        dispatch(clearToken());
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <BottomNavigator token={token} />
    </NavigationContainer>
  );
};

export default Router;
