/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableNativeFeedback} from 'react-native';
import {styles} from '../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatItem = ({outgoing, message, time, isRead, sending}) => {
  const messageStyle = outgoing
    ? styles.outgoingMessage
    : styles.incomingMessage;
  const textStyle = outgoing ? {color: '#fff'} : {color: '#000'};
  return (
    <TouchableNativeFeedback>
      <View style={[styles.messageItem, messageStyle]}>
        <Text style={textStyle}>{message}</Text>
        <View
          style={[
            styles.row,
            {justifyContent: 'flex-end', alignItems: 'center'},
          ]}>
          <Text
            style={[
              styles.messageTime,
              styles.marginHorizontalNano,
              textStyle,
            ]}>
            {time}
          </Text>
          {outgoing ? (
            <MaterialCommunityIcons
              name={isRead === 0 ? 'check' : 'check-all'}
              size={16}
              color="white"
            />
          ) : null}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ChatItem;
