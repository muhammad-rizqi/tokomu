import React from 'react';
import {View, Text} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {styles} from '../styles/styles';

const Button = ({title, onPress}) => {
  return (
    <TouchableNativeFeedback style={styles.button} onPress={() => onPress()}>
      <Text style={styles.textLight}>{title}</Text>
    </TouchableNativeFeedback>
  );
};

export default Button;
