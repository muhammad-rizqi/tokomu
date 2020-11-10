import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/action';
import {removeToken} from '../../controller/Token';

const Home = () => {
  const token = useSelector((state) => state);
  const dispatch = useDispatch();
  const deleteToken = () => dispatch(clearToken());
  const logout = () => {
    removeToken().then(() => deleteToken());
  };
  return (
    <View>
      <Text>{token}</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
};

export default Home;
