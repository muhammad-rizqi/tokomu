import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {styles} from '../styles/styles';

const Button = ({title, onPress, disabled, isLoading}) => {
  const disable = disabled === true || isLoading === true;
  return (
    <TouchableNativeFeedback
      disabled={disable}
      style={disabled ? [styles.button, styles.buttonDisabled] : styles.button}
      onPress={() => onPress()}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.textLight}>{title}</Text>
      )}
    </TouchableNativeFeedback>
  );
};

export default Button;
