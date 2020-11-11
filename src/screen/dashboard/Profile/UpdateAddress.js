import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {getUserDetail} from '../../../controller/User';

const UpdateAddress = () => {
  const [userData, setUserData] = useState({});

  const getProfile = () => {
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
  };

  useEffect(() => {
    getProfile();
  });

  return (
    <View>
      <Text>{JSON.stringify(userData)}</Text>
    </View>
  );
};

export default UpdateAddress;
