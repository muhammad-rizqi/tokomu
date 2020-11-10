import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
//navigation
import {NavigationContainer} from '@react-navigation/native';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {changeToken, clearToken} from '../redux/action';
//component
import {getToken} from '../controller/Token';
import BottomNavigator from './dashboard/BottomNavigator';
import {Splash} from '../screen';

const Router = () => {
  //redux
  const dispatch = useDispatch();
  const addToken = (dataToken) => dispatch(changeToken(dataToken));
  const deleteToken = () => dispatch(clearToken());
  const token = useSelector((state) => state);
  //endredux
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getToken().then((data) => {
        if (data) {
          console.log(data);
          addToken(data);
          setLoading(false);
        } else {
          deleteToken();
          setLoading(false);
        }
      });
    }, 1000);
  });

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
