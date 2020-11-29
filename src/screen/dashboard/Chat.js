/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getChatList} from '../../services/Chat';
import {colors, styles} from '../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import _ from 'lodash';
import {Appbar} from 'react-native-paper';
import {setChatBadge} from '../../redux/action';

const Chat = ({navigation}) => {
  const {token, user} = useSelector((state) => state);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getList = () => {
    setLoading(true);
    setChatList([]);
    getChatList(user.id, token)
      .then((res) => {
        let chatTemp = [];
        console.log(res.data.unread);
        if (res.data.chats !== null) {
          dispatch(setChatBadge(res.data.unread.unread));
          if (_.isArray(res.data.chats)) {
            setChatList(res.data);
          } else {
            Object.keys(res.data.chats).forEach((key) => {
              chatTemp = [...chatTemp, res.data.chats[key]];
            });
            setChatList({chats: chatTemp});
          }
        } else {
          setChatList([]);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setChatList([]);
    const unsubscribe = navigation.addListener('focus', () => {
      getList();
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Appbar.Header style={styles.backgroundDark}>
        <Appbar.Content title="Pesan" />
      </Appbar.Header>
      <ScrollView>
        {chatList ? (
          chatList.chats ? (
            chatList.chats.map((chat) => (
              <TouchableNativeFeedback
                key={chat.id}
                onPress={() =>
                  navigation.navigate('ChatMessage', {
                    to: chat.id,
                    chatName: chat.shop ? chat.shop.shop_name : chat.name,
                  })
                }>
                <View style={[styles.row, styles.menuList]}>
                  <View style={styles.marginHorizontalMini}>
                    {chat.shop ? (
                      <Image
                        source={{
                          uri: chat.shop.image,
                        }}
                        style={styles.profileImageSmall}
                      />
                    ) : chat.userdetail ? (
                      <Image
                        source={{
                          uri: chat.userdetail.avatar,
                        }}
                        style={styles.profileImageSmall}
                      />
                    ) : (
                      <MaterialCommunityIcons name="account-circle" size={52} />
                    )}
                  </View>
                  <View style={styles.centerContainer}>
                    <Text style={styles.textMediumBold}>
                      {chat.shop ? chat.shop.shop_name : chat.name}
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            ))
          ) : (
            <Text>Riwayat Chat Kosong</Text>
          )
        ) : (
          <View style={styles.centerContainer}>
            <Text>Riwayat Chat Kosong</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Chat;
