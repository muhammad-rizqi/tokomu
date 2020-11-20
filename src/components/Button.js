import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {styles} from '../styles/styles';

const Button = ({title, onPress, disabled, isLoading}) => {
  const disable = disabled === true || isLoading === true;
  return (
    <TouchableNativeFeedback
      disabled={disable}
      onPress={() => (onPress ? onPress() : null)}>
      <View
        style={
          disabled ? [styles.button, styles.buttonDisabled] : styles.button
        }>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.textLight}>{title}</Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

export default Button;
