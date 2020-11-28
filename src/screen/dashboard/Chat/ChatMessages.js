/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  LogBox,
  Text,
} from 'react-native';
import {colors, styles} from '../../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatItem from '../../../components/ChatItem';
import {getChatMessages, sendMessage} from '../../../services/Chat';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import Pusher from 'pusher-js/react-native';
import {Appbar} from 'react-native-paper';

const ChatMessages = ({route, navigation}) => {
  LogBox.ignoreAllLogs();
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const {token, user} = useSelector((state) => state);
  const {to} = route.params;
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef();
  const [typing, setTyping] = useState(typing);
  useEffect(() => {
    var pusher = new Pusher('279a0700b81b07fb497f', {
      cluster: 'ap1',
    });

    var channel = pusher.subscribe('my-channel');

    channel.bind('my-event', function (data) {
      if (`${data.from}` === `${to}` && `${data.to}` === `${user.id}`) {
        setTyping(true);
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
        setTyping(false);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <ActivityIndicator color="blue" size="small" />;
  }
  const sendChat = () => {
    sendMessage(user.id, to, message, token)
      .then(() => {
        setMessage(null);
        getMessages();
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header style={styles.backgroundDark}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Kirim Pesan"
          subtitle={typing ? 'Mengetik...' : 'Online'}
        />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: false})
        }
        style={[styles.container, styles.flex1]}>
        {chatMessages.length > 0 ? (
          <Text style={[styles.textCenter, styles.textSmallBold]}>
            {chatMessages[0].created_at.slice(0, 10)}
          </Text>
        ) : null}

        {chatMessages.map((msg, index) => (
          <>
            {chatMessages.length > 2 ? (
              chatMessages[index - 1] ? (
                _.isEqual(
                  chatMessages[index - 1].created_at.slice(0, 10),
                  chatMessages[index].created_at.slice(0, 10),
                ) ? null : (
                  <Text style={[styles.textCenter, styles.textSmallBold]}>
                    {chatMessages[index].created_at.slice(0, 10)}
                  </Text>
                )
              ) : null
            ) : null}
            <ChatItem
              key={index}
              outgoing={msg.from === user.id}
              message={msg.chat}
              time={msg.created_at.slice(11, 16)}
              isRead={msg.is_read}
              sending={msg.sending}
            />
          </>
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
