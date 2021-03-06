/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, ToastAndroid, Image} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {addShop, getMyShop} from '../../../services/Shop';
import {styles} from '../../../styles/styles';
import Button from '../../../components/Button';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {setShopId} from '../../../redux/action';

const ShopUpdate = ({navigation}) => {
  const [shop, setShop] = useState(null);
  const [shopName, setShopName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  //redux
  const {token, user} = useSelector((state) => state);
  // const shopReducer = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  //
  const updateShop = () => {
    setLoading(true);
    addShop(shopName, description, photo, user.id, token)
      .then((res) => {
        ToastAndroid.show(res.message, ToastAndroid.LONG);
        setLoading(false);
        navigation.goBack();
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
        setLoading(false);
      });
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  };

  const getShop = () => {
    setLoading(true);
    getMyShop(user.id, token)
      .then((res) => {
        if (res.data) {
          setShop(res.data);
          setShopName(res.data.shop_name);
          dispatch(setShopId(res.data.id));
          setDescription(res.data.description);
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

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.textTitle}>Edit Nama Toko</Text>
        <View style={styles.marginVerticalMini}>
          <Text>Nama Toko</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Edit Nama Toko"
            onChangeText={(inputShopName) => setShopName(inputShopName)}
            value={shopName}
          />
        </View>
        <View style={styles.marginVerticalMini}>
          <Text>Deskripsi Toko</Text>
          <TextInput
            style={[styles.textInput, styles.textInputMultiline]}
            placeholder="Edit Deskripsi"
            onChangeText={(inputDescription) =>
              setDescription(inputDescription)
            }
            value={description}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          style={styles.centerContainer}
          onPress={() => handleChoosePhoto()}>
          <Image
            style={[styles.profileImageLarge, styles.marginVerticalMini]}
            source={
              photo
                ? photo
                : shop
                ? {
                    uri: shop.image,
                  }
                : require('../../../assets/img/user-shape.png')
            }
          />
        </TouchableOpacity>
        <Button
          title="Simpan"
          onPress={() => updateShop()}
          isLoading={loading}
          disabled={shopName === '' || description === ''}
        />
      </ScrollView>
    </View>
  );
};

export default ShopUpdate;
