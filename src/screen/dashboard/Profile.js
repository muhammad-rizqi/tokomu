/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ToastAndroid,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/action';
import {removeToken} from '../../services/Token';
import {getUserDetail} from '../../services/User';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {colors, styles} from '../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Appbar} from 'react-native-paper';

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
  }, [user]);

  if (loading === true && userData === null) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Appbar.Header style={styles.backgroundDark}>
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getProfile();
            }}
          />
        }>
        <View style={[styles.row, styles.container, styles.backgroundLight]}>
          <Image
            style={styles.profileImageSmall}
            source={
              userData.userdetail
                ? {
                    uri: userData.userdetail.avatar,
                  }
                : require('../../assets/img/user-shape.png')
            }
          />
          <View style={styles.marginHorizontalMini}>
            <Text style={styles.textMediumBold}>{userData.name}</Text>
            <Text>{userData.email}</Text>
          </View>
        </View>
        <View style={[styles.container, styles.cartItem]}>
          <TouchableNativeFeedback
            style={styles.menuList}
            onPress={() => navigation.navigate('UpdateAddress')}>
            <View style={[styles.row, {alignItems: 'center'}]}>
              <MaterialCommunityIcons
                name="account-edit"
                color={colors.backgroundDark2}
                size={24}
              />
              <Text style={styles.marginHorizontalMini}>Update Profile</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            style={styles.menuList}
            onPress={() => navigation.navigate('Chat')}>
            <View style={[styles.row, {alignItems: 'center'}]}>
              <MaterialCommunityIcons
                name="chat"
                color={colors.backgroundDark2}
                size={24}
              />
              <Text style={styles.marginHorizontalMini}>Chat</Text>
            </View>
          </TouchableNativeFeedback>
          {userData.role !== 2 ? (
            <>
              <TouchableNativeFeedback
                style={styles.menuList}
                onPress={() => navigation.navigate('TransactionList')}>
                <View style={[styles.row, {alignItems: 'center'}]}>
                  <MaterialCommunityIcons
                    name="truck-fast"
                    color={colors.backgroundDark2}
                    size={24}
                  />
                  <Text style={styles.marginHorizontalMini}>Transaksi</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                style={styles.menuList}
                onPress={() => navigation.navigate('Cart')}>
                <View style={[styles.row, {alignItems: 'center'}]}>
                  <MaterialCommunityIcons
                    name="cart"
                    color={colors.backgroundDark2}
                    size={24}
                  />
                  <Text style={styles.marginHorizontalMini}>Cart</Text>
                </View>
              </TouchableNativeFeedback>
            </>
          ) : null}
          <TouchableNativeFeedback
            style={styles.menuList}
            onPress={() => navigation.navigate('UpdateAccount')}>
            <View style={[styles.row, {alignItems: 'center'}]}>
              <MaterialCommunityIcons
                name="account-cog"
                color={colors.backgroundDark2}
                size={24}
              />
              <Text style={styles.marginHorizontalMini}>Pengaturan Akun</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            style={styles.menuList}
            onPress={() => logout()}>
            <View style={[styles.row, {alignItems: 'center'}]}>
              <MaterialCommunityIcons
                name="exit-to-app"
                color={colors.backgroundDark2}
                size={24}
              />
              <Text style={styles.marginHorizontalMini}>Logout</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
