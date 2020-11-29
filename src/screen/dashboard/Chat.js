/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {getChatList} from '../../services/Chat';
import {colors, styles} from '../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import _ from 'lodash';
import {Appbar} from 'react-native-paper';

const Chat = ({navigation}) => {
  const {token, user} = useSelector((state) => state);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getList = () => {
    setLoading(true);
    getChatList(user.id, token)
      .then((res) => {
        let chatTemp = [];
        if (_.isArray(res.data.chats)) {
          setChatList(res.data);
        } else {
          Object.keys(res.data.chats).forEach((key) => {
            chatTemp = [...chatTemp, res.data.chats[key]];
          });
          setChatList({chats: chatTemp});
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getList();
    });
    return unsubscribe;
  }, [navigation]);

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
            <Text>Kosong</Text>
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
