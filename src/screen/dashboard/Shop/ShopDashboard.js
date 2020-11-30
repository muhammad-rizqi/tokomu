/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getMyShop} from '../../../services/Shop';
import {colors, styles} from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {setShopId} from '../../../redux/action';
import Button from '../../../components/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardMenu from '../../../components/DashboardMenu';

const ShopDashboard = ({navigation}) => {
  const [shop, setShop] = useState('');
  const [loading, setLoading] = useState(true);

  //redux
  const {token, user} = useSelector((state) => state);
  // const shopReducer = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  //

  const getShop = () => {
    setLoading(true);
    getMyShop(user.id, token)
      .then((res) => {
        if (res.data) {
          setShop(res.data);
          dispatch(setShopId(res.data.id));
        }
      })
      .catch((err) => {
        ToastAndroid.show(`${err}`, ToastAndroid.LONG);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getShop();
    });
    return unsubscribe;
  }, [navigation]);

  if (loading === true) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (shop === '' || shop == null) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <MaterialCommunityIcons
          name="storefront-outline"
          color={colors.backgroundDark2}
          size={150}
        />
        <Text style={[styles.textMedium, styles.marginVerticalLarge]}>
          Anda belum punya toko
        </Text>
        <Button
          title="Buat toko?"
          onPress={() => navigation.navigate('ShopUpdate')}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.backgroundDark, styles.containerMini]}>
        <View style={[styles.row, styles.centerContainer]}>
          <Image
            source={require('../../../assets/img/logo.png')}
            style={[{height: 36, width: 180}, styles.marginHorizontalMini]}
          />
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              getShop();
            }}
          />
        }>
        <View style={[styles.container, styles.backgroundDark]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ShopUpdate')}
            style={styles.row}>
            <Image
              style={[styles.profileImageSmall, styles.marginHorizontalMini]}
              source={{
                uri: shop.image,
              }}
            />
            <View
              style={[styles.marginHorizontalMini, {justifyContent: 'center'}]}>
              <Text style={[styles.textLight, styles.textMediumBold]}>
                {shop.shop_name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.container,
            styles.row,
            {
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            },
          ]}>
          <DashboardMenu
            icon="storefront-outline"
            onPress={() => navigation.navigate('ProductDashboard')}
            title="Produk"
          />
          <DashboardMenu
            icon="credit-card-check-outline"
            onPress={() => navigation.navigate('ShopAccount')}
            title="Rekening"
          />
          <DashboardMenu
            icon="chat-outline"
            onPress={() => navigation.navigate('Chat')}
            title="Pesan"
          />
          <DashboardMenu
            icon="currency-usd-circle-outline"
            onPress={() => navigation.navigate('ShopTransaction')}
            title="Transaksi"
          />
          <DashboardMenu
            icon="store-outline"
            onPress={() => navigation.navigate('ShopUpdate')}
            title="Pengaturan Toko"
          />
          <DashboardMenu
            icon="account-cog-outline"
            onPress={() => navigation.navigate('Profile')}
            title="Pengaturan Akun"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopDashboard;
