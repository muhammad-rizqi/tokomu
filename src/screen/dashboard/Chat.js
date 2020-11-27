/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableNativeFeedback, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {getChatList} from '../../services/Chat';
import {styles} from '../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Chat = ({navigation}) => {
  const {token, user} = useSelector((state) => state);
  const [chatList, setChatList] = useState({});

  const getList = () => {
    getChatList(user.id, token)
      .then((res) => setChatList(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getList();
  }, [navigation]);

  return (
    <View>
      <View>
        {chatList ? (
          chatList.chats ? (
            chatList.chats.map((chat) => (
              <TouchableNativeFeedback
                key={chat.id}
                onPress={() =>
                  navigation.navigate('ChatMessage', {to: chat.id})
                }>
                <View style={[styles.row, styles.containerMini]}>
                  <View style={styles.marginHorizontalMini}>
                    {chat.userdetail ? (
                      <Image
                        source={{
                          uri: chat.shop
                            ? chat.shop.image
                            : chat.userdetail.avatar,
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
        ) : null}
      </View>
    </View>
  );
};

export default Chat;
