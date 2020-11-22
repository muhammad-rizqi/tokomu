import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors, styles} from '../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatItem from '../../components/ChatItem';

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([
    {username: 'Jono', message: 'Halo', time: '20.00'},
  ]);
  const [message, setMessage] = useState('');

  return (
    <View style={styles.screen}>
      <ScrollView style={[styles.container, styles.flex1]}>
        {chatMessages.map((msg, index) => (
          <ChatItem
            key={index}
            outgoing={false}
            message={msg.message}
            time="12.00"
          />
        ))}
      </ScrollView>
      <View style={styles.composeMessage}>
        <TextInput
          placeholderTextColor="#4b4d5a"
          placeholder="Tulis Pesan ..."
          value={message}
          style={[styles.textInput, styles.flex1]}
          onChangeText={(messageText) => setMessage(messageText)}
          multiline={true}
        />
        <TouchableOpacity
          onPress={() => this.sendMessage()}
          style={styles.marginHorizontalMini}>
          <MaterialCommunityIcons name="send" color={colors.white} size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
