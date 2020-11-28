import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  LogBox,
} from 'react-native';
import {colors, styles} from '../../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatItem from '../../../components/ChatItem';
import {getChatMessages, sendMessage} from '../../../services/Chat';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import Pusher from 'pusher-js/react-native';

const ChatMessages = ({route, navigation}) => {
  LogBox.ignoreAllLogs();
  const [chatMessages, setChatMessages] = useState(null);
  const [message, setMessage] = useState('');
  const {token, user} = useSelector((state) => state);
  const {to} = route.params;
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef();

  useEffect(() => {
    var pusher = new Pusher('279a0700b81b07fb497f', {
      cluster: 'ap1',
    });

    var channel = pusher.subscribe('my-channel');

    channel.bind('my-event', function (data) {
      if (`${data.from}` === `${to}` && `${data.to}` === `${user.id}`) {
        getMessages();
      }
    });
  }, [route]);

  useEffect(() => {
    getMessages();
  }, [to]);

  const getMessages = () => {
    getChatMessages(user.id, to, token)
      .then((res) => {
        setChatMessages(
          _.sortBy(res.data, [
            function (o) {
              return o.id;
            },
          ]),
        );
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <ActivityIndicator color="blue" size="small" />;
  }
  const sendChat = () => {
    setMessage(null);
    sendMessage(user.id, to, message, token)
      .then((res) => getMessages())
      .catch((e) => console.log(e))
      .finally(() => getMessages());
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: false})
        }
        style={[styles.container, styles.flex1]}>
        {chatMessages.map((msg, index) => (
          <ChatItem
            key={index}
            outgoing={msg.from === user.id}
            message={msg.chat}
            time={msg.created_at.slice(11, 16)}
          />
        ))}
        <View style={styles.marginVerticalLarge} />
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

export default ChatMessages;
