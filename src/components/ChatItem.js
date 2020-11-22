import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../styles/styles';

const ChatItem = ({outgoing, message, time}) => {
  const messageStyle = outgoing
    ? styles.outgoingMessage
    : styles.incomingMessage;
  const textStyle = outgoing ? {color: '#fff'} : {color: '#000'};
  return (
    <View style={[messageStyle, styles.messageItem]}>
      <Text style={textStyle}>{message}</Text>
      <Text style={[styles.messageTime, textStyle]}>{time}</Text>
    </View>
  );
};

export default ChatItem;
