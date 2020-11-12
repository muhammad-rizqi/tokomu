import React, {useState, useEffect} from 'react';
import {View, Text, ToastAndroid, Image} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {addShop, getMyShop} from '../../../controller/Shop';
import {styles} from '../../../styles/styles';
import Button from '../../../components/Button';
import ImagePicker from 'react-native-image-picker';

const ShopUpdate = ({navigation}) => {
  const [shop, setShop] = useState(null);
  const [shopName, setShopName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const updateShop = () => {
    setLoading(true);
    addShop(shopName, description, photo)
      .then((res) => {
        ToastAndroid.show(res.message, ToastAndroid.LONG);
        setLoading(false);
        navigation.goBack();
      })
      .catch((err) => {
        ToastAndroid.show(`${err}`, ToastAndroid.LONG);
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
    getMyShop()
      .then((res) => {
        if (res.data) {
          setShop(res.data);
          setShopName(res.data.shop_name);
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
    <View>
      <Text>Edit Nama Toko</Text>
      <TextInput
        placeholder="Edit Nama Toko"
        onChangeText={(inputShopName) => setShopName(inputShopName)}
        value={shopName}
      />
      <TextInput
        placeholder="Edit Deskripsi"
        onChangeText={(inputDescription) => setDescription(inputDescription)}
        value={description}
      />
      <TouchableOpacity onPress={() => handleChoosePhoto()}>
        <Image
          style={styles.profileImageLarge}
          source={
            photo
              ? photo
              : shop
              ? {
                  uri:
                    'http://tokomu.herokuapp.com/uploads/shops/' + shop.image,
                }
              : require('../../../assets/img/user-shape.png')
          }
        />
      </TouchableOpacity>
      <Button title="Simpan" onPress={() => updateShop()} isLoading={loading} />
    </View>
  );
};

export default ShopUpdate;
