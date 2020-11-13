import React, {useState, useEffect} from 'react';
import {View, Text, ToastAndroid, Image, ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getMyShop} from '../../../controller/Shop';
import {colors, styles} from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {setShopId} from '../../../redux/action';

const ShopDashboard = ({navigation}) => {
  const [shop, setShop] = useState('');
  const [loading, setLoading] = useState(true);

  //redux
  const {token, user} = useSelector((state) => state);
  const shopReducer = useSelector((state) => state.shop);
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
        console.log(res);
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

  return (
    <ScrollView contentContainerStyle={[styles.container, styles.screen]}>
      <View style={styles.row}>
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
      </View>
    </ScrollView>
  );
};

export default ShopDashboard;
