import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
//navigation
import {NavigationContainer} from '@react-navigation/native';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {changeToken, clearToken, setUser} from '../redux/action';
//component
import {getToken, removeToken} from '../controller/Token';
import BottomNavigator from './dashboard/BottomNavigator';
import {Splash} from '../screen';
import {getUserInfo} from '../controller/User';
import {ToastAndroid} from 'react-native';

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
        } else if (res.status !== 'success') {
          dispatch(clearToken());
          removeToken();
        }
      })
      .catch((err) => ToastAndroid.show(err.message, ToastAndroid.SHORT));
  };

  useEffect(() => {
    setTimeout(() => {
      getToken().then((data) => {
        if (data) {
          dispatch(changeToken(data));
          getUser(data);
          setLoading(false);
        } else {
          dispatch(clearToken());
          setLoading(false);
        }
      });
    }, 1000);
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
