import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ToastAndroid,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/action';
import {removeToken} from '../../controller/Token';
import {getUserDetail} from '../../controller/User';
import {
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import {colors, styles} from '../../styles/styles';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const {token, user} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);

  const logout = () => {
    removeToken().then(() => dispatch(clearToken()));
  };

  const getProfile = () => {
    getUserDetail(user.id, token)
      .then((res) => {
        if (res.data) {
          setUserData(res.data.user);
        }
        setRefreshing(false);
        setloading(false);
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
        setRefreshing(false);
        setloading(false);
      });
  };

  useEffect(() => {
    getUserDetail(user.id, token)
      .then((res) => {
        if (res.data) {
          setUserData(res.data.user);
        }
        setRefreshing(false);
        setloading(false);
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
        setRefreshing(false);
        setloading(false);
      });
  }, []);

  if (loading === true && userData === null) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }
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
                    'https://tokomu.herokuapp.com/uploads/avatars/' +
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
