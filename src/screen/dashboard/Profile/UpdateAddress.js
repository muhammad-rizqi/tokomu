import React from 'react';
import {Component} from 'react';
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

class UpdateAddress extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      phone_number: 0,
      address: '',
      isLoading: false,
      error: {},
      photo: null,
    };
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  updateProfile() {
    this.setLoading(true);
    const {userData, phone_number, address, photo} = this.state;
    updateUserDetail(userData.id, phone_number, address, photo)
      .then((data) => {
        if (data.status === 'success') {
          ToastAndroid.show(data.message, ToastAndroid.LONG);
          this.props.navigation.goBack();
        } else if (data.status === 'error') {
          ToastAndroid.show(data.message, ToastAndroid.LONG);
        } else {
          this.setState({error: data});
        }
        this.setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        ToastAndroid.show(`${err}`, ToastAndroid.SHORT);
        this.setLoading(false);
      });
  }

  getProfile() {
    this.setLoading(true);
    getUserDetail()
      .then((user) => {
        this.setLoading(false);
        const {userdetail} = user.data.user;
        this.setState({userData: user.data.user});
        if (userdetail) {
          this.setState({
            phone_number: userdetail.phone_number,
            address: userdetail.address,
          });
        }
      })
      .catch((err) => {
        ToastAndroid.show(`${err}`, ToastAndroid.SHORT);
        this.setLoading(false);
      });
  }

  setLoading(boolean) {
    this.setState({isLoading: boolean});
  }
  componentDidMount() {
    this.getProfile();
  }

  render() {
    const {userData, error} = this.state;
    return (
      <ScrollView style={[styles.screen, styles.container]}>
        <Text style={styles.textTitle}>Ubah Profile</Text>
        <View style={styles.marginVerticalMini}>
          <Text>Nomor Telepon</Text>
          <TextInput
            editable={!this.state.isLoading}
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            placeholder="Nomor Telepon"
            style={styles.textInput}
            onChangeText={(number) => this.setState({phone_number: number})}
            value={userData.userdetail ? `${this.state.phone_number}` : null}
          />
          {error.phone_number ? (
            <Text style={styles.textError}>{error.phone_number}</Text>
          ) : null}
        </View>
        <View style={styles.marginVerticalMini}>
          <Text>Alamat</Text>
          <TextInput
            placeholder="Alamat"
            editable={!this.state.isLoading}
            style={styles.textInput}
            onChangeText={(address) => this.setState({address})}
            value={userData.userdetail ? this.state.address : null}
          />
          {error.address ? (
            <Text style={styles.textError}>{error.address}</Text>
          ) : null}
        </View>
        <View style={styles.marginVerticalMini}>
          <Button
            title="Update"
            isLoading={this.state.isLoading}
            onPress={() => this.updateProfile()}
          />
        </View>
        <TouchableOpacity
          style={styles.centerContainer}
          onPress={() => this.handleChoosePhoto()}>
          <Image
            style={{width: 150, height: 150, borderRadius: 75}}
            source={
              this.state.photo
                ? this.state.photo
                : userData.userdetail
                ? {
                    uri:
                      'http://tokomu.herokuapp.com/uploads/avatars/' +
                      userData.userdetail.avatar,
                  }
                : require('../../../assets/img/user-shape.png')
            }
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
export default UpdateAddress;
