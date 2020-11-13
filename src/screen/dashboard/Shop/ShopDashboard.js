import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {getMyShop} from '../../../controller/Shop';
import {colors, styles} from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {setShopId} from '../../../redux/action';
import Button from '../../../components/Button';

const ShopDashboard = ({navigation}) => {
  const [shop, setShop] = useState('');
  const [loading, setLoading] = useState(true);

  //redux
  const {token, user} = useSelector((state) => state);
  const {shopReducer} = useSelector((state) => state.shop);
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
        setLoading(false);
      })
      .catch((err) => {
        ToastAndroid.show(`${err}`, ToastAndroid.LONG);
        setLoading(false);
      });
  };

  useEffect(() => {
    getShop();
  }, []);

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
        <Text>Anda belum punya toko </Text>
        <Button
          title="Buat toko?"
          onPress={() => navigation.navigate('ShopUpdate')}
        />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.screen, styles.container]}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {
            setLoading(true);
            getShop();
          }}
        />
      }>
      <TouchableOpacity
        onPress={() => navigation.navigate('ShopUpdate')}
        style={styles.row}>
        <Image
          style={styles.profileImageSmall}
          source={
            shop.image
              ? {
                  uri:
                    'http://tokomu.herokuapp.com/uploads/shops/' + shop.image,
                }
              : {
                  uri: 'http://tokomu.herokuapp.com/uploads/shops/default.jpg',
                }
          }
        />
        <View style={styles.marginHorizontalMini}>
          <Text style={styles.textMediumBold}>{shop.shop_name}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ShopDashboard;
