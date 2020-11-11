import React from 'react';
import {View, ActivityIndicator, Image} from 'react-native';
import {styles, colors} from '../../styles/styles';

const Splash = () => {
  return (
    <View style={[styles.screenDark, styles.centerContainer]}>
      <Image source={require('../../assets/img/logo.png')} />
      <ActivityIndicator
        style={styles.splashLoading}
        color={colors.primary}
        size="large"
      />
    </View>
  );
};

export default Splash;
