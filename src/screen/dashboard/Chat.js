import React, {useEffect, useState} from 'react';
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
import {getChatMessages, sendMessage} from '../../services/Chat';
import {useSelector} from 'react-redux';
import _ from 'lodash';

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([
    {username: 'Jono', message: 'Halo', time: '20.00'},
  ]);
  const [message, setMessage] = useState('');
  const {token, user} = useSelector((state) => state);

  const getMessages = () => {
    getChatMessages(user.id, 3, token)
      .then((res) => {
        setChatMessages(
          _.sortBy(res.data, [
            function (o) {
              return o.id;
            },
          ]),
        );
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getMessages();
  }, []);

  const sendChat = () => {
    sendMessage(user.id, 3, message, token)
      .then((res) => getMessages())
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={[styles.container, styles.flex1]}>
        {chatMessages.map((msg, index) => (
          <ChatItem
            key={index}
            outgoing={msg.from === user.id}
            message={msg.chat}
            time={msg.created_at.slice(11, 16)}
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
          onPress={() => sendChat()}
          style={styles.marginHorizontalMini}>
          <MaterialCommunityIcons name="send" color={colors.white} size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
