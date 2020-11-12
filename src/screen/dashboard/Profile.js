import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, ToastAndroid} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearToken} from '../../redux/action';
import {removeToken} from '../../controller/Token';
import {getUserDetail} from '../../controller/User';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from '../../styles/styles';

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
        ToastAndroid.show(`${err}`, ToastAndroid.SHORT);
      });
  }, []);

  return (
    <ScrollView style={[styles.screen, styles.container]}>
      <View style={styles.row}>
        <Image
          style={{width: 50, height: 50, borderRadius: 25}}
          source={
            userData.userdetail
              ? {
                  uri:
                    'http://tokomu.herokuapp.com/uploads/avatars/' +
                    userData.userdetail.avatar,
                }
              : require('../../assets/img/user-shape.png')
          }
        />
        <View style={styles.marginHorizontalMini}>
          <Text style={styles.textMediumBold}>{userData.name}</Text>
          <Text>{userData.email}</Text>
        </View>
      </View>

      <Text>{JSON.stringify(userData)}</Text>
      <Button
        title="Update Address"
        onPress={() => navigation.navigate('UpdateAddress')}
      />
      <Button title="Logout" onPress={() => logout()} />
    </ScrollView>
  );
};

export default Profile;
