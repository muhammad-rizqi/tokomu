import React from 'react';
import {Component} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Button from '../../../components/Button';
import {getUserDetail, updateUserDetail} from '../../../controller/User';
import {styles} from '../../../styles/styles';

class UpdateAddress extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      phone_number: 0,
      address: '',
      isLoading: false,
    };
  }

  updateProfile() {
    this.setLoading(true);
    const {userData, phone_number, address} = this.state;
    updateUserDetail(userData.id, phone_number, address).then((data) => {
      if (data.status === 'success') {
        ToastAndroid.show(data.message, ToastAndroid.LONG);
        this.props.navigation.goBack();
      } else {
        ToastAndroid.show(JSON.stringify(data), ToastAndroid.LONG);
      }
      this.setLoading(false);
    });
  }

  getProfile() {
    this.setLoading(true);
    getUserDetail().then((user) => {
      this.setLoading(false);
      const {userdetail} = user.data.user;
      this.setState({userData: user.data.user});
      if (userdetail) {
        this.setState({
          phone_number: userdetail.phone_number,
          address: userdetail.address,
        });
      }
    });
  }

  setLoading(boolean) {
    this.setState({isLoading: boolean});
  }
  componentDidMount() {
    this.getProfile();
  }

  render() {
    const {userData} = this.state;
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
            value={userData.userdetail ? this.state.phone_number : null}
          />
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
        </View>
        <View style={styles.marginVerticalMini}>
          <Button
            title="Update"
            isLoading={this.state.isLoading}
            onPress={() => this.updateProfile()}
          />
        </View>
      </ScrollView>
    );
  }
}
export default UpdateAddress;
