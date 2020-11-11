import React, {useEffect, useState} from 'react';
import {Component} from 'react';
import {View, Text} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Button from '../../../components/Button';
import {getUserDetail} from '../../../controller/User';
import {styles} from '../../../styles/styles';

class UpdateAddress extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
    };
  }

  getProfile() {
    getUserDetail().then((user) => {
      if (user.data) {
        this.setState({userData: user.data.user});
      }
    });
  }

  componentDidMount() {
    this.getProfile();
  }

  render() {
    return (
      <ScrollView style={[styles.screen, styles.container]}>
        <Text style={styles.textTitle}>Ubah Profile</Text>
        <View style={styles.marginVerticalMini}>
          <Text>Nomor Telepon</Text>
          <TextInput
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            placeholder="Nomor Telepon"
            style={styles.textInput}
          />
        </View>
        <View style={styles.marginVerticalMini}>
          <Text>Alamat</Text>
          <TextInput
            keyboardType="email-address"
            placeholder="Alamat"
            style={styles.textInput}
          />
        </View>
        <View style={styles.marginVerticalMini}>
          <Button title="Update" onPress={() => alert('ahahahaha')} />
        </View>
      </ScrollView>
    );
  }
}
export default UpdateAddress;
