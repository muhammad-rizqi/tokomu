import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/action';
import {removeToken} from '../../controller/Token';
import {getUserDetail, getUserInfo} from '../../controller/User';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const deleteToken = () => dispatch(clearToken());
  const logout = () => {
    removeToken().then(() => deleteToken());
  };

  useEffect(() => {
    getUserDetail()
      .then((user) => {
        console.log(user);
        if (user.data) {
          setUserData(user.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View>
      <Text>Hi {userData.name}</Text>
      <Text>{JSON.stringify(userData)}</Text>
      <Button
        title="Update Address"
        onPress={() => navigation.navigate('UpdateAddress')}
      />
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
};

export default Profile;
