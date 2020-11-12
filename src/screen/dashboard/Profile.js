import React, {useEffect, useState} from 'react';
import {View, Text, Image, ToastAndroid, RefreshControl} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearToken} from '../../redux/action';
import {removeToken} from '../../controller/Token';
import {getUserDetail} from '../../controller/User';
import {
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import {styles} from '../../styles/styles';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const deleteToken = () => dispatch(clearToken());

  const logout = () => {
    removeToken().then(() => deleteToken());
  };

  const getProfile = () => {
    getUserDetail()
      .then((user) => {
        console.log(user);
        if (user.data) {
          setUserData(user.data.user);
        }
        setRefreshing(false);
      })
      .catch((err) => {
        ToastAndroid.show(`${err}`, ToastAndroid.SHORT);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[styles.screen, styles.container]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            getProfile();
          }}
        />
      }>
      <View style={styles.row}>
        <Image
          style={styles.profileImageSmall}
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

      {/* <Text>{JSON.stringify(userData)}</Text> */}
      {userData.role !== 3 ? (
        <TouchableNativeFeedback
          style={styles.menuList}
          onPress={() => navigation.navigate('Shop')}>
          <Text>Shop Dashboard</Text>
        </TouchableNativeFeedback>
      ) : null}

      <TouchableNativeFeedback
        style={styles.menuList}
        onPress={() => navigation.navigate('UpdateAddress')}>
        <Text>Update Profile</Text>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback style={styles.menuList} onPress={() => logout()}>
        <Text>Logout</Text>
      </TouchableNativeFeedback>
    </ScrollView>
  );
};

export default Profile;
