import React from 'react';
import {View, Text, TouchableNativeFeedback} from 'react-native';
import {styles} from '../styles/styles';

const ChatItem = ({outgoing, message, time}) => {
  const messageStyle = outgoing
    ? styles.outgoingMessage
    : styles.incomingMessage;
  const textStyle = outgoing ? {color: '#fff'} : {color: '#000'};

  return (
    <TouchableNativeFeedback>
      <View style={[styles.messageItem, messageStyle]}>
        <Text style={textStyle}>{message}</Text>
        <Text style={[styles.messageTime, textStyle]}>{time}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ChatItem;
