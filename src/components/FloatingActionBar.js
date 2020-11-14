import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../styles/styles';

const FloatingActionBar = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => props.onPress()}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

export default FloatingActionBar;

const styles = StyleSheet.create({
  button: {
    width: 56,
    borderRadius: 56 / 2,
    height: 56,
    backgroundColor: colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '100',
    color: '#fff',
  },
});
