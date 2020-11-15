import React, {useEffect, useState} from 'react';
import {View, Text, ToastAndroid, Image} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Button from '../../../components/Button';
import {getUserDetail, updateUserDetail} from '../../../controller/User';
import {styles} from '../../../styles/styles';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {removeToken} from '../../../controller/Token';
import {clearToken} from '../../../redux/action';

const UpdateAddress = ({navigation}) => {
  const [userData, setUserData] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [photo, setPhoto] = useState('');

  const {token, user} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetail(user.id, token)
      .then((res) => {
        if (res.data) {
          const {userdetail} = res.data.user;
          setUserData(res.data.user);
          if (userdetail !== null) {
            if (userdetail.phone_number !== null) {
              setPhoneNumber(userdetail.phone_number);
            }
            if (userdetail.address !== null) {
              setAddress(userdetail.address);
            }
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
        setIsLoading(false);
      });
  }, []);

  const logout = () => {
    removeToken().then(() => dispatch(clearToken()));
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

  const updateProfile = () => {
    setIsLoading(true);
    updateUserDetail(userData.id, phoneNumber, address, photo, token)
      .then((data) => {
        if (data.status === 'success') {
          ToastAndroid.show(data.message, ToastAndroid.LONG);
          navigation.goBack();
        } else if (data.status === 'error') {
          ToastAndroid.show(data.message, ToastAndroid.LONG);
        } else {
          setError(data);
        }
        console.log(data);
        setIsLoading(false);
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
        setIsLoading(false);
      });
  };

  return (
    <ScrollView style={[styles.screen, styles.container]}>
      <Text style={styles.textTitle}>Ubah Profile</Text>
      <View style={styles.marginVerticalMini}>
        <Text>Edit Nomor Telepon</Text>
        <TextInput
          editable={!isLoading}
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          placeholder="Nomor Telepon"
          style={styles.textInput}
          onChangeText={(number) => setPhoneNumber(number)}
          value={userData.userdetail ? `${phoneNumber}` : null}
        />
        {error.phoneNumber ? (
          <Text style={styles.textError}>{error.phone_number}</Text>
        ) : null}
      </View>
      <View style={styles.marginVerticalMini}>
        <Text>Edit Alamat</Text>
        <TextInput
          placeholder="Alamat"
          editable={!isLoading}
          style={styles.textInput}
          onChangeText={(inputAddress) => setAddress(inputAddress)}
          value={userData.userdetail ? address : null}
        />
        {error.address ? (
          <Text style={styles.textError}>{error.address}</Text>
        ) : null}
      </View>
      <Text>Edit Photo</Text>
      <TouchableOpacity
        style={styles.centerContainer}
        onPress={() => handleChoosePhoto()}>
        <Image
          style={styles.profileImageLarge}
          source={
            photo
              ? photo
              : userData.userdetail
              ? {
                  uri:
                    'https://tokomu.herokuapp.com/uploads/avatars/' +
                    userData.userdetail.avatar,
                }
              : require('../../../assets/img/user-shape.png')
          }
        />
      </TouchableOpacity>
      <View style={styles.marginVerticalMini}>
        <Button
          title="Update"
          isLoading={isLoading}
          onPress={() => updateProfile()}
        />
      </View>
    </ScrollView>
  );
};

export default UpdateAddress;
