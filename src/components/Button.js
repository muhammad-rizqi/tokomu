import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';

const Button = ({title, onPress, disabled, isLoading}) => {
  const disable = disabled === true || isLoading === true;
  return (
    <TouchableOpacity
      disabled={disable}
      style={disabled ? [styles.button, styles.buttonDisabled] : styles.button}
      onPress={() => onPress()}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.textLight}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
