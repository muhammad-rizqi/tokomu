import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {changeToken, clearToken} from '../redux/action';
//component
import {Home, Register, Login, Splash} from '../screen';
import {getToken} from '../controller/Token';

const Stack = createStackNavigator();

const Router = () => {
  const dispatch = useDispatch();
  const addToken = (dataToken) => dispatch(changeToken(dataToken));
  const deleteToken = () => dispatch(clearToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Your code here
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

  const token = useSelector((state) => state);

  console.log(token);

  if (loading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token === null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
